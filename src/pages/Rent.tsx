
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, MapPin, Bed, Bath, ArrowRight, SquareIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";

const Rent = () => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: "",
    moveInDate: "",
  });

  const properties = [
    {
      id: "1",
      title: "Luxury Apartment with City View",
      location: "123 Downtown Ave, New York, NY",
      price: 3500,
      type: "rent",
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1200,
      featured: true,
    },
    {
      id: "2",
      title: "Modern Townhouse with Garage",
      location: "456 Suburban St, Chicago, IL",
      price: 2800,
      type: "rent",
      image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      featured: true,
    },
    {
      id: "3",
      title: "Studio in Arts District",
      location: "789 Creative Blvd, Los Angeles, CA",
      price: 1950,
      type: "rent",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&q=80&w=2070",
      beds: 1,
      baths: 1,
      sqft: 750,
    },
    {
      id: "4",
      title: "Waterfront Condo with Balcony",
      location: "101 Harbor View, Seattle, WA",
      price: 3200,
      type: "rent",
      image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1100,
    },
    {
      id: "5",
      title: "Sunny Garden Apartment",
      location: "202 Green Space, Austin, TX",
      price: 1700,
      type: "rent",
      image: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&q=80&w=2070",
      beds: 1,
      baths: 1,
      sqft: 850,
    },
    {
      id: "6",
      title: "Penthouse with Rooftop Access",
      location: "303 Sky High, Miami, FL",
      price: 4500,
      type: "rent",
      image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&q=80&w=2070",
      beds: 3,
      baths: 3,
      sqft: 2000,
    },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-12 px-6 md:px-10 bg-gradient-to-r from-homebase-50 to-homebase-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Rental</h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              Browse our curated collection of rental properties, with secure HanCoin (HNBXZ) payments and blockchain-backed leases.
            </p>
            
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Rent (Min)</label>
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Rent"
                    className="w-full px-4 py-2 border rounded-md"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Rent (Max)</label>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Rent"
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
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Move-in Date</label>
                  <input
                    type="date"
                    name="moveInDate"
                    className="w-full px-4 py-2 border rounded-md"
                    value={filters.moveInDate}
                    onChange={handleFilterChange}
                  />
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
                <Button className="gap-2">
                  Search Rentals
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Properties Grid */}
        <section className="py-12 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Available Rentals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="animate-slideUp" style={{ animationDelay: `${parseInt(property.id) * 50}ms` }}>
                  <PropertyCard {...property} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rent;
