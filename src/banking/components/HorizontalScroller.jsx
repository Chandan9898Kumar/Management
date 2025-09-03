import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDeviceType } from '../hooks/useDeviceType';

const HorizontalScroller = ({ 
  items = [], 
  selectedId, 
  onSelect, 
  title = "Select Option",
  className = ""
}) => {
  // Validation
  if (!Array.isArray(items)) {
    console.error('HorizontalScroller: items must be an array');
    return null;
  }
  
  if (typeof onSelect !== 'function') {
    console.error('HorizontalScroller: onSelect must be a function');
    return null;
  }

  const { isMobile } = useDeviceType();
  const scrollerRef = useRef(null);
  const [currentDot, setCurrentDot] = useState(0);
  const [showDots, setShowDots] = useState(false);

  const dotsCount = useMemo(() => items.length, [items.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const checkScrollable = () => {
      setShowDots(scroller.scrollWidth > scroller.clientWidth);
    };

    const handleScroll = () => {
      const scrollLeft = scroller.scrollLeft;
      const scrollWidth = scroller.scrollWidth - scroller.clientWidth;
      const dotIndex = Math.round((scrollLeft / scrollWidth) * (dotsCount - 1));
      setCurrentDot(Math.max(0, Math.min(dotIndex, dotsCount - 1)));
    };

    checkScrollable();
    scroller.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollable);

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollable);
    };
  }, [items.length, dotsCount, isMobile]);

  const containerStyle = {
    padding: isMobile ? "16px" : "20px",
    backgroundColor: isMobile ? "#f8f9fa" : "#ffffff",
    marginBottom: isMobile ? "16px" : "24px",
  };

  const titleStyle = {
    fontSize: isMobile ? "18px" : "20px",
    fontWeight: "600",
    marginBottom: isMobile ? "12px" : "16px",
    color: "#333",
  };

  const scrollerStyle = {
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    gap: isMobile ? "12px" : "16px",
    padding: isMobile ? "8px 0 16px 0" : "12px 0 20px 0",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    WebkitOverflowScrolling: "touch",
    scrollBehavior: "smooth",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
  };

  const itemStyle = (isSelected) => ({
    minWidth: isMobile ? "80px" : "100px",
    width: isMobile ? "auto" : "auto",
    padding: isMobile ? "14px 8px" : "16px 12px",
    backgroundColor: isSelected ? "#007bff" : "white",
    border: isSelected ? "2px solid #007bff" : "1px solid #e0e0e0",
    borderRadius: isMobile ? "12px" : "8px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: isSelected ? "0 4px 12px rgba(0,123,255,0.3)" : "0 2px 8px rgba(0,0,0,0.1)",
    color: isSelected ? "white" : "#333",
    transition: "all 0.3s ease",
    flexShrink: 0,
    flexGrow: 0,
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    whiteSpace: "nowrap",
  });

  const iconStyle = {
    fontSize: isMobile ? "24px" : "28px",
    marginBottom: isMobile ? "8px" : "12px",
    display: "block",
  };

  const textStyle = {
    fontSize: isMobile ? "12px" : "14px",
    fontWeight: "600",
    margin: 0,
    lineHeight: "1.2",
  };

  const dotsContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "12px",
  };

  const dotStyle = (isActive) => ({
    width: isMobile ? "8px" : "6px",
    height: isMobile ? "8px" : "6px",
    borderRadius: "50%",
    backgroundColor: isActive ? "#007bff" : "#d0d0d0",
    transition: "all 0.3s ease",
    cursor: "pointer",
  });

  const scrollToDot = useCallback((dotIndex) => {
    const scroller = scrollerRef.current;
    if (!scroller || dotIndex < 0 || dotIndex >= items.length) return;
    
    const children = scroller.children;
    if (dotIndex >= children.length) return;
    
    const targetChild = children[dotIndex];
    const containerWidth = scroller.clientWidth;
    const childLeft = targetChild.offsetLeft;
    const childWidth = targetChild.offsetWidth;
    
    const scrollLeft = childLeft - (containerWidth - childWidth) / 2;
    
    scroller.scrollTo({ 
      left: Math.max(0, Math.min(scrollLeft, scroller.scrollWidth - containerWidth)), 
      behavior: 'smooth' 
    });
  }, [items.length]);

  const handleItemClick = useCallback((item) => {
    if (!item?.id) {
      console.warn('HorizontalScroller: Invalid item clicked');
      return;
    }
    onSelect(item);
  }, [onSelect]);

  return (
    <div style={containerStyle} className={className}>
      <h3 style={titleStyle}>{title}</h3>
      <div 
        ref={scrollerRef}
        style={scrollerStyle}
        className="horizontal-scroller"
        role="listbox"
        aria-label={title}
      >
        {items.map((item) => {
          if (!item?.id) {
            console.warn('HorizontalScroller: Item missing required id', item);
            return null;
          }
          
          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              style={itemStyle(selectedId === item.id)}
              role="option"
              aria-selected={selectedId === item.id}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleItemClick(item);
                }
              }}
            >
              {item.icon && (
                <div style={iconStyle} aria-hidden="true">
                  {item.icon}
                </div>
              )}
              <p style={textStyle}>{item.label || 'Unnamed'}</p>
            </div>
          );
        })}
      </div>
      
      {showDots && dotsCount > 1 && (
        <div style={dotsContainerStyle} role="tablist">
          {Array.from({ length: dotsCount }, (_, index) => (
            <button
              key={index}
              style={{...dotStyle(currentDot === index), border: 'none', padding: '4px'}}
              onClick={() => scrollToDot(index)}
              aria-label={`Go to item ${index + 1}`}
              tabIndex={currentDot === index ? "0" : "-1"}
            />
          ))}
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .horizontal-scroller::-webkit-scrollbar {
            display: none;
          }
          .horizontal-scroller {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />
    </div>
  );
};

HorizontalScroller.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string
  })).isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string
};

export default HorizontalScroller;