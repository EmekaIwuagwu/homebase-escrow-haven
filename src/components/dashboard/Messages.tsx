
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, ArrowLeft, User, Users, Phone } from "lucide-react";
import { toast } from "sonner";

const Messages = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");

  const contacts = [
    {
      id: 1,
      name: "John Smith",
      role: "Landlord",
      property: "Mountain Retreat",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Thank you for booking my property!",
      time: "2 hours ago",
      unread: 1
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Landlord",
      property: "Beachfront Villa",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "Your check-in instructions will be sent 24 hours before arrival.",
      time: "Yesterday",
      unread: 0
    },
    {
      id: 3,
      name: "HomeBase Support",
      role: "Customer Service",
      avatar: "https://i.pravatar.cc/150?img=8",
      lastMessage: "Is there anything else we can help you with?",
      time: "2 days ago",
      unread: 0
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast.success("Message sent");
    setMessage("");
    // In a real app, this would send the message to the backend
  };

  const handleBack = () => {
    setActiveChat(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-6 md:px-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Chat with property owners and HomeBase support
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <div className="h-[600px] flex">
                  {/* Contact List - Hidden on mobile when chat is active */}
                  <div className={`w-full md:w-1/3 border-r ${activeChat ? 'hidden md:block' : 'block'}`}>
                    <CardHeader className="px-4 py-3 border-b">
                      <CardTitle className="text-lg">Conversations</CardTitle>
                    </CardHeader>
                    <Tabs defaultValue="all">
                      <TabsList className="w-full justify-start px-4 pt-2">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="landlords">Landlords</TabsTrigger>
                        <TabsTrigger value="support">Support</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all" className="m-0">
                        <div className="h-[510px] overflow-auto">
                          {contacts.map(contact => (
                            <div 
                              key={contact.id}
                              className="px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b"
                              onClick={() => setActiveChat(contact)}
                            >
                              <Avatar>
                                <AvatarImage src={contact.avatar} alt={contact.name} />
                                <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium truncate">{contact.name}</h4>
                                  <span className="text-xs text-gray-500">{contact.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                                  {contact.unread > 0 && (
                                    <span className="bg-homebase-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                      {contact.unread}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400">{contact.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="landlords" className="m-0">
                        <div className="h-[510px] overflow-auto">
                          {contacts.filter(c => c.role === "Landlord").map(contact => (
                            <div 
                              key={contact.id}
                              className="px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b"
                              onClick={() => setActiveChat(contact)}
                            >
                              <Avatar>
                                <AvatarImage src={contact.avatar} alt={contact.name} />
                                <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium truncate">{contact.name}</h4>
                                  <span className="text-xs text-gray-500">{contact.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                                  {contact.unread > 0 && (
                                    <span className="bg-homebase-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                      {contact.unread}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400">{contact.property}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="support" className="m-0">
                        <div className="h-[510px] overflow-auto">
                          {contacts.filter(c => c.role === "Customer Service").map(contact => (
                            <div 
                              key={contact.id}
                              className="px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b"
                              onClick={() => setActiveChat(contact)}
                            >
                              <Avatar>
                                <AvatarImage src={contact.avatar} alt={contact.name} />
                                <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium truncate">{contact.name}</h4>
                                  <span className="text-xs text-gray-500">{contact.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                                  {contact.unread > 0 && (
                                    <span className="bg-homebase-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                      {contact.unread}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  {/* Chat Window */}
                  {activeChat ? (
                    <div className="w-full md:w-2/3 flex flex-col">
                      {/* Chat Header */}
                      <div className="px-4 py-3 border-b flex items-center gap-3">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="md:hidden" 
                          onClick={handleBack}
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <Avatar>
                          <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
                          <AvatarFallback>{activeChat.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{activeChat.name}</h3>
                          <p className="text-xs text-gray-500">{activeChat.role}</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Phone className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Chat Messages */}
                      <div className="flex-1 p-4 overflow-auto">
                        <div className="space-y-4">
                          <div className="flex items-end gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
                              <AvatarFallback>{activeChat.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">{activeChat.lastMessage}</p>
                              <span className="text-xs text-gray-500 mt-1">{activeChat.time}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-end justify-end gap-2">
                            <div className="bg-homebase-100 dark:bg-homebase-800 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">Hi, thank you for reaching out!</p>
                              <span className="text-xs text-gray-500 mt-1">Just now</span>
                            </div>
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>Me</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                      
                      {/* Message Input */}
                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Type a message..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1"
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <Button onClick={handleSendMessage}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:flex w-2/3 items-center justify-center">
                      <div className="text-center">
                        <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                          <Users className="h-10 w-10 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium mb-1">Your Messages</h3>
                        <p className="text-gray-500 mb-4">Select a conversation to start chatting</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
