export const syncAccounts = async (): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate 95% success rate
  return Math.random() > 0.05;
};

export const connectNewAccount = async (accountData: {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
}): Promise<{ success: boolean; csvData?: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (Math.random() > 0.1) { // 90% success rate
    // Generate CSV data
    const csvData = generateFinancialCSV();
    return { success: true, csvData };
  }
  
  return { success: false };
};

const generateFinancialCSV = (): string => {
  const headers = ['Date', 'Description', 'Amount', 'Balance', 'Category'];
  const rows = [headers.join(',')];
  
  let balance = 50000;
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const transactions = [
      { desc: 'Salary Credit', amount: 85000, category: 'Income' },
      { desc: 'Grocery Shopping', amount: -2500, category: 'Food' },
      { desc: 'Fuel Payment', amount: -3000, category: 'Transport' },
      { desc: 'Online Purchase', amount: -1500, category: 'Shopping' },
      { desc: 'Restaurant Bill', amount: -800, category: 'Food' },
      { desc: 'Movie Tickets', amount: -600, category: 'Entertainment' }
    ];
    
    const transaction = transactions[Math.floor(Math.random() * transactions.length)];
    balance += transaction.amount;
    
    rows.push([
      date.toISOString().split('T')[0],
      transaction.desc,
      transaction.amount.toString(),
      balance.toString(),
      transaction.category
    ].join(','));
  }
  
  return rows.join('\n');
};

export const downloadCSV = (csvData: string, filename: string) => {
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
