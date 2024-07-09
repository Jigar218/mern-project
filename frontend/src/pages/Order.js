import React, { useEffect, useState } from "react";
import Api from "../api";
import moment from "moment";
import displayINRCurrency from "../File/DisplayCurrency";
const Order = () => {
  const [data, setData] = useState([]);
  const fetchOrderDetails = async () => {
    const response = await fetch(Api.getOrder.url, {
      method: Api.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();
    setData(responseData.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {!data[0] && <p> No order Available </p>}

      <div className="p-4 w-full ">
        {data.map((item, index) => {
          return (
            <div key={item.userId + index}>
              <p className="font-medium text-lg">
                {moment(item.createAt).format("LL")}
              </p>
              <div className=" border rounded ">
                <div className="flex  flex-col lg:flex-row lg:justify-between ">
                  <div className="grid gap-1">
                    {item?.productDetails.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className="flex gap-3 bg-slate-100"
                        >
                          <img
                            src={product.image[0]}
                            className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                            alt="img"
                          />
                          <div>
                            <div className="font-medium text-ellipsis text-lg line-clamp-1">
                              {product.name}
                            </div>
                            <div className=" flex gap-3 mt-1 items-center">
                              <div className="text-lg text-red-600">
                                {displayINRCurrency(product.price)}
                              </div>
                              <div>Quantity: {product.quantity}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col min-w-[300px]  p-2 gap-4">
                    <div>
                      <div className="text-lg font-medium">
                        Payment Details:
                      </div>
                      <p className=" ml-1">
                        Payment Method:{" "}
                        {item.paymentDetails.payment_method_type[0]}
                      </p>
                      <p className=" ml-1">
                        Payment Status: {item.paymentDetails.payment_status}
                      </p>
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        Shipping Details:
                        {item.shipping_options.map((shipping, index) => {
                          return (
                            <div
                              key={shipping.shipping_rate + index}
                              className="ml-1 font-normal"
                            >
                              Shipping Amount: {shipping.shipping_amount}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="font-semibold ml-auto w-fit lg:text-lg">
                  Total Amount: {displayINRCurrency(item.totalAmount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
