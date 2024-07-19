import { useState } from "react";
import RestaurantCard from "./RestaurantCard.jsx";
import Shimmer from "./Shimmer.jsx";
import { Link } from "react-router-dom";
import useRestaurantList from "../../utils/useRestaurantList.js";

// Not using key(not acceptable) <<< index as key <<<<<<<  unique id (best practices)
const Body = () => {
  const [searchText, setSearchText] = useState("");

  const { restaurantList, defaultRestaurant, loading } = useRestaurantList();

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
