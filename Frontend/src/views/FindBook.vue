<script>
import SachService from '../services/Sach.service';

export default {
    data() {
        return {
            bookfind: [],
            keyword: ''
        }
    },
    methods: {
        async getDataBookSearch() {
            try {
                this.bookfind = await SachService.findName(JSON.parse(this.$route.params.name));
                console.log(this.$route.params.name);
                this.keyword = JSON.parse(this.$route.params.name);
            } catch (error) {
                console.log(error)
            }
        },
    },
    created() {
        this.getDataBookSearch();
    },
}
</script>
<template>
    <div class="container mt-5" style="margin-left:150px;">
        <h2 class="mb-3">KẾT QUẢ TÌM KIẾM (<span style="color:#62ab00">{{bookfind.length}}</span> kết quả) </h2>
        <h4>Từ khóa:  <span style="color:#62ab00;font-size:30px">{{ keyword }}</span> </h4>
        <div class="d-flex row">
            <div class="col-lg-3 mt-4" v-for="item in bookfind" data-aos="flip-up">
                <div class="card" style="width: 18rem;">
                    <img :src="item.HinhAnh[0]" class="card-img-top" alt="..." width="190" height="190" style="object-fit: contain;">
                    <div class="card-body">
                        <span class="card-title" style="height:48px">{{ item.TenSach }}</span>
                        <p class="card-text"><span class="fw-bold"> Giá mượn:</span> <span class="text-danger fw-bold"> {{ item.DonGia.toLocaleString()}} đ</span></p>
                        <router-link :to="{
                            name: 'Details',
                            params: { id: item._id },
                        }">
                            <button type="button" class="btn" id="btn_detail" @click="reloadPage()">Xem chi tiết</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
    #btn_detail{
        background-color: #62ab00;
        width: 100%;
        font-weight: bold;
        color: white;
    }

    .card-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>