import { useEffect, useState } from "react";
import { SWIGGY_URL } from "./constants";

const useRestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [defaultRestaurant, setDefaultRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(SWIGGY_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);

      const restaurantListFromWeb =
        json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setRestaurantList(restaurantListFromWeb);
      setDefaultRestaurant(restaurantListFromWeb);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { restaurantList, defaultRestaurant, loading, setRestaurantList };
};

export default useRestaurantList;
