const Shimmer = () => {
  return (
    <div className="  m-4 p-4 w-80 rounded-lg bg-gray-200 shadow-lg">
      <div className="w-full h-48 bg-gray-300 rounded-t-lg animate-pulse"></div>
      <div className="p-4 space-y-2">
        <div className="bg-gray-300 h-4 rounded my-2 animate-pulse"></div>
        <div className="bg-gray-300 h-4 rounded my-2 animate-pulse w-3/4"></div>
        <div className="bg-gray-300 h-4 rounded my-2 animate-pulse"></div>
        <div className="bg-gray-300 h-4 rounded my-2 animate-pulse w-3/4"></div>
      </div>
    </div>
  );
};

export default Shimmer;
