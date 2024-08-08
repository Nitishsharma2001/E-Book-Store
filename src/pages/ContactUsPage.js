import NavBar from "../features/navbar/Navbar.js";

function ContactUsPage() {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-700 mb-4 text-center">
          Contact Us
        </h1>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-700 text-lg mb-4">
            For any queries, please reach out to us at:
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:books.store.ecommerce@gmail.com"
              className="text-indigo-700 underline"
            >
              books.store.ecommerce@gmail.com
            </a>
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Location:</strong> E-299, Industrial Area, Sector 75,
            Sahibzada Ajit Singh Nagar, Punjab 160055
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Phone:</strong> +91 8283048603
          </p>
          <p className="text-gray-700 text-lg">
            We are available 24/7 to assist you with your needs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
