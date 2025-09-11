import React, { useState, useMemo, useRef } from 'react';

const VirtualStaticScroll = ({
  data = [],
  renderItem,
  itemHeight = 100,
  containerHeight = 400
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef();

  const { startIndex, endIndex, totalHeight } = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(start + visibleCount + 2, data.length);
    
    return {
      startIndex: Math.max(0, start - 1),
      endIndex: end,
      totalHeight: data.length * itemHeight
    };
  }, [scrollTop, itemHeight, containerHeight, data.length]);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const visibleItems = data.slice(startIndex, endIndex).map((item, index) => {
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
      </div>
    </div>
  );
};

export default VirtualStaticScroll;