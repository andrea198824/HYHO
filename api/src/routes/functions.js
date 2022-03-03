const axios = require('axios');
const { Breed, Temperament } = require('../db');

const getApiInfo = async () => {
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
    return apiUrl.data
}

function weightHeightConverter (input) {
    let toReturn = input.match(/\d+/g)
    // console.log('toReturn       :', toReturn)
    toReturn = toReturn?.map(e => parseInt(e))
    return toReturn
  }
  
  function lifeSpanConverter (input) {
    let toReturn = input.match(/\d+/g)
    toReturn = toReturn?.map(e => parseInt(e))
    return toReturn
  }

const apiInfoAdapter = async () => {
    let apiInfo = await getApiInfo();
    let adaptedApiInfo = apiInfo.map((el)=>{
        return {
            weight: weightHeightConverter(el.weight.metric),
            height: weightHeightConverter(el.height.metric),
            id: el.id,
            name: el.name,
            life_span: lifeSpanConverter(el.life_span),
            temperaments: el.temperament,
            image: el.image.url,
            origin: el.origin,
            bred_for: el.bred_for,
        }
    })
    let arr
    adaptedApiInfo = adaptedApiInfo.map((el)=>{
        if (el. temperaments) {
            el. temperaments = el.temperaments.split(", ");
            el.temperaments = el.temperaments.map(i => {
                return {name: i}
            });
        }
        return {
            weight: el.weight,
            height: el.height,
            id: el.id,
            name: el.name,
            life_span: el.life_span,
            temperaments: el. temperaments,
            image: el.image,
            origin: el.origin,
            bred_for: el.bred_for,  
        }
    })
    return adaptedApiInfo
}

const getDbInfo = async () => {
    const dbInfo = await Breed.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes:[],
            }
        }
    })
    return dbInfo
}

const getAllInfo = async () => {
    dbInfo = await getDbInfo();
    adaptedApiInfo = await apiInfoAdapter();
    return dbInfo.concat(adaptedApiInfo);
}

function isUUID(uuid) {
    let s = "" + uuid;
    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
        return false;
    }
    return true;
}

async function getTemperaments() {
    let apiInfo = await getAllInfo();
    let temperamentsToReturn = [];
    apiInfo.map((el) => {
        if (el.temperaments && el.temperaments.length){
            el.temperaments.map((temperament) => {
                temperamentsToReturn.push(temperament.name)
              })
        }
    });
    return temperamentsToReturn
  }



module.exports = {
    getApiInfo,
    apiInfoAdapter,
    getDbInfo,
    getAllInfo,
    isUUID,
    getTemperaments,
    weightHeightConverter,
    lifeSpanConverter,
}