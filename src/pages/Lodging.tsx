
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, MapPin, Bed, Bath, ArrowRight, SquareIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { getPropertiesByType } from "@/utils/propertyData";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Lodging = () => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: "",
    checkIn: "",
    checkOut: "",
  });

  const [properties, setProperties] = useState(getPropertiesByType("lodge"));
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Load properties on component mount
  useEffect(() => {
    const lodgeProperties = getPropertiesByType("lodge");
    setProperties(lodgeProperties);
    setFilteredProperties(lodgeProperties);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
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
    setCurrentPage(1); // Reset to first page when filtering
    
    // Show toast with results
    if (results.length === 0) {
      toast.info("No properties match your filters. Try adjusting your criteria.");
    } else {
      toast.success(`Found ${results.length} lodging options matching your criteria`);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

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
                <Button className="gap-2" onClick={handleSearch}>
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
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Available Lodging</h2>
              <div className="text-gray-600">
                {filteredProperties.length} properties found
              </div>
            </div>
            
            {filteredProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map((property) => (
                    <div key={property.id} className="animate-slideUp" style={{ animationDelay: `${parseInt(property.id) * 50}ms` }}>
                      <PropertyCard {...property} />
                    </div>
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination className="mt-10">
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                        </PaginationItem>
                      )}
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => page === 1 || page === totalPages || 
                                (page >= currentPage - 1 && page <= currentPage + 1))
                        .map((page, index, array) => {
                          // Add ellipsis where needed
                          if (index > 0 && array[index - 1] !== page - 1) {
                            return (
                              <React.Fragment key={`ellipsis-${page}`}>
                                <PaginationItem>
                                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                                </PaginationItem>
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    isActive={currentPage === page}
                                    onClick={() => setCurrentPage(page)}
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              </React.Fragment>
                            );
                          }
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Building className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No lodging options found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search filters or exploring another location.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilters({
                      minPrice: "",
                      maxPrice: "",
                      bedrooms: "",
                      location: "",
                      checkIn: "",
                      checkOut: "",
                    });
                    setFilteredProperties(properties);
                    setCurrentPage(1);
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

export default Lodging;
