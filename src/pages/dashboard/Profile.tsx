
import React from "react";
import { useWallet } from "@/contexts/WalletContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Shield, Key } from "lucide-react";

const Profile = () => {
  const { walletAddress, selectedWalletType } = useWallet();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Profile</h1>
          <p className="text-gray-500">Manage your personal information and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Your name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Your email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Your phone number" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Your location" defaultValue="New York, USA" />
              </div>
            </div>
            <Button className="mt-4">Save Changes</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Wallet Information</CardTitle>
            <CardDescription>Your blockchain connection details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Wallet Address</p>
                <p className="text-xs text-gray-500 break-all">{walletAddress}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <Shield className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Wallet Type</p>
                <p className="text-xs text-gray-500">{selectedWalletType}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <Key className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Account Security</p>
                <p className="text-xs text-gray-500">Two-factor authentication enabled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
