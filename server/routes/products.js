const { Product } = require("../models/product");
const { isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");



const router = require("express").Router();

//CREATE
router.post("/create", async (req, res) => {
  const { name, category, price, size, info, colors, image } = req.body;

  try {
   
      if (image) {
        const product = new Product({
          name,
          category,
          info,
          size,
          colors,
          price,
          image,
         
        });
        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
      
    }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


//CREATE2
router.post("/create2", async (req, res) => {
  
  try {
       
        const product = await Product.create(req.body);
        res.status(200).json(product);
      }
      
  
  catch (error) {
    console.log(error);
    res.status(500).json({message:error.message});
  }
});
//Edit product

router.post("/",  async (req, res) => {
  
  if (req.body.producImg) {
    try {


      const destroyResponse = await cloudinary.uploads.destroy(
        req.body.product.image.public_id
      );

      if (destroyResponse) {
        const uploadedResponse = await cloudinary.uploads.upload(
          req.body.producImg,
          {
            upload_preset: "lanhnb",
          }
        );

        if (uploadedResponse) {
          const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.product,
                image: uploadedResponse,
              },
            },
            { new: true }
          );
          res.status(200).send(updatedProduct);
        }

      }
    }
    catch (err) {
      res.status(500).send(err);
    }

  }
  else {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.product,
        },
        { new: true }
      );
      res.status(200).send(updatedProduct);
    } catch (err) {
      res.status(500).send(err);
    }
  }

});


//DELETE

router.delete("/:id",  async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
   if (!result){
    return res.status(404).json({message:"Product not found"});
   }
   res.status(200).json({message:"Products deleted success"})
    
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const qcategory = req.query.category;
  try {
    let products;

    if (qcategory) {
      products = await Product.find({
        category: qcategory,
      });
    } else {
      products = await Product.find();
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE product

router.put("/:id", async (req, res) => {
 
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.product,
        },
        { new: true }
      );
      res.status(200).send(updatedProduct);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);




module.exports = router;
