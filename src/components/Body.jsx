import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard.jsx";
import { SWIGGY_URL } from "../../utils/constants";
import Shimmer from "./Shimmer.jsx";
import { Link } from "react-router-dom";

// Not using key(not acceptable) <<< index as key <<<<<<<  unique id (best practices)
const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [defaultRestaurant, setDefaultRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

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

      const restaurantListFromWeb =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setRestaurantList(restaurantListFromWeb);
      setDefaultRestaurant(restaurantListFromWeb);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  if (loading) {
    return (
      <div className="body">
        <div className="Restaurant-Container">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Shimmer key={index} />
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const filteres = defaultRestaurant.filter((restaurant) =>
                restaurant?.info?.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              setRestaurantList(filteres);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const newList = defaultRestaurant.filter(
              (restaurant) => restaurant?.info?.avgRating >= 4.5
            );
            setRestaurantList(newList);
          }}
        >
          Top Rated Restaurants
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            setRestaurantList(defaultRestaurant);
          }}
        >
          Reset
        </button>
      </div>
      <div className="Restaurant-Container">
        {restaurantList.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant?.info?.id}
            key={restaurant?.info?.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
