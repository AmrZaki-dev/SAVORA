import api from './api';

export const orderService = {
  async createOrder(items) {
    // items: [{ menuItemId, quantity }] — never send price
    const { data } = await api.post('/orders', { items });
    return data.data;
  },

  async getMyOrders() {
    const { data } = await api.get('/orders/my');
    return data.data;
  },

  async getAllOrders() {
    const { data } = await api.get('/orders');
    return data.data;
  },

  async getOrder(id) {
    const { data } = await api.get(`/orders/${id}`);
    return data.data;
  },

  async updateOrderStatus(id, status) {
    const { data } = await api.patch(`/orders/${id}/status`, { status });
    return data.data;
  },
};
