const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockResponses = {
  accounts: [
    { id: "1", name: "Savings Account", number: "****1234", balance: 50000, type: "savings" },
    { id: "2", name: "Current Account", number: "****5678", balance: 25000, type: "current" },
    { id: "3", name: "Salary Account", number: "****9012", balance: 75000, type: "salary" },
  ],
  payees: [
    { id: '1', name: 'John Doe', accountNumber: '1234567890', bank: 'ABC Bank' },
    { id: '2', name: 'Jane Smith', accountNumber: '0987654321', bank: 'XYZ Bank' },
  ]
};

class ApiService {
  async request(endpoint, options = {}) {
    await delay(800);
    
    try {
      if (endpoint.includes('/accounts') && options.method !== 'POST') {
        return { data: mockResponses.accounts, success: true };
      }
      
      if (endpoint.includes('/payees')) {
        if (options.method !== 'POST') {
          return { data: mockResponses.payees, success: true };
        }
        if (options.method === 'POST') {
          const newPayee = { ...JSON.parse(options.body), id: Date.now().toString() };
          mockResponses.payees.push(newPayee);
          return { data: newPayee, success: true };
        }
      }
      
      if (endpoint.includes('/transfer') && options.method === 'POST') {
        const success = Math.random() > 0.1;
        if (success) {
          return { 
            data: { 
              transactionId: `TXN_${Date.now()}`,
              status: 'SUCCESS',
              timestamp: new Date().toISOString()
            }, 
            success: true 
          };
        } else {
          throw new Error('Transfer failed due to network issue');
        }
      }
      
      return { data: null, success: true };
    } catch (error) {
      return { error: error.message, success: false };
    }
  }

  async getAccounts() {
    return this.request('/accounts');
  }

  async getPayees() {
    return this.request('/payees');
  }

  async createPayee(payeeData) {
    return this.request('/payees', {
      method: 'POST',
      body: JSON.stringify(payeeData)
    });
  }

  async processTransfer(transferData) {
    return this.request('/transfer', {
      method: 'POST',
      body: JSON.stringify(transferData)
    });
  }
}

export default new ApiService();