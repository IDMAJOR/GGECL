const axios = require("axios");
// Replace with your actual Paystack secret key
const PAYSTACK_SECRET_KEY = "sk_test_103766ef29f050a4ba79229e97400dbc37ecd930";
// PayPal API credentials (replace with your credentials)
const CLIENT_ID =
  "Ac9eFXIdIxCTtACug7jsb-4w5stD1bOujK04yNhaP2zmCKvtGqsPx1ipDDCDey-pYRWIAerqPxZW3qcY";
const SECRET =
  "EGhJACoxfYg8eB8hOe4FtjH5Mk7se8-1XQE9rtYN6JHw4XsaAREfoeyAlwaO5B4Jpawoa8T6H9zztyau";

// PayPal API endpoint
const PAYPAL_API = "https://api.sandbox.paypal.com/v1";

async function getOAuthToken() {
  const response = await axios.post(
    `${PAYPAL_API}/oauth2/token`,
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${SECRET}`).toString(
          "base64"
        )}`,
      },
    }
  );

  return response.data.access_token;
}

const paystackAPI = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

const paystack = async (req, res) => {
  const { name, email, amount } = req.body; // Client will send email and amount
  try {
    const response = await paystackAPI.post("/transaction/initialize", {
      email: email,
      amount: amount * 100, // Convert to kobo for Naira
    });

    res.status(200).json({
      status: "success",
      message: "Payment initialized successfully",
      data: response.data,
    });
  } catch (error) {
    console.error(error.response.data);
    res.status(500).json({
      status: "error",
      message: "Failed to initialize payment",
      error: error.response.data,
    });
  }
};

const paypal = async (req, res) => {
  const { amount, email, paymethod, currency } = req.body;

  try {
    const accessToken = await getOAuthToken();

    const paymentResponse = await axios.post(
      `${PAYPAL_API}/payments/payment`,
      {
        intent: "sale",
        payer: {
          payment_method: paymethod || "paypal", // Default to PayPal if no paymethod is provided
        },
        transactions: [
          {
            amount: {
              total: amount, // Dynamic amount from the request
              currency: currency || "USD", // Default to USD if no currency is provided
            },
            description: "Payment for goods or services",
          },
        ],
        redirect_urls: {
          return_url: "http://localhost:3000/success",
          cancel_url: "http://localhost:3000/cancel",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json({
      approvalUrl: paymentResponse.data.links.find(
        (link) => link.rel === "approval_url"
      ).href,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating payment" });
  }
};

module.exports = { paystack, paypal };
