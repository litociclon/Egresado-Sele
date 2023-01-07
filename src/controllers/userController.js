const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

// validación de campos en formularios, te obliga a llenar algo
const {validationResult} = require("express-validator")

// guarda en hash el password
const bcryptjs = require("bcryptjs");

const db = require('../database/models');

// es un modelo que se asegura que no se esté repitiendo los correos
const usersModels = require("../models/UserModels")



// API
//const DB = require('/Users/jpolanco/Desktop/Scripts/VSC/G11_Proyecto_FullStack/Sprint 5/src/models')
//const Op = DB.Sequelize.Op;

//module.exports = {
//    list: (req,res) => {
//        DB.UserModels
//        .findAll()
//        .then(users => {
//            return res.status(200).json({
//                total: products.length,
//                data: users,
//                status: 200
//            })
//        })
//    }
//}


// Lo anterior
const readJsonFile = (path) =>{
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}


const controller = {

	index: (req, res) => {
		const users = readJsonFile(usersFilePath);
		res.render('users', {users});
	},

    register: (req, res) =>{
        res.render("register");
         },

    
        

         store: (req, res) => {
            const resultValidation = validationResult(req);

            if(resultValidation.errors.length > 0){
                return res.render("register",{errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }

            let usersEmail = usersModels.findByField('email', req.body.email);
           // const users1 = readJsonFile(usersFilePath)
            if(usersEmail) {
                return res.render("register",{
                    errors:{
                        email: {
                            msg: "Este mail ya esta registrado"
                        }
                    },
                    oldData: req.body
                });
            } 
            

            const users = readJsonFile(usersFilePath)
            const usuario = {
                id: users[users.length -1].id + 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
                nameUser: req.body.nameUser,
                password1: bcryptjs.hashSync(req.body.password1, 10),
                password2: bcryptjs.hashSync(req.body.password2, 10),
                image: req.file?.filename || "default-image.png",
                
            }
    
            users.push(usuario);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
            return res.redirect("/users/login")
        },

        login: (req, res) =>{
            res.render("login");
             },

        processLogin:(req, res) =>{
            const resultValidation = validationResult(req);

            if(resultValidation.errors.length > 0){
                return res.render("login",{errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }


            let userToLogin = usersModels.findByField('email', req.body.email);
            
		
            if(userToLogin) {
                let isOkThePassword = bcryptjs.compareSync(req.body.password2, userToLogin.password2);
                if (isOkThePassword) {
                    delete userToLogin.password2;
                    req.session.userLogged = userToLogin;

                    if(req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2})
                    }
    
                    return res.redirect('profile');
                }else{
                    return res.render('login', {
                        errors: {
                            password2: {
                                msg: "La contraseña es incorrecta" 
                           }
                        }
                    });
               
                 
                }
            }
              

                return res.render('login', {
                    errors: {
                        email: {
                             msg: "Este e-mail no esta registrado"
                        }
                    }
                });
          
             
    
    },
        
        profile: (req, res) =>{
           
            res.render("profile", {
                user: req.session.userLogged 
                
             } );
        },

        logout: (req, res) =>{
            res.clearCookie('userEmail');
		    req.session.destroy();
		    return res.redirect('/');
	    },

        detail: function(req,res) {
            db.Usuario.findByPk(req.params.id)
                .then(function(Usuario) {
                    res.render("detalleDelUsuario", {Usuario:Usuario});
                })
        }


        }
        

module.exports = controller;
