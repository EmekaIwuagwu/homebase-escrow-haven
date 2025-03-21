
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

const Hero = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("buy");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleSearch = () => {
    if (!searchLocation.trim()) {
      toast.error("Please enter a location to search");
      return;
    }
    
    // For lodging properties, verify date range is set
    if (searchType === "lodge" && (!dateRange?.from || !dateRange?.to)) {
      toast.error("Please select check-in and check-out dates for lodging");
      return;
    }
    
    let path = "";
    switch (searchType) {
      case "buy":
        path = "/buy";
        break;
      case "rent":
        path = "/rent";
        break;
      case "lodge":
        path = "/lodging";
        break;
      default:
        path = "/buy";
    }
    
    // Navigate with the appropriate query parameters
    let queryParams = `location=${encodeURIComponent(searchLocation)}`;
    
    // Add date range for lodging
    if (searchType === "lodge" && dateRange?.from && dateRange?.to) {
      queryParams += `&from=${dateRange.from.toISOString()}&to=${dateRange.to.toISOString()}`;
    }
    
    navigate(`${path}?${queryParams}`);
  };

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&q=80&w=2070')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-homebase-900/80 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="animate-slideDown">
          <div className="inline-block mb-3 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-medium">
            Web3-Powered Real Estate Platform
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl mb-6 leading-tight">
            Find Your Dream Home in the Digital Era
          </h1>
          <p className="text-lg text-white/80 max-w-xl mb-8">
            Buy, sell, rent, and lodge properties using HanCoin (HNXZ) with our secure blockchain-based platform.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl animate-slideUp">
          <div className="bg-white/10 backdrop-blur-xl p-2 rounded-xl border border-white/20">
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              {/* Location Input */}
              <div className="w-full bg-white/20 rounded-lg px-4 py-3">
                <label className="block text-white/60 text-xs mb-1">Location</label>
                <input
                  type="text"
                  placeholder="City, neighborhood, or address"
                  className="w-full bg-transparent text-white border-none outline-none text-sm"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              
              {/* Type Selector */}
              <div className="w-full md:w-40 bg-white/20 rounded-lg px-4 py-3">
                <label className="block text-white/60 text-xs mb-1">Type</label>
                <select 
                  className="w-full bg-transparent text-white border-none outline-none text-sm appearance-none"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="buy" className="text-gray-900">Buy</option>
                  <option value="rent" className="text-gray-900">Rent</option>
                  <option value="lodge" className="text-gray-900">Lodge</option>
                </select>
              </div>
              
              {/* Date Range Picker for Lodging */}
              {searchType === "lodge" && (
                <div className="w-full bg-white/20 rounded-lg px-4 py-3">
                  <label className="block text-white/60 text-xs mb-1">Dates</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-left font-normal border-none p-0 h-auto text-white hover:bg-transparent hover:text-white"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <span>
                              {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                            </span>
                          ) : (
                            format(dateRange.from, "MMM d, yyyy")
                          )
                        ) : (
                          <span>Select dates</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white pointer-events-auto" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={new Date()}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              {/* Search Button - Better Proportions */}
              <Button 
                className="w-full md:w-auto md:h-[46px] whitespace-nowrap px-5 md:self-end md:mb-0 bg-homebase-600/95 hover:bg-homebase-700 text-white rounded-lg transition-colors duration-200 border-none shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center mt-16 space-x-8 animate-slideUp">
          <div>
            <p className="text-white/70 text-sm">Properties</p>
            <p className="text-white text-2xl font-bold">2,500+</p>
          </div>
          <div className="h-10 w-px bg-white/20"></div>
          <div>
            <p className="text-white/70 text-sm">Users</p>
            <p className="text-white text-2xl font-bold">10,000+</p>
          </div>
          <div className="h-10 w-px bg-white/20"></div>
          <div>
            <p className="text-white/70 text-sm">Transactions</p>
            <p className="text-white text-2xl font-bold">35,000+</p>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
