
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, User, Calendar, Clock, Home, ExternalLink } from "lucide-react";
import { formatPrice } from "@/utils/formatters";

const OrderSuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Get reference number from URL query params
  const queryParams = new URLSearchParams(location.search);
  const referenceNumber = queryParams.get('ref') || 'ORD-12345678';
  
  useEffect(() => {
    // Fetch property details
    const fetchProperty = () => {
      setLoading(true);
      
      import("@/utils/propertyData").then(({ getPropertyById }) => {
        const foundProperty = getPropertyById(id || "");
        
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          navigate("/");
        }
        
        setLoading(false);
      }).catch(error => {
        console.error("Failed to load property data:", error);
        setLoading(false);
      });
    };
    
    fetchProperty();
  }, [id, navigate]);

  if (loading || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-20 w-full bg-gray-200 rounded mb-6"></div>
              <div className="h-40 bg-gray-200 rounded mb-6"></div>
              <div className="h-60 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const typeLabel = {
    sale: "purchase",
    rent: "rental agreement",
    lodge: "booking",
  };

  const handleNavigateHome = () => {
    navigate("/");
  };
  
  const handleNavigateToUser = () => {
    if (property.type === "lodge") {
      navigate("/dashboard/bookings");
    } else if (property.type === "sale") {
      navigate("/dashboard/properties");
    } else if (property.type === "rent") {
      navigate("/dashboard/rentals");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">
              {property.type === "sale" 
                ? "Purchase Successful!"
                : property.type === "rent"
                  ? "Rental Confirmed!"
                  : "Booking Confirmed!"}
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Your {typeLabel[property.type as keyof typeof typeLabel]} has been confirmed and recorded on the blockchain. 
              Thank you for using HomeBase!
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-8">
            <div className="flex justify-between items-center pb-6 border-b border-gray-100 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Reference Number</p>
                <p className="font-bold text-lg">{referenceNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Transaction Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Property</p>
                <p className="font-medium">{property.title}</p>
                <p className="text-sm text-gray-600">{property.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Property ID</p>
                <p className="font-medium">HNXZ-{property.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Transaction Type</p>
                <p className="font-medium capitalize">{property.type}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                  <p className="font-bold text-lg">
                    {property.type === "sale" 
                      ? formatPrice(property.price * 1.01)
                      : formatPrice(property.price * 1.05)} HNXZ
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="font-medium">Han Wallet</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Blockchain Confirmation</p>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    View on Explorer
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-4">Owner Information</h3>
              <div className="flex items-start">
                <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Property Owner</p>
                  <p className="text-sm text-gray-600 mb-1">Verified HomeBase User</p>
                  <p className="text-sm text-gray-500">Wallet: 0x123...789</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleNavigateHome} variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            {property.type === "lodge" && (
              <Button onClick={handleNavigateToUser}>
                <Calendar className="w-4 h-4 mr-2" />
                View Your Bookings
              </Button>
            )}
            {property.type === "sale" && (
              <Button onClick={handleNavigateToUser}>
                <CheckCircle className="w-4 h-4 mr-2" />
                View Your Properties
              </Button>
            )}
            {property.type === "rent" && (
              <Button onClick={handleNavigateToUser}>
                <Clock className="w-4 h-4 mr-2" />
                View Your Rentals
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
