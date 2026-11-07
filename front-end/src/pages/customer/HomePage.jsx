import { useQuery } from "@tanstack/react-query";
import { Leaf, ChefHat, Truck, Award } from "lucide-react";

import { menuService } from "../../services/menuService";
import { filterAvailableItems, applyMenuOrder, isItemPopular } from "../../utils/menuStorage";

import {
  HomeHero,
  PopularDishes,
  WhyChooseSavora,
} from "../../components/features/customer/Home";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We use only the freshest and highest quality ingredients.",
  },
  {
    icon: ChefHat,
    title: "Expert Chefs",
    description:
      "Our chefs are passionate about cooking and creating great flavors.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "We deliver your food hot and fresh right to your door.",
  },
  {
    icon: Award,
    title: "Best Quality",
    description:
      "Quality is our promise and customer satisfaction is our goal.",
  },
];

const happyCustomerAvatars = [
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=45",
  "https://i.pravatar.cc/80?img=15",
  "https://i.pravatar.cc/80?img=8",
];

export default function HomePage() {
  const { data: dishes = [], isLoading: loading } = useQuery({
    queryKey: ["menu"],

    queryFn: () => menuService.getMenu(),

    staleTime: 5 * 60 * 1000,

    select: (data) => applyMenuOrder(filterAvailableItems(data)),
  });

  const popularDishesOnly = dishes.filter((dish) => isItemPopular(dish.id));
  let popularDishes = [...popularDishesOnly];

  if (popularDishes.length < 8) {
    const extraDishes = dishes.filter((dish) => !isItemPopular(dish.id));
    popularDishes = [...popularDishes, ...extraDishes];
  }

  popularDishes = popularDishes.slice(0, 8);

  return (
    <div>
      <HomeHero />

      <PopularDishes dishes={popularDishes} loading={loading} />

      <WhyChooseSavora
        features={features}
        happyCustomerAvatars={happyCustomerAvatars}
      />
    </div>
  );
}
