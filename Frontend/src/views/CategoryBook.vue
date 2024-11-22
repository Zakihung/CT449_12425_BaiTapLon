<script>
import SachService from '../services/Sach.service';
import LoaiSachService from '../services/LoaiSach.service';
import TacGiaService from '../services/TacGia.service';
import NhaXuatBanService from '@/services/NhaXuatBan.service';
export default {
    data() {
        return {
            categoryProduct: [],
            booktypeProduct:[],
            ManageBookType: [],
            ManageAuthor : [],
            ManageNXB : [],
            nameBooktype: '',
            
        }
    },
    watch: {
        '$route': 'getDetailDataProduct',
    },
    methods: {
        async showBookType() {
            try {
                this.ManageBookType = await LoaiSachService.getAll();
            } catch (error) {
                console.log(error)
            }
        },
        async showAuthor(){
            try{
                this.ManageAuthor = await TacGiaService.getAll();
            }catch(error){
                console.log(error)
            }
        },
        async showNXB(){
            try{
                this.ManageNXB = await NhaXuatBanService.getAll();
            }catch(error){
                console.log(error)
            }
        },
        async getDetailDataProduct() {
            try {
                this.nameBooktype = JSON.parse(this.$route.params.name);
                this.categoryProduct = await SachService.getCategoryBook(JSON.parse(this.$route.params.name));
            } catch (error) {
                console.log(error)
            }
        },
    },
    created() {
        this.getDetailDataProduct()
    },
    mounted(){
        this.showBookType();
        this.showAuthor();
        this.showNXB();
    }
}

</script>


<template>
    <div class="container" id="category_book">
    <!-- BreadCrumb -->
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb" style="align-items: center;">
            <li class="breadcrumb-item">
                <router-link to="/" style="color:#62ab00">Trang chủ</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ nameBooktype }}</li>
        </ol>
    </nav>

    <!-- Navbar and content category -->
    <div class="row">
        <!-- Left_nav -->
        <div class="col-lg-3" id="left_nav" style="height:fit-content;">
            <ul>
                <router-link @click="navigationCategory('Tất Cả Sách')" :to="{
                    name: 'CategoryBook',
                    params: { name: JSON.stringify('Tất Cả Sách') },
                }">
                    <li>Tất cả sách</li>
                </router-link>
                
                <router-link @click="navigationCategory()" :to="{
                    name: 'CategoryBook',
                    params: { name: JSON.stringify(`${item1.TenLoaiSach}`) },
                }" v-for="item1 in ManageBookType"> 
                        <li>{{item1.TenLoaiSach}}</li>
                </router-link>
                
            </ul>
                <br>
                <h4 style="color:red;">Phân loại theo tác giả</h4>
                <ul>
                    <router-link @click="navigationCategory()" :to="{
                        name: 'CategoryBook',
                        params: { name: JSON.stringify(`${item3.TenTacGia}`) },
                    }"  v-for="item3 in ManageAuthor">
                        <li>{{item3.TenTacGia}}</li>
                    </router-link>

                </ul>
                <br>
                <h4 style="color:red;">Phân loại theo nhà xuất bản</h4>
                <ul>
                    <router-link @click="navigationCategory()" :to="{
                        name: 'CategoryBook',
                        params: { name: JSON.stringify(`${item3.TenNXB}`) },
                    }"  v-for="item3 in ManageNXB">
                        <li>{{item3.TenNXB}}</li>
                    </router-link>

                </ul>
            </div>
            <!-- Right_content -->
            <!-- Danh Mục & Thể Loại-->
            <div class="col-lg right_content" id="danhmuc">
                <h3 style="color:#62ab00;margin:10px;">{{ nameBooktype }}</h3>
                <div class="container row">
                    <div class="col-lg-4 mt-3 mb-3" v-for="item in categoryProduct" data-aos="fade-left">
                        <div class="card" style="width: 18rem;">
                            <img :src="item.HinhAnh[0]" class="card-img-top" alt="..." width="190" height="190" style="object-fit: contain;">
                            <div class="card-body">
                                <span class="card-title" style="height:48px">{{ item.TenSach }}</span>
                                <p class="card-text"><span class="fw-bold"> Giá mượn:</span> <span class="text-danger fw-bold"> {{ item.DonGia.toLocaleString() }} đ</span></p>
                                <router-link :to="{
                                    name: 'Details',
                                    params: { id: item._id },
                                }">
                                    <button type="button" class="btn" id="btn_detail">Xem chi tiết</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style>
#category_book {
    margin-left: 170px;
    margin-top: 20px;
}

#left_nav,
.right_content {
    border: 1px solid #ccc;
    border-radius: 10px;
}

#left_nav ul li {
    list-style: none;
    margin-top: 20px;

}

#left_nav {
    margin-right: 20px;
}

.card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

#btn_detail {
    background-color: #62ab00;
    width: 100%;
    font-weight: bold;
    color: white;
}
</style>