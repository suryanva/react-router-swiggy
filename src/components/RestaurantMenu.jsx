import RestaurantMenuList from "./RestaurantMenuList";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { loading, resInfo, resItems } = useRestaurantMenu(resId);

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
    <div className="m-4 p-4 bg-amber-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{resInfo?.name}</h1>
      <p className="text-gray-600 mb-6">{resInfo?.costForTwoMessage}</p>
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <ul className="space-y-4">
        {resItems.map((restaurantMenuItems) => (
          <li key={restaurantMenuItems?.card?.info?.id}>
            <RestaurantMenuList props={restaurantMenuItems} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
