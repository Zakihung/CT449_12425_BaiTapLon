<script>
import TaiKhoanService from '../services/TaiKhoan.service';
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        ToastVue,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const Loginform = yup.object().shape({
            TenTaiKhoan: yup
                .string()
                .required("Tên tài khoản phải có giá trị.")
                .max(30, "Tên tài khoản chứa tối đa 30 ký tự."),
            MatKhau: yup
                .string()
                .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
                .required("Mật khẩu phải có giá trị.")
        });
        return {
            Loginform,
            userDataInput: {
                TenTaiKhoan: "",
                MatKhau: ""
            },
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
        }
    },
    methods: {
        toast,
        async handleLoginUser() {
            try {
                if (this.userDataInput.TenTaiKhoan == '' || this.userDataInput.MatKhau == '') {
                    this.toasts.title = "Thất bại",
                        this.toasts.msg = "Chưa điền đầy đủ thông tin !"
                    this.toasts.type = "success",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast();
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                    }, 1000)
                } else {
                    if (this.userDataInput.TenTaiKhoan === 'NV0001') {
                        await TaiKhoanService.login(this.userDataInput);
                        localStorage.setItem('nvlogin', true);
                        this.toasts.title = "Thành công",
                            this.toasts.msg = "Đăng Nhập Thành Công !"
                        this.toasts.type = "success",
                            this.toasts.duration = 2000
                        document.querySelector("#toast").style.display = 'block'
                        this.toast();
                        setTimeout(() => {
                            document.querySelector("#toast").style.display = 'none'
                            this.$router.push('/nhanvien');
                        }, 1000)
                    } else {
                        const userDataLogin = await TaiKhoanService.login(this.userDataInput);
                        localStorage.setItem('isloggin', JSON.stringify(userDataLogin));
                        this.toasts.title = "Thành công",
                            this.toasts.msg = "Đăng Nhập Thành Công !"
                        this.toasts.type = "success",
                            this.toasts.duration = 2000
                        document.querySelector("#toast").style.display = 'block'
                        this.toast();
                        setTimeout(() => {
                            document.querySelector("#toast").style.display = 'none'
                            this.$router.push({ name: "HomePage" });
                        }, 2000)
                    }
                    setTimeout(() => {
                        window.location.reload();
                    }, 2100)
                }
            }
            catch (err) {
                console.log(err)
                this.toasts.title = "Thất bại",
                    this.toasts.msg = "Sai tên tài khoản hoặc mật khẩu !"
                this.toasts.type = "error",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        }
    },
};
</script>

<template>
    <ToastVue></ToastVue>
    <Form :validation-schema="Loginform" @submit.prevent>
        <!-- TenTaiKhoan Input -->
        <div class="mb-3">
            <label for="username" class="form-label fw-bold">Tên Tài Khoản:</label> 
            <Field id="username" placeholder="Vui lòng nhập vào Tên Tài Khoản" name="user" type="text" class="form-control form-control-lg" v-model="userDataInput.TenTaiKhoan" required /> 
            <ErrorMessage name="user" class="text-danger" /> 
        </div>

        <!-- MatKhau Input -->
        <div class="mb-3">
            <label for="matkhau" class="form-label fw-bold">Mật khẩu: </label>
            <Field id="matkkhau" placeholder="Vui lòng nhập vào mật khẩu" name="pass" type="password" class="form-control form-control-lg" v-model="userDataInput.MatKhau" required />
            <ErrorMessage name="pass" class="text-danger" />
        </div>

        <button type="submit" @click="handleLoginUser()" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Đăng Nhập</button>
        <p class="mt-4">Nếu chưa có tài khoản. Hãy nhấn vào
            <router-link to="/register" class="link-danger">Đăng Ký
            </router-link>
        </p>
    </Form>
</template>

<style scoped>
span {
    display: block;
}
.form-control-lg{
    font-size: 15px;
}
</style>