import React from 'react';
import { Scale, Wifi, WifiOff } from 'lucide-react';

interface HeaderProps {
  status: string;
  isConnected: boolean;
}

export default function Header({ status, isConnected }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Scale className="card-icon" />
          NyaySaathi
        </div>
        <div className="status-badge">
          {isConnected ? (
            <>
              <div className="status-dot"></div>
              <Wifi size={16} />
              Connected
            </>
          ) : (
            <>
              <WifiOff size={16} />
              Disconnected
            </>
          )}
        </div>
      </div>
    </header>
  );
}
