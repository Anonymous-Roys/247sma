import React, { useState, useEffect, useRef } from 'react';
import {
  MoreVertical,
  ChevronRight,
  Check,
  Download,
  Trash,
  X
} from 'lucide-react';

interface Transaction {
  id: number;
  status: string;
  cardType: string;
  lastFour: string;
  amount: number;
  date: string;
  merchant: string;
  type: string;
}

const Transactions: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const transactions: Transaction[] = [
    {
      id: 1,
      status: 'Completed',
      cardType: 'Visa',
      lastFour: '4831',
      amount: 182.94,
      date: 'Jan 17, 2022',
      merchant: 'Amazon',
      type: 'Card payment'
    },
    {
      id: 2,
      status: 'Completed',
      cardType: 'Mastercard',
      lastFour: '6442',
      amount: 99.00,
      date: 'Jan 17, 2022',
      merchant: 'Facebook',
      type: 'Card payment'
    }
  ];

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleDownload = (transaction: Transaction) => {

    console.log(`Downloading receipt for transaction ID: ${transaction.id}`);
  };

  const handleDelete = (transaction: Transaction) => {
    // Add your delete logic here
    console.log(`Deleting transaction ID: ${transaction.id}`);
    // Remove transaction from state (you'll likely want to filter the transactions array)
  };

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full lg:col-span-2">
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">Transactions</h2>
            <p className="text-sm text-gray-500">View and manage your transactions</p>
          </div>
          <button className="flex items-center text-green-500 hover:text-green-600">
            See All Transactions
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="overflow-hidden divide-y">
  {transactions.map((transaction) => (
    <div 
      key={transaction.id}
      className="relative p-4 cursor-pointer hover:bg-gray-50"
    >
      <div 
        className="flex items-center justify-between w-full"
        onClick={() => handleTransactionClick(transaction)}
      >
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <div>
            <div className="font-medium">
              {/* Shorten card type for small screens */}
              <span className="sm:hidden">
                {transaction.cardType[0]}-**** {transaction.lastFour}
              </span>
              <span className="hidden sm:inline">
                {transaction.cardType} card **** {transaction.lastFour}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {transaction.type}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div>
            <div className="font-medium text-right">
              ${transaction.amount.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              {transaction.date}
            </div>
          </div>

          <div className="text-gray-500">
            {/* Shorten merchant name for small screens */}
            <span className="sm:hidden">
              {transaction.merchant.length > 10 ? `${transaction.merchant.slice(0, 7)}...` : transaction.merchant}
            </span>
            <span className="hidden sm:inline">
              {transaction.merchant}
            </span>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu(transaction.id);
              }}
              className="p-1 rounded hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
            
            {activeMenu === transaction.id && (
              <div className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-md shadow-lg">
                <div className="py-1">
                  <button 
                    onClick={() => handleDownload(transaction)} 
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download receipt
                  </button>
                  <button 
                    onClick={() => handleDelete(transaction)} 
                    className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete transaction
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* Transaction Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-2xl bg-white rounded-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Transaction Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <div className="flex items-center text-green-500">
                  <Check className="w-4 h-4 mr-1" />
                  {selectedTransaction?.status}
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">${selectedTransaction?.amount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span>{selectedTransaction?.date}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Card</span>
                <span>{selectedTransaction?.cardType} **** {selectedTransaction?.lastFour}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Merchant</span>
                <span>{selectedTransaction?.merchant}</span>
              </div>
            </div>
            
            <div className="flex justify-end p-4 space-x-2 border-t">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-500 rounded hover:bg-gray-100"
              >
                Close
              </button>
              <button className="flex items-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
