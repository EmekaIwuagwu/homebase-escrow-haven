
import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWallet } from "@/contexts/WalletContext";
import Bookings from "@/components/dashboard/Bookings";
import ManageBooking from "@/components/dashboard/ManageBooking";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import Messages from "@/components/dashboard/Messages";
import { TransactionDetails, Transaction } from "@/components/dashboard/TransactionDetails";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Home,
  CalendarDays,
  User,
  LogOut,
  MessageCircle,
  Receipt,
  BarChart2,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyAnalyticsChart } from "@/components/dashboard/PropertyAnalyticsChart";

// Dashboard overview component
const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <p className="text-gray-500">Manage your bookings and properties</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Bookings</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 1</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Spent</CardDescription>
            <CardTitle className="text-3xl">12,450 HNXZ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-red-500 font-medium">↓ 5%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Saved Properties</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 2</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Unread Messages</CardDescription>
            <CardTitle className="text-3xl">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              From 2 different property owners
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
            <CardDescription>Your activity over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <PropertyAnalyticsChart />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your scheduled stays</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-full bg-homebase-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Beachfront Villa</p>
                  <p className="text-xs text-gray-500">July 15 - July 18, 2023</p>
                  <p className="text-xs font-medium text-homebase-600 mt-1">3 days from now</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-full bg-amber-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Urban Loft</p>
                  <p className="text-xs text-gray-500">August 10 - August 15, 2023</p>
                  <p className="text-xs text-amber-600 font-medium mt-1">29 days from now</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-full bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Mountain Retreat</p>
                  <p className="text-xs text-gray-500">September 5 - September 12, 2023</p>
                  <p className="text-xs text-gray-500 mt-1">In 55 days</p>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                <CalendarDays className="h-4 w-4 mr-2" />
                View All Bookings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Sidebar component for user dashboard
const DashboardSidebar = () => {
  const { walletAddress, selectedWalletType, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="px-2 py-4">
          <h2 className="text-lg font-bold">HomeBase</h2>
          <p className="text-xs text-gray-500">User Dashboard</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/dashboard">
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard#bookings">
                    <CalendarDays className="w-4 h-4" />
                    <span>Bookings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/transactions">
                    <Receipt className="w-4 h-4" />
                    <span>Transactions</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/messages">
                    <MessageCircle className="w-4 h-4" />
                    <span>Messages</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/profile">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleDisconnect}>
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-2">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Wallet Connected</p>
            <p className="text-xs text-gray-500">{walletAddress}</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

// Main layout component for dashboard
const DashboardLayout = () => {
  const { isConnected } = useWallet();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20">
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-[calc(100vh-80px)] w-full">
            <DashboardSidebar />
            
            <main className="flex-1 overflow-auto p-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger id="dashboard-tab-bookings" value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger id="dashboard-tab-transactions" value="transactions">Transactions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <DashboardOverview />
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-4">
                  <Bookings />
                </TabsContent>
                
                <TabsContent value="transactions" className="space-y-4">
                  <TransactionHistory />
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </SidebarProvider>
      </div>
      
      <Footer />
    </div>
  );
};

// Transaction details wrapper component
const TransactionDetailsWrapper = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - in a real app, you would fetch this from your API
    const mockTransaction: Transaction = {
      id: id || "TX123456",
      date: "2023-06-15",
      amount: 1250,
      status: "Completed",
      type: "Booking",
      propertyId: "P78901",
      propertyName: "Lakefront Cabin",
      paymentMethod: "HNXZ Wallet",
      transactionHash: "0x123...abc",
      buyerName: "John Doe",
      sellerName: "Jane Smith"
    };
    
    setTransaction(mockTransaction);
  }, [id]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      navigate('/dashboard/transactions');
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard/transactions');
  };

  return (
    <TransactionDetails 
      transaction={transaction}
      open={open}
      onOpenChange={handleOpenChange}
      onGoBack={handleGoBack}
    />
  );
};

// Dashboard component to handle the nested routes
const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />} />
      <Route path="/booking/:id" element={<ManageBooking />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/transactions" element={<TransactionHistory />} />
      <Route path="/transaction/:id" element={<TransactionDetailsWrapper />} />
    </Routes>
  );
};

export default Dashboard;
