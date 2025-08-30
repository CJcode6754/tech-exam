import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WalletContextType, WalletState, Transaction } from '../types';
import { WalletService } from '../services/walletService';
import { generateSampleTransactions } from '../utils/walletUtils';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    address: '',
    balance: '0',
    isConnected: false,
    provider: null
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [demoMode, setDemoMode] = useState(false);

  const walletService = WalletService.getInstance();

  const connectWallet = async (): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      const { address, balance } = await walletService.connectToMetaMask();
      
      setWallet({
        address,
        balance,
        isConnected: true,
        provider: window.ethereum
      });

      // Fetch transactions
      const txHistory = await walletService.fetchTransactions(address);
      setTransactions(txHistory.slice(0, 10)); // Limit to 10 transactions
      setDemoMode(false);

    } catch (err: any) {
      console.error('Failed to connect wallet:', err);
      setError(err.message || 'Failed to connect wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const connectDemoWallet = async (): Promise<void> => {
    setIsLoading(true);
    setError('');

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sampleAddress = '0x742d35Cc6Ca4b7eE8b8c4e4E2B4f8c3b9D2A1B3C';
    const sampleBalance = '2.4567';

    setWallet({
      address: sampleAddress,
      balance: sampleBalance,
      isConnected: true,
      provider: null
    });

    const sampleTransactions = generateSampleTransactions(sampleAddress);
    setTransactions(sampleTransactions);
    setDemoMode(true);
    setIsLoading(false);
  };

  const disconnectWallet = (): void => {
    setWallet({
      address: '',
      balance: '0',
      isConnected: false,
      provider: null
    });
    setTransactions([]);
    setError('');
    setDemoMode(false);
  };

  const clearError = (): void => {
    setError('');
  };

  // Setup event listeners
  useEffect(() => {
    const cleanupAccountListener = walletService.setupAccountChangeListener((accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (wallet.isConnected && !demoMode) {
        // Reconnect with new account
        connectWallet();
      }
    });

    const cleanupChainListener = walletService.setupChainChangeListener(() => {
      if (wallet.isConnected && !demoMode) {
        // Reload or reconnect on chain change
        window.location.reload();
      }
    });

    return () => {
      cleanupAccountListener();
      cleanupChainListener();
    };
  }, [wallet.isConnected, demoMode]);

  const contextValue: WalletContextType = {
    wallet,
    transactions,
    isLoading,
    error,
    demoMode,
    connectWallet,
    connectDemoWallet,
    disconnectWallet,
    clearError
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};