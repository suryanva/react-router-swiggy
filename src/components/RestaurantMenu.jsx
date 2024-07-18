import { useEffect, useState } from "react";
import { SWIGGY_MENU_URL } from "../../utils/constants";
import RestaurantMenuList from "./RestaurantMenuList";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [loading, setLoading] = useState(true);
  const [resInfo, setResInfo] = useState("");
  const [resItems, setResItems] = useState([]);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(SWIGGY_MENU_URL + resId);
      const json = await response.json();
      const fetchedResInfo = json?.data?.cards[2]?.card?.card?.info;
      const fetchedResItems =
        json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
          ?.card?.itemCards || [];
      setResInfo(fetchedResInfo);
      setResItems(fetchedResItems);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching menu:", error);
    }
  };

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
