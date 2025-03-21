
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, CalendarDays, SquareUser, Settings, LogOut, MessageCircle, Receipt } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const { walletAddress, selectedWalletType, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  const handleTabChange = (tabId: string) => {
    // Find the tab element and dispatch a click event on it
    const tabElement = document.getElementById(`dashboard-tab-${tabId}`);
    if (tabElement) {
      tabElement.click();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-homebase-100 dark:bg-homebase-900/50 rounded-full flex items-center justify-center mr-4">
          <SquareUser className="w-6 h-6 text-homebase-600 dark:text-homebase-400" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">Wallet Connected</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{walletAddress}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Wallet Type</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedWalletType}</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className={cn(
                "flex items-center p-2 rounded-md",
                "text-homebase-600 dark:text-homebase-400 bg-homebase-50 dark:bg-homebase-900/20"
              )}
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <button 
              onClick={() => handleTabChange("bookings")} 
              className={cn(
                "flex w-full items-center p-2 rounded-md",
                "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <CalendarDays className="w-5 h-5 mr-3" />
              Bookings
            </button>
          </li>
          <li>
            <Link 
              to="/dashboard/transactions" 
              className={cn(
                "flex items-center p-2 rounded-md",
                "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Receipt className="w-5 h-5 mr-3" />
              Transactions
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/messages" 
              className={cn(
                "flex items-center p-2 rounded-md",
                "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Messages
            </Link>
          </li>
          <li>
            <button 
              onClick={() => handleTabChange("settings")} 
              className={cn(
                "flex w-full items-center p-2 rounded-md",
                "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </button>
          </li>
          <li>
            <button 
              onClick={handleDisconnect} 
              className="flex w-full items-center text-red-500 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Disconnect Wallet
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
