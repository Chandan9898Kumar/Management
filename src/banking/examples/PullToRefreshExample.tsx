import React, { useState } from 'react';
import PullToRefresh from '../banking/components/PullToRefresh';

const PullToRefreshExample: React.FC = () => {
  const [data, setData] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const handleRefresh = async (): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update data
    setData(prev => [`New Item ${Date.now()}`, ...prev]);
    setLastRefresh(new Date());
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div style={{ padding: '20px' }}>
        <h2>Pull to Refresh Demo</h2>
        <p>Last refreshed: {lastRefresh.toLocaleTimeString()}</p>
        
        <div style={{ marginTop: '20px' }}>
          {data.map((item, index) => (
            <div 
              key={index}
              style={{
                padding: '15px',
                margin: '10px 0',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </PullToRefresh>
  );
};

export default PullToRefreshExample;