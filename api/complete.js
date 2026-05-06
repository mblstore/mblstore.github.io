// Fail ini akan diletakkan dalam folder /api/complete.js
export default async function handler(req, res) {
  const { paymentId, txid } = req.body;
  const PI_API_KEY = "MASUKKAN_API_KEY_MAINNET_ANDA_DI_SINI";

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: { 
        'Authorization': `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ txid })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal menyelesaikan bayaran" });
  }
}
