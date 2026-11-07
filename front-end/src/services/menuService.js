import api from "./api";

export const menuService = {
  async getMenu(params = {}) {
    const query = {};

    if (params.search) query.search = params.search;
    if (params.category) query.category = params.category;

    const { data } = await api.get("/menu", { params: query });

    return data.data;
  },

  async getMenuItem(id) {
    const { data } = await api.get(`/menu/${id}`);
    return data.data;
  },

  async createMenuItem(itemData) {
    const { data } = await api.post("/menu", itemData);
    return data.data;
  },

  async updateMenuItem(id, itemData) {
    const { data } = await api.put(`/menu/${id}`, itemData);
    return data.data;
  },

  async deleteMenuItem(id) {
    const { data } = await api.delete(`/menu/${id}`);
    return data;
  },

  async reorderMenu(ids) {
    const { data } = await api.put("/menu/reorder", { ids });
    return data.data;
  },
};
