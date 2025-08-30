import React from 'react';
import { ExternalLink, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Transaction } from '../types';
import { formatAddress, formatTimestamp } from '../utils/walletUtils';

interface TransactionItemProps {
  transaction: Transaction;
  userAddress: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ 
  transaction, 
  userAddress 
}) => {
  const isIncoming = transaction.to.toLowerCase() === userAddress.toLowerCase();
  const isOutgoing = transaction.from.toLowerCase() === userAddress.toLowerCase();

  const getTransactionType = () => {
    if (isIncoming) return { type: 'Received', icon: ArrowDownLeft, color: 'text-green-600' };
    if (isOutgoing) return { type: 'Sent', icon: ArrowUpRight, color: 'text-red-600' };
    return { type: 'Transaction', icon: ExternalLink, color: 'text-blue-600' };
  };

  const { type, icon: Icon, color } = getTransactionType();

  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
      {/* Transaction Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-2">
            <Icon className={`w-4 h-4 mr-2 ${color}`} />
            <span className={`text-sm font-medium ${color}`}>{type}</span>
          </div>
          <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
          <p className="font-mono text-sm text-blue-600 break-all">
            {formatAddress(transaction.hash)}
          </p>
        </div>
        <a
          href={`https://etherscan.io/tx/${transaction.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 ml-2 flex-shrink-0"
          title="View on Etherscan"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      {/* Transaction Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500 mb-1">From</p>
          <p className="font-mono text-gray-800">{formatAddress(transaction.from)}</p>
          {isOutgoing && (
            <p className="text-xs text-gray-500">(You)</p>
          )}
        </div>
        <div>
          <p className="text-gray-500 mb-1">To</p>
          <p className="font-mono text-gray-800">{formatAddress(transaction.to)}</p>
          {isIncoming && (
            <p className="text-xs text-gray-500">(You)</p>
          )}
        </div>
        <div>
          <p className="text-gray-500 mb-1">Value</p>
          <p className={`font-semibold ${isIncoming ? 'text-green-600' : 'text-red-600'}`}>
            {isIncoming ? '+' : '-'}{transaction.value} ETH
          </p>
        </div>
      </div>
      
      {/* Transaction Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
        <span>Block #{transaction.blockNumber.toLocaleString()}</span>
        <div className="flex items-center space-x-4">
          <span>Gas: {transaction.gasUsed}</span>
          <span>{formatTimestamp(transaction.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};