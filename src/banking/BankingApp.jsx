import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TransferProvider } from './TransferContext';
import AccountDashboard from './AccountDashboard';
import ManagePayee from './ManagePayee';
import PayeeSelect from './PayeeSelect';
import TransferDetails from './TransferDetails';
import ReviewTransfer from './ReviewTransfer';
import TransferSuccess from './TransferSuccess';
import TransferError from './TransferError';
import ROUTES from './routes';

function BankingApp() {
  return (
    <TransferProvider>
      <Routes>
        <Route path="/" element={<AccountDashboard />} />
        <Route path="/manage-payee" element={<ManagePayee />} />
        <Route path="/payee-select" element={<PayeeSelect />} />
        <Route path="/transfer-details" element={<TransferDetails />} />
        <Route path="/review" element={<ReviewTransfer />} />
        <Route path="/success" element={<TransferSuccess />} />
        <Route path="/error" element={<TransferError />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TransferProvider>
  );
}

export default BankingApp;