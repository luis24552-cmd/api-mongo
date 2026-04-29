  
console.log("🔥 ESTE ES MI SERVER");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("🚀 Iniciando servidor...");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 CONEXIÓN A MONGO
mongoose.connect("mongodb://luis24552_db_user:6rHkONrOLd65Rrfa@ac-n3ktdtj-shard-00-00.iqt9fip.mongodb.net:27017,ac-n3ktdtj-shard-00-01.iqt9fip.mongodb.net:27017,ac-n3ktdtj-shard-00-02.iqt9fip.mongodb.net:27017/escuela?ssl=true&replicaSet=atlas-8rbg6x-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.log("❌ Error:", err));

// 📦 MODELO
const Usuario = mongoose.model("Usuario", {
    nombre: String,
    edad: Number
});

// 🔹 RUTA PRUEBA
app.get("/", (req, res) => {
    res.send("API funcionando");
});

// 🔹 LISTAR
app.get("/usuarios", async (req, res) => {
    const datos = await Usuario.find();
    res.send(datos);
});

// 🚀 SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en el puerto ${PORT}`);
});

app.post("/usuarios", async (req, res) => {
    console.log("DATOS:", req.body);

    const nuevo = new Usuario(req.body);
    await nuevo.save();

    res.send(nuevo);
});

