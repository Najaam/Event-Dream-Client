import { api } from './api';

export const venueService = {
  getAll: async () => {
    const response = await api.get('/venues');
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/venues/${id}`);
    return response.data;
  },
  create: async (payload) => {
    const response = await api.post('/venues', payload);
    return response.data;
  },
  update: async (id, payload) => {
    const response = await api.put(`/venues/${id}`, payload);
    return response.data;
  },
  remove: async (id) => {
    const response = await api.delete(`/venues/${id}`);
    return response.data;
  },
};
