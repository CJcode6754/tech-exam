import React from 'react';
import { useWallet } from '../context/WalletContext';
import { TransactionItem } from '../components/TransactionItem';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const TransactionList: React.FC = () => {
  const { wallet, transactions, isLoading, demoMode } = useWallet();

  if (!wallet.isConnected) {
    return null;
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h3>
      
      {isLoading ? (
        <div className="text-center py-8">
          <LoadingSpinner size="lg" color="blue" />
          <p className="text-gray-600 mt-4">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No recent transactions found</p>
          {demoMode ? (
            <p className="text-sm mt-2">This demo shows sample transaction data</p>
          ) : (
            <p className="text-sm mt-2">
              Note: Transaction history requires integration with Etherscan API or similar service
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <TransactionItem
              key={`${transaction.hash}-${index}`}
              transaction={transaction}
              userAddress={wallet.address}
            />
          ))}
          {demoMode && (
            <div className="text-center pt-4">
              <p className="text-xs text-blue-600 bg-blue-50 rounded-full px-3 py-1 inline-block">
                Displaying sample transaction data for demo purposes
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};