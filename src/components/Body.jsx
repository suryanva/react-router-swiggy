import { useState } from "react";
import RestaurantCard, { withHighRatings } from "./RestaurantCard.jsx";
import Shimmer from "./Shimmer.jsx";
import { Link } from "react-router-dom";
import useRestaurantList from "../../utils/useRestaurantList.js";

// Not using key(not acceptable) <<< index as key <<<<<<<  unique id (best practices)
const Body = () => {
  const [searchText, setSearchText] = useState("");

  const { restaurantList, defaultRestaurant, loading, setRestaurantList } =
    useRestaurantList();

  const HighRatedRestaurantCards = withHighRatings(RestaurantCard);

  if (loading) {
    return (
      <div className="body">
        <div className=" flex flex-wrap gap-4">
          {Array(16)
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
      <div className="filter flex space-x-4">
        <div className="search">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-200 m-4 rounded-lg"
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
        <div className="my-4">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const newList = defaultRestaurant.filter(
                (restaurant) => restaurant?.info?.avgRating >= 4.5
              );
              setRestaurantList(newList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="my-4">
          <button
            className="filter-btn px-4 py-2  bg-gray-100 rounded-lg"
            onClick={() => {
              setRestaurantList(defaultRestaurant);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {restaurantList?.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant?.info?.id}
            key={restaurant?.info?.id}
          >
            {restaurant?.info?.avgRating > 4.5 ? (
              <HighRatedRestaurantCards resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
