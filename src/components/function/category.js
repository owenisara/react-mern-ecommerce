import axios from "axios";

export const createCategory = async (authtoken, value) => {
  return await axios.post(`${process.env.REACT_APP_API}/category`, value, {
    headers: {
      authtoken,
    },
  });
};

export const listCategory = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/category`, {
    headers: {
      authtoken,
    },
  });
};

export const deleteCategory = async (authtoken, id) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${id}`, {
    headers: {
      authtoken,
    },
  });
};
export const readCategory = async (authtoken, id) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${id}`, {
    headers: {
      authtoken,
    },
  });
};
export const editCategory = async (authtoken, id, name) => {
  return await axios.put(`${process.env.REACT_APP_API}/category/${id}`, name, {
    headers: {
      authtoken,
    },
  });
};
