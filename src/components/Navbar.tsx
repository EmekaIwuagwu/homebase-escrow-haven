
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Home, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
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

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New property listing",
      message: "A new beachfront property was just listed in Miami.",
      time: "10 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Price drop alert",
      message: "A property you bookmarked has reduced its price by 10%.",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 3,
      title: "Booking confirmed",
      message: "Your stay at Mountain View Cabin has been confirmed.",
      time: "1 day ago",
      isRead: true,
    },
  ];

  // Mark notifications as read
  const markAsRead = () => {
    setHasUnreadNotifications(false);
  };

  // Mock search function
  const handleSearch = (value: string) => {
    if (!value) {
      setSearchResults([]);
      return;
    }

    // Mock search results based on input
    const results = [
      { id: 1, title: "Beachfront Villa", type: "property", path: "/property/1" },
      { id: 2, title: "Downtown Apartment", type: "property", path: "/property/2" },
      { id: 3, title: "Buy properties", type: "page", path: "/buy" },
      { id: 4, title: "Rent properties", type: "page", path: "/rent" },
      { id: 5, title: "Beach destinations", type: "category", path: "/search?category=beach" }
    ].filter(item => 
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    
    setSearchResults(results);
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

        <div className="flex items-center space-x-4">
          {!isMobile && (
            <>
              <button
                className={cn("hover:text-homebase-600 transition-colors", getTextColor())}
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn("hover:text-homebase-600 transition-colors relative", getTextColor())}
                    aria-label="Notifications"
                    onClick={markAsRead}
                  >
                    <Bell className="w-5 h-5" />
                    {hasUnreadNotifications && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-lg">Notifications</h3>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="divide-y">
                        {notifications.map((notification) => (
                          <div key={notification.id} className={cn(
                            "p-4 transition-colors hover:bg-muted/50",
                            !notification.isRead && "bg-muted/20"
                          )}>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <span className="text-xs text-muted-foreground mt-2 block">{notification.time}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t text-center">
                    <Button variant="link" className="text-xs w-full">
                      View all notifications
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
          <WalletConnect />
        </div>
      </div>

      {/* Search Command Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput 
          placeholder="Search for properties, locations..." 
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchResults.length > 0 && (
            <>
              <CommandGroup heading="Properties">
                {searchResults
                  .filter(result => result.type === "property")
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => {
                        window.location.href = result.path;
                        setIsSearchOpen(false);
                      }}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      {result.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandGroup heading="Pages">
                {searchResults
                  .filter(result => result.type === "page")
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => {
                        window.location.href = result.path;
                        setIsSearchOpen(false);
                      }}
                    >
                      {result.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandGroup heading="Categories">
                {searchResults
                  .filter(result => result.type === "category")
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => {
                        window.location.href = result.path;
                        setIsSearchOpen(false);
                      }}
                    >
                      {result.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
