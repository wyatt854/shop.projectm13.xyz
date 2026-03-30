const express = require('express');
const router = express.Router();

// Cette route écoute sur : tonsite.com/api/webhook
router.post('/', (req, res) => {
    const event = req.headers['x-github-event']; // Type d'événement GitHub
    const data = req.body;

    console.log(`Événement reçu : ${event}`);

    // Logique PROJECT M13 : Si c'est un "push", on simule une trace mémoire
    if (event === 'push') {
        console.log(`Nouveau commit par ${data.pusher.name}. Donnée synchronisée.`);
    }

    // Réponse obligatoire pour GitHub (sinon il réessaie en boucle)
    res.status(200).send('OK');
});

module.exports = router;
