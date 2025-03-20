
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Search, Bell, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="flex items-center gap-2">
              <Home className={cn(
                "w-6 h-6 text-homebase-600",
                !isScrolled && "text-gray-900 dark:text-white"
              )} />
              <span className={cn(
                "text-xl font-medium",
                isScrolled 
                  ? "text-gray-900 dark:text-white" 
                  : "text-gray-900 dark:text-white"
              )}>
                HomeBase
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/buy"
            className={cn(
              "text-sm font-medium transition-colors",
              isScrolled
                ? "text-gray-900 hover:text-homebase-600 dark:text-white dark:hover:text-homebase-400"
                : "text-gray-900 hover:text-homebase-600 dark:text-white dark:hover:text-homebase-400"
            )}
          >
            Buy
          </Link>
          <Link
            to="/rent"
            className={cn(
              "text-sm font-medium transition-colors",
              isScrolled
                ? "text-gray-900 hover:text-homebase-600 dark:text-white dark:hover:text-homebase-400"
                : "text-gray-900 hover:text-homebase-600 dark:text-white dark:hover:text-homebase-400"
            )}
          >
            Rent
          </Link>
          <Link
            to="/lodging"
            className={cn(
              "text-sm font-medium transition-colors",
              isScrolled
                ? "text-gray-900 hover:text-homebase-600 dark:text-white dark:hover:text-homebase-400"
                : "text-gray-900 hover:text-homebase-600 dark:text-white dark:hover:text-homebase-400"
            )}
          >
            Lodging
          </Link>
          <a
            href="#"
            className={cn(
              "text-sm font-medium transition-colors",
              isScrolled
                ? "text-gray-900 hover:text-homebase-600 dark:text-white dark:hover:text-homebase-400"
                : "text-gray-900 hover:text-homebase-600 dark:text-white dark:hover:text-homebase-400"
            )}
          >
            About
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button
            className={cn(
              "transition-colors", 
              isScrolled
                ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                : "text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            )}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className={cn(
              "transition-colors", 
              isScrolled
                ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                : "text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            )}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <WalletConnect />
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden",
            isScrolled
              ? "text-gray-800 dark:text-gray-200"
              : "text-gray-800 dark:text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center gap-2">
                  <Home className="w-6 h-6 text-homebase-600" />
                  <span className="text-xl font-medium text-gray-900 dark:text-white">HomeBase</span>
                </div>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-900 dark:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              <Link 
                to="/buy" 
                className="text-base font-medium py-2 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Buy
              </Link>
              <Link 
                to="/rent" 
                className="text-base font-medium py-2 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Rent
              </Link>
              <Link 
                to="/lodging" 
                className="text-base font-medium py-2 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lodging
              </Link>
              <a 
                href="#" 
                className="text-base font-medium py-2 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white"
              >
                About
              </a>
              <div className="flex flex-col space-y-4 pt-4">
                <WalletConnect />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
