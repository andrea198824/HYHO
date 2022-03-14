//---------------------Initial admin-------------------//
const { Admin, Category, Form, Order, Products, User } = require('./src/db');

var CryptoJS = require("crypto-js");
const products = [
    {
        id: 1,
        title: "Buzo Adidas Color Rojo",
        price: 20,
        weight: 1,
        descriptions: "Esta en perfecto estado",
        image: "https://i.ebayimg.com/thumbs/images/g/teMAAOSwYPNcPN~X/s-l225.jpg",
        stock: 1,
        avaliable: true,
        category: ["Indumentaria","Sport"],
    },
    {
        id: 2,
        title: "Laptop Gamer ASUS ROG",
        price: 550,
        weight: 2,
        descriptions: "Producto brindado por ASUS",
        image: "https://www.profesionalreview.com/wp-content/uploads/2018/01/C%C3%B3mo-evitar-el-fondo-negro-al-copiar-un-archivo-PNG-3.jpg",
        stock: 2,
        avaliable: true,
        category: ["Electrodomesticos","Computacion"],
    },
    {
        id: 3,
        title: "Monitor Toshiba ACI-77198",
        price: 300,
        weight: 5,
        descriptions: "Un poco descuidado pero funciona bien",
        image: "https://i2.wp.com/gadwoman.com/wp-content/uploads/2012/04/Monitor-Toshiba.jpg?resize=640%2C400&ssl=1",
        stock: 0,
        avaliable: false,
        category: ["Electrodomesticos","Computacion"],
    },
    {
        id: 4,
        title: "IPhone 6",
        price: 100,
        weight: 2,
        descriptions: "Disponible en diversos colores",
        image: "https://i2.wp.com/culturabogota.com/wp-content/uploads/2014/09/sorpresa-fotografo-iphone-6-1.jpg?w=800&ssl=1",
        stock: 4,
        avaliable: true,
        category: ["Telefonos"],
    },
    {
        id: 5,
        title: "Televisor Curvo Philips XJ-5792",
        price: 450,
        weight: 10,
        descriptions: "Completamente nuevo.",
        image: "https://i.blogs.es/f7bb86/650_1000_tele-curva-1/1366_2000.jpg",
        stock: 1,
        avaliable: true,
        category: ["Electrodomesticos"],
    },
    {
        id: 6,
        title: "Mountain-Bike Licorne",
        price: 560,
        weight: 30,
        descriptions: "",
        image: "https://images.ecestaticos.com/CmQxEVHJ2Mh7t42OljydEg2iRP8=/0x0:638x359/996x560/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F64f%2F158%2F108%2F64f1581087ce1bc054aede93edb22276.jpg",
        stock: 2,
        avaliable: true,
        category: ["Rodados","Sport"]
    },
    {
        id: 7,
        title: "Moto Keller Classic 110",
        price: 980,
        weight: 86,
        descriptions: "Donacion de Motos Keller",
        image: "https://http2.mlstatic.com/D_NQ_NP_808163-MLA44585596343_012021-O.webp",
        stock: 5,
        avaliable: true,
        category: ["Rodados","Vehiculos"],
    },
    {
        id: 8,
        title: "Monopatín Electrico Xiaomi - My Electrical Scooter Essential ",
        price: 730,
        weight: 12,
        descriptions: "Xiaomi Mi Electric Scooter Essential es un nuevo patinete eléctrico color negro y de diseño elegante, desde la luz hasta los neumáticos. Essential está diseñado para las personas que quieren mantenerlo ligero y fácil.",
        image: "https://http2.mlstatic.com/D_NQ_NP_823809-MLA48575528008_122021-O.webp",
        stock: 1,
        avaliable: true,
        category: ["Rodados"]
    },
    {
        id: 9,
        title: "Cuatriciclo Honda",
        price: 6500,
        weight: 120,
        descriptions: "Este cuatriciclo está preparado para actividades que necesiten gran capacidad de carga, poder y espacio. Su diseño ayuda a desplazarse de una forma más cómoda.",
        image: "https://www.derechoenzapatillas.com/wp-content/uploads/2018/08/cuatriciclos-reglamentaci%C3%B3n.jpg",
        stock: 2,
        avaliable: false,
        category: ["Rodados","Vehiculos"],
    },
    {
        id: 10,
        title: "Remeras Kingdom Vintage Cuello Desbocado Bote Abierto",
        price: 13,
        weight: 0.1,
        descriptions: "",
        image: "https://http2.mlstatic.com/D_NQ_NP_772840-MLA41775603939_052020-O.webp",
        stock: 8,
        avaliable: true,
        category: ["Indumentaria"],
    },
    {
        id: 11,
        title: "Mochila Urbana Unisex Sunfin",
        price: 15,
        weight: 0.5,
        descriptions: "Capacidad: 20lts Medidas: 45x30x14.5cm",
        image: "https://http2.mlstatic.com/D_NQ_NP_723203-MLA45838835726_052021-O.webp",
        stock: 2,
        avaliable: true,
        category: ["Indumentaria"],
    },
    {
        id: 12,
        title: "Parlante Genius SP-HF180",
        price: 25,
        weight: 7,
        descriptions: "Genius SP-HF180 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.    ",
        image: "https://http2.mlstatic.com/D_NQ_NP_754878-MLA42899391576_072020-O.webp",
        stock: 1,
        avaliable: true,
        category: ["Electrodomesticos"],
    },
    {
        id: 13,
        title: "Cama elástica Gadnic Pro T8FT",
        price: 275,
        weight: 30,
        descriptions: "Con la cama elástica Gadnic Pro T8FT vas a poder disfrutar de horas interminables de diversión. Saltos y piruetas más los beneficios físicos que genera esta actividad, permitirán que disfrutés de momentos recreativos inolvidables.",
        image: "https://http2.mlstatic.com/D_NQ_NP_623458-MLA48601215547_122021-O.webp",
        stock: 2,
        avaliable: false,
        category: ["Exteriores"],
    },
    {
        id: 14,
        title: "Pantalon Pampero Cargo Antidesgarro Ripstop",
        price: 55,
        weight: 0.5,
        descriptions: "Tela antidesgarro, bolsillos con tapa y velcro y cartera con cierre",
        image: "https://http2.mlstatic.com/D_NQ_NP_738661-MLA42683874698_072020-O.webp",
        stock: 6,
        avaliable: true,
        category: ["Indumentaria"],
    }
]

let securityString = "randomString"
let password = "12345678"
password = CryptoJS.HmacSHA1(securityString, password).toString(CryptoJS.enc.Base64)
exports.do = async () => {
    let user = await User.findAll({
      where: {id: 1}
    })
    if (!user.length) {
      await User.create({
        fullName:"Admin",
        email:"Admin@gmail.com",
        password,
        securityString,
        emailVerificated:true,
        adminVerificated:true,
        billing_address:"",
        shipping_address:"",
        phone:"",
      });
    }
    // let dbProducts = await Products.findAll();
    if (true) {
      await Promise.all(
        products.map(async (el) => {
              let product = await Products.findOrCreate({
                  where: { 
                    title: el.title,
                    price: el.price,
                    weight: el.weight,
                    descriptions: el.descriptions,
                    image: el.image,
                    stock: el.stock,
                    avaliable: el.avaliable
                  }
              })


              await Promise.all(
                el.category.map(async (cat) => {
                      return await Category.findOrCreate({
                          where: { name: cat }
                      })
                  })
              ).then(cat =>{
                  cat.map(catElement => {
                    product[0].addCategory(catElement[0])
                  })
                // product[0].addCategory(cat[0][0])
              })
              
          })
      )
    }
  }