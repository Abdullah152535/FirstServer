const products = require('../data/products')
const  {v4: uuidv4} = require('uuid')
const {writeDatatoFile} = require('../utils')


function findAll(){
    return new Promise((resolve,reject)=>{
        resolve(products);
    })
}

function findbyID(id){
    return new Promise((resolve,reject)=>{ 
     
        console.log(id)
        const product = products.data.find((item)=>item.id==id)
        resolve(product);
    })
}

function create(product){

    return new Promise((resolve,reject)=>{
       
        products.data.push(product);
        writeDatatoFile('./data/products.json',products)
        resolve(product);
    
    })
}

function Update(product,id){

    return new Promise((resolve,reject)=>{

        const index = products.data.findIndex((p)=>p.id==id)
        
        console.log(index);

        products.data[index] = {id, ...product}

        writeDatatoFile('./data/products.json',products)

        resolve(products.data[index]);
    
    })

}
module.exports = {
    findAll,
    findbyID,
    create,
    Update,
} 