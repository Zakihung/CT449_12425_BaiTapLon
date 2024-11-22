import createApiClient from "./api.service";

class SachService {
    constructor(baseUrl = "/api/sach") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getLimit() {
        return (await this.api.get("/limit")).data;
    }
    async getCategoryBook(name) {
        return (await this.api.get(`/categoryBook/${name}`)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async updateSoQuyen(data) {
        return (await this.api.put(`/updateSoQuyen`, data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async findName(name) {
        return (await this.api.get(`/findName/${name}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async findByMaSach(MaSach, data) {
        return (await this.api.get(`/findByMaSach/${MaSach}`, data)).data;
    }
    
}

export default new SachService();