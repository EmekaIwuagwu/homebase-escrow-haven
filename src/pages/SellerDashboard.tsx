import React, { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWallet } from "@/contexts/WalletContext";
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
  Building,
  BarChart2,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  PlusCircle,
  DollarSign,
  Eye,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProperties from "@/components/dashboard/MyProperties";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import { useDashboard } from "@/hooks/use-dashboard";
import { PropertyAnalyticsChart } from "@/components/dashboard/PropertyAnalyticsChart";

// Dashboard overview component
const DashboardOverview = () => {
  const { stats, isLoading } = useDashboard('seller');
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading dashboard data...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-gray-500">Manage your properties and track sales</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          List New Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Properties</CardDescription>
            <CardTitle className="text-3xl">{stats.totalProperties}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 2%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue</CardDescription>
            <CardTitle className="text-3xl">{stats.revenue.toLocaleString()} HNXZ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 25%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Property Views</CardDescription>
            <CardTitle className="text-3xl">{stats.propertyViews}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 12%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sale Completion Rate</CardDescription>
            <CardTitle className="text-3xl">{stats.occupancyRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 5%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Views</CardTitle>
            <CardDescription>Property views over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <PropertyAnalyticsChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New offer received</p>
                  <p className="text-xs text-gray-500">Beachfront Villa - 350,000 HNXZ</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Eye className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Property viewing scheduled</p>
                  <p className="text-xs text-gray-500">Urban Loft</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Escrow period ending soon</p>
                  <p className="text-xs text-gray-500">Hillside Mansion - 2 days left</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Sidebar component for seller dashboard
const SellerSidebar = () => {
  const { disconnectWallet } = useWallet();
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
          <p className="text-xs text-gray-500">Seller Portal</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/seller">
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/seller/properties">
                    <Building className="w-4 h-4" />
                    <span>My Properties</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/seller/transactions">
                    <DollarSign className="w-4 h-4" />
                    <span>Transactions</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/seller/analytics">
                    <BarChart2 className="w-4 h-4" />
                    <span>Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/seller/messages">
                    <MessageSquare className="w-4 h-4" />
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
                  <a href="/seller/documents">
                    <FileText className="w-4 h-4" />
                    <span>Documents</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/seller/settings">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
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
            SP
          </div>
          <div>
            <p className="text-sm font-medium">Seller Portal</p>
            <p className="text-xs text-gray-500">Connected with Han Wallet</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

// Main layout component for seller dashboard
const SellerDashboardLayout = () => {
  const { isConnected, walletAddress, userRole, setUserRole } = useWallet();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If not connected or not a seller, redirect to login
    if (!isConnected) {
      navigate('/seller-login');
      return;
    }
    
    // Set role to seller if not already set
    if (userRole !== "seller") {
      setUserRole("seller");
    }
  }, [isConnected, userRole, navigate, setUserRole]);

  // If not connected, don't render the dashboard
  if (!isConnected) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20">
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-[calc(100vh-80px)] w-full">
            <SellerSidebar />
            
            <main className="flex-1 overflow-auto p-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <DashboardOverview />
                </TabsContent>
                
                <TabsContent value="properties" className="space-y-4">
                  <MyProperties />
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

// Main component to handle routes
const SellerDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<SellerDashboardLayout />} />
      <Route path="/properties" element={<SellerDashboardLayout />} />
      <Route path="/transactions" element={<SellerDashboardLayout />} />
      <Route path="/analytics" element={<SellerDashboardLayout />} />
      <Route path="/messages" element={<SellerDashboardLayout />} />
      <Route path="/documents" element={<SellerDashboardLayout />} />
      <Route path="/settings" element={<SellerDashboardLayout />} />
    </Routes>
  );
};

export default SellerDashboard;
