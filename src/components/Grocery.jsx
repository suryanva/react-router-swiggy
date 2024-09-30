const Grocery = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Grocery</h1>
      <p className="mb-4 text-lg">
        Welcome to our grocery store! We offer a wide selection of fresh
        produce, meats, dairy products, and pantry staples. Our goal is to
        provide you with high-quality items at affordable prices. Whether you
        are looking for everyday essentials or specialty ingredients, we have
        you covered. Our friendly staff is here to help you find what you need
        and answer any questions you may have. We look forward to serving you
        and making your shopping experience enjoyable and convenient.
      </p>
      <p className="text-lg">
        {" "}
        React Lazy Loading is a technique that allows you to load components
        only when they are needed. This can significantly improve the
        performance of your application by reducing the initial load time. In
        React, you can implement lazy loading using the `React.lazy` function
        and `Suspense` component. By wrapping your dynamically imported
        components with `React.lazy` and `Suspense`, you can defer the loading
        of these components until they are actually rendered. This is
        particularly useful for large applications with many routes or
        components that are not always visible to the user.
      </p>
    </div>
  );
};

export default Grocery;
