function Footer() {
  return (
    <div className=" bg-gray-900">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <h3 className="text-3xl mb-3"> Best Book Store </h3>
          <p> Buy what you want. </p>
          
        </div>
        <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            {" "}
            © HopingMinds, 2024.{" "}
          </p>
          <div className="order-1 md:order-2">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            {" "}
            All Rights Reserved.{" "}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
