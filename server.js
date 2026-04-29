console.log("🔥 ESTE ES MI SERVER");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("🚀 Iniciando servidor...");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 CONEXIÓN A MONGO (IMPORTANTE: VARIABLE DE ENTORNO)
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.log("❌ Error:", err));

// 📦 MODELO
const Usuario = mongoose.model("Usuario", {
    nombre: String,
    edad: Number
});

// 🔹 PRUEBA
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

// 🔹 LISTAR
app.get("/usuarios", async (req, res) => {
    try {
        const datos = await Usuario.find();
        res.json(datos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 🔹 CREAR
app.post("/usuarios", async (req, res) => {
    try {
        console.log("DATOS:", req.body);

        const nuevo = new Usuario(req.body);
        await nuevo.save();

        res.json(nuevo);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 🚀 PUERTO (RENDER LO ASIGNA AUTOMÁTICAMENTE)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
});