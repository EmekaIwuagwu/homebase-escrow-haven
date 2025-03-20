
import React from "react";
import { Button } from "@/components/ui/button";
import { Building, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MyProperties = () => {
  const properties = [
    { 
      id: 1, 
      title: "Downtown Condo", 
      type: "Owned", 
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&q=80&w=2070",
      address: "123 Main St, Downtown",
      price: "125,000 HNBXZ",
      status: "Listed for Sale"
    },
    { 
      id: 2, 
      title: "Beachfront Villa", 
      type: "Owned", 
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&q=80&w=2070",
      address: "456 Ocean Ave, Beachside",
      price: "350,000 HNBXZ",
      status: "Not Listed" 
    },
    { 
      id: 3, 
      title: "Mountain Retreat", 
      type: "Rented Out", 
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&q=80&w=1974",
      address: "789 Mountain View Rd",
      price: "2,500 HNBXZ/month",
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
            <div className="h-48 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105" 
              />
            </div>
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
