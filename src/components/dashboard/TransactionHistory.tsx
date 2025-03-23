
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Calendar as CalendarIcon, Download, Filter, Search, MoreVertical } from "lucide-react";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([
    { 
      id: "TX-1001", 
      type: "Rental Payment", 
      property: "Luxury Apartment", 
      amount: "-2,500 HNXZ", 
      date: "2023-06-15",
      status: "Completed" 
    },
    { 
      id: "TX-1002", 
      type: "Property Purchase", 
      property: "Downtown Condo", 
      amount: "-125,000 HNXZ", 
      date: "2023-05-22",
      status: "Completed" 
    },
    { 
      id: "TX-1003", 
      type: "Lodging Stay", 
      property: "Beachfront Villa", 
      amount: "-950 HNXZ", 
      date: "2023-04-18",
      status: "Completed" 
    },
    { 
      id: "TX-1004", 
      type: "Rental Income", 
      property: "Mountain Retreat", 
      amount: "+2,500 HNXZ", 
      date: "2023-03-01",
      status: "Completed" 
    },
    { 
      id: "TX-1005", 
      type: "Property Sale", 
      property: "Suburban House", 
      amount: "+175,000 HNXZ", 
      date: "2023-02-15",
      status: "Completed" 
    },
  ]);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter transactions based on search, date range, and type
  const filteredTransactions = transactions.filter(transaction => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      transaction.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date range filter
    const transactionDate = new Date(transaction.date);
    const matchesDateFrom = !dateRange?.from || transactionDate >= dateRange.from;
    const matchesDateTo = !dateRange?.to || transactionDate <= dateRange.to;
    
    // Type filter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    
    return matchesSearch && matchesDateFrom && matchesDateTo && matchesType;
  });

  // Get unique transaction types for the filter dropdown
  const transactionTypes = [...new Set(transactions.map(t => t.type))];
  
  const handleViewDetails = (id: string) => {
    navigate(`/dashboard/transaction/${id}`);
  };
  
  const handleDownloadReceipt = (id: string) => {
    // In a real implementation, this would trigger a download
    console.log(`Downloading receipt for transaction ${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <p className="text-gray-600 dark:text-gray-400">View and filter your past transactions</p>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                "Pick a date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {transactionTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>
      
      {/* Transaction Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.property}</TableCell>
                  <TableCell className={transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(transaction.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownloadReceipt(transaction.id)}>
                          Download Receipt
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewDetails(transaction.id)}>
                          Request Refund
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No transactions found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionHistory;
