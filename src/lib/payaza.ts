import axios from 'axios';

const PAYAZA_BASE = 'https://api.payaza.africa';

const headers = {
  Authorization: `Payaza ${process.env.PAYAZA_SECRET_KEY}`,
  'Content-Type': 'application/json',
};

export async function initializePayazaTransaction({
  email,
  amount,
  currency = 'USD',
  firstName,
  lastName,
  phoneNumber,
  callbackUrl,
  transactionRef,
}: {
  email: string;
  amount: number;
  currency?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  callbackUrl: string;
  transactionRef: string;
}) {
  const res = await axios.post(
    `${PAYAZA_BASE}/send-request`,
    {
      request_type: 'collect',
      merchant_publickey: process.env.PAYAZA_PUBLIC_KEY,
      currency,
      description: 'UpFrica Treasury Deposit',
      total_amount: amount,
      email_address: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber || '',
      callback_url: callbackUrl,
      transaction_reference: transactionRef,
    },
    { headers }
  );
  return res.data;
}

export async function verifyPayazaTransaction(transactionRef: string) {
  const res = await axios.get(
    `${PAYAZA_BASE}/transaction/verify/${transactionRef}`,
    { headers }
  );
  return res.data;
}
