require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { userInfo } = require('os');
//const Donation = require('./models/Donation');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/hyho`,
        { logging: false, native: false }
      );
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/hyho`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Cart, Category, Products, Form, Order, User, Donation } = sequelize.models

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Category.belongsToMany(Products, { through: 'products_category' })
Products.belongsToMany(Category, { through: 'products_category' })

Order.belongsToMany(Products, { through: 'products_order' })
Products.belongsToMany(Order, { through: 'products_order' })

Form.hasOne(Products)
Products.belongsTo(Form)

User.hasMany(Form)
Form.belongsTo(User)

//---------------------***-----------------------
Products.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
})
User.hasMany(Products)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Products, {
  through: 'cart_Item'
})
Products.belongsToMany(Cart, {
  through: 'cart_Item'
})

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Products, {
  through: 'order_Item'
})
Products.belongsToMany(Order, {
  through: 'order_Item'
})
User.hasOne(Donation)
Donation.belongsTo(User)



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
