import RestaurantMenuList from "./RestaurantMenuList";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { loading, resInfo, resItems } = useRestaurantMenu(resId);
  if (loading) {
    // Show shimmer effect while loading
    return (
      <div className="menu-shimmer menu">
        <h1></h1>
        <p></p>
        <h2></h2>
        <ul>
          {[1, 2, 3, 4].map((index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="menu">
      <h1>{resInfo?.name}</h1>
      <p>{resInfo?.costForTwoMessage}</p>
      <h2>Menu</h2>
      <ul>
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
