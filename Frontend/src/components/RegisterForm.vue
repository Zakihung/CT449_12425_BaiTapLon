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
        const Registerform = yup.object().shape({
            HoLot: yup
                .string()
                .required("Không được bỏ trống")
                .max(15, "Tối đa 15 kí tự"),
            Ten: yup
                .string()
                .required("Không được bỏ trống")
                .max(10, "Tối đa 10 kí tự"),
            TenTaiKhoan: yup
                .string()
                .required("Không được bỏ trống")
                .max(15, "Tối đa 15 kí tự")
                .min(10, "Ít nhất 10 kí tự"),
            DienThoai: yup
                .string()
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g,"Số điện thoại không hợp lệ.")
                .required("Số điện thoại không được bỏ trống"),
            MatKhau: yup
                .string()
                .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
                .required("Mật khẩu phải có giá trị.")
        });
        return {
            Registerform,
            userDataInput: {
                HoLot: "",
                Ten: "",
                TenTaiKhoan: "",
                DienThoai: "",
                MatKhau: ""
            },
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            }
        }
    },
    methods: {
        toast,
        async createUser() {
            try {
                if (this.userDataInput.HoLot == '' || this.userDataInput.Ten == '' || this.userDataInput.MatKhau == '' || this.userDataInput.DienThoai == '' || this.userDataInput.TenTaiKhoan == '') {
                    this.toasts.title = "Thất bại",
                        this.toasts.msg = "Chưa điền đầy đủ thông tin !"
                    this.toasts.type = "success",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast();
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                    }, 1000)
                }
                else {
                    console.log(this.userDataInput)
                    await TaiKhoanService.register(this.userDataInput);
                    this.toasts.title = "Thành công",
                        this.toasts.msg = "Đăng Ký Thành Công !"
                    this.toasts.type = "success",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast();
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                        this.$router.push({ name: "Login" });
                    }, 2000)
                    }
            }catch(err) {
                console.log(err)
                this.toasts.title = "Thất bại",
                    this.toasts.msg = "Đăng kí tài khoản thất bại !"
                this.toasts.type = "error",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        }
    }
};

</script>


<template>
    <ToastVue></ToastVue>
    <Form :validation-schema="Registerform" @submit.prevent>
        
        <div class="mb-3">
            <label for="inputFistname" class="form-label fw-bold">Họ và chữ lót: </label>
            <Field id="inputFistname" placeholder="Vui lòng nhập vào họ và chữ lót" name="holot" type="text" class="form-control form-control-lg" v-model="userDataInput.HoLot" required />
            <ErrorMessage name="holot" class="text-danger" />
        </div>

        
        <div class="mb-3">
            <label for="lastname" class="form-label fw-bold">Tên: </label>
            <Field id="lastname" placeholder="Vui lòng nhập vào tên" name="ten" type="text" class="form-control form-control-lg" v-model="userDataInput.Ten" required />
            <ErrorMessage name="ten" class="text-danger" />
        </div>

        <div class="mb-3">
            <label for="username" class="form-label fw-bold">Tên Tài Khoản: </label>
            <Field id="username" placeholder="Vui lòng nhập vào tên tài khoản" name="user" type="text" class="form-control form-control-lg" v-model="userDataInput.TenTaiKhoan" required />
            <ErrorMessage name="user" class="text-danger" />
        </div>
        
        <div class="mb-3">
            <label for="inputphonenumber" class="form-label fw-bold">Số điện thoại: </label>
            <Field id="inputphonenumber" placeholder="Vui lòng nhập vào số điện thoại" name="phonenumber" type="text" class="form-control form-control-lg"  v-model="userDataInput.DienThoai" required />
            <ErrorMessage name="phonenumber" class="text-danger" />
        </div>


        
        <div class="mb-3">
            <label for="password" class="form-label fw-bold">Mật khẩu: </label>
            <Field id="password" placeholder="Vui lòng nhập vào mật khẩu" name="password" type="password" class="form-control form-control-lg" v-model="userDataInput.MatKhau" required />
            <ErrorMessage name="password" class="text-danger" />
        </div>

        <!-- Ghi nhớ đăng nhập -->
        <!-- <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">Ghi nhớ đăng nhập</label>
                            </div> -->

        <button type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc" @click="createUser()">Đăng Ký</button>
        <p class="mt-4">Nếu đã có tài khoản. Hãy nhấn vào
            <router-link to="/login" class="link-danger">Đăng Nhập
            </router-link>
        </p>
    </Form>
</template>

<style scoped>


.form-control-lg{
    font-size: 15px;
}
</style>