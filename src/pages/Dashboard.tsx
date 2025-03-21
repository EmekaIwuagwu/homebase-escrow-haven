
import React, { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/contexts/WalletContext";
import Bookings from "@/components/dashboard/Bookings";
import AccountSettings from "@/components/dashboard/AccountSettings";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ManageBooking from "@/components/dashboard/ManageBooking";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import Messages from "@/components/dashboard/Messages";

const DashboardLayout = () => {
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
              Manage your bookings and account settings
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Tabs defaultValue="bookings" className="w-full">
                <TabsList className="w-full justify-start mb-6 bg-white dark:bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger id="dashboard-tab-bookings" value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger id="dashboard-tab-transactions" value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger id="dashboard-tab-settings" value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bookings" className="mt-0">
                  <Bookings />
                </TabsContent>
                
                <TabsContent value="transactions" className="mt-0">
                  <TransactionHistory />
                </TabsContent>
                
                <TabsContent value="settings" className="mt-0">
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

// Fixed the Dashboard component to correctly handle the nested routes
const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />} />
      <Route path="/booking/:id" element={<ManageBooking />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
};

export default Dashboard;
