import React, { useMemo } from 'react';

const colorChannelMixer = (colorChannelA: number, colorChannelB: number, amountToMix: number) => {
  let channelA = colorChannelA * amountToMix;
  let channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
};

const colorMixer = (rgbA: number[], rgbB: number[], amountToMix: number) => {
  let r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  let g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  let b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
  return `rgb(${r}, ${g}, ${b})`;
};

const COLORS = {
  primaryColor: [192, 57, 43],
  secondColor: [231, 76, 60],
  accentColor: [244, 108, 82],
};

const WeightBar: React.FC<{ percent: number; durability?: boolean }> = ({ percent, durability }) => {
  const color = useMemo(
    () =>
      durability
        ? percent < 50
          ? colorMixer(COLORS.accentColor, COLORS.primaryColor, percent / 100)
          : colorMixer(COLORS.secondColor, COLORS.accentColor, percent / 100)
        : percent > 50
          ? colorMixer(COLORS.primaryColor, COLORS.accentColor, percent / 100)
          : colorMixer(COLORS.accentColor, COLORS.secondColor, percent / 50),
    [durability, percent]
  );

  const segments = useMemo(() => {
    const totalSegments = 10;
    const filledSegments = Math.round((percent / 100) * totalSegments);
    return Array.from({ length: totalSegments }, (_, index) => index < filledSegments);
  }, [percent]);

  return (
    <div className={durability ? 'durability-bar' : 'weight-bar'}>
      {!durability && segments.map((filled, index) => (
        <div
          key={index}
          className={`weight-bar-segment ${filled ? 'filled' : ''}`}
          style={{ backgroundColor: filled ? color : 'transparent' }}
        />
      ))}
      {durability && (
        <div
          style={{
            visibility: percent > 0 ? 'visible' : 'hidden',
            height: '100%',
            width: `${percent}%`,
            backgroundColor: color,
            transition: `background ${0.3}s ease, width ${0.3}s ease`,
          }}
        />
      )}
    </div>
  );
};

export default WeightBar;
