
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, MapPin, Bed, Bath, ArrowRight, SquareIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";

const Lodging = () => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: "",
    checkIn: "",
    checkOut: "",
  });

  const properties = [
    {
      id: "1",
      title: "Beachfront Villa with Private Pool",
      location: "789 Shoreline Blvd, Miami, FL",
      price: 950,
      type: "lodge" as const,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&q=80&w=1965",
      beds: 5,
      baths: 4,
      sqft: 3800,
      featured: true,
    },
    {
      id: "2",
      title: "Cozy Mountain Cabin with Hot Tub",
      location: "456 Pine Trail, Aspen, CO",
      price: 375,
      type: "lodge" as const,
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&q=80&w=1974",
      beds: 3,
      baths: 2,
      sqft: 1800,
      featured: true,
    },
    {
      id: "3",
      title: "Urban Loft in Historic District",
      location: "789 Heritage Row, New Orleans, LA",
      price: 225,
      type: "lodge" as const,
      image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&q=80&w=2071",
      beds: 2,
      baths: 2,
      sqft: 1200,
    },
    {
      id: "4",
      title: "Lakefront Cottage with Dock",
      location: "101 Tranquil Shores, Lake Tahoe, CA",
      price: 280,
      type: "lodge" as const,
      image: "https://images.unsplash.com/photo-1505916349660-8d91a99c3e23?auto=format&q=80&w=2070",
      beds: 3,
      baths: 1,
      sqft: 1500,
    },
    {
      id: "5",
      title: "Desert Oasis with Private Pool",
      location: "202 Cactus Road, Phoenix, AZ",
      price: 320,
      type: "lodge" as const,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&q=80&w=2070",
      beds: 4,
      baths: 3,
      sqft: 2200,
    },
    {
      id: "6",
      title: "Luxury Penthouse with City Views",
      location: "303 Skyline Drive, Chicago, IL",
      price: 550,
      type: "lodge" as const,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&q=80&w=2080",
      beds: 2,
      baths: 2,
      sqft: 1800,
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Getaway</h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              Browse our selection of short-term lodging options, with secure HanCoin (HNBXZ) payments and blockchain-verified reviews.
            </p>
            
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Check-in</label>
                  <input
                    type="date"
                    name="checkIn"
                    className="w-full px-4 py-2 border rounded-md"
                    value={filters.checkIn}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Check-out</label>
                  <input
                    type="date"
                    name="checkOut"
                    className="w-full px-4 py-2 border rounded-md"
                    value={filters.checkOut}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price/Night (Min)</label>
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
                  <label className="block text-sm font-medium mb-1">Price/Night (Max)</label>
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
                  Search Lodging
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Properties Grid */}
        <section className="py-12 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Available Lodging</h2>
            
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

export default Lodging;
