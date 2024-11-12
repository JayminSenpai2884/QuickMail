import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const Header: React.FC = () => {
  const { themeMode, setThemeMode } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State to hold the generated email content


  const menuItems = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Features', href: '/features' },
  ];

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-6xl">
      <div className={`
        rounded-2xl backdrop-blur-lg shadow-lg border
        ${themeMode === 'dark' 
          ? 'bg-gray-900/80 border-gray-700/50 text-white' 
          : 'bg-white/80 border-gray-200/50 text-gray-800'
        }
        transition-all duration-300
      `}>
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center space-x-2 group">
                < span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700">
                  QuickMail
                </span>
              </a>

              <nav className="hidden md:flex items-center space-x-2">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`
                      px-4 py-2 rounded-lg transition-all duration-300
                      ${themeMode === 'dark'
                        ? 'hover:bg-gray-800 hover:text-blue-400'
                        : 'hover:bg-gray-100 hover:text-blue-600'
                      }
                    `}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${themeMode === 'dark'
                    ? 'hover:bg-gray-800 text-gray-300 hover:text-blue-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {themeMode === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  md:hidden p-2 rounded-lg transition-all duration-300
                  ${themeMode === 'dark'
                    ? 'hover:bg-gray-800 text-gray-300 hover:text-blue-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu with improved styling */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-lg transition-all duration-300
                    ${themeMode === 'dark'
                      ? 'hover:bg-gray-800 hover:text-blue-400'
                      : 'hover:bg-gray-100 hover:text-blue-600'
                    }
                  `}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};