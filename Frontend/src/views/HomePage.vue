<script>
import SachService from '../services/Sach.service';
import SliderBook from '../components/SliderBook.vue';

export default {
    components: {
        SliderBook
    },
    data() {
        return {
            BookData: [],
        }
    },
    methods: {
        async getDataProduct() {
            try {
                this.BookData = await SachService.getLimit();
                console.log(this.BookData);
            } catch (error) {
                console.log(error)
            }
        },
    },
    mounted() {
        this.getDataProduct();
    },

}
</script>

<template>
    <div class="container" id="main_page">
        <!-- Slider Image -->
        <SliderBook></SliderBook>

        <!-- Main_Content_Product-->
        <div class="row mt-5 item_product">
            <h4> <i class="fa-solid fa-fire"></i> SẢN PHẨM TIÊU BIỂU </h4>
            <div class="col-lg-4 mt-3 mb-3" v-for="item in BookData" data-aos="zoom-in-down" >
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
</template>

<style>
#main_page {
    height: 100%;
}

.item_product h4 {
    background-color: #62ab00;
    border-radius: 5px;
    text-align: center;
    color: white;
    padding: 5px;
    margin-bottom: 19px;
}

.item_product {
    border: 1.5px solid #62ab00;
    border-radius: 5px;
    padding: 5px;
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

/* CSS */
.button-88 {
    display: flex;
    align-items: center;
    font-family: inherit;
    font-weight: 500;
    font-size: 16px;
    padding: 0.7em 1.4em 0.7em 1.1em;
    color: white;
    background: #ad5389;
    background: linear-gradient(0deg, rgba(20, 167, 62, 1) 0%, rgba(102, 247, 113, 1) 100%);
    border: none;
    box-shadow: 0 0.7em 1.5em -0.5em #14a73e98;
    letter-spacing: 0.05em;
    border-radius: 20em;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-88:hover {
    box-shadow: 0 0.5em 1.5em -0.5em #14a73e98;
}

.button-88:active {
    box-shadow: 0 0.3em 1em -0.5em #14a73e98;
}
</style>