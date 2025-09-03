import React, { createContext, useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

const TransferContext = createContext(null);

const STEPS = {
  ACCOUNT: 'account',
  PAYEE: 'payee', 
  DETAILS: 'details',
  REVIEW: 'review',
  SUCCESS: 'success'
};

const STEP_ORDER = [STEPS.ACCOUNT, STEPS.PAYEE, STEPS.DETAILS, STEPS.REVIEW, STEPS.SUCCESS];

const initialState = {
  selectedAccount: null,
  selectedPayee: null,
  transferDetails: {
    amount: '',
    reference: '',
    description: ''
  },
  sessionToken: null,
  step: STEPS.ACCOUNT,
  skipPayeeSelect: false,
  errors: {}
};

const validateAccount = (account) => {
  if (!account || typeof account !== 'object') return false;
  return account.id && account.name && account.balance >= 0;
};

const validatePayee = (payee) => {
  if (!payee || typeof payee !== 'object') return false;
  return payee.id && payee.name && payee.accountNumber;
};

const validateTransferDetails = (details) => {
  if (!details || typeof details !== 'object') return false;
  const amount = parseFloat(details.amount);
  return amount > 0 && details.reference?.trim();
};

function transferReducer(state, action) {
  switch (action.type) {
    case 'SET_ACCOUNT': {
      if (!validateAccount(action.payload)) {
        return { ...state, errors: { account: 'Invalid account selected' } };
      }
      const nextStep = state.skipPayeeSelect ? STEPS.DETAILS : STEPS.PAYEE;
      return { 
        ...state, 
        selectedAccount: action.payload, 
        step: nextStep,
        errors: { ...state.errors, account: null }
      };
    }
    
    case 'SET_PAYEE': {
      if (!validatePayee(action.payload)) {
        return { ...state, errors: { payee: 'Invalid payee selected' } };
      }
      return { 
        ...state, 
        selectedPayee: action.payload, 
        step: STEPS.DETAILS,
        errors: { ...state.errors, payee: null }
      };
    }
    
    case 'SET_DETAILS': {
      if (!validateTransferDetails(action.payload)) {
        return { ...state, errors: { details: 'Invalid transfer details' } };
      }
      return { 
        ...state, 
        transferDetails: action.payload, 
        step: STEPS.REVIEW,
        errors: { ...state.errors, details: null }
      };
    }
    
    case 'SET_SESSION':
      return { ...state, sessionToken: action.payload };
      
    case 'SET_SKIP_PAYEE_SELECT':
      return { ...state, skipPayeeSelect: Boolean(action.payload) };
      
    case 'SET_ERROR':
      return { 
        ...state, 
        errors: { ...state.errors, [action.field]: action.message }
      };
      
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
      
    case 'RESET':
      return { ...initialState };
      
    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
}

export function TransferProvider({ children }) {
  const [state, dispatch] = useReducer(transferReducer, initialState);

  const contextValue = useMemo(() => {
    const canAccess = (requiredStep) => {
      const currentIndex = STEP_ORDER.indexOf(state.step);
      const requiredIndex = STEP_ORDER.indexOf(requiredStep);
      return currentIndex >= requiredIndex;
    };

    return { state, dispatch, canAccess, STEPS };
  }, [state]);

  return (
    <TransferContext.Provider value={contextValue}>
      {children}
    </TransferContext.Provider>
  );
}

TransferProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useTransfer = () => {
  const context = useContext(TransferContext);
  if (!context) {
    throw new Error('useTransfer must be used within a TransferProvider');
  }
  return context;
};

export { STEPS };