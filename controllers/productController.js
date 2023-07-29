const productModel = require("../models/productModel");

const { getPostData } = require("../utils");

async function getProducts(req, res) {
  try {
    const products = await productModel.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await productModel.findbyID(id);
    // console.log(product)
    if (product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Does not exist" }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const {
      id,
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = JSON.parse(body);

    const product = {
      id,
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    };
    const newProduct = await productModel.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

async function UpdateProduct(req, res, pid) {

  try {

    // looking if the product with the requested ID in API even exists in our products.json file
    // using Model function 
    const product = await productModel.findbyID(pid);
    // if it doesn;t exists then return the message that PUT request can't be completed bcz no product with such id 
    if(!product){
      res.writeHead(404,{'ContentType':'application/json'});
      res.end(JSON.stringify({message:'Product Not Found'}))
    }
    
    else{

      //else get the Body Data of put request which Client wants the Server to Update or add
      const body = await getPostData(req);

      //destructuring it
      const {
        id,
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      }  = JSON.parse(body);

     

      const ProductData = {
        id: id || product.id,
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
        discountPercentage: discountPercentage || product.discountPercentage,
        rating: rating || product.rating,
        stock: stock || product.stock,
        brand: brand || product.brand,
        category: category || product.category,
        thumbnail: thumbnail || product.thumbnail,
        images: images || product.images,
      };

      const updatedProduct = await productModel.Update(ProductData,pid);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedProduct));
    } 
    } 
    catch (error) {
      console.log(error);
    }
   
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  UpdateProduct,
};
