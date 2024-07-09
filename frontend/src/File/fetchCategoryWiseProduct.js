import Api from "../api";

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(Api.categoryWiseProduct.url, {
    method: Api.categoryWiseProduct.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });

  const dataRes = await response.json();
  return dataRes;
};
export default fetchCategoryWiseProduct;
