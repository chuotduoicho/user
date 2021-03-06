import axios from "axios";
import { object } from "prop-types";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/box";
const getAllServices = () => {
  return axios.get(API_URL + "/box-services").then((response) => {
    localStorage.setItem("services", JSON.stringify(response.data));
    return response.data;
  });
};
const getServiceById = (serviceId) => {
  return axios.get(API_URL + "/serviceDetail/" + serviceId).then((response) => {
    return response.data;
  });
};
const getServiceByCateId = (cateId) => {
  return axios
    .get(API_URL + "/list-services-by-cat/" + cateId)
    .then((response) => {
      return response.data;
    });
};
const addService = (service) => {
  return axios
    .post(API_URL + "/add-box-service", service, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const updateService = (obj) => {
  const service = obj.service;
  const serviceId = obj.serviceId;
  console.log(service, serviceId);
  return axios
    .put(API_URL + "/update-service?id=" + serviceId, service, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const serviceService = {
  getAllServices,
  getServiceById,
  addService,
  getServiceByCateId,
  updateService,
};

export default serviceService;
