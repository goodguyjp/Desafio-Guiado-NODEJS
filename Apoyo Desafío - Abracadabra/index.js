const express = require('express');
const app = express();
const path = require("path");

app.listen(3000, () => {
    console.log('El servidor esta inicializado en el puerto 3000');
});

let numeroAleatorio = () =>{
    return Math.floor(Math.random()* 4)+1;
}

let numeroAl = numeroAleatorio();
app.use(express.static(path.join(__dirname + "/assets")));

// Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de
// la ruta /abracadabra/usuarios.

const nombres = ["Juan", "Francisco", "Paloma", "Matias", "Daniel", "Valentina", "Felipe", "Rodrigo"];



app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const usuario = req.params.usuario; 
    nombres.includes(usuario) ? next() : res.redirect("/who.jpeg")
});

app.get("/abracadabra/juego/:usuario", (req, res) =>{
    res.sendFile(path.join(__dirname + "/index.html"));
});


app.get("/abracadabra/usuarios", (req, res) => {
    res.send(nombres);
});

//  Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
// número generado de forma aleatorio

app.get('/abracadabra/conejo/:n', function(req, res) {
    const num = req.params.n;
    
    if  (num == numeroAl) {
        
        res.redirect("/conejito.jpg");
        numeroAl = numeroAleatorio();
    }
    else {  
        res.redirect("/voldemort.jpg");
     }
});

app.get("*", (req, res) => {
    res.status(404);
    res.send("Esta pagina no existe");
})
