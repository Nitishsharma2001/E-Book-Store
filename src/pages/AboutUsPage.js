import NavBar from "../features/navbar/Navbar.js";

function AboutUsPage() {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-700 mb-4 text-center">
          About Us
        </h1>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-700 text-lg mb-4">
            <strong>Name:</strong> Nitish Sharma
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Project:</strong> E-Book Store
          </p>
          <p className="text-gray-700 text-lg mb-4">
            This project was completed as part of my studies at <strong>Shaheed Bhagat Singh State University</strong>.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            I would like to extend my heartfelt gratitude to my mentors and instructors at Hoping Mind who have guided me throughout my industrial training journey.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            This project aims to provide a seamless and secure platform for book lovers to buy and explore a wide range of books.
          </p>
          <p className="text-gray-700 text-lg">
            Stay tuned for more updates and features as we continue to enhance and expand our offerings.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
