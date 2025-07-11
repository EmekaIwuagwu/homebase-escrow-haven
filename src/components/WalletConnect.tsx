
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wallet, ChevronDown, Check, LogOut, CreditCard, Building, Home } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";

const WalletConnect = () => {
  const [showWalletSelect, setShowWalletSelect] = useState(false);
  const { isConnected, isConnecting, walletAddress, selectedWalletType, userRole, connectWallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleOpenWalletSelect = () => {
    if (!isConnected) {
      setShowWalletSelect(true);
    }
  };

  const handleConnectWallet = async (walletType: string) => {
    setShowWalletSelect(false);
    await connectWallet(walletType);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/'); // Redirect to homepage on disconnect
  };

  const navigateToDashboard = () => {
    if (userRole === "landlord") {
      navigate("/landlord");
    } else if (userRole === "seller") {
      navigate("/seller");
    } else {
      navigate("/dashboard");
    }
  };

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-slate-200">
            <Wallet className="h-4 w-4" />
            <span className="text-sm font-medium">{walletAddress}</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 animate-fadeIn">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Check className="mr-2 h-4 w-4" />
            <span>Connected with {selectedWalletType}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={navigateToDashboard}>
            {userRole === "landlord" ? (
              <>
                <Building className="mr-2 h-4 w-4" />
                Landlord Dashboard
              </>
            ) : userRole === "seller" ? (
              <>
                <Home className="mr-2 h-4 w-4" />
                Seller Dashboard
              </>
            ) : (
              <>Dashboard</>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/buy")}>
            Buy Properties
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/rent")}>
            Rent Properties
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/lodging")}>
            Find Lodging
          </DropdownMenuItem>
          {!userRole && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/landlord-login")}>
                <Building className="mr-2 h-4 w-4" />
                Landlord Login
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/seller-login")}>
                <Home className="mr-2 h-4 w-4" />
                Seller Login
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500" onClick={handleDisconnect}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        onClick={handleOpenWalletSelect}
        disabled={isConnecting}
        className={cn(
          "relative overflow-hidden transition-all flex items-center",
          isConnecting && "opacity-80"
        )}
      >
        {isConnecting ? (
          <>
            <span className="animate-pulse">Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            <span>Connect Wallet</span>
          </>
        )}
      </Button>

      <Dialog open={showWalletSelect} onOpenChange={setShowWalletSelect}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription>
              Select a wallet provider to continue
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 py-6"
              onClick={() => handleConnectWallet("Han Wallet")}
            >
              <Wallet className="h-5 w-5" />
              Han Wallet
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 py-6"
              onClick={() => handleConnectWallet("MetaWallet")}
            >
              <CreditCard className="h-5 w-5" />
              MetaWallet
            </Button>
          </div>
          
          <div className="mt-4">
            <DropdownMenuSeparator />
            <div className="pt-4 flex flex-col gap-2">
              <p className="text-sm text-center mb-2">Are you a landlord or property seller?</p>
              <Button variant="outline" onClick={() => navigate("/landlord-login")}>
                <Building className="mr-2 h-4 w-4" />
                Landlord Login
              </Button>
              <Button variant="outline" onClick={() => navigate("/seller-login")}>
                <Home className="mr-2 h-4 w-4" />
                Seller Login
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;
