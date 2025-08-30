import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="text-center text-white mb-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Ethereum Wallet Interface
      </h1>
      <p className="text-lg opacity-90">
        Connect your wallet to view balance and transaction history
      </p>
      <div className="mt-4 text-sm opacity-75">
        <p>Built with React, TypeScript, and Tailwind CSS</p>
        <p>Supports MetaMask integration with demo mode</p>
      </div>
    </div>
  );
};