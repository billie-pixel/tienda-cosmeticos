const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexión a MongoDB Atlas
mongoose.connect("mongodb+srv://<db_username>:<db_password>@cluster0.sqdc9mb.mongodb.net/?appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});