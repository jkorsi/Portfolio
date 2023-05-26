import { Link } from "react-router-dom";
import { useState } from "react";

type MenuItemProps = {
  menuLink: string;
  text: string;
};

const HamburgerSVG = (
  <svg
    className="w-6 h-6"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ResponsiveNav = () => {
  //Hide mobile menu by default
  const [show, setShow] = useState(false);

  const HamburgerButton = (
    <button
      type="button"
      className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
      onClick={() => setShow(!show)}
    >
      <span className="sr-only">Open main menu</span>
      {HamburgerSVG}
    </button>
  );

  return (
    <nav className="sticky top-0 z-[1] bg-white border-gray-200 dark:bg-gray-900">
      <div className="items-center justify-center max-w-screen-xl flex flex-wrap mx-auto p-4 h-20">
        {HamburgerButton}
        <div
          className={`w-full md:block md:w-auto ${show ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul
            className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 
                    md:p-0 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 
                    dark:border-gray-700"
          >
            {<MenuItem menuLink="/" text="Home" />}
            {<MenuItem menuLink="bikestations" text="Bike Stations" />}
            {<MenuItem menuLink="biketrips" text="Bike Trips" />}
            {<MenuItem menuLink="upload" text="Upload CSVs" />}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const MenuItem = ({ menuLink, text }: MenuItemProps) => (
  <li>
    <Link
      to={menuLink}
      className="text-sky-600 
                 hover:bg-sky-50 
                 hover:text-sky-700 
                 focus:shadow-violet7 
                 block 
                 select-none 
                 rounded-[12px] 
                 px-6 
                 py-4
                 m-2 
                 text-[15px] 
                 font-medium 
                 leading-none 
                 no-underline 
                 outline-none 
                 focus:shadow-[0_0_0_2px]"
    >
      {text}
    </Link>
  </li>
);

export default ResponsiveNav;
