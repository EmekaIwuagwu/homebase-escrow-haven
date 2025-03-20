
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wallet, ChevronDown, Check, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const walletAddress = "0x1234...5678";
  const navigate = useNavigate();

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast.success("Wallet connected successfully");
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.info("Wallet disconnected");
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
            <span>Connected</span>
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
    <Button
      onClick={handleConnect}
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
  );
};

export default WalletConnect;
