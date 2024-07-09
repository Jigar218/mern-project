const express = require("express");
const router = express.Router();

const SignUpController = require("../controller/SignUp");
const LoginController = require("../controller/Login");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const UserLogout = require("../controller/userLogout");
const updateUser = require("../controller/product/updateUser");
const allUsers = require("../controller/AllUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProduct");
const getcategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetail");
const addTocartController = require("../controller/addTocartController");
const countAddToCartProduct = require("../controller/countAddToCartProduct");
const addToCartViewProduct = require("../controller/addToCartView");
const UpdateAddTocartProduct = require("../controller/UpdateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/DeleteAddTocartProduct");
const searchProduct = require("../controller/serachProduct");
const filterProduct = require("../controller/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webhooksController = require("../controller/order/webhook");
const orderController = require("../controller/order/orderController");
const allOrderController = require("../controller/allOrderController");

router.post("/signup", SignUpController);
router.post("/login", LoginController);

router.get("/user-details", authToken, userDetailsController);
router.get("/logout", UserLogout);
//admin-panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//upload product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-category-product", getCategoryProduct);
router.post("/category-product", getcategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProduct);

//add to cart
router.post("/addtocart", authToken, addTocartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, UpdateAddTocartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

//////----------
//payment
router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhooksController);
router.get("/order-list", authToken, orderController);
router.get("/all-order", authToken, allOrderController);

module.exports = router;
