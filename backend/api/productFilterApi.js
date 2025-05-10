const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const product = require("../models/product");

// API for all the listed products (/api/product)
// router.get("/product", async (req, res) => {
//   try {
//     const productData = await productModel.find();
//     res.json({ message: "Successfully sent product API", productData });
//   } catch (error) {
//     console.log("Error occured:,",error)
//     res.send("Error occured:", error);
//   }
// });

// API for product with the filters (/api/product/{filter_name})

// router.get("/filterbygender/:filterName", async (req, res) => {
//   const { filterName } = req.params;
//   try {
//     const filteredProductData = await productModel.find({
//       size: { $in: [filterName] },
//     });
//     if (filteredProductData) {
//       res.json({
//         message: "Successfully filtered sizes!",
//         filteredProductData,
//       });
//     } else {
//       res.status.apply(404).send("Error occured");
//     }
//   } catch (error) {
//     res.status(500).send("Server Error");
//   }
// });

// router.get("/filterbycategory/:filterName", async (req, res) => {
//   const { filterName } = req.params;
//   try {
//     const filteredProductData = await productModel.find({
//       category: filterName,
//     });
//     if (filteredProductData) {
//       res.json({
//         message: "Successfully filtered category!",
//         filteredProductData,
//       });
//     } else {
//       res.status.apply(404).send("Error occured");
//     }
//   } catch (error) {
//     res.status(500).send("Server Error");
//   }
// });

// router.get("/filterbycolor/:filterName", async (req, res) => {
//   const { filterName } = req.params;
//   try {
//     const filteredProductData = await productModel.find({ color: filterName });
//     if (filteredProductData) {
//       res.json({
//         message: "Successfully filtered color!",
//         filteredProductData,
//       });
//     } else {
//       res.status.apply(404).send("Error occured");
//     }
//   } catch (error) {
//     res.status(500).send("Server Error");
//   }
// });

// router.get("/filterbysize/:filterName", async (req, res) => {
//   const { filterName } = req.params;
//   const sizeArray = filterName.split(",");

//   try {
//     const filteredProductData = await productModel.find({
//       size: {
//         $in: sizeArray.map((size) => new RegExp(`^${size}$`, "i")),
//       },
//     });

//     if (filteredProductData.length > 0) {
//       res.send({
//         message: "Successfully filtered sizes!",
//         filteredProductData,
//       });
//     } else {
//       res.status(404).send("No products found with this size filter");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// router.get("/filterbymaterial/:filterName", async (req, res) => {
//   const { filterName } = req.params;
//   try {
//     const filteredProductData = await productModel.find({
//       material: { $regex: new RegExp(`^${filterName}$`, "i") },
//     });
//     if (filteredProductData) {
//       res.json({
//         message: "Successfully filtered material!",
//         filteredProductData,
//       });
//     } else {
//       res.status.apply(404).send("Error occured");
//     }
//   } catch (error) {
//     res.status(500).send("Server Error");
//   }
// });

// router.get("/filterbybrand/:filterName", async (req, res) => {
//   const { filterName } = req.params;
//   try {
//     const filteredProductData = await productModel.find({
//       brand: { $regex: new RegExp(`^${filterName}$`, "i") },
//     });
//     if (filteredProductData) {
//       res.json({
//         message: "Successfully filtered brand!",
//         filteredProductData,
//       });
//     } else {
//       res.status.apply(404).send("Error occured");
//     }
//   } catch (error) {
//     res.status(500).send("Server Error");
//   }
// });

// router.get("/filterbyprice/:filterName", async (req, res) => {
//   const { filterName } = req.params;
//   const modifiedPrice = Number(filterName);
//   try {
//     if (isNaN(modifiedPrice)) {
//       return res.status(400).json({ message: "Invalid price filter" });
//     }
//     const filteredProductData = await productModel.find({
//       price: { $gte: 1, $lte: modifiedPrice },
//     });

//     if (filteredProductData) {
//       res.json({
//         message: "Successfully filtered price!",
//         filteredProductData,
//       });
//     } else {
//       res.status.apply(404).send("Error occured");
//     }
//   } catch (error) {
//     return res.status(500).send("Server Error");
//   }
// });

router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      material,
      sortBy,
      search,
      description,
      brand,
      category,
      limit,
    } = req.query;
    let query = {};
    // Filter that is not array
    if (collection && collection.toLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }
    if (gender && gender.toLocaleLowerCase() !== "all") {
      query.gender = gender;
    }

    // Filter that is array

    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }

    // Filter that is array b ut can be selected one at a time with case in-sensetive $regx
    if (color) {
      query.color = { $regex: new RegExp(color, "i") };
    }

    /*
    in the above code if the color exists then the color is pushed in query in such a way that if the color is present inside the array of color then push it else do not push it and dont even add any color query 
    */

    // Filter with the range input field
    if (minPrice || maxPrice) {
      query.price = {};
      // The filter is in the price which is treated as a discount price by me and the original price is as it is
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // SortBy Logic
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

    // Fetch Product from db
    let products = await productModel
      .find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);

    console.log(query);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occured:", error);
  }
});

module.exports = router;
