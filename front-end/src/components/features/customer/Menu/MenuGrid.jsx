import MenuCard from "../../../common/organisms/MenuCard";

export default function MenuGrid({ dishes }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {dishes.map((dish) => (
        <MenuCard key={dish.id} item={dish} />
      ))}
    </div>
  );
}
