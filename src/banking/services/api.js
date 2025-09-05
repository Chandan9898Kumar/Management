const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockResponses = {
  accounts: [
    {
      id: "1",
      name: "Savings Account",
      number: "****1234",
      balance: 50000,
      type: "savings",
    },
    {
      id: "2",
      name: "Current Account",
      number: "****5678",
      balance: 25000,
      type: "current",
    },
    {
      id: "3",
      name: "Salary Account",
      number: "****9012",
      balance: 75000,
      type: "salary",
    },
  ],
  payees: [
    {
      id: "1",
      name: "John Doe",
      accountNumber: "1234567890",
      bank: "ABC Bank",
    },
    {
      id: "2",
      name: "Jane Smith",
      accountNumber: "0987654321",
      bank: "XYZ Bank",
    },
    {
      id: "3",
      name: "John Doe",
      accountNumber: "1234567890",
      bank: "ABC Bank",
    },
    {
      id: "4",
      name: "Jane Smith",
      accountNumber: "0987654321",
      bank: "XYZ Bank",
    },
    {
      id: "5",
      name: "John Doe",
      accountNumber: "1234567890",
      bank: "ABC Bank",
    },
    {
      id: "6",
      name: "Jane Smith",
      accountNumber: "0987654321",
      bank: "XYZ Bank",
    },
    {
      id: "7",
      name: "John Doe",
      accountNumber: "1234567890",
      bank: "ABC Bank",
    },
    {
      id: "8 ",
      name: "Jane Smith",
      accountNumber: "0987654321",
      bank: "XYZ Bank",
    },
    {
      id: "9",
      name: "John Doe",
      accountNumber: "1234567890",
      bank: "ABC Bank",
    },
    {
      id: "10",
      name: "Jane Smith",
      accountNumber: "0987654321",
      bank: "XYZ Bank",
    },
    {
      id: "11",
      name: "John Doe",
      accountNumber: "1234567890",
      bank: "ABC Bank",
    },
    {
      id: "12",
      name: "Jane Smith",
      accountNumber: "0987654321",
      bank: "XYZ Bank",
    },
    {
      id: "13",
      name: "John Doe",
      accountNumber: "1234567890",
      bank: "ABC Bank",
    },
    {
      id: "14",
      name: "Jane Smith",
      accountNumber: "0987654321",
      bank: "XYZ Bank",
    },
    {
      id: "15",
      name: "John Doe",
      accountNumber: "1234567890",
      bank: "ABC Bank",
    },
    {
      id: "16 ",
      name: "Jane Smith",
      accountNumber: "0987654321",
      bank: "XYZ Bank",
    },
  ],
  
};

class ApiService {
  async request(endpoint, options = {}) {
    await delay(800);

    try {
      if (endpoint.includes("/accounts") && options.method !== "POST") {
        return { data: mockResponses.accounts, success: true };
      }

      if (endpoint.includes("/payees")) {
        if (options.method !== "POST") {
          return { data: mockResponses.payees, success: true };
        }
        if (options.method === "POST") {
          const newPayee = {
            ...JSON.parse(options.body),
            id: Date.now().toString(),
          };
          mockResponses.payees.push(newPayee);
          return { data: newPayee, success: true };
        }
      }

      if (endpoint.includes("/transfer") && options.method === "POST") {
        const success = Math.random() > 0.1;
        if (success) {
          return {
            data: {
              transactionId: `TXN_${Date.now()}`,
              status: "SUCCESS",
              timestamp: new Date().toISOString(),
            },
            success: true,
          };
        } else {
          throw new Error("Transfer failed due to network issue");
        }
      }

      return { data: null, success: true };
    } catch (error) {
      return { error: error.message, success: false };
    }
  }

  async getAccounts() {
    return this.request("/accounts");
  }

  async getPayees({ page = 0, limit = 20 } = {}) {
    const response = await this.request("/payees");
    if (response.success) {
      const start = page * limit;
      const end = start + limit;
      const pageData = response.data.slice(start, end);
      
      return {
        success: true,
        data: pageData,
        hasMore: end < response.data.length,
        total: response.data.length
      };
    }
    return response;
  }

  async createPayee(payeeData) {
    return this.request("/payees", {
      method: "POST",
      body: JSON.stringify(payeeData),
    });
  }

  async processTransfer(transferData) {
    return this.request("/transfer", {
      method: "POST",
      body: JSON.stringify(transferData),
    });
  }
}

export default new ApiService();
