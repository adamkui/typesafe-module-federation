import { Link } from "react-router";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 text-center h-full">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
        Welcome to the Host Application
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
        Explore interactive charts, seamless integrations, and a modern
        experience for all your needs.
      </p>
      <div className="flex gap-4">
        <Link
          to="dashboard"
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-lg transition-all"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};
