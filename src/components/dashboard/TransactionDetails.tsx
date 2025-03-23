
import React from "react";
import { ChevronLeft, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/formatters";
import { useToast } from "@/hooks/use-toast";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
  type: "Purchase" | "Rental" | "Booking" | "Refund";
  propertyId: string;
  propertyName: string;
  paymentMethod: string;
  transactionHash?: string;
  buyerName?: string;
  sellerName?: string;
}

interface TransactionDetailsProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoBack?: () => void;
}

export function TransactionDetails({
  transaction,
  open,
  onOpenChange,
  onGoBack,
}: TransactionDetailsProps) {
  const { toast } = useToast();

  if (!transaction) {
    return null;
  }

  const handleRefund = () => {
    // In a real implementation, this would call a backend API to process the refund
    toast({
      title: "Refund initiated",
      description: `Refund of ${formatCurrency(transaction.amount)} to the buyer has been initiated.`,
    });
    
    // Close the dialog after initiating refund
    onOpenChange(false);
  };

  // Helper function to determine badge color based on status
  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default">Completed</Badge>;
      case "Pending":
        return <Badge variant="outline">Pending</Badge>;
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "Refunded":
        return <Badge variant="outline">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          {onGoBack && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4"
              onClick={onGoBack}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            Transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold">
                {formatCurrency(transaction.amount)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Status</p>
              {getStatusBadge(transaction.status)}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="text-sm">{transaction.date}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="text-sm">{transaction.type}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="text-sm">{transaction.paymentMethod}</p>
            </div>
            {transaction.transactionHash && (
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Transaction Hash</p>
                <p className="text-sm truncate max-w-[180px]">
                  {transaction.transactionHash}
                </p>
              </div>
            )}
          </div>

          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 pt-0">
              <p className="font-medium">{transaction.propertyName}</p>
              <p className="text-xs text-muted-foreground">
                Property ID: {transaction.propertyId}
              </p>
            </CardContent>
          </Card>

          {(transaction.buyerName || transaction.sellerName) && (
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">Parties</CardTitle>
              </CardHeader>
              <CardContent className="pb-2 pt-0 space-y-1">
                {transaction.buyerName && (
                  <div className="flex justify-between">
                    <p className="text-xs text-muted-foreground">Buyer</p>
                    <p className="text-xs">{transaction.buyerName}</p>
                  </div>
                )}
                {transaction.sellerName && (
                  <div className="flex justify-between">
                    <p className="text-xs text-muted-foreground">Seller</p>
                    <p className="text-xs">{transaction.sellerName}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="flex flex-col space-y-2 sm:space-y-0">
          <div className="flex w-full space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Download receipt functionality would go here
                toast({
                  title: "Receipt downloaded",
                  description: "Transaction receipt has been downloaded.",
                });
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Receipt
            </Button>
          </div>
          
          {/* Only show refund button if the transaction is completed (not already refunded or failed) */}
          {transaction.status === "Completed" && transaction.type !== "Refund" && (
            <Button
              variant="default"
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={handleRefund}
            >
              Refund to Buyer
            </Button>
          )}
          
          {/* Show processing indicator for pending transactions */}
          {transaction.status === "Pending" && (
            <div className="flex items-center justify-center py-2 text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4 animate-pulse" />
              Processing transaction...
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
