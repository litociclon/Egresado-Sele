const path = require("path");

// file system
const fs = require("fs");

const productosDbPath = path.join(__dirname, "../data/products.json");

const readJsonFile = ( path ) => {
    const data = fs.readFileSync(path, "utf-8");
    const dataParsed = JSON.parse(data);
    return dataParsed;
}


// para mostrar el home
const controller = {
    index: (req, res) => {
        res.render("index");
	},

    test: (req,res) => {
        res.render("a_jsfront_test")
    }

    //login: (req,res) => 
    //res.render("login"),

    //register: (req,res) => 
    //res.render("register"),

/*

    vistaProducto: (req, res) => 
    res.render("vistaProducto") ,
    
   
   
    carrito: (req,res) => 
    res.render("carrito"),

    edicionProductos: (req, res) =>
    res.render("edicionProductos"),

    products: (req,res) => 
    res.render("products"), */
}


module.exports = controller;















/*const controller = {
    index: (req, res) => {
        return res.render("index");
    },
    /*{ 
       const productosVenta = readJsonFile(productosPath);
       return res.render("index", {productosVenta} )
    },*/
/*{
        const id = req.params.id;
        const productosVenta = readJsonFile(dbPath);
        const productoEncontrado = productosVenta.find(function(articulo){
            return articulo.id == id;
        });
        
        return res.render("vistaProducto", { productoEncontrado })
    },*/