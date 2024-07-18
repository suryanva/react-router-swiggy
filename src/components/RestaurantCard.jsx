import { CDN_URL } from "../../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating } =
    resData?.info;
  return (
    <div className="res-card">
      <img
        className="res-image"
        src={CDN_URL + cloudinaryImageId}
        alt="swiggy image"
      />
      <h3>{name}</h3>
      <h4>{costForTwo}</h4>
      <h4>{cuisines.join(",")}</h4>
      <h4>{avgRating}</h4>
    </div>
  );
};

export default RestaurantCard;
