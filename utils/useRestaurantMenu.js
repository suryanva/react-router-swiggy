import { useEffect, useState } from "react";
import { SWIGGY_MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [loading, setLoading] = useState(true);
  const [resInfo, setResInfo] = useState(null);
  const [resItems, setResItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(SWIGGY_MENU_URL + resId);
        const json = await response.json();
        const fetchedResInfo = json?.data?.cards[2]?.card?.card?.info;
        const fetchedResItems =
          json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
            ?.card?.card?.itemCards || [];

        setResInfo(fetchedResInfo);
        setResItems(fetchedResItems);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (resId) {
      fetchMenu();
    }
  }, [resId]);

  return { loading, resInfo, resItems };
};

export default useRestaurantMenu;
