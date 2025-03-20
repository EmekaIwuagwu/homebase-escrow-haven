
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const PropertyCardGallery = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative h-48 overflow-hidden">
      <Carousel 
        className="w-full h-full"
        onSelect={(api) => {
          const selected = api?.selectedScrollSnap();
          if (selected !== undefined) {
            setCurrentIndex(selected);
          }
        }}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <img 
                src={image} 
                alt={`${title} - Image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 h-7 w-7" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 h-7 w-7" />
      </Carousel>
      
      {images.length > 1 && (
        <div className="absolute bottom-2 right-2 bg-black/40 text-white px-2 py-0.5 rounded-full text-xs">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

const MyProperties = () => {
  const properties = [
    { 
      id: 1, 
      title: "Downtown Condo", 
      type: "Owned", 
      images: [
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&q=80&w=2070",
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&q=80&w=1200",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&q=80&w=1200",
      ],
      address: "123 Main St, Downtown",
      price: "125,000 HNXZ",
      status: "Listed for Sale"
    },
    { 
      id: 2, 
      title: "Beachfront Villa", 
      type: "Owned", 
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&q=80&w=2070",
        "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?auto=format&q=80&w=1200",
        "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&q=80&w=1200",
      ],
      address: "456 Ocean Ave, Beachside",
      price: "350,000 HNXZ",
      status: "Not Listed" 
    },
    { 
      id: 3, 
      title: "Mountain Retreat", 
      type: "Rented Out", 
      images: [
        "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&q=80&w=1974",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&q=80&w=1200",
        "https://images.unsplash.com/photo-1551927411-95e412943b58?auto=format&q=80&w=1200",
      ],
      address: "789 Mountain View Rd",
      price: "2,500 HNXZ/month",
      status: "Tenant occupied until 12/2023"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Properties</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your owned and rented properties</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <Card key={property.id} className="overflow-hidden">
            <PropertyCardGallery images={property.images} title={property.title} />
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-2 py-1 text-xs rounded bg-homebase-100 text-homebase-600 mb-2">
                    {property.type}
                  </span>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <p className="text-sm text-gray-500">{property.address}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Current Value</p>
                  <p className="font-semibold">{property.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-homebase-600">{property.status}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button size="sm" className="flex-1">Manage</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
