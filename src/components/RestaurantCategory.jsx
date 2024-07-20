import ItemsList from "./ItemsList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const { title, itemCards } = data;

  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div>
      <div className=" my-4 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {title} ({itemCards.length})
          </span>
          <span>{showItems ? "↑" : "↓"}</span>
        </div>
        {showItems && <ItemsList items={itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
