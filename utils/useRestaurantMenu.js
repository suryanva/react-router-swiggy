import { useEffect, useState } from "react";
import { SWIGGY_MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [loading, setLoading] = useState(true);
  const [resInfo, setResInfo] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(SWIGGY_MENU_URL + resId);
        const json = await response.json();
        console.log(json);
        const fetchedResInfo = json?.data?.cards[2]?.card?.card?.info;
        const categories =
          json?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (c) =>
              c?.card?.card["@type"] ==
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          );
        setFilteredCategories(categories);
        setResInfo(fetchedResInfo);
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

  return { loading, resInfo, filteredCategories };
};

export default useRestaurantMenu;
