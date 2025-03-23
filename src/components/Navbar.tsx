
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Check if we're on the index page
  const isIndexPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine text color based on page and scroll position
  const getTextColor = () => {
    if (isIndexPage && !isScrolled) {
      return "text-white"; // White text on index page when not scrolled
    }
    return "text-black"; // Black text on other pages or when scrolled
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : isIndexPage 
            ? "bg-transparent" 
            : "bg-white dark:bg-gray-900"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="flex items-center gap-2">
              <Home className={cn("w-6 h-6", getTextColor())} />
              <span className={cn("text-xl font-medium", getTextColor())}>
                HomeBase
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation - Always visible */}
        <nav className="flex items-center space-x-4 md:space-x-8">
          <Link
            to="/buy"
            className={cn("text-sm font-medium transition-colors hover:text-homebase-600", getTextColor())}
          >
            Buy
          </Link>
          <Link
            to="/rent"
            className={cn("text-sm font-medium transition-colors hover:text-homebase-600", getTextColor())}
          >
            Rent
          </Link>
          <Link
            to="/lodging"
            className={cn("text-sm font-medium transition-colors hover:text-homebase-600", getTextColor())}
          >
            Lodging
          </Link>
          {!isMobile && (
            <a
              href="#"
              className={cn("text-sm font-medium transition-colors hover:text-homebase-600", getTextColor())}
            >
              About
            </a>
          )}
        </nav>

        <div className="flex items-center">
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
