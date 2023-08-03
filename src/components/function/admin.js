import axios from "axios";

export const getOrderAdmin = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });
};

export const ChangeStatus = async (authtoken, orderId, orderstatus) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderstatus },
    {
      headers: {
        authtoken,
      },
    }
  );
};
