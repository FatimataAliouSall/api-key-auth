import express from 'express';
const app = express();

const API_KEY = 'my-secret-api-key';

function checkApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(403).json({ error: 'Accès refusé : Clé API manquante' });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Accès refusé : Clé API incorrecte' });
  }

  next(); 
}


app.get('/api/private-data', checkApiKey, (req, res) => {
  res.json({ message: 'Bienvenue sur la route privée!' });
});


const PORT = process.env.PORT || 3060;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
