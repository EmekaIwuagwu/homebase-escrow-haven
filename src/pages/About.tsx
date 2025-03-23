
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, Wallet, Sparkles, PanelRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-12 px-6 md:px-10 bg-gradient-to-r from-homebase-50 to-homebase-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About HomeBase</h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              Revolutionizing real estate with blockchain technology for secure and transparent property transactions.
            </p>
          </div>
        </section>
        
        {/* Mission Statement */}
        <section className="py-16 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600">
                At HomeBase, we're committed to making real estate transactions more accessible, secure, and transparent through blockchain technology. We believe that everyone deserves a place to call home, and our platform makes it easier than ever to buy, sell, rent, or find temporary lodging with confidence.
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-12 h-12 bg-homebase-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-homebase-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
                <p className="text-gray-600">From luxury estates to cozy apartments, find the perfect property for your needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-12 h-12 bg-homebase-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-6 h-6 text-homebase-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Crypto Payments</h3>
                <p className="text-gray-600">Secure transactions using HanCoin (HNBXZ) for all your real estate needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-12 h-12 bg-homebase-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-homebase-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Contracts</h3>
                <p className="text-gray-600">Blockchain-backed agreements ensure transparency and security in every deal.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-12 h-12 bg-homebase-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PanelRight className="w-6 h-6 text-homebase-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">User Dashboard</h3>
                <p className="text-gray-600">Manage your properties, bookings, and transactions in one convenient place.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
