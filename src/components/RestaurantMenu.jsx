import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { loading, resInfo, filteredCategories } = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  if (loading) {
    // Show shimmer effect while loading
    return (
      <div className="m-4 p-4 bg-gray-200 rounded-lg shadow-lg">
        <div className="w-3/4 h-8 bg-gray-300 rounded mb-4 animate-pulse"></div>
        <div className="w-1/2 h-6 bg-gray-300 rounded mb-6 animate-pulse"></div>
        <div className="w-full h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
        <ul className="space-y-4">
          {[1, 2, 3, 4].map((index) => (
            <li
              key={index}
              className="w-full h-12 bg-gray-300 rounded animate-pulse"
            ></li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">{resInfo?.name}</h1>
      <p className="font-bold text-lg">
        {resInfo?.cuisines.join(",")} {resInfo?.costForTwoMessage}
      </p>
      <div className="w-6/12 mx-auto  ">
        {filteredCategories.map((category, index) => (
          <RestaurantCategory
            key={category.card.card.itemCards[0].card.info.id}
            data={category?.card?.card}
            showItems={index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
