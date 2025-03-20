
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, CalendarDays, SquareUser, History, Settings, LogOut } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

const DashboardSidebar = () => {
  const { walletAddress, selectedWalletType, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  const handleTabChange = (tabId: string) => {
    // Find the tab element and dispatch a click event on it
    const tabElement = document.querySelector(`[data-state="inactive"][value="${tabId}"]`);
    if (tabElement) {
      // Use HTMLElement.click() instead of Element.click()
      (tabElement as HTMLElement).click();
    }
  };

  return (
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
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Wallet Type</p>
        <p className="text-xl font-bold">{selectedWalletType}</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <a 
              href="/dashboard" 
              className="flex items-center text-homebase-600 p-2 rounded-md bg-homebase-50"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </a>
          </li>
          <li>
            <button 
              onClick={() => handleTabChange("bookings")} 
              className="flex w-full items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <CalendarDays className="w-5 h-5 mr-3" />
              Bookings
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleTabChange("transactions")} 
              className="flex w-full items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <History className="w-5 h-5 mr-3" />
              Transaction History
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleTabChange("settings")} 
              className="flex w-full items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
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
