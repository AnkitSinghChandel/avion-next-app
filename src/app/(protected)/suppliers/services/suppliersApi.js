import axiosInstance from "@/src/utils/axiosInstance";

const axios = axiosInstance;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addTeam2 = async (payload) => {
  const response = await axios({
    method: "POST",
    url: `${API_URL}/teams`,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    data: payload,
  });

  return response.data;
};

export const addSupplier = async (payload) => {
  const response = await axios.post(`${API_URL}/supplier`, payload);
  return response.data;
};

export const fetchAllSuppliers = async ({ page, limit, payload }) => {
  // const response_old_with_post = await axios.post(
  //   `${API_URL}/supplier/fetchAllSupplier?page=${page}&limit=${limit}`,
  //   payload,
  // );

  const response = await axios.get(
    `${API_URL}/supplier/?page=${page}&limit=${limit}&searchQuery=${payload?.searchQuery}&status=${payload?.technologyQuery}&sortBy=${payload?.sortBy}`,
  );
  return response.data;
};

export const updateSupplierById = async (supplierId, payload) => {
  const response = await axios.put(
    `${API_URL}/supplier/${supplierId}`,
    payload,
  );
  return response.data;
};

export const fetchSupplierById = async (supplierId) => {
  const response = await axios.get(`${API_URL}/supplier/${supplierId}`);
  return response.data;
};

export const deleteSupplierById = async (supplierId) => {
  const response = await axios.delete(`${API_URL}/supplier/${supplierId}`);
  return response.data;
};
