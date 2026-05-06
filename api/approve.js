export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { paymentId, network } = req.body;
    
    // Gunakan API Key yang betul mengikut rangkaian
    const PI_API_KEY = network === 'mainnet' 
        ? "API_KEY_MAINNET" 
        : "API_KEY_TESTNET";

    try {
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: { 
                'Authorization': `Key ${PI_API_KEY}`,
                'Content-Type': 'application/json' 
            }
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Gagal Approve" });
    }
}
