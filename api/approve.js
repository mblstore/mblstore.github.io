export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { paymentId, network } = req.body;
    
    // Mengambil API Key dari Vercel Environment Variables secara selamat
    const PI_API_KEY = network === 'mainnet' 
        ? process.env.PI_API_KEY_MAINNET 
        : process.env.PI_API_KEY_TESTNET;

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
        console.error("Approve Error:", error);
        return res.status(500).json({ error: "Gagal Approve" });
    }
}
