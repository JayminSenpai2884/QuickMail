import React, { useState } from "react";
import { Sun, Moon, Menu, X, Home, FilePlus, ArrowRight, SparkleIcon } from "lucide-react";
import { useStore } from "../../store/useStore";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { themeMode, setThemeMode } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to hold the generated email content

  const menuItems = [
    { label: "home", href: "/", icon: <Home className="w-4 h-4" /> }
    
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-6xl`}
    >
      <div
        className={`
        rounded-2xl backdrop-blur-2xl shadow-lg border
        ${
          themeMode === "dark"
            ? "bg-gray-900/80 border-gray-700/50 text-white"
            : "bg-white/80 border-gray-200/50 text-gray-800"
        }
        transition-all duration-300
      `}
      >
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2 group">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700">
                  QuickMail
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <nav className="hidden md:flex items-center space-x-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`
                      px-4 py-2 rounded-lg transition-all duration-300
                      ${
                        themeMode === "dark"
                          ? "hover:bg-gray-800 hover:text-blue-400"
                          : "hover:bg-gray-100 hover:text-blue-600"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ))}
              </nav>
              <Link
                to="/generate"
                className={`
                  flex items-center px-4 py-2 rounded-lg transition-all duration-300
                  ${
                    themeMode === "dark"
                      ? "hover:bg-gray-800 hover:text-blue-400"
                      : "hover:bg-gray-100 hover:text-blue-600"
                  }
                `}
              >
                <SparkleIcon className="w-4 h-4 mr-2" />
                Generate
              </Link>

              <button
                onClick={() =>
                  setThemeMode(themeMode === "light" ? "dark" : "light")
                }
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${
                    themeMode === "dark"
                      ? "hover:bg-gray-800 text-gray-300 hover:text-blue-400"
                      : "hover:bg-gray-100 text-gray-600 hover:text-blue-600"
                  }
                `}
              >
                {themeMode === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
