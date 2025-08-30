import { Transaction } from '../types';

export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};

export const weiToEth = (wei: string): string => {
  return (parseInt(wei, 16) / Math.pow(10, 18)).toFixed(4);
};

export const generateSampleTransactions = (address: string): Transaction[] => {
  return [
    {
      hash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: address,
      value: '0.5000',
      timestamp: Date.now() - 3600000, // 1 hour ago
      blockNumber: 18500000,
      gasUsed: '21000'
    },
    {
      hash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456a1',
      from: address,
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      value: '0.1500',
      timestamp: Date.now() - 86400000, // 1 day ago
      blockNumber: 18495000,
      gasUsed: '21000'
    },
    {
      hash: '0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef123456a1b2',
      from: '0x9876543210fedcba9876543210fedcba98765432',
      to: address,
      value: '1.2500',
      timestamp: Date.now() - 172800000, // 2 days ago
      blockNumber: 18490000,
      gasUsed: '21000'
    },
    {
      hash: '0xd4e5f6789012345678901234567890abcdef1234567890abcdef123456a1b2c3',
      from: address,
      to: '0x567890abcdef1234567890abcdef1234567890ab',
      value: '0.0750',
      timestamp: Date.now() - 259200000, // 3 days ago
      blockNumber: 18485000,
      gasUsed: '21000'
    },
    {
      hash: '0xe5f6789012345678901234567890abcdef1234567890abcdef123456a1b2c3d4',
      from: '0xfedcba0987654321fedcba0987654321fedcba09',
      to: address,
      value: '2.0000',
      timestamp: Date.now() - 345600000, // 4 days ago
      blockNumber: 18480000,
      gasUsed: '21000'
    }
  ];
};