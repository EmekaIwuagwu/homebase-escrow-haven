
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type WalletContextType = {
  isConnected: boolean;
  isConnecting: boolean;
  walletAddress: string | null;
  selectedWalletType: string | null;
  connectWallet: (walletType: string) => Promise<void>;
  disconnectWallet: () => void;
};

const defaultContext: WalletContextType = {
  isConnected: false,
  isConnecting: false,
  walletAddress: null,
  selectedWalletType: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [selectedWalletType, setSelectedWalletType] = useState<string | null>(null);

  // Load wallet state from localStorage on initial render
  useEffect(() => {
    const savedWalletState = localStorage.getItem("walletState");
    if (savedWalletState) {
      try {
        const parsedState = JSON.parse(savedWalletState);
        setIsConnected(parsedState.isConnected);
        setWalletAddress(parsedState.walletAddress);
        setSelectedWalletType(parsedState.selectedWalletType);
      } catch (error) {
        console.error("Failed to parse saved wallet state:", error);
        localStorage.removeItem("walletState");
      }
    }
  }, []);

  // Save wallet state to localStorage whenever it changes
  useEffect(() => {
    if (isConnected && walletAddress) {
      localStorage.setItem("walletState", JSON.stringify({
        isConnected,
        walletAddress,
        selectedWalletType,
      }));
    } else {
      localStorage.removeItem("walletState");
    }
  }, [isConnected, walletAddress, selectedWalletType]);

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      // In a real implementation, this would interact with the wallet provider's API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAddress = walletType === "Han Wallet" 
        ? "0x1234...5678" 
        : "0x9ABC...DEF0";
      
      setIsConnected(true);
      setWalletAddress(mockAddress);
      setSelectedWalletType(walletType);
      
      toast.success(`${walletType} connected successfully`);
    } catch (error) {
      console.error("Wallet connection failed:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setSelectedWalletType(null);
    localStorage.removeItem("walletState");
    toast.info("Wallet disconnected");
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        isConnecting,
        walletAddress,
        selectedWalletType,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
