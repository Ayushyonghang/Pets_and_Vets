import { useState, useRef, useEffect } from "react";
import Logo from "../assets/logo.png";
import {
  ShoppingCart,
  MessageCircleQuestion,
  CircleUser,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onCartClick: () => void;
}

type DropdownMenuState =
  | null
  | "mobile"
  | "dog"
  | "cat"
  | "vet"
  | "dogMobile"
  | "catMobile"
  | "vetMobile";

const Header = ({ onCartClick }: HeaderProps) => {
  const [openDropdown, setOpenDropdown] = useState<DropdownMenuState>(null);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const { user, logout, isLoading } = useAuth();
  const { state } = useCart();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (menu: DropdownMenuState) => setOpenDropdown(menu);
  const handleMouseLeave = () => setOpenDropdown(null);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  const handleCategoryClick = (searchTerm: string) => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setOpenDropdown(null);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user's first name for display
  const getFirstName = () => {
    if (!user?.fullName) return "";
    return user.fullName.split(" ")[0];
  };
  return (
    <header className="bg-[#1c49c2] text-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo and Controls Row */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Pets & Vets Logo"
            className="h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Search - Hidden on smallest screens, visible on md and up */}
        <div className="hidden md:block w-1/3 relative">
          <div className="relative">
            <SearchBar />
          </div>
        </div>

        {/* Right Controls Group */}
        <div className="flex items-center space-x-4">
          {/* Support - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
            <MessageCircleQuestion size={18} />
            <span className="text-md font-medium">24/7 Support</span>
          </div>

          {/* User Authentication */}
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              <span className="text-md">Loading...</span>
            </div>
          ) : user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-sm"
              >
                <div className="flex items-center space-x-2">
                  <CircleUser size={18} />
                  <span className="text-md hidden sm:inline">
                    {getFirstName()}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/profile")}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <CircleUser size={16} className="mr-2" />
                    <span>My Profile</span>
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-1 sm:space-x-2 py-1.5 px-2 sm:px-3 bg-white text-[#060464] rounded-lg hover:bg-white/90 transition-colors text-sm font-medium"
            >
              <CircleUser size={16} />
              <span className="text-md">Sign In</span>
            </button>
          )}

          {/* Shopping Cart */}
          <div className="relative">
            <button
              onClick={onCartClick}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={24} />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {state.itemCount}
            </span>
          </div>

          {/* Mobile Menu Button - Only visible on small screens */}
          <button
            className="p-1.5 rounded-md md:hidden hover:bg-white/10 transition-colors"
            onClick={() =>
              setOpenDropdown(openDropdown === "mobile" ? null : "mobile")
            }
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Mobile Search - Only visible on mobile */}
      <div className="md:hidden border-t border-white/10 px-4 py-2">
        <SearchBar />
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-white/10">
        {/* Desktop Navigation */}
        <div className="container mx-auto hidden md:flex px-4 py-2">
          <ul className="flex items-center space-x-6 lg:space-x-8">
            <li>
              <a
                href="/"
                className="text-base lg:text-lg font-medium py-1.5 px-2 lg:px-3 hover:bg-white/10 rounded-md transition-colors flex items-center"
              >
                Home
              </a>
            </li>

            {/* Dog Menu */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("dog")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-sm font-medium py-1.5 px-2 lg:px-3 rounded-md transition-colors flex items-center space-x-1 ${
                  openDropdown === "dog" ? "bg-white/10" : "hover:bg-white/10"
                }`}
                onClick={() => handleCategoryClick("dog")}
                aria-expanded={openDropdown === "dog"}
              >
                <span className="text-base lg:text-lg">Dog Products</span>
                <ChevronDown
                  size={16}
                  className={
                    openDropdown === "dog" ? "transform rotate-180" : ""
                  }
                />
              </button>

              {openDropdown === "dog" && (
                <div className="absolute z-50 bg-white text-gray-800 py-2 rounded-md shadow-lg w-52">
                  <div className="py-1">
                    <button
                      onClick={() => handleCategoryClick("dog food")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Dog Food
                    </button>
                    <button
                      onClick={() => handleCategoryClick("dog toys")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Dog Toys
                    </button>
                    <button
                      onClick={() => handleCategoryClick("dog beds")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Dog Beds
                    </button>
                    <button
                      onClick={() => handleCategoryClick("dog accessories")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Accessories
                    </button>
                  </div>
                </div>
              )}
            </li>

            {/* Cat Menu */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("cat")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-sm font-medium py-1.5 px-2 lg:px-3 rounded-md transition-colors flex items-center space-x-1 ${
                  openDropdown === "cat" ? "bg-white/10" : "hover:bg-white/10"
                }`}
                onClick={() => handleCategoryClick("cat")}
                aria-expanded={openDropdown === "cat"}
              >
                <span className="text-base lg:text-lg">Cat Products</span>
                <ChevronDown
                  size={16}
                  className={
                    openDropdown === "cat" ? "transform rotate-180" : ""
                  }
                />
              </button>

              {openDropdown === "cat" && (
                <div className="absolute z-50 bg-white text-gray-800 py-2 rounded-md shadow-lg w-52">
                  <div className="py-1">
                    <button
                      onClick={() => handleCategoryClick("cat food")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Cat Food
                    </button>
                    <button
                      onClick={() => handleCategoryClick("cat toys")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Cat Toys
                    </button>
                    <button
                      onClick={() => handleCategoryClick("cat beds")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Cat Beds
                    </button>
                    <button
                      onClick={() => handleCategoryClick("cat litter")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Litter & Accessories
                    </button>
                  </div>
                </div>
              )}
            </li>

            {/* Veterinary Menu */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("vet")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-sm font-medium py-1.5 px-2 lg:px-3 rounded-md transition-colors flex items-center space-x-1 ${
                  openDropdown === "vet" ? "bg-white/10" : "hover:bg-white/10"
                }`}
                onClick={() => handleCategoryClick("veterinary")}
                aria-expanded={openDropdown === "vet"}
              >
                <span className="text-base lg:text-lg">
                  Veterinary Services
                </span>
                <ChevronDown
                  size={16}
                  className={
                    openDropdown === "vet" ? "transform rotate-180" : ""
                  }
                />
              </button>

              {openDropdown === "vet" && (
                <div className="absolute z-50 bg-white text-gray-800 py-2 rounded-md shadow-lg w-52">
                  <div className="py-1">
                    <button
                      onClick={() => handleCategoryClick("vet care")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Vet Products
                    </button>
                    <button
                      onClick={() => navigate("/bookAppointment")}
                      className="flex items-center w-full text-left px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              )}
            </li>

            {/* Additional Menu Items */}
            {/* <li>
              <a
                href="/bookAppointment"
                className="text-base lg:text-lg font-medium py-1.5 px-2 lg:px-3 hover:bg-white/10 rounded-md transition-colors flex items-center"
              >
                Book Appointment
              </a>
            </li> */}
          </ul>
        </div>

        {/* Mobile Navigation Menu */}
        {openDropdown === "mobile" && (
          <div className="md:hidden bg-[#060464] border-t border-white/20">
            <div className="container mx-auto px-4 py-2">
              <ul className="flex flex-col w-full">
                <li className="border-b border-white/10 py-2">
                  <a href="/" className="text-lg font-medium w-full block py-2">
                    Home
                  </a>
                </li>

                {/* Dog Products - Mobile */}
                <li className="border-b border-white/10 py-2">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "dogMobile" ? "mobile" : "dogMobile"
                      )
                    }
                    className="text-lg font-medium w-full flex justify-between items-center py-2"
                  >
                    <span>Dog Products</span>
                    <ChevronDown
                      size={16}
                      className={
                        openDropdown === "dogMobile"
                          ? "transform rotate-180"
                          : ""
                      }
                    />
                  </button>

                  {openDropdown === "dogMobile" && (
                    <div className="pl-4 mt-2 border-t border-white/10 pt-2">
                      <button
                        onClick={() => handleCategoryClick("dog food")}
                        className="py-2 w-full text-left"
                      >
                        Dog Food
                      </button>
                      <button
                        onClick={() => handleCategoryClick("dog toys")}
                        className="py-2 w-full text-left"
                      >
                        Dog Toys
                      </button>
                      <button
                        onClick={() => handleCategoryClick("dog beds")}
                        className="py-2 w-full text-left"
                      >
                        Dog Beds
                      </button>
                      <button
                        onClick={() => handleCategoryClick("dog accessories")}
                        className="py-2 w-full text-left"
                      >
                        Accessories
                      </button>
                    </div>
                  )}
                </li>

                {/* Cat Products - Mobile */}
                <li className="border-b border-white/10 py-2">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "catMobile" ? "mobile" : "catMobile"
                      )
                    }
                    className="text-lg font-medium w-full flex justify-between items-center py-2"
                  >
                    <span>Cat Products</span>
                    <ChevronDown
                      size={16}
                      className={
                        openDropdown === "catMobile"
                          ? "transform rotate-180"
                          : ""
                      }
                    />
                  </button>

                  {openDropdown === "catMobile" && (
                    <div className="pl-4 mt-2 border-t border-white/10 pt-2">
                      <button
                        onClick={() => handleCategoryClick("cat food")}
                        className="py-2 w-full text-left"
                      >
                        Cat Food
                      </button>
                      <button
                        onClick={() => handleCategoryClick("cat toys")}
                        className="py-2 w-full text-left"
                      >
                        Cat Toys
                      </button>
                      <button
                        onClick={() => handleCategoryClick("cat beds")}
                        className="py-2 w-full text-left"
                      >
                        Cat Beds
                      </button>
                      <button
                        onClick={() => handleCategoryClick("cat litter")}
                        className="py-2 w-full text-left"
                      >
                        Litter & Accessories
                      </button>
                    </div>
                  )}
                </li>

                {/* Veterinary Services - Mobile */}
                <li className="border-b border-white/10 py-2">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "vetMobile" ? "mobile" : "vetMobile"
                      )
                    }
                    className="text-lg font-medium w-full flex justify-between items-center py-2"
                  >
                    <span>Veterinary Services</span>
                    <ChevronDown
                      size={16}
                      className={
                        openDropdown === "vetMobile"
                          ? "transform rotate-180"
                          : ""
                      }
                    />
                  </button>

                  {openDropdown === "vetMobile" && (
                    <div className="pl-4 mt-2 border-t border-white/10 pt-2">
                      <button
                        onClick={() => handleCategoryClick("vet care")}
                        className="py-2 w-full text-left"
                      >
                        Vet Care
                      </button>
                      <button
                        onClick={() => navigate("/bookAppointment")}
                        className="py-2 w-full text-left"
                      >
                        Book Appointment
                      </button>
                    </div>
                  )}
                </li>

                {/* Additional Items - Mobile */}
                {/* <li className="border-b border-white/10 py-2">
                  <a
                    href="/bookAppointment"
                    className="text-lg font-medium w-full block py-2"
                  >
                    Book Appointment
                  </a>
                </li> */}

                {/* Support - Mobile */}
                <li className="py-2">
                  <a
                    href="/support"
                    className="text-lg font-medium w-full py-2 flex items-center"
                  >
                    <MessageCircleQuestion size={18} className="mr-2" />
                    <span>24/7 Support</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
