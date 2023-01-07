// levantar un servidor
const express = require("express");
const path = require('path');
const app = express();
const session = require('express-session');

// crea una sesion middleware


// para que se publique lo de esa carpeta
const publicPath = path.join(__dirname, '../public');

// middleware
const methodOverride =  require('method-override');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// para las cookies
const cookies = require('cookie-parser');

const PORT = process.env.PORT || 3000;

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());
app.use(userLoggedMiddleware);

// Pase el nombre del directorio que contiene los activos estáticos a la función de middleware express.static para empezar directamente el servicio de los archivos
app.use(express.static(publicPath));

//  is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method')) ;

// Para llamar las vistas en ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// de donde salen las rutas
const mainRouter = require('./routes/mainRoutes');
const productsRouter = require('./routes/productsRoutes');
const usersRouter = require('./routes/usersRoutes');

// estas rutas se ven en la página
app.use("/", mainRouter);
app.use('/products', productsRouter);
app.use('/productos_lol', productsRouter);
app.use('/hombres', productsRouter);
app.use('/users', usersRouter);

// probando js front
app.use("/pruebajs", mainRouter);

// solicitando la ruta desde el local
const apiProductsRouter = require('./routes/api/products')
const apiUsersRouter = require('./routes/api/users')

// estableciendo las rutas de la api
app.use('/api/products',apiProductsRouter);
app.use('/api/users',apiUsersRouter);

// llama al servidor
app.listen(PORT, ()=>{
    console.log('Servidor corriendo en el puerto 3000')
});

