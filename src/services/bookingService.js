import { api } from './api';

export const bookingService = {
  create: async (payload) => {
    const response = await api.post('/bookings', payload);
    return response.data;
  },
  getMine: async () => {
    const response = await api.get('/bookings/my');
    return response.data;
  },
  cancelMine: async (id) => {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },
};
