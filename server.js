const express = require('express');
const crypto = require('crypto');
const app = express();

// Utilise le port 80 pour le Web ou 3000 en local
const PORT = process.env.PORT || 3000;

// REMPLACE CECI PAR LE SECRET QUE TU AS TAPÉ SUR GITHUB
const GITHUB_SECRET = "M13_Secret_2026_Project"; 

app.use(express.json());

// --- ROUTE PRINCIPALE WEBHOOK ---
app.post('/webhook', (req, res) => {
    const signature = req.headers['x-hub-signature-256'];
    const event = req.headers['x-github-event'];

    // 1. VÉRIFICATION DE LA SÉCURITÉ
    if (signature) {
        const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
        const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');

        if (signature !== digest) {
            console.error("⚠️ SIGNATURE INVALIDE : Tentative d'intrusion détectée.");
            return res.status(401).send('Non autorisé');
        }
    }

    // 2. LOGIQUE SELON L'ÉVÉNEMENT
    console.log(`📡 Signal reçu de GitHub : ${event}`);

    if (event === 'push') {
        console.log("🛠️ MISE À JOUR : Nouveau code reçu. Déclenchement de la synchro shop...");
        // Ici tu peux ajouter une commande pour redémarrer ton shop automatiquement
    }

    if (event === 'issues') {
        console.log(`⚠️ ALERTE : Nouveau ticket ouvert par ${req.body.issue.user.login}`);
    }

    // 3. RÉPONSE OBLIGATOIRE (Sinon GitHub marque une erreur)
    res.status(200).send({
        status: "success",
        message: "Signal M13 intercepté",
        timestamp: new Date().toISOString()
    });
});

// --- PAGE D'ACCUEIL DU SHOP ---
app.get('/', (req, res) => {
    res.send('<h1>Système M13 - shop.projectm13.xyz</h1><p>Le serveur est en ligne et écoute les webhooks.</p>');
});

app.listen(PORT, () => {
    console.log(`✅ Serveur actif sur le port ${PORT}`);
    console.log(`🔗 URL attendue : https://shop.projectm13.xyz/webhook`);
});
