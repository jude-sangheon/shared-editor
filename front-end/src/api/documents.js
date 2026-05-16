import axios from 'axios';

const API_URL = 'http://localhost:8080/api/documents';

export const getAllDocuments = () => axios.get(API_URL);
export const getDocument = (id) => axios.get(`${API_URL}/${id}`);
export const createDocument = (document) => axios.post(API_URL, document);
export const updateDocument = (id, document) => axios.put(`${API_URL}/${id}`, document);
export const deleteDocument = (id) => axios.delete(`${API_URL}/${id}`);