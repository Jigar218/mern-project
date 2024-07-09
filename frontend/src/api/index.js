const domain = process.env.REACT_URL; //"http://localhost:8080";

const Api = {
  signUp: {
    url: `${domain}/api/signup`,
    method: "post",
  },
  login: {
    url: `${domain}/api/login`,
    method: "post",
  },
  current_user: {
    url: `${domain}/api/user-details`,
    method: "get",
  },
  logout: {
    url: `${domain}/api/logout`,
    method: "get",
  },
  allUser: {
    url: `${domain}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${domain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${domain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${domain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${domain}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${domain}/api/get-category-product`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${domain}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${domain}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${domain}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${domain}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${domain}/api/view-cart-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${domain}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${domain}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${domain}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${domain}/api/filter-product`,
    method: "post",
  },
  // option pay
  payment: {
    url: `${domain}/api/checkout`,
    method: "post",
  },
  getOrder: {
    url: `${domain}/api/order-list`,
    method: "get",
  },
  allOrder: {
    url: `${domain}/api/all-order`,
    method: "get",
  },
};

export default Api;
