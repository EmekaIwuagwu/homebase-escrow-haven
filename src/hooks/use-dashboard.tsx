
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";

interface DashboardStats {
  totalProperties: number;
  revenue: number;
  propertyViews: number;
  occupancyRate: number;
}

interface TransactionData {
  id: string;
  type: string;
  property: string;
  amount: string;
  date: string;
  status: string;
}

export function useDashboard(type: 'user' | 'landlord' | 'seller' = 'user') {
  const navigate = useNavigate();
  const { isConnected, walletAddress } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    revenue: 0,
    propertyViews: 0,
    occupancyRate: 0
  });
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
    // Redirect to home if wallet is not connected
    if (!isConnected) {
      navigate('/');
      return;
    }

    // Simulate loading dashboard data
    setIsLoading(true);
    
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      // Mock different stats based on dashboard type
      if (type === 'landlord') {
        setStats({
          totalProperties: 12,
          revenue: 45231,
          propertyViews: 2354,
          occupancyRate: 84
        });
        
        setTransactions([
          { 
            id: "TX-2001", 
            type: "Rental Income", 
            property: "Luxury Apartment", 
            amount: "+2,500 HNXZ", 
            date: "2023-06-15",
            status: "Completed" 
          },
          { 
            id: "TX-2002", 
            type: "Rental Income", 
            property: "Downtown Condo", 
            amount: "+3,100 HNXZ", 
            date: "2023-05-22",
            status: "Completed" 
          }
        ]);
      } else if (type === 'seller') {
        setStats({
          totalProperties: 8,
          revenue: 2450000,
          propertyViews: 5672,
          occupancyRate: 100
        });
        
        setTransactions([
          { 
            id: "TX-3001", 
            type: "Property Sale", 
            property: "Beachfront Villa", 
            amount: "+350,000 HNXZ", 
            date: "2023-04-18",
            status: "Completed" 
          },
          { 
            id: "TX-3002", 
            type: "Property Sale", 
            property: "Urban Loft", 
            amount: "+175,000 HNXZ", 
            date: "2023-02-15",
            status: "Completed" 
          }
        ]);
      } else {
        // User dashboard
        setStats({
          totalProperties: 3,
          revenue: 12450,
          propertyViews: 0,
          occupancyRate: 0
        });
        
        setTransactions([
          { 
            id: "TX-1001", 
            type: "Rental Payment", 
            property: "Luxury Apartment", 
            amount: "-2,500 HNXZ", 
            date: "2023-06-15",
            status: "Completed" 
          },
          { 
            id: "TX-1002", 
            type: "Property Purchase", 
            property: "Downtown Condo", 
            amount: "-125,000 HNXZ", 
            date: "2023-05-22",
            status: "Completed" 
          }
        ]);
      }
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isConnected, navigate, type]);

  return {
    isLoading,
    stats,
    transactions,
    isConnected,
    walletAddress
  };
}
