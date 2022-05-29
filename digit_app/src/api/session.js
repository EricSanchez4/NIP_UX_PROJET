import axios from 'axios';

const server = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const sign_up = async ( firstname , lastname, email, password) => {
  try {
    const { data, status } = await server.post("users", { firstname , lastname, email, password });
    console.log("data", data);
    console.log("status", status);
    return status;
  } catch (error) {
    console.error(error);
    return error.response.status;
  }
};

export const get_users = async () => {
  try {
    const { data, status } = await server.get("users");
    return { data, status };
  } catch (error) {
    console.log(error.response.status);
    return error.response;
  }
};

export const get_user = async (id) => {
  try {
    const { data, status } = await server.get(`users/${id}`);
    return { data, status };
  } catch (error) {
    console.log(error.response.status);
    return error.response;
  }
};

export const update_user = async (id , myjson) => {
  console.log(id, myjson);
  try {
    const { data, status } = await server.patch(`users/${id}`, myjson);
    console.log("data", data);
    console.log("status", status);
    return status;
  } catch (error) {
    console.error(error);
    return error.response.status;
  }
};

export const delete_user = async (id) => {
  console.log(id);
  try {
    const { data, status } = await server.delete(`users/${id}`);
    console.log("data", data);
    console.log("status", status);
    return status;
  } catch (error) {
    console.error(error);
    return error.response.status;
  }
};