const RestaurantMenuList = ({ props }) => {
  const { card } = props; // Destructure card from props
  const name = card?.info?.name; // Access name from card.info
  const price = card?.info?.price;

  return (
    <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        <p className="text-lg font-semibold text-gray-800">{name}</p>
        <p className="text-lg font-medium text-gray-600">Rs. {price / 100}</p>
      </div>
      <div className="flex justify-end">
        <span className="bg-blue-500 text-white py-1 px-4 rounded-full cursor-pointer hover:bg-blue-600">
          Add to Cart
        </span>
      </div>
    </div>
  );
};

export default RestaurantMenuList;
