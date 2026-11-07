import MenuCard from "../../../common/organisms/MenuCard";

export default function RelatedItems({ items }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 md:mt-20">
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-warm-900 mb-8">
        You may also like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((dish) => (
          <MenuCard key={dish.id} item={dish} />
        ))}
      </div>
    </section>
  );
}
