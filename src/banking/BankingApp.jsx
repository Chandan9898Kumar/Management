import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TransferProvider } from './TransferContext';
import AccountDashboard from './AccountDashboard';
// import AccountSelect from './AccountSelect';
import ManagePayee from './ManagePayee';
import PayeeSelect from './PayeeSelect';
// import VirtualPayeeSelect from './components/VirtualPayeeSelect';
import TransferDetails from './TransferDetails';
import ReviewTransfer from './ReviewTransfer';
import TransferSuccess from './TransferSuccess';
import TransferError from './TransferError';
import ROUTES from './routes';

function BankingApp() {
  return (
    <TransferProvider>
      <BrowserRouter>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <header style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h1>🏦 Secure Banking Transfer</h1>
            <div style={{ height: '4px', backgroundColor: '#007bff', margin: '10px 0' }}></div>
          </header>

          <Routes>
            <Route path="/" element={<Navigate to={ROUTES.ACCOUNT_SELECT} replace />} />
            <Route path={ROUTES.ACCOUNT_SELECT} element={<AccountDashboard />} />
            <Route path={ROUTES.MANAGE_PAYEE} element={<ManagePayee />} />
            <Route path={ROUTES.PAYEE_SELECT} element={<PayeeSelect />} />
            {/* <Route path={ROUTES.PAYEE_SELECT} element={<VirtualPayeeSelect />} /> */}
            <Route path={ROUTES.TRANSFER_DETAILS} element={<TransferDetails />} />
            <Route path={ROUTES.REVIEW} element={<ReviewTransfer />} />
            <Route path={ROUTES.SUCCESS} element={<TransferSuccess />} />
            <Route path={ROUTES.ERROR} element={<TransferError />} />
            <Route path="*" element={<Navigate to={ROUTES.ACCOUNT_SELECT} replace />} />
          </Routes>

          <footer style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
            <p>🔒 Your transactions are secured with 256-bit SSL encryption</p>
            <p>© 2024 Secure Bank. All rights reserved.</p>
          </footer>
        </div>
      </BrowserRouter>
    </TransferProvider>
  );
}

export default BankingApp;