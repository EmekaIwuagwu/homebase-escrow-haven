
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, MapPin, Bed, Bath, ArrowRight, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { getAllProperties, getPropertiesByLocation, getPropertiesByType } from "@/utils/propertyData";
import { toast } from "sonner";

const Buy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get('location') || '';

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: searchLocation,
  });
  
  const [properties, setProperties] = useState(getPropertiesByType("sale"));
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    // If a location was specified in the URL, filter properties
    if (searchLocation) {
      const locationResults = getPropertiesByLocation(searchLocation).filter(p => p.type === "sale");
      
      if (locationResults.length > 0) {
        setFilteredProperties(locationResults);
        toast.success(`Found ${locationResults.length} properties in ${searchLocation}`);
      } else {
        setFilteredProperties([]);
        toast.info(`No properties found in ${searchLocation}. Showing all available properties.`);
      }
    } else {
      setFilteredProperties(properties);
    }
  }, [searchLocation, properties]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let results = [...properties];
    
    // Filter by location if specified
    if (filters.location) {
      results = results.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Filter by min price if specified
    if (filters.minPrice) {
      results = results.filter(property => 
        property.price >= Number(filters.minPrice)
      );
    }
    
    // Filter by max price if specified
    if (filters.maxPrice) {
      results = results.filter(property => 
        property.price <= Number(filters.maxPrice)
      );
    }
    
    // Filter by number of bedrooms if specified
    if (filters.bedrooms) {
      results = results.filter(property => 
        property.beds >= Number(filters.bedrooms)
      );
    }
    
    setFilteredProperties(results);
    
    // Show toast with results
    if (results.length === 0) {
      toast.info("No properties match your filters. Try adjusting your criteria.");
    } else {
      toast.success(`Found ${results.length} properties matching your criteria`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-12 px-6 md:px-10 bg-gradient-to-r from-homebase-50 to-homebase-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              Browse our exclusive collection of properties for sale, powered by Web3 technology for secure transactions using HanCoin (HNXZ).
            </p>
            
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price Range (Min)</label>
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    className="w-full px-4 py-2 border rounded-md"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price Range (Max)</label>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    className="w-full px-4 py-2 border rounded-md"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bedrooms</label>
                  <select
                    name="bedrooms"
                    className="w-full px-4 py-2 border rounded-md"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City, State, or ZIP"
                    className="w-full px-4 py-2 border rounded-md"
                    value={filters.location}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="gap-2" onClick={applyFilters}>
                  Search Properties
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Properties Grid */}
        <section className="py-12 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Available Properties</h2>
              <div className="text-gray-600">
                {filteredProperties.length} properties found
              </div>
            </div>
            
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="animate-slideUp" style={{ animationDelay: `${parseInt(property.id) * 50}ms` }}>
                    <PropertyCard {...property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Building className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No properties found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search filters or exploring another location.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilters({
                      minPrice: "",
                      maxPrice: "",
                      bedrooms: "",
                      location: "",
                    });
                    setFilteredProperties(properties);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Buy;
