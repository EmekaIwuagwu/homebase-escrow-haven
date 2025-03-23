
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
  TrendingUp,
  Eye,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProperties from "@/components/dashboard/MyProperties";
import TransactionHistory from "@/components/dashboard/TransactionHistory";

// Dashboard overview component
const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Property Owner Dashboard</h1>
          <p className="text-gray-500">Manage your property sales</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          List New Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Listed Properties</CardDescription>
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
            <CardDescription>Total Sales</CardDescription>
            <CardTitle className="text-3xl">2,450,000 HNXZ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 15%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Property Views</CardDescription>
            <CardTitle className="text-3xl">5,672</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 9%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Offers</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 1</span> from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Market Performance</CardTitle>
            <CardDescription>Property value trends over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Property Value Chart</p>
              {/* In a real implementation, this would be a chart component */}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Offer received</p>
                  <p className="text-xs text-gray-500">Downtown Condo - 235,000 HNXZ</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Eye className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Property viewing surge</p>
                  <p className="text-xs text-gray-500">Beachfront Villa - 24 new views</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Tag className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Price adjustment suggested</p>
                  <p className="text-xs text-gray-500">Mountain Retreat - +5% increase</p>
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
          <p className="text-xs text-gray-500">Property Owner Portal</p>
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
                  <a href="/seller/market">
                    <TrendingUp className="w-4 h-4" />
                    <span>Market Analysis</span>
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
            PO
          </div>
          <div>
            <p className="text-sm font-medium">Property Owner</p>
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
      <Route path="/market" element={<SellerDashboardLayout />} />
      <Route path="/messages" element={<SellerDashboardLayout />} />
      <Route path="/documents" element={<SellerDashboardLayout />} />
      <Route path="/settings" element={<SellerDashboardLayout />} />
    </Routes>
  );
};

export default SellerDashboard;
