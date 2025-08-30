import { Transaction } from '../types';
import { weiToEth, generateSampleTransactions } from '../utils/walletUtils';

export class WalletService {
  private static instance: WalletService;

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  async connectToMetaMask(): Promise<{ address: string; balance: string }> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please make sure MetaMask is unlocked.');
      }

      const address = accounts[0];
      
      // Get balance
      const balanceWei = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });

      const balance = weiToEth(balanceWei);

      return { address, balance };
    } catch (error: any) {
      console.error('MetaMask connection error:', error);
      throw new Error(error.message || 'Failed to connect to MetaMask');
    }
  }

  async fetchTransactions(address: string): Promise<Transaction[]> {
    try {
      // Get latest block number
      const latestBlock = await window.ethereum.request({
        method: 'eth_blockNumber'
      });
      
      const latestBlockNumber = parseInt(latestBlock, 16);

      // In a real application, you would query transaction history using:
      // - Etherscan API
      // - Alchemy API  
      // - Infura API
      // - The Graph Protocol
      
      // For this demo, we'll return sample data
      console.log(`Fetching transactions for ${address} up to block ${latestBlockNumber}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return generateSampleTransactions(address);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw new Error('Failed to fetch transaction history');
    }
  }

  setupAccountChangeListener(onAccountChange: (accounts: string[]) => void): () => void {
    if (!window.ethereum) return () => {};

    const handleAccountsChanged = (accounts: string[]) => {
      onAccountChange(accounts);
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // Return cleanup function
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }

  setupChainChangeListener(onChainChange: () => void): () => void {
    if (!window.ethereum) return () => {};

    const handleChainChanged = () => {
      onChainChange();
    };

    window.ethereum.on('chainChanged', handleChainChanged);

    // Return cleanup function
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }

  async getCurrentChain(): Promise<string> {
    if (!window.ethereum) throw new Error('MetaMask not available');
    
    return await window.ethereum.request({ method: 'eth_chainId' });
  }
}