
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Users, Phone, Clock, Clipboard, ArrowLeft, Home } from "lucide-react";
import { toast } from "sonner";

const ManageBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  const [imageError, setImageError] = useState(false);
  const [specialRequests, setSpecialRequests] = useState(booking?.specialRequests || "");
  const [contactPhone, setContactPhone] = useState(booking?.contactPhone || "");
  const [guestCount, setGuestCount] = useState(booking?.guestCount || 1);

  // Fallback image if the original one fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&q=80&w=1200";

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Booking not found</h2>
        <p className="text-gray-500 mb-6">The booking you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const handleUpdateBooking = () => {
    // In a real app, this would send updates to an API
    toast.success("Booking details updated successfully");
    
    // Update the booking in state (in a real app this would be persistent)
    const updatedBooking = {
      ...booking,
      specialRequests,
      contactPhone,
      guestCount
    };
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          className="mr-4"
          onClick={handleBackToDashboard}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Manage Booking</h1>
          <p className="text-gray-500">Review and update your reservation details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Summary Card */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{booking.propertyName}</CardTitle>
                  <CardDescription className="flex items-center text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.location}
                  </CardDescription>
                </div>
                <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                  booking.status === "Confirmed" ? "bg-green-100 text-green-700" :
                  booking.status === "Pending Payment" ? "bg-yellow-100 text-yellow-700" :
                  "bg-blue-100 text-blue-700"
                }`}>
                  {booking.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={imageError ? fallbackImage : booking.image} 
                  alt={booking.propertyName} 
                  className="w-full h-64 object-cover rounded-lg"
                  onError={() => setImageError(true)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Check-in</h3>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{booking.checkIn}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Check-out</h3>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{booking.checkOut}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Information</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                  <span className="font-medium">{booking.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Payment Status</span>
                  <span className={`${
                    booking.status === "Confirmed" ? "text-green-600" :
                    booking.status === "Pending Payment" ? "text-yellow-600" :
                    "text-blue-600"
                  }`}>
                    {booking.status === "Pending Payment" ? "Pending" : "Paid"}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-4">Editable Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <div className="flex items-center mt-1">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <Input 
                        id="guests" 
                        type="number" 
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        min={1}
                        max={10}
                        className="max-w-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Contact Phone</Label>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <Input 
                        id="phone" 
                        type="text" 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Your contact number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="special-requests">Special Requests</Label>
                    <div className="flex mt-1">
                      <Clipboard className="h-4 w-4 mr-2 text-gray-500 mt-2" />
                      <Textarea 
                        id="special-requests" 
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any special requests or notes for your stay"
                        rows={3}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-6">
              <div className="flex gap-4 w-full">
                <Button variant="outline" className="flex-1" onClick={handleBackToDashboard}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleUpdateBooking}>
                  Update Booking
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Contact Property</h4>
                  <p className="text-sm text-gray-500">Need to speak with the property directly? Contact them for immediate assistance.</p>
                  <Button variant="outline" className="mt-2 w-full">
                    Contact Property
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Cancellation Policy</h4>
                  <p className="text-sm text-gray-500">Free cancellation until 48 hours before check-in. After that, a fee may apply.</p>
                  <Button variant="outline" className="mt-2 w-full">
                    View Full Policy
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-sm mb-1">View Property Details</h4>
                  <p className="text-sm text-gray-500">Check out more information about your booked property.</p>
                  <Button 
                    variant="outline" 
                    className="mt-2 w-full"
                    onClick={() => navigate(`/property/${booking.propertyId}`)}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    View Property
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
