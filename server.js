const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Servir archivos estáticos desde la carpeta 'nomina'
app.use('/', express.static(path.join(__dirname, 'nomina')));

// Ruta principal - servir index.html desde nomina
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'nomina', 'index.html'));
});

// Cualquier otra ruta, intentar servir desde nomina
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'nomina', req.path);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.sendFile(path.join(__dirname, 'nomina', 'index.html'));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Sistema de Nómina Tehui corriendo en puerto ${PORT}`);
});
