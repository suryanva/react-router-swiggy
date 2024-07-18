const RestaurantMenuList = ({ props }) => {
  const { card } = props; // Destructure card from props
  const name = card?.info?.name; // Access name from card.info
  const price = card?.info?.price;

  return (
    <div className="restaurant-menu-item">
      <div className="restaurant-menu-item-info">
        <p className="restaurant-menu-item-name">{name}</p>
        <p className="restaurant-menu-item-price">Rs. {price / 100}</p>
      </div>
      <div className="restaurant-menu-item-actions">
        <span className="restaurant-menu-item-action">Add to Cart</span>
      </div>
    </div>
  );
};

export default RestaurantMenuList;
