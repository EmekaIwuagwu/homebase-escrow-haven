import React, { useEffect, useState } from "react";
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
  Settings as SettingsIcon,
  LogOut,
  PlusCircle,
  DollarSign,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProperties from "@/components/dashboard/MyProperties";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import { PropertyAnalyticsChart } from "@/components/dashboard/PropertyAnalyticsChart";
import { AddPropertyForm } from "@/components/dashboard/AddPropertyForm";

// Dashboard overview component
const DashboardOverview = () => {
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
          <p className="text-gray-500">Manage your properties and track performance</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setAddPropertyOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Add New Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Properties</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 4%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue</CardDescription>
            <CardTitle className="text-3xl">45,231 HNXZ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 11%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Property Views</CardDescription>
            <CardTitle className="text-3xl">2,354</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 7%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Occupancy Rate</CardDescription>
            <CardTitle className="text-3xl">84%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-red-500 font-medium">↓ 2%</span> from last month
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
          <CardContent>
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
                  <p className="text-sm font-medium">New booking received</p>
                  <p className="text-xs text-gray-500">Downtown Condo - 2 nights</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Property viewing scheduled</p>
                  <p className="text-xs text-gray-500">Beachfront Villa</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Rental period ending soon</p>
                  <p className="text-xs text-gray-500">Mountain Retreat - 5 days left</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Property form dialog */}
      <AddPropertyForm open={addPropertyOpen} onOpenChange={setAddPropertyOpen} />
    </div>
  );
};

// Create Analytics component
const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-500">Track your property performance</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Property Views Over Time</CardTitle>
          <CardDescription>Performance analytics for all properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <PropertyAnalyticsChart />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Properties</CardTitle>
            <CardDescription>Properties with the most bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Beachfront Villa', 'Downtown Condo', 'Mountain Retreat'].map((property, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-medium">{property}</span>
                  <span className="text-green-600 font-medium">{Math.floor(Math.random() * 50) + 10} bookings</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Property</CardTitle>
            <CardDescription>Financial performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Beachfront Villa', 'Downtown Condo', 'Mountain Retreat'].map((property, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-medium">{property}</span>
                  <span className="text-green-600 font-medium">{Math.floor(Math.random() * 20000) + 5000} HNXZ</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Create Messages component
const Messages = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-gray-500">Communicate with tenants and clients</p>
        </div>
        <Button>New Message</Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {['John Smith', 'Sarah Wilson', 'Mike Thompson', 'Emily Davis'].map((name, i) => (
              <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{name}</h3>
                    <span className="text-xs text-gray-500">{i === 0 ? '10m ago' : i === 1 ? '2h ago' : i === 2 ? 'Yesterday' : '3d ago'}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {i === 0 ? 'Question about the Downtown Condo' : 
                     i === 1 ? 'Booking confirmation for next week' : 
                     i === 2 ? 'Issue with water heater' : 
                     'Interested in extending my stay'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Create Documents component
const Documents = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-gray-500">Manage your contracts and important files</p>
        </div>
        <Button>Upload New</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Rental Agreements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Downtown Condo - John Smith', 'Mountain Retreat - Sarah Wilson', 'Beachfront Villa - Mike Johnson'].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>{doc}</span>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Property Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Property Deed - Downtown Condo', 'Insurance Policy - Beachfront Villa', 'Tax Documents - 2023'].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>{doc}</span>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Create Settings component
const SettingsComponent = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your account preferences</p>
        </div>
        <Button>Save Changes</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Display Name</label>
              <Input defaultValue="Landlord Portal" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <Input defaultValue="contact@example.com" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Notification Preferences</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Email notifications</span>
                <Switch defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <span>SMS notifications</span>
                <Switch defaultChecked={false} />
              </div>
              <div className="flex items-center justify-between">
                <span>In-app notifications</span>
                <Switch defaultChecked={true} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Wallet Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Connected Wallet</p>
              <p className="text-sm text-gray-500">Han Wallet</p>
            </div>
            <Button variant="outline">Disconnect</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Sidebar component for landlord dashboard
const LandlordSidebar = () => {
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
          <p className="text-xs text-gray-500">Landlord Portal</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/landlord">
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/landlord/properties">
                    <Building className="w-4 h-4" />
                    <span>My Properties</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/landlord/transactions">
                    <DollarSign className="w-4 h-4" />
                    <span>Transactions</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/landlord/analytics">
                    <BarChart2 className="w-4 h-4" />
                    <span>Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/landlord/messages">
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
                  <a href="/landlord/documents">
                    <FileText className="w-4 h-4" />
                    <span>Documents</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/landlord/settings">
                    <SettingsIcon className="w-4 h-4" />
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
            LP
          </div>
          <div>
            <p className="text-sm font-medium">Landlord Portal</p>
            <p className="text-xs text-gray-500">Connected with Han Wallet</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

// Import components we need
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

// Main layout component for landlord dashboard
const LandlordDashboardLayout = () => {
  const { isConnected, walletAddress, userRole, setUserRole } = useWallet();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // If not connected or not a landlord, redirect to login
    if (!isConnected) {
      navigate('/landlord-login');
      return;
    }
    
    // Set role to landlord if not already set
    if (userRole !== "landlord") {
      setUserRole("landlord");
    }
    
    // Set the active tab based on the current path
    const path = window.location.pathname;
    if (path.includes('/properties')) {
      setActiveTab("properties");
    } else if (path.includes('/transactions')) {
      setActiveTab("transactions");
    } else if (path.includes('/analytics')) {
      setActiveTab("analytics");
    } else if (path.includes('/messages')) {
      setActiveTab("messages");
    } else if (path.includes('/documents')) {
      setActiveTab("documents");
    } else if (path.includes('/settings')) {
      setActiveTab("settings");
    } else {
      setActiveTab("overview");
    }
  }, [isConnected, userRole, navigate, setUserRole]);

  // If not connected, don't render the dashboard
  if (!isConnected) return null;

  // Determine which content to render based on the route
  const renderContent = () => {
    const path = window.location.pathname;
    
    if (path.includes('/analytics')) {
      return <Analytics />;
    } else if (path.includes('/messages')) {
      return <Messages />;
    } else if (path.includes('/documents')) {
      return <Documents />;
    } else if (path.includes('/settings')) {
      return <SettingsComponent />;
    } else if (path.includes('/properties')) {
      return (
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
          <TabsContent value="properties" className="space-y-4">
            <MyProperties />
          </TabsContent>
        </Tabs>
      );
    } else if (path.includes('/transactions')) {
      return (
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className="space-y-4">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      );
    } else {
      // Default to overview dashboard
      return (
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
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20">
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-[calc(100vh-80px)] w-full">
            <LandlordSidebar />
            
            <main className="flex-1 overflow-auto p-6">
              {renderContent()}
            </main>
          </div>
        </SidebarProvider>
      </div>
      
      <Footer />
    </div>
  );
};

// Main component to handle routes
const LandlordDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<LandlordDashboardLayout />} />
      <Route path="/properties" element={<LandlordDashboardLayout />} />
      <Route path="/transactions" element={<LandlordDashboardLayout />} />
      <Route path="/analytics" element={<LandlordDashboardLayout />} />
      <Route path="/messages" element={<LandlordDashboardLayout />} />
      <Route path="/documents" element={<LandlordDashboardLayout />} />
      <Route path="/settings" element={<LandlordDashboardLayout />} />
    </Routes>
  );
};

export default LandlordDashboard;
