
import React from "react";
import { Button } from "@/components/ui/button";
import PropertyCard from "./PropertyCard";
import { ChevronRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  
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
      title: "Downtown Luxury Condo",
      location: "456 Urban Ave, New York, NY",
      price: 8500,
      type: "rent" as const,
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1500,
      featured: true,
    },
    {
      id: "3",
      title: "Beachfront Villa with Private Pool",
      location: "789 Shoreline Blvd, Miami, FL",
      price: 950,
      type: "lodge" as const,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&q=80&w=1965",
      beds: 5,
      baths: 4,
      sqft: 3800,
    },
    {
      id: "4",
      title: "Mountain Retreat Cabin",
      location: "101 Alpine Way, Aspen, CO",
      price: 1250000,
      type: "sale" as const,
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&q=80&w=1974",
      beds: 3,
      baths: 2,
      sqft: 1800,
    },
  ];

  const handleViewAll = () => {
    navigate("/buy");
  };

  return (
    <section className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Discover our handpicked selection of premium properties available for sale, 
              rent, or short-term lodging across top locations.
            </p>
          </div>
          <div className="flex mt-6 md:mt-0">
            <Button variant="outline" className="mr-4">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button className="gap-1" onClick={handleViewAll}>
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="animate-slideUp" style={{ animationDelay: `${parseInt(property.id) * 100}ms` }}>
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
