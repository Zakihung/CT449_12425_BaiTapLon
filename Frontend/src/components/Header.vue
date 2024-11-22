<script>
import LoaiSachService from '../services/LoaiSach.service';
export default {
    data() {
        return {
            inputSearch: '',
            checkLogNhanVien: '',
            QuanLyLoaiSach: [],
            countLoan: 0,
            userLoginname: '',
            userLoginID: '1'
        }
    },
    methods: {
        async showLoaiSach() {
            try {
                this.QuanLyLoaiSach = await LoaiSachService.getAll();
                let loanSpace = JSON.parse(localStorage.getItem("loanspace"));
                this.countLoan = loanSpace.length;
            } catch (error) {
                console.log(error)
            }
        },
        showUserAlreadyLogin() {
            if (localStorage.getItem('nvlogin') != null) {
                this.checkLogNhanVien = 'nvlogin';
                document.querySelector("#login_complete").style.display = 'block';
                document.querySelector("#not_login").style.display = 'none';
                this.userLoginname = 'Tài khoản Nhân Viên'
            } else {
                if (!localStorage.getItem('isloggin')) {
                    //Trường hợp chưa đăng nhập
                    document.querySelector("#not_login").style.display = 'block';
                    document.querySelector("#login_complete").style.display = 'none';
                } else {
                    //Trường hợp đã đăng nhập      
                    document.querySelector("#login_complete").style.display = 'block';
                    document.querySelector("#not_login").style.display = 'none';
                    this.userLoginname = JSON.parse(localStorage.getItem("isloggin")).TenTaiKhoan;
                    this.userLoginID = JSON.parse(localStorage.getItem("isloggin"))._id;
                }
            }
        },
        logout_Btn() {
            localStorage.removeItem("isloggin");
            localStorage.removeItem("nvlogin");
            localStorage.removeItem("loanspace");
            this.$router.push('/')
            setTimeout(() => {
                window.location.reload();
            }, 700)
        },
        loadPage() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        },
        navigationCategory() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        }
    },
    mounted() {
        this.showLoaiSach(),
        this.showUserAlreadyLogin()
    },  
}    
    
</script>
<template>

    <!-- Header1 -->
    <nav class="navbar navbar-expand-lg navbar-light" id="top_nav">
        <div class="container" style="height: 20px; text-align: center;">
            <a class="navbar-brand" href="/" style="position: absolute;margin-left:170px; margin-top:0px; z-index: 10000;">
                <img src="@/assets/img/logo.png" class="img-fluid" alt="..." width="80" height="80">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="input-group mb-3" v-if="checkLogNhanVien !== 'nvlogin'">
                    <form action="/" class="d-flex" style="width:600px; position: relative; ;left: 300px; top: 5px;" @submit.prevent>
                        <input type="text" class="form-control" placeholder="Nhập vào tên sách hoặc mô tả sách" aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;"
                            v-model="inputSearch">
                        <router-link v-if="inputSearch !== ''" :to="{
                            name: 'FindBook',
                            params: { name: JSON.stringify(inputSearch) },
                        }">
                            <button id="btn_search" type="submit" style="width:120px;height:40px;border-radius:0 6px 6px 0" @click="loadPage()">Tìm Kiếm</button>
                        </router-link>
                    </form>
                </div>

                <!-- cart_icon -->
                <div id="icon_cart" style="position: relative; right: 340px; z-index: 100;" v-if="checkLogNhanVien !== 'nvlogin'">
                    <router-link to="/loanpage">
                        <i class="fa-solid fa-box" style="color:#62ab00;position:relative">
                            <span style="position: absolute;
        border-radius: 50%;
        background-color: black;
        color: white;
        top: -8px;
        right: -6px;
        border-radius: 50%;
        padding: 2px;
        font-size: 15px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;">{{ countLoan }}</span>
                        </i>

                    </router-link>
                </div>

                

                <!-- Chưa đăng nhập -->
                <div id="not_login" style="z-index: 199;">
                    <span style="position: absolute; top: 10px; right: 320px; font-size: 20px;">
                        <router-link to="/login" > Đăng Nhập</router-link>
                    </span>
                    <span style="position: absolute; top: 10px; right: 220px; font-size: 20px;">
                        <router-link to="/register" > Đăng Ký</router-link>
                    </span>
                    
                </div>

                <!-- Đã đăng nhập -->
                <div id="login_complete" style="display:none; z-index:1099; position: absolute; right: 390px; top:13px;">
                    <div class="dropdown" style="z-index: 1099;">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false" style=" color: #62ab00; font-size: 30px; border:0px;position: relative;  z-index:10; background: none;">
                            <div style="">
                                <i class="fa fa-user" style="margin: 0;"></i>
                            <p style="display: inline; font-size: 20px; position: absolute;">{{ userLoginname }}</p>
                            </div>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="width: 200px; position: absolute;">
                            <div class="container d-flex flex-column">
                                <router-link :to="{
                                    name: 'InfoUser',
                                    params: { id: userLoginID }
                                }">
                                    <li>Tài khoản của tôi</li>
                                </router-link>
                                <li>
                                    <button @click="logout_Btn()" class="btn" style="font-size: 1rem; color: #0d6efd; padding: 0;">Đăng xuất</button>
                                </li>
                            </div>
                        </ul>
                    </div>
                    
                </div>  
            </div>   
        </div>
    </nav>

    <!-- Header 2 -->
    <nav class="navbar navbar-expand-lg navbar-light" id="nav_bottom" v-if="checkLogNhanVien !== 'nvlogin'">
        <div class="container" style="height: 50px; margin-left: 200px;">
            <div class="navbar-brand" href="#" style="margin-right: 100px; margin-left: 100px;">
                <div class="dropdown">
                    <button class="btn dropdown-toggle text-light fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                        style="border:2px solid white;z-index:10">
                        <i class="fa-solid fa-bars"></i>
                        &nbsp;
                        DANH MỤC SÁCH
                    </button>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="list-style:none;color:black;font-size:15px">
                        <div class="container d-flex flex-column">
                            <router-link @click="navigationCategory()" :to="{
                                name: 'CategoryBook',
                                params: { name: JSON.stringify('Tất Cả Sách') },
                            }">
                                <li>Tất cả sách</li>
                            </router-link>

                            <router-link @click="navigationCategory()" :to="{
                                name: 'CategoryBook',
                                params: { name: JSON.stringify(`${item.TenLoaiSach}`) },
                            }" v-for="item in QuanLyLoaiSach">
                                <li>{{ item.TenLoaiSach }}</li>
                            </router-link>

                            
                        </div>

                    </ul>
                </div>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="input-group mb-3 text-light" style="    align-items: center; margin-bottom: 0 !important;">
                    
                </div>

                <div style="margin-left: -592px;z-index:10">
                    <ul class="nav d-flex">
                        <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/" class="text-decoration-none text-white">
                                TRANG CHỦ
                            </router-link>
                        </li>
                        <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/introduce" class="text-decoration-none text-white">
                                GIỚI THIỆU
                            </router-link>
                        </li>
                        <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/contact" class="text-decoration-none text-white">
                                LIÊN HỆ
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </nav>

</template>

<style>
ul {
    text-decoration: none;
    width: 100%;
}

a {
    text-decoration: none !important;
    line-height: 2.5rem;
    color: black;
}

.dropdown-menu li {
    text-decoration: none !important;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin: 1px;
}

.dropdown-menu li:hover {
    color: #62ab00;
}

#btn_search {
    background-color: #62ab00;
    color: white;
    font-weight: bold;
    border: none;
}


#icon_cart {
    color: #62ab00;
    font-size: 30px;
}


#top_nav {
    height: 68px;
}

#nav_bottom {
    background-color: #62ab00;
    height: 55px;
}

#myBtn {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: #62ab00;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 4px;
}

#myBtn:hover {
    background-color: #555;
}

.nav-item a:hover {
    color: black !important;
}
</style>