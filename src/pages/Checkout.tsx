
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  CheckCircle,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  Home
} from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/utils/formatters";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch property details by ID
    const fetchProperty = () => {
      setLoading(true);
      
      import("@/utils/propertyData").then(({ getAllProperties }) => {
        const allProperties = getAllProperties();
        const foundProperty = allProperties.find(p => p.id === id);
        
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          toast.error("Property not found");
          navigate("/");
        }
        
        setLoading(false);
      }).catch(error => {
        console.error("Failed to load property data:", error);
        toast.error("Failed to load property details");
        setLoading(false);
      });
    };
    
    fetchProperty();
  }, [id, navigate]);

  const handlePlaceOrder = () => {
    setProcessingPayment(true);
    
    // Simulate showing Han Wallet modal
    toast.info("Opening Han Wallet for payment confirmation...", {
      duration: 3000,
    });
    
    // Simulate payment processing
    setTimeout(() => {
      // Redirect to success page with order details
      const orderReference = `ORD-${Date.now().toString().substring(7)}`;
      navigate(`/order-success/${id}?ref=${orderReference}`);
    }, 3000);
  };

  const handleBackToDetails = () => {
    navigate(`/property/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-10 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-60 bg-gray-200 rounded mb-6"></div>
              <div className="h-40 bg-gray-200 rounded mb-6"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold">Property Not Found</h1>
            <p className="mt-4 mb-8">The property you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const typeLabel = {
    sale: "Purchase",
    rent: "Rental",
    lodge: "Booking",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBackToDetails}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to property details
          </button>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              {property.type === "sale" 
                ? "Complete your property purchase using HanCoin (HNXZ)"
                : property.type === "rent"
                  ? "Secure your rental property using HanCoin (HNXZ)"
                  : "Book your stay using HanCoin (HNXZ)"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                
                <div className="flex items-start mb-6">
                  <div className="w-20 h-20 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium mb-1">{property.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">{property.location}</p>
                    <div className="text-sm">
                      <span className="text-gray-500">Property ID:</span> HNBXZ-{property.id}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{typeLabel[property.type as keyof typeof typeLabel]} Price</span>
                    <span>{formatPrice(property.price)} HNXZ</span>
                  </div>
                  
                  {property.type === "sale" && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Escrow Fee (1%)</span>
                      <span>{formatPrice(property.price * 0.01)} HNXZ</span>
                    </div>
                  )}
                  
                  {property.type !== "sale" && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span>{formatPrice(property.price * 0.05)} HNXZ</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        {property.type === "sale" 
                          ? formatPrice(property.price * 1.01)
                          : formatPrice(property.price * 1.05)} HNXZ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <CreditCard className="w-5 h-5 text-homebase-500 mr-3" />
                  <div>
                    <p className="font-medium">Han Wallet</p>
                    <p className="text-sm text-gray-500">Pay using HanCoin (HNXZ)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
                <h2 className="text-lg font-bold mb-4">Transaction Details</h2>
                
                <div className="mb-4">
                  <div className="flex items-start mb-3">
                    <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Secure Escrow</p>
                      <p className="text-sm text-gray-500">
                        {property.type === "sale" 
                          ? "Your funds will be held in a secure smart contract escrow until property ownership is transferred."
                          : "Your payment is protected by our secure payment system."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-3">
                    <Home className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Property Verification</p>
                      <p className="text-sm text-gray-500">
                        All properties on HomeBase are verified for authenticity and legal compliance.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Blockchain Record</p>
                      <p className="text-sm text-gray-500">
                        Your transaction will be recorded on the blockchain for permanent proof of {property.type === "sale" ? "ownership" : property.type === "rent" ? "rental agreement" : "reservation"}.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Important Notice</p>
                      <p className="text-sm text-gray-700">
                        By proceeding with this transaction, you agree to HomeBase's terms and conditions regarding {property.type === "sale" ? "property purchases" : property.type === "rent" ? "property rentals" : "lodging reservations"}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handlePlaceOrder}
                className="w-full py-6 text-lg"
                disabled={processingPayment}
              >
                {processingPayment ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Complete ${property.type === "sale" ? "Purchase" : property.type === "rent" ? "Rental" : "Booking"}`
                )}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By clicking the button above, you'll be prompted to confirm the payment with your Han Wallet
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
