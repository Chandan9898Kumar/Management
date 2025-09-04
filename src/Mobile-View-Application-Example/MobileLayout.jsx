
import { useMobileLayout } from './useMobileLayout';

const MobileLayout = ({
  children,
  header,
  footer,
  backgroundColor = '#f8f9fa',
  headerStyle = {},
  footerStyle = {},
  contentStyle = {},
}) => {
  const { safeAreaTop, safeAreaBottom } = useMobileLayout();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor,
        overflow: 'hidden', // Prevent body scroll
      }}
    >
      {/* Header - Fixed */}
      {header && (
        <header
          style={{
            flex: '0 0 auto',
            paddingTop: safeAreaTop,
            ...headerStyle,
          }}
        >
          {header}
        </header>
      )}

      {/* Main Content - Scrollable */}
      <main
        style={{
          flex: '1',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch', // Smooth iOS scrolling
          ...contentStyle,
        }}
      >
        {children}
      </main>

      {/* Footer - Fixed */}
      {footer && (
        <footer
          style={{
            flex: '0 0 auto',
            paddingBottom: safeAreaBottom,
            ...footerStyle,
          }}
        >
          {footer}
        </footer>
      )}
    </div>
  );
};

export default MobileLayout;
