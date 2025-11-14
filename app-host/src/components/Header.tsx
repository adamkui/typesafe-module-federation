import { Link } from "react-router";

export const Header = () => {
  return (
    <div className="fixed flex gap-x-3 items-end inset-x-0 top-0 z-10 border-b border-white/10 py-3 sm:py-6 px-6 sm:px-12">
      <img src="vite.svg" alt="vite logo" />
      <Link to={""}>
        <h1 className="text-xl sm:text-2xl font-bold tracking-widest">
          host application
        </h1>
      </Link>
    </div>
  );
};
