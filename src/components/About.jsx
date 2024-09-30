const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our company! We are committed to delivering exceptional
          service and creating value for our customers.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to innovate and provide top-notch solutions that meet
          the evolving needs of our clients. We believe in the power of
          collaboration and strive to build lasting relationships based on trust
          and mutual respect.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our team of dedicated professionals works tirelessly to ensure that we
          exceed your expectations. We are passionate about what we do and are
          always looking for ways to improve and grow.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for choosing us. We look forward to working with you and
          helping you achieve your goals.
        </p>
        <p className="text-lg text-gray-700">
          Feel free to{" "}
          <a href="/contact" className="text-blue-500 hover:underline">
            contact us
          </a>{" "}
          to learn more about our offerings and how we can assist you.
        </p>
      </div>
    </div>
  );
};

export default About;
