import { useAppSelector } from "../../store";
import { selectLeftInventory } from "../../store/inventory";
import { InventoryHotslot } from "./InventoryHotslot";

const HotSlot = () => {
    const leftInventory = useAppSelector(selectLeftInventory);
    return (
        <InventoryHotslot inventory={leftInventory} />
    )
}

export default HotSlot