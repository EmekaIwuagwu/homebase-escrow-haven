
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Bookings = () => {
  const upcomingBookings = [
    {
      id: 1,
      propertyName: "Mountain Retreat",
      location: "Aspen, Colorado",
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&q=80&w=1974",
      checkIn: "Dec 15, 2023",
      checkOut: "Dec 22, 2023",
      price: "950 HNBXZ",
      status: "Confirmed"
    },
    {
      id: 2,
      propertyName: "Beachfront Villa",
      location: "Malibu, California",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&q=80&w=2070",
      checkIn: "Jan 5, 2024",
      checkOut: "Jan 12, 2024",
      price: "1,200 HNBXZ",
      status: "Pending Payment"
    }
  ];

  const pastBookings = [
    {
      id: 3,
      propertyName: "Downtown Loft",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&q=80&w=1964",
      checkIn: "Oct 10, 2023",
      checkOut: "Oct 15, 2023",
      price: "750 HNBXZ",
      status: "Completed"
    },
    {
      id: 4,
      propertyName: "Lakeside Cabin",
      location: "Lake Tahoe, Nevada",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&q=80&w=2070",
      checkIn: "Aug 20, 2023",
      checkOut: "Aug 27, 2023",
      price: "825 HNBXZ",
      status: "Completed"
    }
  ];

  const BookingCard = ({ booking, isPast = false }) => (
    <Card key={booking.id} className="overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img 
          src={booking.image} 
          alt={booking.propertyName} 
          className="w-full h-full object-cover" 
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between">
          <div>
            <span className={`inline-block px-2 py-1 text-xs rounded ${
              booking.status === "Confirmed" ? "bg-green-100 text-green-700" :
              booking.status === "Pending Payment" ? "bg-yellow-100 text-yellow-700" :
              "bg-blue-100 text-blue-700"
            } mb-2`}>
              {booking.status}
            </span>
            <CardTitle className="text-lg">{booking.propertyName}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <p className="text-sm flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {booking.location}
        </p>
        <div className="flex justify-between text-sm mb-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{booking.checkIn}</span>
          </div>
          <span>→</span>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{booking.checkOut}</span>
          </div>
        </div>
        <p className="font-medium">{booking.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        {!isPast ? (
          <div className="flex gap-2 w-full">
            <Button variant="outline" size="sm" className="flex-1">Cancel</Button>
            <Button size="sm" className="flex-1">Manage</Button>
          </div>
        ) : (
          <div className="flex gap-2 w-full">
            <Button variant="outline" size="sm" className="flex-1">View Details</Button>
            <Button size="sm" className="flex-1">Book Again</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your upcoming and past stays</p>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} isPast={true} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookings;
