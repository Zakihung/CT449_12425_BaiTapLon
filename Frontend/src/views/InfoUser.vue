<script>
import TaiKhoanService from '../services/TaiKhoan.service';
import TDMSService from '@/services/TheoDoiMuonSach.service';
import SachService from '../services/Sach.service';
import DocGiaService from '@/services/DocGia.service';
export default {
    data() {
        return {
            dataAccount: [],
            dataUser: [],
            id_user: '',
            dataLoan: [],
        }
    },
    methods: {
        async getDataUser() {
            this.dataAccount = await TaiKhoanService.get(this.$route.params.id);
            this.dataUser = await DocGiaService.findByMaDocGia(this.dataAccount.MaDocGia);
            this.id_user = this.$route.params.id;
        },
        async getDataLoan() {
            this.dataLoad = await TDMSService.getDataLoanWithMaDocGia(this.dataAccount.MaDocGia);
            console.log(this.dataUser);
        },

    },
    created() {
        this.getDataUser();
        this.getDataLoan();
    }
}
</script>
<template>
<div class="container" id="container_height" style="margin-top: 20px;">
    <p style="font-weight:bold;opacity:0.6">TÀI KHOẢN CỦA BẠN</p>
    <h5>LỊCH SỬ MƯỢN SÁCH</h5>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã sách</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Ngày thanh toán</th>
                <th scope="col">Ngày trả</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="dataLoan.length == 0" style="color:red;font-weight:bold;">Bạn chưa có mượn quyển sách nào !</tr>
            <tr v-for="(item, index) in dataLoan">
                <td>{{ ++index }}</td>
                <td>
                    <p>{{item.MaSach}}</p>
                </td>
                <td>
                    <p>{{(SachService.findByMaSach(item.MaSach)).TenSach}}</p>
                </td>
                <td>{{ item.SoLuong }}</td>
                <td>{{ item.GiaSauMuon }} đ</td>
                <td>{{ item.NgayThanhToan }}</td>
                <td>{{ item.NgayTra }}</td>
            </tr>
        </tbody>
    </table>
    <hr>
    <h5>THÔNG TIN CÁ NHÂN
        <router-link :to="{
                name: 'editInfoUser',
                params: { id: id_user },
            }">
            <button type="button" class="btn btn-danger"><i class="fa-solid fa-user-pen"></i> Chỉnh sửa </button>
        </router-link>

        <!-- &nbsp;&nbsp;
        <router-link :to="{
                name: 'ChangePassword',
                params: { id: id_user },
            }">
            <button type="button" class="btn btn-info text-white"><i class="fa-solid fa-key"></i> Đổi mật khẩu </button>
        </router-link> -->

    </h5>
    <p>Họ và tên: {{ dataUser.HoLot + " " + dataUser.Ten }}</p>
    <p>Ngày sinh: {{ dataUser.NgaySinh }}</p>
    <p>Giới tính: {{ dataUser.Phai }}</p>
    <p>Địa chỉ: {{ dataUser.DiaChi }}</p>
    <p>Số điện thoại: {{ dataUser.DienThoai }}</p>
</div>
</template>

<style>
#container_height {
    margin-left: 170px;
    margin-top: 50px;
}
</style>
