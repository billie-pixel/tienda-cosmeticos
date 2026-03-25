const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://Vendedor:1234@cluster0.sqdc9mb.mongodb.net/tienda")
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.log(err));

// 📦 Modelo de producto
const Producto = mongoose.model("Producto", {
    nombre: String,
    precio: Number,
    imagen: String
});

// 📥 Guardar producto
app.post("/productos", async (req, res) => {
    const producto = new Producto(req.body);
    await producto.save();
    res.send(producto);
});

// 📤 Obtener productos
app.get("/productos", async (req, res) => {
    const productos = await Producto.find();
    res.send(productos);
});

// 🚀 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});