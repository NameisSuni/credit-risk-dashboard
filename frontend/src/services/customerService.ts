import axios from "./api";
import { Customer } from "../types/commonTypes.types";
const BASE_URL = import.meta.env.VITE_CREDIT_RISK_BACKEND_URL;

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/customers`);
    console.log("Response:", response.data);
    if (response.status !== 200) {
      throw new Error("Failed to fetch customers: " + response.statusText);
    }
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch customers: " + error);
  }
};

export const updateCustomerStatus = async (
  customerId: string,
  status: string
): Promise<void> => {
  try {
    const res = await axios.put(`${BASE_URL}/customers/${customerId}/status`, {
      status,
    });
    console.log("Response:", res);
  } catch (error) {
    throw new Error("Failed to update customer status: " + error);
  }
};

export const sendAlert = async (payload: {
  customerId: string;
  message: string;
}): Promise<void> => {
  try {
    const res = await axios.post(`${BASE_URL}/customers/alerts`, payload);
    console.log("Response:", res);
  } catch (error) {
    throw new Error("Failed to send alert: " + error);
  }
};
