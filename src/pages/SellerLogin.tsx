
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SellerLogin = () => {
  const navigate = useNavigate();
  const { isConnected, isConnecting, connectWallet, walletAddress } = useWallet();
  const [showConnect, setShowConnect] = useState(false);

  useEffect(() => {
    // If already connected, redirect to dashboard
    if (isConnected && walletAddress) {
      navigate("/seller");
    }
  }, [isConnected, walletAddress, navigate]);

  const handleConnectWallet = async (walletType: string) => {
    await connectWallet(walletType);
    // Will redirect to seller dashboard via the useEffect above when connected
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Property Seller Portal</CardTitle>
            <CardDescription>Connect your wallet to manage your properties for sale</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showConnect ? (
              <Button 
                onClick={() => setShowConnect(true)} 
                className="w-full py-6"
                disabled={isConnecting}
              >
                <Wallet className="mr-2 h-5 w-5" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            ) : (
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleConnectWallet("Han Wallet")}
                  className="w-full py-6 justify-start gap-2"
                  disabled={isConnecting}
                >
                  <Wallet className="h-5 w-5" />
                  Connect with Han Wallet
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleConnectWallet("MetaWallet")}
                  className="w-full py-6 justify-start gap-2"
                  disabled={isConnecting}
                >
                  <Wallet className="h-5 w-5" />
                  Connect with MetaWallet
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-500">
            <p>You need to connect your wallet to access the seller dashboard</p>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SellerLogin;
