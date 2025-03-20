
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Hero = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("buy");

  const handleSearch = () => {
    if (!searchLocation.trim()) {
      toast.error("Please enter a location to search");
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
    
    // Navigate to the appropriate page with the search location as a query parameter
    navigate(`${path}?location=${encodeURIComponent(searchLocation)}`);
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
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
              <div className="w-full md:flex-1 bg-white/20 rounded-lg px-4 py-3">
                <label className="block text-white/60 text-xs mb-1">Location</label>
                <input
                  type="text"
                  placeholder="City, neighborhood, or address"
                  className="w-full bg-transparent text-white border-none outline-none text-sm"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
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
              <Button 
                className="w-full md:w-auto whitespace-nowrap px-6"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
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
