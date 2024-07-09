const url = `https://api.cloudinary.com/v1_1/dm2mgs2pj/image/upload`;
const uploadimage = async (image) => {
  const formdata = new FormData();
  formdata.append("file", image);
  formdata.append("upload_preset", "product_img");

  const dataRes = await fetch(url, {
    method: "post",
    body: formdata,
  });

  return dataRes.json();
};
export default uploadimage;
