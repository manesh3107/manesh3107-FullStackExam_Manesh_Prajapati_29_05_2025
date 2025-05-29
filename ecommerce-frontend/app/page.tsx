import Navbar from "./components/page";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="max-w-4xl mx-auto p-6 mt-20 text-center bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold mb-4 ">Welcome to E-Commerce Webstore</h1>
        <p className="text-lg text-gray-700">
          Discover amazing products, add to your cart, and enjoy a seamless shopping experience.
        </p>
      </main>
    </>
  );
}
