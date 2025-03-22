
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PropertyCard from "./PropertyCard";
import { ChevronRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllProperties } from "@/utils/propertyData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string | null>(null);
  const [properties, setProperties] = useState(getAllProperties().filter(p => p.featured));
  const itemsPerPage = 8;
  
  // Get all properties and filter featured ones initially
  useEffect(() => {
    const allProperties = getAllProperties();
    setProperties(allProperties.filter(p => p.featured));
  }, []);
  
  // Apply type and property type filters if selected
  useEffect(() => {
    const allProperties = getAllProperties();
    let filteredProperties = allProperties.filter(p => p.featured);
    
    if (filterType) {
      filteredProperties = filteredProperties.filter(p => p.type === filterType);
    }
    
    if (propertyTypeFilter) {
      filteredProperties = filteredProperties.filter(p => p.propertyType === propertyTypeFilter);
    }
    
    setProperties(filteredProperties);
    setCurrentPage(1); // Reset to first page when filtering
  }, [filterType, propertyTypeFilter]);
  
  // Calculate pagination
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = properties.slice(startIndex, startIndex + itemsPerPage);
  
  const handleViewAll = () => {
    navigate("/buy");
  };
  
  const handleFilter = (type: string | null) => {
    setFilterType(type);
    setPropertyTypeFilter(null); // Reset property type filter when changing main filter
  };
  
  const handlePropertyTypeFilter = (type: string | null) => {
    setPropertyTypeFilter(type);
  };
  
  // Get unique property types for filtering
  const getUniquePropertyTypes = () => {
    const allProperties = getAllProperties().filter(p => p.featured);
    const filteredByType = filterType ? allProperties.filter(p => p.type === filterType) : allProperties;
    const propertyTypes = filteredByType.map(p => p.propertyType).filter(Boolean);
    return [...new Set(propertyTypes)];
  };

  return (
    <section className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Discover our handpicked selection of premium properties available for sale, 
              rent, or short-term lodging across top locations worldwide.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            <Button 
              variant={filterType === null ? "default" : "outline"} 
              className="mr-2"
              onClick={() => handleFilter(null)}
            >
              All
            </Button>
            <Button 
              variant={filterType === "sale" ? "default" : "outline"} 
              className="mr-2"
              onClick={() => handleFilter("sale")}
            >
              For Sale
            </Button>
            <Button 
              variant={filterType === "rent" ? "default" : "outline"} 
              className="mr-2"
              onClick={() => handleFilter("rent")}
            >
              For Rent
            </Button>
            <Button 
              variant={filterType === "lodge" ? "default" : "outline"} 
              className="mr-4"
              onClick={() => handleFilter("lodge")}
            >
              Lodging
            </Button>
            <Button className="gap-1" onClick={handleViewAll}>
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Property Type Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            variant={propertyTypeFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => handlePropertyTypeFilter(null)}
          >
            All Types
          </Button>
          {getUniquePropertyTypes().map((type) => (
            <Button
              key={type}
              variant={propertyTypeFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => handlePropertyTypeFilter(type)}
            >
              {type}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
