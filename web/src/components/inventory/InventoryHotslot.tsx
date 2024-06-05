import { useMemo } from 'react';
import { Inventory } from '../../typings';
import InventorySlot from './InventorySlot';

export const InventoryHotslot = ({ inventory }: { inventory: Inventory }) => {
    const oneToFive = useMemo(() => inventory.items.slice(0, 5), [inventory.items]);

    return (
        <div className='inventory-player-hot-slot'>
            {inventory.type === "player" && <div className="inventory-player-hot-slot-container">
                {oneToFive.map((item) => (
                    <InventorySlot
                        key={`${inventory.type}-${inventory.id}-${item.slot}`}
                        item={item}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                    />
                ))}
            </div>}
        </div>
    )
}
