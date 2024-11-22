<script>
import DocGiaService from '@/components/DocGia.vue';
import ToastVue from '../components/Toast.vue';
import toast from '../assets/js/toasts';
export default {
    components: {
        ToastVue
    },
    data() {
        return {
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
            userDataInput: {
                username: "",
                phonenumber: ""
            },
            userDataupdate:{
                _id:"",
                holot: "",
                ten: "",
                diachi: "",
                gioitinh: "",
                ngaysinh: "",
                phonenumber: ""
            }
        }
    },
    methods: {
        toast,
        async getDataUser() {
            const dataReturn = await DocGiaService.get(this.$route.params.id);
            this.userDataInput.username  = dataReturn.HoLot + dataReturn.Ten;
            this.userDataInput.phonenumber = dataReturn.SoDienThoai;
        },
        async handleEditUser(){
            try {
                let dataUpdate = await DocGiaService.update(this.$route.params.id, this.userDataInput)
                this.userDataupdate._id = dataUpdate._id;
                this.userDataupdate.holot = dataUpdate.HoLot;
                this.userDataupdate.ten = dataUpdate.Ten;

                this.userDataupdate.phonenumber = dataUpdate.phonenumber;

                localStorage.setItem("isloggin", JSON.stringify(this.userDataupdate))
            
                this.toasts.title = "Success",
                this.toasts.msg = "Cập nhật thông tin người dùng thành công !"
                this.toasts.type = "success",
                this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast();
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    this.$router.push(`/infoUser/${this.$route.params.id}`)
                }, 1500)
            }
            catch (err) {
                console.log(err)
                this.toasts.title = "Failed",
                this.toasts.msg = "Cập nhật thông tin người dùng thất bại !"
                this.toasts.type = "error",
                this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
        backPage() {
            setTimeout(() => {
                this.$router.push(`/infoUser/${this.$route.params.id}`)
            }, 100)
        },
    },
    created() {
        this.getDataUser();
    }
}
</script>
<template>
    <div class="container" style="margin-top:90px;">
        <ToastVue></ToastVue>
        <!-- Giao diện chỉnh sửa thông tin cá nhân -->
        <form @submit.prevent id="form_editUser" style="width:100%;">
            <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

            <br>
            <h2 class="text-center" style="color:#62ab00">Chỉnh sửa thông tin</h2>
            <!-- Title Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Họ và chữ lót: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào họ và chữ lót..." v-model="userDataInput.holot" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên..." v-model="userDataInput.ten" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Giới tính: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên..." v-model="userDataInput.gioitinh" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Địa chỉ: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên..." v-model="userDataInput.diachi" required>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Số điện thoại: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" minlength="10"  maxlength="10" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào số điện thoại..."  v-model="userDataInput.phonenumber" required>
            </div>

            <button @click="handleEditUser()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;border:1px solid #ccc">Xác Nhận</button>
        </form>
    </div>
</template>