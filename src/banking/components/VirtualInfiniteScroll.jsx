import React, { useState, useEffect, useRef, useMemo } from 'react';

const VirtualInfiniteScroll = ({
  fetchData,
  data = null, // Static data array
  renderItem,
  itemHeight = 100,
  containerHeight = 400,
  pageSize = 20,
  threshold = 5
}) => {
  const [items, setItems] = useState(data || []);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!data);
  const [page, setPage] = useState(0);
  const isStaticMode = data !== null;
  const containerRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);

  const loadMore = async (pageNum) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await fetchData({ page: pageNum, limit: pageSize });
      
      if (pageNum === 0) {
        setItems(response.data);
      } else {
        setItems(prev => [...prev, ...response.data]);
      }
      
      setHasMore(response.hasMore);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to load data:', error);
      setHasMore(false);
    }
    setLoading(false);
  };

  // Calculate visible range
  const { startIndex, endIndex, totalHeight } = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(start + visibleCount + 2, items.length); // +2 for buffer
    
    const extraHeight = (!hasMore && !loading && items.length > 0) ? itemHeight : (loading ? itemHeight : 0);
    
    return {
      startIndex: Math.max(0, start - 1), // -1 for buffer
      endIndex: end,
      totalHeight: (items.length * itemHeight) + extraHeight
    };
  }, [scrollTop, itemHeight, containerHeight, items.length]);

  // Load initial data only for infinite scroll mode
  useEffect(() => {
    if (!isStaticMode) {
      loadMore(0);
    }
  }, [isStaticMode]);

  // Show loading for initial load
  if (items.length === 0 && loading) {
    return (
      <div style={{ height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    );
  }

  // Show empty state
  if (items.length === 0 && !loading) {
    return (
      <div style={{ height: containerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        No items found
      </div>
    );
  }

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    setScrollTop(scrollTop);
    
    // Check if need to load more (only for infinite scroll mode)
    if (!isStaticMode) {
      const scrollBottom = scrollTop + containerHeight;
      const shouldLoadMore = scrollBottom >= totalHeight - (threshold * itemHeight);
      
      if (shouldLoadMore && hasMore && !loading) {
        loadMore(page + 1);
      }
    }
  };

  // Render only visible items
  const visibleItems = items.slice(startIndex, endIndex).map((item, index) => {
    const actualIndex = startIndex + index;
    return (
      <div
        key={item.id || actualIndex}
        style={{
          position: 'absolute',
          top: actualIndex * itemHeight,
          left: 0,
          right: 0,
          height: itemHeight
        }}
      >
        {renderItem(item, actualIndex)}
      </div>
    );
  });

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems}
        
        {!isStaticMode && loading && (
          <div
            style={{
              position: 'absolute',
              top: items.length * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5'
            }}
          >
            Loading more...
          </div>
        )}
        
        {!isStaticMode && !hasMore && !loading && items.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: items.length * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              color: '#666',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            ✓ All payees loaded ({items.length} total)
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualInfiniteScroll;