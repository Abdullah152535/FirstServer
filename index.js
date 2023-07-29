const http = require('http');
const fs = require('fs')
const {getProducts,getProduct,createProduct,UpdateProduct} = require('./controllers/productController')


const PORT = process.env.PORT || 8080
const server = http.createServer((req,res)=>{

   if (req.url==='/api/products' && req.method==='GET') {
      getProducts(req,res);
   }
   else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method==='GET'){
      const id = req.url.split('/')[3];
      getProduct(req,res,id);
   }
   else if(req.url==='/api/products' && req.method==='POST'){
      createProduct(req,res)
   }
   else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method==='PUT'){
      const id = req.url.split('/')[3];
      UpdateProduct(req,res,id);
   }
   else{
    res.writeHead(404,{'Content-Type':'application/json'})
    res.end(JSON.stringify({message:'Route Not found'}));  
   }

})

server.listen(PORT,()=>console.log(`Server is Listening at Port ${PORT}`))












 // const log = `${Date.now()}: ${req.url} New Request Received \n`

    // fs.appendFile("log.txt",log, (err,data)=>{
    //     res.end('Hello from Server')
    // })