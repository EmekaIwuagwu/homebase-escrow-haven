
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Building, Wallet, ShieldCheck, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 px-6 md:px-10 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose HomeBase</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Our Web3-powered platform revolutionizes real estate transactions with blockchain technology,
                providing security, transparency, and convenience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-slideUp" style={{ animationDelay: "100ms" }}>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Property NFTs</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Property ownership represented as NFTs on the blockchain, ensuring authenticity and easy transfers.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-slideUp" style={{ animationDelay: "200ms" }}>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">HanCoin Payments</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Seamless transactions using HanCoin (HNBXZ) with lower fees and faster processing.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-slideUp" style={{ animationDelay: "300ms" }}>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Escrow</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Smart contract escrow system protects both buyers and sellers during property transactions.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-slideUp" style={{ animationDelay: "400ms" }}>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                  <BadgeCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Verified Listings</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All properties are verified and authenticated before listing to ensure quality and trust.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProperties />
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-10 bg-homebase-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Real Estate Experience?</h2>
              <p className="text-white/80 text-lg mb-8">
                Join thousands of users who are already buying, selling, and renting properties
                using our Web3-powered platform. The future of real estate is here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-homebase-600 hover:bg-white/90">
                  Connect Wallet
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Explore Properties
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-20 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <p className="text-5xl font-bold text-homebase-600 mb-2">$2.5B+</p>
                <p className="text-gray-600 dark:text-gray-400">Transaction Volume</p>
              </div>
              
              <div className="text-center p-6">
                <p className="text-5xl font-bold text-homebase-600 mb-2">15,000+</p>
                <p className="text-gray-600 dark:text-gray-400">Properties Listed</p>
              </div>
              
              <div className="text-center p-6">
                <p className="text-5xl font-bold text-homebase-600 mb-2">45+</p>
                <p className="text-gray-600 dark:text-gray-400">Countries Served</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
