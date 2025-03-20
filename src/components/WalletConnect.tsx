
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wallet, ChevronDown, Check, LogOut, CreditCard } from "lucide-react";
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
  const { isConnected, isConnecting, walletAddress, selectedWalletType, connectWallet, disconnectWallet } = useWallet();
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
    navigate("/dashboard");
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
            Dashboard
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;
