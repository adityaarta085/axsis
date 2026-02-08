export const createPayment = async (orderId: string, amount: number) => ({
  paymentUrl: `http://localhost:3000/checkout/payment?orderId=${orderId}`,
  providerRef: `PAY-\${Math.random().toString(36).substring(7).toUpperCase()}`,
});
