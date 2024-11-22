import createApiClient from "./api.service";

class DocGiaService {
    constructor(baseUrl = "/api/docgia") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async updateMaDocGia(MaDocGia, data) {
        return (await this.api.put(`/update/${MaDocGia}`, data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async findByMaDocGia(MaDocGia, data) {
        return (await this.api.get(`/findByMaDocGia/${MaDocGia}`, data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new DocGiaService();