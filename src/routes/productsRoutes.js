const express = require('express');
const path = require("path");
const router = express.Router();
const upload = require("../middlewares/multer");
const { body } = require("express-validator");

const productsController = require('../controllers/productsController');

const validacionesCreacionProductos = [
    body("name").notEmpty().withMessage("Escrivi tu nombre").bail()
                .isLength({ min: 5 }).withMessage("El nombre debe tener minimo 5 caracteres"), 
    body("description").notEmpty().withMessage("Escrivi un mensaje").bail()
                       .isLength({ min: 10 }).withMessage("Tu mensaje debe tener minimo 10 caracteres"),
    body("productImage").custom((value, { req }) => {
                    let file = req.file;
                    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
                    if (!file){
                      throw new Error("Tenes que subir una imagen");
                    }else{
                      let fileExtencion = path.extname(file.originalname);
                      if (!acceptedExtensions.includes(fileExtencion)){
                        throw new Error(`Los archivos permitidos son ${acceptedExtensions.join(", ")}`);
                      }
                    }  
                    return true;
                  })  ,         
    
]

const validacionesEdicionProducto = [
    body("name").notEmpty().withMessage("Dale un nombre a tu producto").bail()
                .isLength({ min: 5 }).withMessage("El nombre debe tener minimo 5 caracteres"),
    body("description").notEmpty().withMessage("Agrega una descripcion").bail()
                       .isLength({ min: 20 }).withMessage("La desccricion debe tener minimo 20 caracteres"),            
]

router.get('/', productsController.index); 

router.get("/create/", productsController.create);

router.get("/productos_lol/", productsController.list);

router.post('/', upload.single("productImage"),validacionesCreacionProductos, productsController.store);

router.get('/hombres', productsController.hombres);
router.get('/mujeres', productsController.mujeres);
router.get('/kids', productsController.kids);
router.get('/accesorios', productsController.acces);


router.get('/:id', productsController.detail); 

router.get('/:id/edit', productsController.edit);

router.put('/:id',validacionesEdicionProducto, productsController.update);

router.delete('/:id', productsController.destroy); 


module.exports = router;