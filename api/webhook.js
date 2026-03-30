const crypto = require('crypto');

export default function handler(req, res) {
    // 1. Vérification de la méthode (On ne veut que du POST)
    if (req.method !== 'POST') {
        return res.status(405).send('Méthode non autorisée');
    }

    // 2. Sécurité : Vérification du Secret GitHub
    const GITHUB_SECRET = process.env.GITHUB_SECRET; // On va le régler dans Vercel
    const signature = req.headers['x-hub-signature-256'];

    if (GITHUB_SECRET && signature) {
        const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
        const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');

        if (signature !== `sha256=${digest}`) {
            return res.status(401).send('Signature invalide');
        }
    }

    // 3. Logique de ton shop
    const event = req.headers['x-github-event'];
    console.log(`Événement reçu : ${event}`);

    // Si c'est un push, on peut imaginer une action pour PROJECT M13
    if (event === 'push') {
        // Ta logique ici...
    }

    // 4. Réponse à GitHub
    res.status(200).json({ status: 'M13_OK', received: true });
}
