const express = require('express');
const path = require("path");

const router = express.Router();
const upload = require("../middlewares/multer2");
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require("express-validator");
const usersController = require('../controllers/userController');


const validaciones = [
    body("firstName").notEmpty().withMessage("Tienes que escrivir tu nombres").bail()
                     .isLength({ min: 2 }).withMessage("Minimo dos caracteres"),
    body("lastName").notEmpty().withMessage("Tienes que escrivir tu apellido").bail()
                    .isLength({ min: 2 }).withMessage("Minimo dos caracteres"),
    body("email")
      .notEmpty().withMessage("Tienes que escrivir un e-mail").bail()
      .isEmail().withMessage("Ecribe un formato de correo valido"),
    body("dateOfBirth").notEmpty().withMessage("Pon tu fecha de nacimiento"),
    body("gender").notEmpty().withMessage("Elige tu genero "),
    body("nameUser").notEmpty().withMessage("Elige un nombre de usuario"),
    body("password1").notEmpty().withMessage("Tienes que escrivir una contrseña").bail()
                     .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("password2").notEmpty().withMessage("Confirma tu contraseña").bail()
                     .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),   
    body("image").custom((value, { req }) => {
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
    })
  ]
const validacionesLogin = [
  body("email").notEmpty().withMessage("Tienes que escrivir un e-mail").bail()
               .isEmail().withMessage("Ecribe un formato de correo valido"),
  body("password2").notEmpty().withMessage("Agrega tu contraseña"),   

]  

router.get('/', usersController.index); 

router.get("/register/",guestMiddleware, usersController.register);
router.post("/", upload.single("image"), validaciones, usersController.store);

router.get("/login",guestMiddleware, usersController.login);
router.post("/login",validacionesLogin, usersController.processLogin);

router.get("/profile",authMiddleware, usersController.profile);

router.get('/logout', usersController.logout);











module.exports = router;