import React from 'react';
import { usePullToRefresh } from '../../hooks/usePullToRefresh';
import './PullToRefresh.css';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const { isRefreshing, pullDistance } = usePullToRefresh({ onRefresh });

  return (
    <div className="pull-to-refresh-container">
      <div 
        className="pull-indicator"
        style={{ 
          transform: `translateY(${Math.min(pullDistance * 0.5, 60)}px)`,
          opacity: pullDistance > 0 ? 1 : 0 
        }}
      >
        {isRefreshing ? (
          <div className="spinner" />
        ) : (
          <div className="arrow">↓</div>
        )}
      </div>
      <div 
        className="content"
        style={{ transform: `translateY(${Math.min(pullDistance * 0.3, 40)}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;