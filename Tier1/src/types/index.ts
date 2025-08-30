export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  blockNumber: number;
  gasUsed: string;
}

export interface WalletState {
  address: string;
  balance: string;
  isConnected: boolean;
  provider: any;
}

export interface WalletContextType {
  wallet: WalletState;
  transactions: Transaction[];
  isLoading: boolean;
  error: string;
  demoMode: boolean;
  connectWallet: () => Promise<void>;
  connectDemoWallet: () => Promise<void>;
  disconnectWallet: () => void;
  clearError: () => void;
}

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}