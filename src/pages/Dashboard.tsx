
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useWallet } from "@/contexts/WalletContext";
import MyProperties from "@/components/dashboard/MyProperties";
import Bookings from "@/components/dashboard/Bookings";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import AccountSettings from "@/components/dashboard/AccountSettings";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const Dashboard = () => {
  const { isConnected, walletAddress } = useWallet();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home if wallet is not connected
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  // If not connected, don't render the dashboard
  if (!isConnected) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-6 md:px-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your properties, bookings, and transactions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Tabs defaultValue="properties" className="w-full">
                <TabsList className="w-full justify-start mb-6 bg-white dark:bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger value="properties">My Properties</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="transactions">Transaction History</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="properties">
                  <MyProperties />
                </TabsContent>
                
                <TabsContent value="bookings">
                  <Bookings />
                </TabsContent>
                
                <TabsContent value="transactions">
                  <TransactionHistory />
                </TabsContent>
                
                <TabsContent value="settings">
                  <AccountSettings />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
