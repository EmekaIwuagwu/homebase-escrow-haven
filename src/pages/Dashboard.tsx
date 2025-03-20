
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, Wallet, Building, CalendarDays, SquareUser, History, Settings, LogOut } from "lucide-react";

const Dashboard = () => {
  const walletAddress = "0x1234...5678";
  const walletBalance = "15,250 HNBXZ";
  
  const recentTransactions = [
    { id: 1, type: "Rental Payment", property: "Luxury Apartment", amount: "-2,500 HNBXZ", date: "2023-06-15" },
    { id: 2, type: "Property Purchase", property: "Downtown Condo", amount: "-125,000 HNBXZ", date: "2023-05-22" },
    { id: 3, type: "Lodging Stay", property: "Beachfront Villa", amount: "-950 HNBXZ", date: "2023-04-18" },
  ];
  
  const properties = [
    { id: 1, title: "Downtown Condo", type: "Owned", image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&q=80&w=2070" },
    { id: 2, type: "Upcoming Stay", title: "Mountain Retreat", image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&q=80&w=1974" },
  ];

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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-homebase-100 rounded-full flex items-center justify-center mr-4">
                    <SquareUser className="w-6 h-6 text-homebase-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Wallet Connected</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{walletAddress}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Wallet Balance</p>
                  <p className="text-xl font-bold">{walletBalance}</p>
                </div>
                
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center text-homebase-600 p-2 rounded-md bg-homebase-50">
                        <Home className="w-5 h-5 mr-3" />
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Building className="w-5 h-5 mr-3" />
                        My Properties
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <CalendarDays className="w-5 h-5 mr-3" />
                        Bookings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <History className="w-5 h-5 mr-3" />
                        Transaction History
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-red-500 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <LogOut className="w-5 h-5 mr-3" />
                        Disconnect Wallet
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">1</h3>
                  <p className="text-gray-600 dark:text-gray-400">Properties Owned</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                    <CalendarDays className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">1</h3>
                  <p className="text-gray-600 dark:text-gray-400">Upcoming Stays</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">3</h3>
                  <p className="text-gray-600 dark:text-gray-400">Recent Transactions</p>
                </div>
              </div>
              
              {/* My Properties Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">My Properties</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {properties.map(property => (
                    <div key={property.id} className="border rounded-lg overflow-hidden flex">
                      <div className="w-1/3">
                        <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="w-2/3 p-4">
                        <div className="inline-block px-2 py-1 bg-homebase-100 text-homebase-600 text-xs rounded mb-2">
                          {property.type}
                        </div>
                        <h3 className="font-medium">{property.title}</h3>
                        <Button variant="link" className="p-0 h-auto text-homebase-600">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recent Transactions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Transactions</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Property</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map(transaction => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="py-3 px-4">{transaction.type}</td>
                          <td className="py-3 px-4">{transaction.property}</td>
                          <td className="py-3 px-4 font-medium">{transaction.amount}</td>
                          <td className="py-3 px-4 text-gray-500">{transaction.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
