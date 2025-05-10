const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const {
  createProductController,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};
    if (collection && collection.toLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }
    if (material && material.toLowerCase() !== "all") {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }
    if (color) {
      query.color = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;

        case "priceDesc":
          sort = { price: -1 };
          break;

        case "popularity":
          sort = { rating: -1 };
          break;

        default:
          break;
      }
    }

    let products = await productModel
      .find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await productModel.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      return res.status(404).json({ message: "No best-seller found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error", error);
  }
});

router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(8);
    if (newArrivals) {
      res.json(newArrivals);
    } else {
      return res.status(404).json({ message: "No New Arrivals found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error", error);
  }
});

router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const similarProducts = await productModel.find({
      _id: { $ne: id }, // Exclude the current product
      gender: product.gender,
      category: product.category,
    });
    res.status(201).json(similarProducts).limit(4);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error", error);
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const productData = await productModel.findById(id);
    if (productData) {
      res.status(201).json(productData);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/create", protect, admin, createProductController);
router.put("/update/:id", protect, admin, updateProduct);
router.delete("/delete/:id", protect, admin, deleteProduct);

module.exports = router;
