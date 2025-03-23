
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  FileText, 
  Copy, 
  ExternalLink, 
  Shield, 
  AlertTriangle 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock transaction data - in a real app, this would come from an API
  const transaction = {
    id: id || "TX-12345",
    type: "Property Purchase",
    property: "Downtown Condo",
    propertyId: "PROP-289",
    amount: "125,000 HNXZ",
    amountNumeric: 125000,
    date: "2023-05-22",
    time: "14:32:45",
    status: "Completed",
    paymentMethod: "Escrow",
    escrowId: "ESC-9876",
    buyerAddress: "0x1234...5678",
    sellerAddress: "0x8765...4321",
    blockchainTx: "0xabcd...1234",
    network: "Han Chain",
    description: "Purchase of Downtown Condo property located at 789 Urban Center, New York, NY",
    refundable: true,
    refundWindow: "30 days",
    daysLeft: 12
  };
  
  const handleRefundRequest = () => {
    if (refundReason.trim().length < 10) {
      toast.error("Please provide a detailed reason for the refund request");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsRefundDialogOpen(false);
      toast.success("Refund request submitted successfully");
      
      // In a real app, you would redirect to a confirmation page or update the UI
      navigate("/dashboard/transactions");
    }, 2000);
  };
  
  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard`);
      })
      .catch(() => {
        toast.error(`Failed to copy ${label}`);
      });
  };
  
  if (!transaction) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold">Transaction Not Found</h1>
            <p className="mt-4 mb-8">The transaction you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/dashboard/transactions")}>Back to Transactions</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => navigate("/dashboard/transactions")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Transactions
            </button>
            
            <Badge variant={transaction.status === "Completed" ? "default" : transaction.status === "Pending" ? "outline" : "destructive"}>
              {transaction.status}
            </Badge>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{transaction.type}</CardTitle>
                  <CardDescription>{transaction.property}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{transaction.amount}</div>
                  <div className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()} {transaction.time}</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <div className="flex items-center">
                    <p className="font-medium">{transaction.id}</p>
                    <button 
                      onClick={() => handleCopyToClipboard(transaction.id, "Transaction ID")}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Property ID</p>
                  <p className="font-medium">{transaction.propertyId}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">{transaction.paymentMethod}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Network</p>
                  <p className="font-medium">{transaction.network}</p>
                </div>
                
                {transaction.paymentMethod === "Escrow" && (
                  <div>
                    <p className="text-sm text-gray-500">Escrow ID</p>
                    <div className="flex items-center">
                      <p className="font-medium">{transaction.escrowId}</p>
                      <button 
                        onClick={() => handleCopyToClipboard(transaction.escrowId, "Escrow ID")}
                        className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500">Blockchain Transaction</p>
                  <div className="flex items-center">
                    <p className="font-medium truncate">{transaction.blockchainTx}</p>
                    <button 
                      onClick={() => handleCopyToClipboard(transaction.blockchainTx, "Transaction Hash")}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <a 
                      href={`https://explorer.example.com/tx/${transaction.blockchainTx}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Transaction Description</p>
                <p>{transaction.description}</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <div className="flex items-center">
                    <p className="font-medium">{transaction.buyerAddress}</p>
                    <button 
                      onClick={() => handleCopyToClipboard(transaction.buyerAddress, "Buyer Address")}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <div className="flex items-center">
                    <p className="font-medium">{transaction.sellerAddress}</p>
                    <button 
                      onClick={() => handleCopyToClipboard(transaction.sellerAddress, "Seller Address")}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-gray-500">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-sm">Protected by HomeBase Secure Transactions</span>
              </div>
              
              {transaction.refundable && (
                <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Request Refund
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Transaction Refund</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for your refund request. Note that refunds are subject to review and may take 3-5 business days to process.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="text-sm text-gray-700">
                          You have {transaction.daysLeft} days left in your refund window of {transaction.refundWindow}.
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="col-span-1 text-right text-sm">
                          Amount:
                        </div>
                        <div className="col-span-3 font-bold">
                          {transaction.amount}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="col-span-1 text-right text-sm">
                          Transaction:
                        </div>
                        <div className="col-span-3">
                          {transaction.id}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 items-start gap-4">
                        <div className="col-span-1 text-right text-sm pt-2">
                          Reason:
                        </div>
                        <div className="col-span-3">
                          <Textarea 
                            placeholder="Please explain why you are requesting a refund..."
                            value={refundReason}
                            onChange={(e) => setRefundReason(e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsRefundDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={handleRefundRequest}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Submit Refund Request"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium">Transaction Receipt</p>
                      <p className="text-sm text-gray-500">PDF • 245 KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
                
                {transaction.paymentMethod === "Escrow" && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">Escrow Contract</p>
                        <p className="text-sm text-gray-500">PDF • 380 KB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-purple-500 mr-3" />
                    <div>
                      <p className="font-medium">Property Deed</p>
                      <p className="text-sm text-gray-500">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TransactionDetails;
