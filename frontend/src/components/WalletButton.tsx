'use client';

import { useState, useEffect } from 'react';
import { connectWallet, disconnectWallet, isAuthenticated, getUserData } from '@/lib/stacks';

export default function WalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    const checkConnection = () => {
      const connected = isAuthenticated();
      setIsConnected(connected);
      
      if (connected) {
        const userData = getUserData();
        if (userData) {
          setUserAddress(userData.profile.stxAddress.testnet);
        }
      }
    };

    checkConnection();
  }, []);

  const handleConnect = () => {
    connectWallet();
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          Connected: {userAddress.slice(0, 8)}...{userAddress.slice(-8)}
        </div>
        <button
          onClick={handleDisconnect}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
    >
      Connect Hiro Wallet
    </button>
  );
}
