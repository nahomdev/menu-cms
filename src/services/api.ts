import axios from 'axios';

const api = axios.create({
  baseURL: 'https://menu-api-o2y8.onrender.com/',
});

export const fetchMenuItems = async () => {
  const response = await api.get('/menu-items');
  return response.data;
};

export const addMenuItem = async (name: string, parentId: number | null, id: string, depth: number) => {
  const response = await api.post('/menu-items', { name, parentId, id, depth });
  return response.data;
};
