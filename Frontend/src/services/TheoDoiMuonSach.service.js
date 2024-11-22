import createApiClient from "./api.service";

class TheoDoiMuonSachService {
    constructor(baseUrl = "/api/tdms") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async update(data) {
        return (await this.api.put("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async delete() {
        return (await this.api.delete("/deleteOne")).data;
    }
    async loan(data) {
        return (await this.api.post("/loan", data)).data;
    }
    async pay() {
        return (await this.api.post(`/pay`)).data;
    }
    async getDataLoanWithIDUser(id) {
        return (await this.api.get(`/infoUser/${id}`)).data;
    }
    async getDataLoanWithMaDocGia(MaDocGia) {
        return (await this.api.get(`/${MaDocGia}`)).data;
    }
    async getDataLoan() {
        return (await this.api.get(`/getDataLoan`)).data;
    }

}

export default new TheoDoiMuonSachService();