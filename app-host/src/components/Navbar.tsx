export const Navbar = () => {
  return (
    <nav className="sm:w-1/3 sm:min-w-72 sm:max-w-80 flex flex-col justify-start border-b sm:border-r border-white/10 sm:h-full pb-6 mb-6 px-3 sm:p-3 sm:p-6 mb-3">
      <ul className="flex flex-col">
        <li
          className={`text-xs uppercase font-semibold tracking-widest cursor-pointer bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-6 text-center`}
        >
          {"Admin charts (remote)"}
        </li>
      </ul>
    </nav>
  );
};
