import React from 'react';
import { WalletProvider } from './context/WalletContext';
import { Header } from './components/Header';
import { ErrorAlert } from './components/ErrorAlert';
import { WalletConnection } from './components/WalletConnection';
import { WalletInfo } from './components/WalletInfo';
import { TransactionList } from './components/TransactionList';
import { useWallet } from './context/WalletContext';

const AppContent: React.FC = () => {
  const { error, clearError } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        {error && (
          <ErrorAlert 
            message={error} 
            onClose={clearError}
          />
        )}

        {/* Wallet Connection/Info Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6">
          <WalletConnection />
          <WalletInfo />
        </div>

        {/* Transaction History */}
        <TransactionList />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
};

export default App;