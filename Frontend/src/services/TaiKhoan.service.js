import createApiClient from "./api.service";

class TaiKhoanService {
    constructor(baseUrl = "/api/taikhoan") {
        this.api = createApiClient(baseUrl);
    }
    async register(data){
        return (await this.api.post("/register", data)).data;
    }
    async login(data){
        return (await this.api.post("/login", data)).data;
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async findByMaDocGia(MaDocGia) {
        return (await this.api.get(`/findByMaDocGia/${MaDocGia}`)).data;
    }
    async findByTenTK(TenTK) {
        return (await this.api.get(`/findByTenTK/${TenTK}`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new TaiKhoanService();