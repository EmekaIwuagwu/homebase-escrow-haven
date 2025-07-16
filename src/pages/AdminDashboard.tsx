
import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Shield,
  Users,
  Home,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  UserCheck,
  Building,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  Eye,
  Ban,
  CheckCircle,
} from "lucide-react";
import { PropertyAnalyticsChart } from "@/components/dashboard/PropertyAnalyticsChart";

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", type: "Buyer", status: "Active", walletAddress: "0x1234...5678" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", type: "Seller", status: "Active", walletAddress: "0x9ABC...DEF0" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", type: "Landlord", status: "Pending", walletAddress: "0x5555...7777" },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", type: "User", status: "Active", walletAddress: "0x8888...9999" },
];

const mockProperties = [
  { id: 1, title: "Beachfront Villa", owner: "Jane Smith", type: "Sale", price: "1,250,000", status: "Active" },
  { id: 2, title: "Downtown Apartment", owner: "Bob Wilson", type: "Rent", price: "2,500", status: "Active" },
  { id: 3, title: "Mountain Cabin", owner: "Alice Johnson", type: "Lodging", price: "150", status: "Pending" },
];

const mockTransactions = [
  { id: "TX001", date: "2024-01-15", user: "John Doe", property: "Beachfront Villa", amount: "1,250,000 HNXZ", type: "Purchase", status: "Completed" },
  { id: "TX002", date: "2024-01-14", user: "Alice Johnson", property: "Downtown Apartment", amount: "2,500 HNXZ", type: "Rental", status: "Completed" },
  { id: "TX003", date: "2024-01-13", user: "Bob Wilson", property: "Mountain Cabin", amount: "150 HNXZ", type: "Booking", status: "Pending" },
];

// Admin Overview Component
const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">System overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">1,247</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 12%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Properties</CardDescription>
            <CardTitle className="text-3xl">856</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 8%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle className="text-3xl">24,580</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 15%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Platform Revenue</CardDescription>
            <CardTitle className="text-3xl">89,450 HNXZ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">↑ 22%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>User activity and engagement metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <PropertyAnalyticsChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New user registration</p>
                  <p className="text-xs text-gray-500">John Smith joined as a buyer</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Property listed</p>
                  <p className="text-xs text-gray-500">Downtown Penthouse added to marketplace</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Transaction completed</p>
                  <p className="text-xs text-gray-500">Beachfront Villa purchased for 1,250,000 HNXZ</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// User Management Component
const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button>Export Users</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage platform users across all roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Wallet</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-2 font-medium">{user.name}</td>
                    <td className="p-2 text-gray-600">{user.email}</td>
                    <td className="p-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {user.type}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-2 text-xs text-gray-500">{user.walletAddress}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Ban className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Property Management Component  
const PropertyManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Property Management</h2>
        <Button>Export Properties</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Properties</CardTitle>
          <CardDescription>Oversee all properties on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Property</th>
                  <th className="text-left p-2">Owner</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockProperties.map((property) => (
                  <tr key={property.id} className="border-b">
                    <td className="p-2 font-medium">{property.title}</td>
                    <td className="p-2 text-gray-600">{property.owner}</td>
                    <td className="p-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        {property.type}
                      </span>
                    </td>
                    <td className="p-2 font-medium">{property.price} HNXZ</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        property.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Transaction Monitoring Component
const TransactionMonitoring = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transaction Monitoring</h2>
        <Button>Export Transactions</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Monitor all platform transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">Property</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="p-2 font-mono text-sm">{transaction.id}</td>
                    <td className="p-2 text-gray-600">{transaction.date}</td>
                    <td className="p-2">{transaction.user}</td>
                    <td className="p-2">{transaction.property}</td>
                    <td className="p-2 font-medium">{transaction.amount}</td>
                    <td className="p-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {transaction.type}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Admin Sidebar Component
const AdminSidebar = () => {
  const { disconnectWallet } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="px-2 py-4">
          <h2 className="text-lg font-bold text-red-600">HomeBase Admin</h2>
          <p className="text-xs text-gray-500">System Administration</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin')}>
                  <Link to="/admin">
                    <BarChart3 className="w-4 h-4" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/users')}>
                  <Link to="/admin/users">
                    <Users className="w-4 h-4" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/properties')}>
                  <Link to="/admin/properties">
                    <Building className="w-4 h-4" />
                    <span>Properties</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/transactions')}>
                  <Link to="/admin/transactions">
                    <CreditCard className="w-4 h-4" />
                    <span>Transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleDisconnect}>
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mr-2">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">System Admin</p>
            <p className="text-xs text-gray-500">Administrator Access</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

// Main Admin Dashboard Layout
const AdminDashboardLayout = () => {
  const { isConnected, userRole } = useWallet();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isConnected || userRole !== "admin") {
      navigate('/admin-login');
    }
  }, [isConnected, userRole, navigate]);

  if (!isConnected || userRole !== "admin") return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20">
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-[calc(100vh-80px)] w-full">
            <AdminSidebar />
            
            <main className="flex-1 overflow-auto p-6">
              <Routes>
                <Route path="/" element={<AdminOverview />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/properties" element={<PropertyManagement />} />
                <Route path="/transactions" element={<TransactionMonitoring />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </div>
      
      <Footer />
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminDashboardLayout />} />
    </Routes>
  );
};

export default AdminDashboard;
