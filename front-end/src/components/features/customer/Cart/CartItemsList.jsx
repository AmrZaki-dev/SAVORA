import CartItem from "./CartItem";

export default function CartItemsList({ items, onRemove, onQuantityChange }) {
  return (
    <div className="space-y-4 lg:col-span-2">
      {items.map((item) => (
        <CartItem
          key={item.menuItemId}
          item={item}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
}
