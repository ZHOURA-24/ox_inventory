import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import { MdInventory } from "react-icons/md";
import { FaUser } from 'react-icons/fa';
import { GiWeight } from "react-icons/gi";

const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);

  return (
    <>
      <div className="inventory-grid-wrapper" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
        <div className='inventory-grid-header'>
          <div className="inventory-grid-header-wrapper">
            <p
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", border: "2px inset #02ff41", padding: "0px 10px 0px 10px" }}
            >
              {
                inventory.type === "player"
                  ? (<div className='icon-wrapper'>
                    <FaUser size={18} />
                  </div>)
                  : (
                    <div className='icon-wrapper'>
                      <MdInventory size={18} />
                    </div>
                  )
              }
              {inventory.label} {inventory.id}
            </p>
            {inventory.maxWeight && (
              <p
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", border: "2px inset #02ff41", padding: "0px 10px 0px 10px" }}
              >
                <div className='icon-wrapper'>
                  <GiWeight size={18} />
                </div>
                {weight / 1000}/{inventory.maxWeight / 1000}kg
              </p>
            )}
          </div>
        </div>
        <div className="inventory-grid-container" ref={containerRef}>
          <>
            {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => {
              if (inventory.type === "player" && index < 5) return;
              return <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                inventoryType={inventory.type}
                inventoryGroups={inventory.groups}
                inventoryId={inventory.id}
              />
            })}
          </>
        </div>
        <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} />
      </div>
    </>
  );
};

export default InventoryGrid;
