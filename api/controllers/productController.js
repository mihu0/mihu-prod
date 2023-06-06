import { Category, Product } from "../models/index.js";
export async function addProduct(req, res) {
  let productDetails;
  try {
    productDetails = JSON.parse(req.body.body);
    console.log(productDetails);
  } catch (error) {
    res.json({ error: error.message });
  }
  let {
    name,
    desc,
    price,
    categoryId,
    vendorId,
    isOnSale,
    discountPercentage,
    sales,
    stock,
    colorsAll,
    colorsAvailable,
  } = productDetails;
  const filePath = req.file.path;
  try {
    const user = await Product.create({
      prodId:getNextSequenceValue("prodId"),
      name,
      desc,
      price,
      imageLinks: filePath,
      categoryId,
      vendorId,
      isOnSale,
      discountPercentage,
      sales,
      stock,
      colorsAll,
      colorsAvailable,
    });
    res.json({ Message: `Product Has Been Added Successfully` });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
export async function deleteProduct(req, res) {
  const { productId } = req.body;

  try {
    await Product.deleteOne({ prodId: productId });
    res.json({ Message: `Product has been deleted Successfully` });
  } catch (error) {
    res.json({ error: error.message });
  }
}
export async function getProducts(req, res) {
  try {
    let products = await Product.find({});
    res.json({ products: products });
  } catch (error) {
    res.json({ error: error });
  }
}
export async function productById(req, res) {
  console.log(req.body.prodId)
  try {
    let product = await Product.findOne({ _id: req.body.prodId });
    res.json({ success:true,product: product });
  } catch (error) {
    res.json({ success:false,error: error });
  }
}
export async function updateProduct(req, res) {
  let id = req.body.id;
  let updatedData = req.body.data;
  let document;
  try {
    document = await Product.findOneAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
  } catch (err) {
    res.json({ error: err.message });
  }
  res.status(201).json({ Message: "updated Data Successfully" });
}
export async function productsCategoryWise(req, res) {
  let category = req.body.category;
  console.log(category)
  try {
    Product.find({ category: category }).then(result=>{
      res.status(200).json({products:result})
    }).catch(err=>{
      res.status(401).json({error:err})
    })
  } catch (error) {
    res.json({ error: error });
  }
}

export async function productsBrandWise(req, res) {
  let brand = req.body.brand;
  console.log(brand)
  try {
    Product.find({ vendor: brand }).then(result=>{
      res.status(200).json({products:result})
    }).catch(err=>{
      res.status(401).json({error:err})
    })
  } catch (error) {
    res.json({ error: error });
  }
}

export async function searchProducts(req, res) {
  let search = req.body.search;
  console.log(search)
  try {
    Product.find({ name: { $regex: search, $options: "i" } }).then(result=>{
      res.status(200).json({products:result})
    }).catch(err=>{
      res.status(401).json({error:err})
    })
  } catch (error) {
    res.json({ error: error });
  }
}


export async function getRandomProducts(req, res) {

  try {
    Product.aggregate([{ $sample: { size: 10 } }])
    .exec((err, randomItems) => {
      if (err) {
        console.error(err);
        res.json({ success:false,error: 'An error occurred' });
        return;
      }
      
      res.json({success:true,products:randomItems});
    });
  } catch (error) {
    res.json({ success:false,error: error });
  }
}

export async function addMultipleProducts(req, res){
  try {
    const products = req.body.data;
    //console.log(products)
    const addedProducts = await Product.create(products,(error, docs) => {
      if (error) {
        console.log(error);
      } else {
        console.log(docs);
      }
    });
    res.json({
      success: true,
      products: addedProducts
    });

    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    });
  }
  
}

export async function getNumImages(req, res){
  try {
    console.log("products")
    const totalImages = await Product.aggregate([
      {
        $project: {
          totalImages: {
            $size: "$imageLinks"
          }
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalImages"
          }
        }
      }
    ]);
    res.json({
      success: true,
      totalImages: totalImages
    });

    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    });
  }
  
}
export async function getCategories(req, res){
  try {
    let categories = (await Category.find({})).map(cat=>{return cat.name});
    // console.log(categories)
    res.json({ success:true,categories: categories });
  } catch (error) {
    res.json({ success:false,error: error });
  }
}

export async function getBrands(req, res){
  try {
    let brands = (await Product.distinct("vendor"));
    // console.log(brands)
    res.json({ success:true,brands: brands });
  } catch (error) {
    res.json({ success:false,error: error });
  }
}