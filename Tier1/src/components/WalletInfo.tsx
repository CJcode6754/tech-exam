import React, { useState } from 'react';
import { CheckCircle, Copy } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { formatAddress, copyToClipboard } from '../utils/walletUtils';

export const WalletInfo: React.FC = () => {
  const { wallet, demoMode, disconnectWallet } = useWallet();
  const [copiedAddress, setCopiedAddress] = useState(false);

  if (!wallet.isConnected) {
    return null;
  }

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(wallet.address);
    if (success) {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
          <span className="text-green-600 font-semibold">
            {demoMode ? 'Demo Wallet Connected' : 'Wallet Connected'}
          </span>
          {demoMode && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              DEMO
            </span>
          )}
        </div>
        
        {/* Address Display */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">Wallet Address</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="font-mono text-sm text-gray-800">
              {formatAddress(wallet.address)}
            </span>
            <button
              onClick={handleCopyAddress}
              className="text-blue-600 hover:text-blue-800 transition-colors"
              title="Copy full address"
            >
              {copiedAddress ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          {copiedAddress && (
            <p className="text-xs text-green-600 mt-1">Address copied!</p>
          )}
        </div>

        {/* Balance Display */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-4">
          <p className="text-sm text-gray-600 mb-2">Current Balance</p>
          <p className="text-3xl font-bold text-gray-800">{wallet.balance} ETH</p>
          {demoMode && (
            <p className="text-xs text-gray-500 mt-1">Sample balance for demo</p>
          )}
        </div>

        <button
          onClick={disconnectWallet}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full transition-colors"
        >
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
};