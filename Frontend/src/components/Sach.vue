<script>
import SachService from '@/services/Sach.service';
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';

export default {
    components: {
        ToastVue
    },
    data() {
        return {
            ManageBooks: [],
            BookDataInput: {
                img_url: [],
                title: "",
                author: "",
                description: "",
                price: "",
                bookType: "",
            },
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
            id_book: '',
            data_edit: '',
            inputSearch: "",
        }
    },
    methods: {
        toast,
        async getBookData() {
            try {
                this.ManageBooks = await SachService.getAll();
                console.log(this.ManageBooks);
            } catch (error) {
                console.log(error)
            }
        },
        addBook() {
            document.querySelector("#table_manageBook").style.display = 'none'
            document.querySelector("#form_addBook").style.display = 'block'
            document.querySelector("#btn_addBook").style.display = 'none'
            document.querySelector("#pills-tabContent").style.margin = '0 auto'
            document.querySelector("#pills-tabContent").style.width = '100%'
            document.querySelector("#pills-tabContent").style.padding = '40px'
        },
        backPage() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        },
        async handleAddBook() {
            try {
                await SachService.create(this.BookDataInput)
                this.toasts.title = "Success",
                    this.toasts.msg = "Thêm sách mới thành công !"
                this.toasts.type = "success",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast();
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    window.location.reload();
                }, 2000)
            }
            catch (err) {
                console.log(this.BookDataInput)
                this.toasts.title = "Failed",
                    this.toasts.msg = "Thêm sách thất bại!"
                this.toasts.type = "error",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
        async deleteBook(Id_Book) {
            let check_delete = confirm("Chắc chắn muốn xóa chứ ?");
            if (check_delete) {
                try {
                    await SachService.delete(Id_Book);
                    this.toasts.title = "Success",
                        this.toasts.msg = "Xóa sách thành công !"
                    this.toasts.type = "success",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast();
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                        window.location.reload();
                    }, 2000)
                } catch (err) {
                    console.log(this.BookDataInput)
                    this.toasts.title = "Failed",
                        this.toasts.msg = "Xóa sách thất bại!"
                    this.toasts.type = "error",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast()
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                    }, 700)
                }
            } else {
                return
            }
        },
        async FindBook(inputKeyWord) {
            if (inputKeyWord === '') {
                this.ManageBooks = await SachService.getAll();
            } else {
                try {
                    this.ManageBooks = await SachService.findName(inputKeyWord);
                    if (this.ManageBooks.length == 0) {
                        alert('Không có sách tương ứng với khóa tìm kiếm !');
                        this.ManageBooks = await SachService.getAll();
                    }
                } catch (err) {
                    console.log(err)
                }
            }

        }
    },
    mounted() {
        this.getBookData();
    },

}
</script>
<template>
    <button type="button" id="btn_addBook" class="btn btn-success" @click="addBook()"><i class="fa-solid fa-plus"></i> Thêm Sách </button>


    <form action="/" class="d-flex" style="width:500px;margin:0 auto" id="inputSearchKeyWord" @submit.prevent>
        <input type="text" class="form-control" placeholder="Nhập vào tên sách hoặc mô tả..." aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;"
            v-model="inputSearch">
        <button id="btn_search" type="submit" style="width:120px;height:50px;border-radius:0 6px 6px 0" @click="FindBook(inputSearch)">Tìm Kiếm</button>
    </form>
    <br>
    <br>
    <!-- Giao diện thêm sách -->
    <ToastVue></ToastVue>
    <form @submit.prevent id="form_addBook" style="display:none;width:100%;">

        <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

        <br>
        <h2 class="text-center" style="color:#62ab00">Thêm vào sách mới</h2>
        <!-- Title Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Tên Sách: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên sách..." v-model="BookDataInput.title" required>
        </div>

        <!-- Img Input -->
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label fw-bold">Hình Ảnh Sách:(3 ảnh)</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Đưa vào Link hình ảnh sách..." v-model="BookDataInput.img_url[0]" required>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Đưa vào Link hình ảnh sách..." v-model="BookDataInput.img_url[1]" required>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Đưa vào Link hình ảnh sách..." v-model="BookDataInput.img_url[2]" required>
        </div>

        <!-- Author Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Tác giả: </label>
            <select class="form-control" :required="true" @change="changeOptionTG" id="chooseTG">
                <option v-for="item in ManageAuthor" v-bind:value="item.author_name">{{ item.author_name }}</option>
            </select>
        </div>

        <!-- BookType Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Thể loại: </label>
            <select class="form-control" :required="true" @change="changeOptionTL" id="chooseTL">
                <option v-for="item in ManageBookType" v-bind:value="item.booktype_name">{{ item.booktype_name }}</option>
            </select>
        </div>

        <!-- Price Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Giá bán: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập vào giá cuốn sách..." v-model="BookDataInput.price" required>
        </div>


        <!-- Description Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Mô tả: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập vào mô tả sách..." v-model="BookDataInput.description" required>
        </div>


        <button @click="handleAddBook()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
    </form>


    <!-- Giao diện bảng Show Sách -->
    <table class="table" border="1px" style="width:90vw;" id="table_manageBook">
        <thead>
            <tr class="table-info text-center">
                <th scope="col">STT</th>
                <th scope="col">Tên Sách</th>
                <th scope="col" style="width:88px;">Hình Ảnh</th>
                <th scope="col">Tác Giả</th>
                <th scope="col">Mô Tả</th>
                <th scope="col">Thể Loại</th>
                <th scope="col" style="width:80px;">Giá</th>
                <th scope="col">Hành động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in ManageBooks">
                <td>
                    {{ index + 1 }}
                </td>
                <td>{{ item.TenSach }}</td>
                <td class="d-flex flex-column" id="img_book">
                    <img :src="item.HinhAnh[0]" class="img-fluid" alt="..." style="width:70px;height:70px;border:1px solid #ccc;border-radius:5px;">
                    <br>
                    <img :src="item.HinhAnh[1]" class="img-fluid" alt="..." style="width:70px;height:70px;border:1px solid #ccc;border-radius:5px;">
                    <br>
                    <img :src="item.HinhAnh[2]" class="img-fluid" alt="..." style="width:70px;height:70px;border:1px solid #ccc;border-radius:5px;">
                </td>
                <td>{{ item.TacGia }}</td>
                <td>{{ item.MoTaSach }}</td>
                <td>{{ item.TenLoaiSach }}</td>
                <td>{{ item.DonGia.toLocaleString() }} đ</td>
                <td>
                    <router-link :to="{
                        name: 'EditBook',
                        params: { id: item._id },
                    }">
                        <button type="button" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i> Sửa</button>
                    </router-link>

                    <br>
                    <br>

                    <button @click="deleteBook(item._id)" type="button" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>