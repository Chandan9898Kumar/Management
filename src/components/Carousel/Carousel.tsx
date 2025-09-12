import React, {  useCallback } from "react";
import "./style.css";
import { useState, useRef, useEffect } from "react";

// Demo banking tabs data
const bankingTabs: BankingTab[] = [
  {
    id: "cards",
    title: "Cards",
    subtitle: "Manage your credit and debit cards",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iNCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxwYXRoIGQ9Im0yIDEwaDIwIiBzdHJva2U9ImJhY2tncm91bmQiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K",
    color: "blue",
    onClick: () => console.log("Cards clicked"),
  },
  {
    id: "transfer",
    title: "Transfer",
    subtitle: "Send money to friends and family",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgMTJoMTQiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJtMTIgNSA3IDctNyA3IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
    color: "green",
    onClick: () => console.log("Transfer clicked"),
  },
  {
    id: "investments",
    title: "Investments",
    subtitle: "Grow your wealth with smart investing",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0ibTMgMyAzIDkgOSAzIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0ibTIxIDIxLTYtNi02LTYiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJtMTUgOSA2IDZWOWgtNloiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4K",
    color: "purple",
    onClick: () => console.log("Investments clicked"),
  },
  {
    id: "savings",
    title: "Savings",
    subtitle: "Build your emergency fund",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDVjLTEuNSAwLTIuOCAxLjQtMyAzLTEuNS0xLjQtNi0yLTkgLjUtNS42IDQuNi0yIDEzLjUgMiAxNSAyLjggMS4xIDUuNSAyIDEwIDFsMi0yaDFjMi44IDAgNS0yLjIgNS01di02YzAtNC40LTMuNi04LTgtOFoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMiAyMXMzLTIgOS00IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
    color: "green",
    onClick: () => console.log("Savings clicked"),
  },
  {
    id: "loans",
    title: "Loans",
    subtitle: "Personal and home loans",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0ibTMgOSA5LTctOSA3djExYTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY5Wm05IDExVjl2MTBabTAtMTBWOXYxMFoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4K",
    color: "orange",
    onClick: () => console.log("Loans clicked"),
  },
  {
    id: "insurance",
    title: "Insurance",
    subtitle: "Protect what matters most",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIycy04LTQtOC0xMFY1bDgtM3M4IDQgOCAzdjdsOC05LTggNFoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4K",
    color: "blue",
    onClick: () => console.log("Insurance clicked"),
  },
];

const App = () => {
  return <BankingCarousel tabs={bankingTabs} />;
};

export default App;

interface BankingTab {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
  onClick?: () => void;
}

interface CarouselItemProps {
  tab: BankingTab;
  isActive: boolean;
  onClick: () => void;
}

interface BankingCarouselProps {
  tabs: BankingTab[];
  className?: string;
}

const CarouselItem = ({ tab, isActive, onClick }: CarouselItemProps) => {
  return (
    <div className="carousel-item">
      <div
        className={`banking-card ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        {/* Icon container with gradient background */}
        <div className={`icon-container ${tab.color}`}>
          <img src={tab.icon} alt={tab.title} className="icon-image" />
        </div>

        {/* Content */}
        <div className="card-content">
          <h3 className="card-title">{tab.title}</h3>
          {tab.subtitle && <p className="card-subtitle">{tab.subtitle}</p>}
        </div>

        {/* Active indicator */}
        <div className="active-indicator"></div>
      </div>
    </div>
  );
};

const BankingCarousel = ({ tabs, className = "" }: BankingCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateActiveIndex = useCallback(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const elementRect = element.getBoundingClientRect();
      const elementCenter = elementRect.left + elementRect.width / 2;
      const distance = Math.abs(containerCenter - elementCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    isScrollingRef.current = true;

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set a timeout to detect when scrolling ends
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      updateActiveIndex();
    }, 150);
  }, [updateActiveIndex]);

  const handleTabClick = (index: number, tab: BankingTab) => {
    setActiveIndex(index);
    tab.onClick?.();

    // Smooth scroll to center the clicked item
    if (scrollRef.current) {
      const container = scrollRef.current;
      const item = container.children[index] as HTMLElement;
      if (item) {
        const containerWidth = container.clientWidth;
        const itemWidth = item.clientWidth;
        const itemOffset = item.offsetLeft;
        const scrollPosition = itemOffset - containerWidth / 2 + itemWidth / 2;

        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      // Add passive listeners for better performance
      container.addEventListener("scroll", handleScroll, { passive: true });

      // Add touch event listeners for better mobile support
      let startX = 0;
      let scrollLeft = 0;

      const handleTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!startX) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        container.scrollLeft = scrollLeft - walk;
      };

      const handleTouchEnd = () => {
        startX = 0;
        setTimeout(updateActiveIndex, 100);
      };

      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [handleScroll, updateActiveIndex]);

  return (
    <div className={className}>
      <div ref={scrollRef} className="carousel-container">
        {tabs.map((tab, index) => (
          <CarouselItem
            key={tab.id}
            tab={tab}
            isActive={index === activeIndex}
            onClick={() => handleTabClick(index, tab)}
          />
        ))}
      </div>

      {/* Dots indicator */}
      <div className="dots-container">
        {tabs.map((_, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index, tabs[index])}
            className={`dot ${index === activeIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
