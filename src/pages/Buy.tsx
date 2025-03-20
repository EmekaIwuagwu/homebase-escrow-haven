
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, MapPin, Bed, Bath, ArrowRight, SquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";

const Buy = () => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: "",
  });

  const properties = [
    {
      id: "1",
      title: "Modern Apartment with Ocean View",
      location: "123 Coastal Drive, Malibu, CA",
      price: 2500000,
      type: "sale" as const,
      image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 2100,
      featured: true,
    },
    {
      id: "2",
      title: "Luxury Estate with Mountain Views",
      location: "456 Mountain Ridge, Aspen, CO",
      price: 4800000,
      type: "sale" as const,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&q=80&w=2070",
      beds: 5,
      baths: 4,
      sqft: 4500,
      featured: true,
    },
    {
      id: "3",
      title: "Downtown Penthouse Suite",
      location: "789 Urban Center, New York, NY",
      price: 3750000,
      type: "sale" as const,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&q=80&w=2053",
      beds: 3,
      baths: 3,
      sqft: 2800,
    },
    {
      id: "4",
      title: "Contemporary House with Pool",
      location: "101 Sunshine Blvd, Los Angeles, CA",
      price: 1950000,
      type: "sale" as const,
      image: "https://images.unsplash.com/photo-1629236815610-52dce72800ef?auto=format&q=80&w=2053",
      beds: 4,
      baths: 3,
      sqft: 3200,
    },
    {
      id: "5",
      title: "Waterfront Villa with Private Dock",
      location: "202 Harbor View, Miami, FL",
      price: 5200000,
      type: "sale" as const,
      image: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&q=80&w=2070",
      beds: 6,
      baths: 5,
      sqft: 5100,
    },
    {
      id: "6",
      title: "Historic Brownstone with Garden",
      location: "303 Heritage Row, Boston, MA",
      price: 2850000,
      type: "sale" as const,
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&q=80&w=2084",
      beds: 4,
      baths: 3,
      sqft: 3600,
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              Browse our exclusive collection of properties for sale, powered by Web3 technology for secure transactions using HanCoin (HNBXZ).
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
                <Button className="gap-2">
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
            <h2 className="text-2xl font-bold mb-8">Available Properties</h2>
            
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

export default Buy;
