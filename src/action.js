export const getTransactions = (transactions) => {
  return {
    type: 'GET_TRANSACTIONS',
    transactions: transactions
  }
}
