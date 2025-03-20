
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
  Home,
  Wallet
} from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/utils/formatters";
import { useWallet } from "@/contexts/WalletContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";

// EscrowInfoModal component
const EscrowInfoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  property: any;
  totalAmount: number;
}> = ({ isOpen, onClose, onConfirm, property, totalAmount }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Secure Escrow Information</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-center font-semibold mb-2">Total Amount</p>
            <p className="text-center text-xl font-bold text-homebase-600">
              {formatPrice(totalAmount)} HNXZ
            </p>
            <p className="text-center text-sm text-gray-500 mt-1">
              Via Secure Escrow
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">How Escrow Works</p>
                <p className="text-sm text-gray-600">
                  Your funds will be held in a secure smart contract until all conditions of the 
                  {property.type === "sale" ? " property transfer are met" : " transaction are completed"}. 
                  This protects both you and the property owner.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-homebase-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Transaction Flow</p>
                <p className="text-sm text-gray-600">
                  1. Your funds are locked in the smart contract<br />
                  2. The transaction terms are verified by the system<br />
                  3. Once all conditions are met, funds are released to the seller
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Escrow Fees</p>
                <p className="text-sm text-gray-600">
                  There is a {property.type === "sale" ? "1%" : "5%"} escrow fee that covers transaction verification, 
                  smart contract deployment, and secure fund management throughout the process.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Enhanced Security</p>
                <p className="text-sm text-gray-700">
                  Escrow provides an additional layer of security for high-value real estate transactions. 
                  The smart contract cannot be tampered with and executes exactly as coded.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button onClick={onConfirm}>
              Proceed with Escrow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// WalletConfirmModal component
const WalletConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  property: any;
  totalAmount: number;
  walletType: string | null;
}> = ({ isOpen, onClose, onConfirm, property, totalAmount, walletType }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-center font-semibold mb-2">Total Amount</p>
            <p className="text-center text-xl font-bold text-homebase-600">
              {formatPrice(totalAmount)} HNXZ
            </p>
            <p className="text-center text-sm text-gray-500 mt-1">
              Via HanCoin Direct
            </p>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              You're authorizing a payment of {formatPrice(totalAmount)} HNXZ for {property.title}.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button onClick={onConfirm}>
              Approve Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isConnected, selectedWalletType } = useWallet();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showEscrowDialog, setShowEscrowDialog] = useState(false);
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'escrow' | 'hancoin'>('hancoin');
  
  useEffect(() => {
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
    if (!isConnected) {
      toast.error("Please connect your wallet to complete this transaction");
      return;
    }
    
    setProcessingPayment(true);
    
    if (paymentMethod === 'escrow') {
      setShowEscrowDialog(true);
      toast.info("Opening escrow information...", { duration: 3000 });
    } else {
      setShowWalletDialog(true);
      toast.info(`Opening ${selectedWalletType} for payment confirmation...`, { duration: 3000 });
    }
  };

  const handleConfirmEscrow = () => {
    setShowEscrowDialog(false);
    
    setTimeout(() => {
      const orderReference = `ORD-${Date.now().toString().substring(7)}`;
      navigate(`/order-success/${id}?ref=${orderReference}&method=${paymentMethod}`);
    }, 1500);
  };

  const handleConfirmWalletPayment = () => {
    setShowWalletDialog(false);
    
    setTimeout(() => {
      const orderReference = `ORD-${Date.now().toString().substring(7)}`;
      navigate(`/order-success/${id}?ref=${orderReference}&method=${paymentMethod}`);
    }, 1500);
  };
  
  const handleCancelPayment = () => {
    setProcessingPayment(false);
    setShowEscrowDialog(false);
    setShowWalletDialog(false);
    toast.info("Payment cancelled", { duration: 3000 });
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

  const calculateTotal = () => {
    if (property.type === "sale") {
      return paymentMethod === "escrow" 
        ? property.price * 1.01  // 1% escrow fee
        : property.price * 1.005; // 0.5% HanCoin fee
    } else {
      return paymentMethod === "escrow"
        ? property.price * 1.05  // 5% service fee
        : property.price * 1.025; // 2.5% HanCoin fee
    }
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
                      <span className="text-gray-600">
                        {paymentMethod === "escrow" ? "Escrow Fee (1%)" : "HanCoin Fee (0.5%)"}
                      </span>
                      <span>
                        {formatPrice(property.price * (paymentMethod === "escrow" ? 0.01 : 0.005))} HNXZ
                      </span>
                    </div>
                  )}
                  
                  {property.type !== "sale" && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">
                        {paymentMethod === "escrow" ? "Service Fee (5%)" : "HanCoin Fee (2.5%)"}
                      </span>
                      <span>
                        {formatPrice(property.price * (paymentMethod === "escrow" ? 0.05 : 0.025))} HNXZ
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())} HNXZ</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={(value) => setPaymentMethod(value as 'escrow' | 'hancoin')}
                  className="gap-4"
                >
                  <label className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer">
                    <RadioGroupItem value="hancoin" id="hancoin" className="mr-3" />
                    <div className="flex items-center">
                      <Wallet className="w-5 h-5 text-homebase-500 mr-3" />
                      <div>
                        <p className="font-medium">HanCoin Direct</p>
                        <p className="text-sm text-gray-500">Lower fees, faster processing</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer">
                    <RadioGroupItem value="escrow" id="escrow" className="mr-3" />
                    <div className="flex items-center">
                      <ShieldCheck className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">Secure Escrow</p>
                        <p className="text-sm text-gray-500">Additional protection, higher fees</p>
                      </div>
                    </div>
                  </label>
                </RadioGroup>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
                <h2 className="text-lg font-bold mb-4">Transaction Details</h2>
                
                <div className="mb-4">
                  <div className="flex items-start mb-3">
                    <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Secure {paymentMethod === "escrow" ? "Escrow" : "Transaction"}</p>
                      <p className="text-sm text-gray-500">
                        {paymentMethod === "escrow" 
                          ? `Your funds will be held in a secure smart contract escrow until ${property.type === "sale" 
                              ? "property ownership is transferred"
                              : "your transaction is completed"}.`
                          : "Your payment is processed directly through the HanCoin network for faster settlement."}
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
                By clicking the button above, you'll be prompted to {paymentMethod === "escrow" ? "review escrow details" : `confirm the payment with your ${selectedWalletType || "wallet"}`}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Escrow Information Modal */}
      <EscrowInfoModal 
        isOpen={showEscrowDialog}
        onClose={handleCancelPayment}
        onConfirm={handleConfirmEscrow}
        property={property || {}}
        totalAmount={property ? calculateTotal() : 0}
      />
      
      {/* Wallet Confirmation Modal */}
      <WalletConfirmModal 
        isOpen={showWalletDialog}
        onClose={handleCancelPayment}
        onConfirm={handleConfirmWalletPayment}
        property={property || {}}
        totalAmount={property ? calculateTotal() : 0}
        walletType={selectedWalletType}
      />
      
      <Footer />
    </div>
  );
};

export default Checkout;
