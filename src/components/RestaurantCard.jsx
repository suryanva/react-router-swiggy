import { CDN_URL } from "../../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating } =
    resData?.info;
  return (
    <div className="m-4 p-4 w-80 rounded-lg bg-gray-200 shadow-lg transform transition duration-500 hover:scale-105">
      <img
        className="rounded-t-lg w-full h-48 object-cover"
        src={CDN_URL + cloudinaryImageId}
        alt="swiggy image"
      />
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-xl">{name}</h3>
        <h4 className="text-gray-600">{costForTwo}</h4>
        <h4 className="text-gray-600">{cuisines.join(", ")}</h4>
        <h4 className="text-yellow-500 font-semibold">{avgRating}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
