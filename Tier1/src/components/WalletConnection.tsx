import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { isMetaMaskInstalled } from '../utils/walletUtils';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const WalletConnection: React.FC = () => {
  const { 
    wallet, 
    isLoading, 
    demoMode, 
    connectWallet, 
    connectDemoWallet 
  } = useWallet();

  if (wallet.isConnected) {
    return null; // Don't render if wallet is already connected
  }

  return (
    <div className="text-center py-8">
      <Wallet className="w-16 h-16 mx-auto mb-4 text-blue-600" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Wallet</h2>
      <p className="text-gray-600 mb-6">Choose your connection method</p>
      
      <div className="space-y-4">
        {isMetaMaskInstalled() ? (
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg block w-full max-w-xs mx-auto"
          >
            {isLoading && !demoMode ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" color="white" />
                <span className="ml-2">Connecting to MetaMask...</span>
              </div>
            ) : (
              'Connect MetaMask'
            )}
          </button>
        ) : (
          <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm">
              MetaMask not detected.{' '}
              <a 
                href="https://metamask.io" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-orange-900"
              >
                Install MetaMask
              </a>
              {' '}to connect your real wallet.
            </p>
          </div>
        )}
        
        <button
          onClick={connectDemoWallet}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg block w-full max-w-xs mx-auto"
        >
          {isLoading && demoMode ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" color="white" />
              <span className="ml-2">Connecting Demo...</span>
            </div>
          ) : (
            'Try Demo Mode'
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-4">Demo mode uses sample data for testing purposes</p>
    </div>
  );
};