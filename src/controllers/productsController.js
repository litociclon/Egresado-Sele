let db = require('../database/models');

const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const {validationResult} = require("express-validator")

// API
//const DB = require(path.join(__dirname, '../models'))

//const Sequelize = require('sequelize');
//const DB = require(path.join(__dirname, '../data/products.json'))

//¿Por qué falla?
//const Op = DB.Sequelize.Op;

//module.exports = {
//    list: (req,res) => {
//        DB.ProductsModels
//        .findAll()
//        .then(products => {
//            return res.status(200).json({
//                total: products.length,
//                data: products,
//                status: 200
//            })
//        })
//    }
//}


// Lo anterior
const readJsonFile = (path) =>{
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}


const productsController = {

	list: function(req, res) {
		db.Producto.findAll()
			.then(function(products){
				res.render("listadoDeProductos", {products:products})
			})
	},

	index: (req, res) => {
		const products = readJsonFile(productsFilePath);
		res.render('products', {products});
	},

	create: (req, res) =>{
//	db.Producto.create({
//		name: req.body.name,
//		description: req.body.name,
//		category: req.body.category,
//		discount: req.body.discount,
//		price: req.body.price})
	
		res.render("producto-creacion");
	},


	detail: (req, res) => {
		const products = readJsonFile(productsFilePath)
		const product = products.find(product => product.id == req.params.id)
		res.render('detailProducto', { product });
	},

	store: (req, res) => {
		const resultValidation = validationResult(req);

		if(resultValidation.errors.length > 0){
			return res.render("producto-creacion",{errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		const products = readJsonFile(productsFilePath)
		const producto = {
			id: products[products.length -1].id + 1,
			name: req.body.name,
			description: req.body.description,
			image: req.file?.filename || "default-image.png",
			category: req.body.category,
			discount: req.body.discount,
			price: req.body.price,
			
		}

		products.push(producto);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		return res.redirect("/products")
	},

	edit: (req, res) => {
		
		const products = readJsonFile(productsFilePath)
		const product = products.find(product => product.id == req.params.id)
		res.render('producto-edicion', { product });


		db.Producto.findByPk(req.params.id)
			.then(function(Producto){
				res.render("editarproducto", {Producto:Producto})
			})

	},

	update: (req, res) => {
		const resultValidation = validationResult(req);

		if(resultValidation.errors.length > 0){
			return res.render("producto-edicion",{errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		
		const products = readJsonFile(productsFilePath)
		for(let i = 0; i < products.length; i++) {
			if(products[i].id == req.params.id){
				products[i] = {
					...products[i],
					name: req.body.name,
					description: req.body.description,
					category: req.body.category,
					discount: req.body.discount,
					price: req.body.price,
					//image: req.file?.filename || "default-image.png"
				} 
			}
		};

		
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		return res.redirect("/products");
	},

	destroy: (req, res) => {
		const products = readJsonFile(productsFilePath);
		const productosFiltrados = products.filter(product => product.id != req.params.id);

		fs.writeFileSync(productsFilePath, JSON.stringify(productosFiltrados, null, 2));
		return res.redirect("/products");
	},

	
	hombres: function(req,res) {
		const products = readJsonFile(productsFilePath);
		res.render('hombre', {products});
	},

	mujeres: function(req,res) {
		const products = readJsonFile(productsFilePath);
		res.render('mujer', {products});
	},

	kids: function(req,res) {
		const products = readJsonFile(productsFilePath);
		res.render('kids', {products});
	},

	acces:function(req,res) {
		const products = readJsonFile(productsFilePath);
		res.render('acces', {products});
	}




}
module.exports = productsController;