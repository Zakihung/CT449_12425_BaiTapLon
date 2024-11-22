<script>
import SachService from '../services/Sach.service';
import DocGiaService from '../services/DocGia.service';
import TheoDoiMuonSachService from '@/services/TheoDoiMuonSach.service';


export default {
    data() {
        return {
            DetailProductData: [],
            DetailDocGiaData: [],
            loanProduct: [],
            quantity_item: 1,
            RelatedProduct: [],
            img_click: '',
            current_index: 0,
            date_item: 7,
            DocGiaData: []
        }
    },
    watch: {
        '$route': 'redirectPage'
    },
    methods: {
        redirectPage(vara) {
            this.$router.push(`/${vara}`);
        },
        openImg(variable, index) {
            this.img_click = variable;
            this.current_index = index;
            document.querySelector("#img_show").style.display = 'flex'
        },
        previousImg() {
            this.current_index--;
            if (this.current_index < 0) {
                this.current_index = 2
            }
            document.querySelector("#img_center").setAttribute('src', this.DetailProductData.HinhAnh[this.current_index]);
        },
        nextImg() {
            this.current_index++;
            if (this.current_index > 2) {
                this.current_index = 0
            }
            document.querySelector("#img_center").setAttribute('src', this.DetailProductData.HinhAnh[this.current_index]);
        },
        exit() {
            document.querySelector("#img_show").style.display = 'none'
        },
        async getDetailDataProduct() {
            try {
                this.DetailProductData = await SachService.get(this.$route.params.id);
                const login = JSON.parse(localStorage.getItem('isloggin'));
                this.DetailDocGiaData = await DocGiaService.findByMaDocGia(login.MaDocGia);
            } catch (error) {
                console.log(error)
            }
        },
        async getRelatedProduct() {
            try {
                let getDetailData = await SachService.get(this.$route.params.id);
                let categories_related = getDetailData.categories;
                let ArrayProductRelated = await SachService.getAll();
                ArrayProductRelated.forEach((item, index) => {
                    if (item.categories === categories_related && item._id !== this.$route.params.id) {
                        this.RelatedProduct.push(item)
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
        ,
        async DecreaseNumber() {
            if (this.quantity_item == 1) {
                this.quantity_item = 1;
            } else {
                this.quantity_item -= 1
            }
        },
        async IncreaseNumber() {
            if (this.quantity_item >= this.DetailProductData.SoQuyen) {
                this.quantity_item = this.DetailProductData.SoQuyen;
                alert('Đã đạt số lượng giới hạn cần thêm vào!')
            } else {
                this.quantity_item += 1
            }
        },
        async DecreaseDateNumber() {
            if (this.date_item == 1) {
                this.date_item = 1;
            } else {
                this.date_item -= 1;
            }
        },
        async IncreaseDateNumber() {
            if (this.date_item >=0) this.date_item += 1;
        },
        async addtoLoanSpace(title_book_input) {
            if (!localStorage.getItem('isloggin')) {
                alert('Bạn cần phải đăng nhập trước khi mượn sách !')
            } else {
                
                var checkExitCart = JSON.parse(localStorage.getItem('loanspace'));

                if (!checkExitCart) {
                    this.loanProduct = await TheoDoiMuonSachService.loan({ 
                        MaSach: this.DetailProductData.MaSach,
                        MaDocGia: this.DetailDocGiaData.MaDocGia,
                        SoNgayMuon: this.date_item,
                        SoLuong: this.quantity_item
                    });
                    
                    checkExitCart = [
                        {
                            id_product: this.DetailProductData._id,
                            ma_sach: this.DetailProductData.MaSach,
                            img_product: this.DetailProductData.HinhAnh[0],
                            ma_docgia: this.DetailDocGiaData.MaDocGia,
                            title_product: this.DetailProductData.TenSach,
                            price_product: this.DetailProductData.DonGia,
                            quantity_product: this.quantity_item,
                            date_loan: this.date_item,
                            gia_sau_muon: this.loanProduct.GiaSauMuon,
                            lai_suat: this.DetailProductData.LaiSuat,
                            trang_thai_tt: this.loanProduct.TrangThaiTT
                        }
                    ]

                    localStorage.setItem('loanspace', JSON.stringify(checkExitCart));
                    for (let i = 0; i < checkExitCart.length; i++) {
                        if (checkExitCart[i].ma_docgia === this.DetailDocGiaData.MaDocGia && checkExitCart[i].ma_sach === this.DetailProductData.MaSach) {
                            await TheoDoiMuonSachService.update({MaDocGia: checkExitCart[i].ma_docgia, MaSach: checkExitCart[i].ma_sach, SoNgayMuon: checkExitCart[i].date_loan, SoLuong: checkExitCart[i].quantity_product, GiaSauMuon: checkExitCart[i].gia_sau_muon, TrangThaiTT: checkExitCart[i].trang_thai_tt})
                        }
                    }
                    alert('Thêm vào không gian mượn thành công !');
                } else {
                    for (let i = 0; i < checkExitCart.length; i++) {
                        function roundToThousands(number) {
                            return Math.round(number / 1000) * 1000; 
                        }
                        if (title_book_input === checkExitCart[i].title_product) {
                            checkExitCart[i].quantity_product = checkExitCart[i].quantity_product + this.quantity_item;
                            checkExitCart[i].date_loan = checkExitCart[i].date_loan + this.date_item;
                            //Cap nhat gia sau muon lai
                            if (checkExitCart[i].date_loan <=7) {
                                checkExitCart[i].gia_sau_muon = checkExitCart[i].price_product;
                            } else {
                                const temp = checkExitCart[i].date_loan - 7;
                                // GiaSauMuon = (originalPrice*Math.pow((1 + LaiSuat/100), temp))*SoLuong;
                                checkExitCart[i].gia_sau_muon = (checkExitCart[i].price_product*Math.pow((1 + checkExitCart[i].lai_suat/100), temp))*checkExitCart[i].quantity_product;
                                checkExitCart[i].gia_sau_muon = roundToThousands(checkExitCart[i].gia_sau_muon);
                                
                            }
                            localStorage.setItem('loanspace', JSON.stringify(checkExitCart));
                            //cap nhat csdl
                            for (let i = 0; i < checkExitCart.length; i++) {
                                if (checkExitCart[i].ma_docgia === this.DetailDocGiaData.MaDocGia && checkExitCart[i].ma_sach === this.DetailProductData.MaSach) {
                                    await TheoDoiMuonSachService.update({MaDocGia: checkExitCart[i].ma_docgia, MaSach: checkExitCart[i].ma_sach, SoNgayMuon: checkExitCart[i].date_loan, SoLuong: checkExitCart[i].quantity_product, GiaSauMuon: checkExitCart[i].gia_sau_muon, TrangThaiTT: checkExitCart[i].trang_thai_tt})
                                }
                            }
                            alert('Thêm vào không gian mượn thành công !');
                            return;
                        }
                    }
                    this.loanProduct = await TheoDoiMuonSachService.loan({ 
                        MaSach: this.DetailProductData.MaSach,
                        MaDocGia: this.DetailDocGiaData.MaDocGia,
                        SoNgayMuon: this.date_item,
                        SoLuong: this.quantity_item
                    });

                    let new_object = {
                        id_product: this.DetailProductData._id,
                        ma_sach: this.DetailProductData.MaSach,
                        img_product: this.DetailProductData.HinhAnh[0],
                        ma_docgia: this.DetailDocGiaData.MaDocGia,
                        title_product: this.DetailProductData.TenSach,
                        price_product: this.DetailProductData.DonGia,
                        quantity_product: this.quantity_item,
                        date_loan: this.date_item,
                        gia_sau_muon: this.loanProduct.GiaSauMuon,
                        lai_suat: this.DetailProductData.LaiSuat,
                        trang_thai_tt: this.loanProduct.TrangThaiTT
                    }

                    checkExitCart.push(new_object)

                    localStorage.setItem('loanspace', JSON.stringify(checkExitCart));
                    //cap nhat csdl
                    for (let i = 0; i < checkExitCart.length; i++) {
                        if (checkExitCart[i].ma_docgia === this.DetailDocGiaData.MaDocGia && checkExitCart[i].ma_sach === this.DetailProductData.MaSach) {
                            await TheoDoiMuonSachService.update({MaDocGia: checkExitCart[i].ma_docgia, MaSach: checkExitCart[i].ma_sach, SoNgayMuon: checkExitCart[i].date_loan, SoLuong: checkExitCart[i].quantity_product, GiaSauMuon: checkExitCart[i].gia_sau_muon, TrangThaiTT: checkExitCart[i].trang_thai_tt})
                        }
                    }
                    alert('Thêm vào không gian mượn thành công !')
                }
            }
            setTimeout(() => {
                window.location.reload();
            }, 100)
        },
    },
    created() {
        this.getDetailDataProduct();
    },
    mounted() {
        this.getRelatedProduct();
    }
}
</script>

<template>
    <div class="container" id="main_page_detail_product" style="margin-right: 0px;">
        <!-- BreadCrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" style="align-items: center;">
                <li class="breadcrumb-item">
                    <router-link to="/" style="color:#62ab00">Trang chủ</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Chi tiết sản phẩm</li>
            </ol>
        </nav>


        <div id="img_show" style="position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;background-color:black;z-index:9999999;display:none;">
            <img :src="img_click" class="img-fluid" alt="..." width="500" height="500" id="img_center">
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span @click="previousImg()" class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span @click="nextImg()" class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            <i @click="exit()" class="fa-solid fa-xmark" style="position: absolute;
                                                                top: 11px;
                                                                right: 25px;
                                                                color: white;
                                                                font-size: 50px;
                                                                opacity: 0.6;
                                                                z-index:999999999999;
                                                                cursor:pointer;"></i>
        </div>


        <!-- Detail_Product -->
        <div class="row">
            <div class="col-5" style="width: 43%;">
                <img :src="DetailProductData.HinhAnh[0]" class="img-fluid" alt="..." width="319" height="444" style="    border: 1px solid #ccc;
                                                                                                        border-radius: 10px;
                                                                                                        padding: 10px;box-shadow: 1px 2px 13px 0px;margin-left:130px;">
                <div class="row d-flex mt-5 text-center">
                    <div class="col">
                        <img @click="openImg(DetailProductData.HinhAnh[0], 0)" :src="DetailProductData.HinhAnh[0]" class="img-thumbnail img_introduce" alt="..." width="319" height="444" style="    border: 1px solid #ccc;object-fit:contain;
                                                                                                            border-radius: 10px;
                                                                                                            padding: 10px;box-shadow: 1px 2px 13px 0px; width:150px;height:150px;">
                    </div>
                    <div class="col">
                        <img @click="openImg(DetailProductData.HinhAnh[1], 1)" :src="DetailProductData.HinhAnh[1]" class="img-thumbnail img_introduce" alt="..." width="319" height="444" style="    border: 1px solid #ccc;object-fit:contain;
                                                                                                            border-radius: 10px;
                                                                                                            padding: 10px;box-shadow: 1px 2px 13px 0px; width:150px;height:150px;">
                    </div>
                    <div class="col">
                        <img @click="openImg(DetailProductData.HinhAnh[2], 2)" :src="DetailProductData.HinhAnh[2]" class="img-thumbnail img_introduce" alt="..." width="319" height="444" style="    border: 1px solid #ccc;object-fit:contain;
                                                                                                            border-radius: 10px;
                                                                                                            padding: 10px;box-shadow: 1px 2px 13px 0px; width:150px;height:150px;">
                    </div>
                </div>
            </div>
            <div class="col-6" style="width: 35%;">
                <div class="row" >
                    <h4>{{ DetailProductData.TenSach }}</h4>
                </div>
                <br>
                <div class="row">
                    <p>Thể Loại: <span class="fw-bold">{{ DetailProductData.TenLoaiSach }}</span></p>
                    <p>Tác giả: <span class="fw-bold">{{ DetailProductData.TacGia }}</span></p>
                </div>
                <div class="row">
                    <p style="border:1px solid #62ab00;;width:fit-content;border-radius:10px;padding:20px">
                        Giá mượn:
                    <h1 style="color:#62ab00;">
                        {{ DetailProductData.DonGia.toLocaleString() }} đ
                    </h1>
                    </p>
                </div>
                <br>
                <div class="row">
                    <h5>Số lượng mượn :
                        <span v-if="DetailProductData.SoQuyen != 0"> {{ DetailProductData.SoQuyen }} </span>
                        <span v-else style="color:red;font-size:30px;">Đã hết hàng !</span>
                    </h5>
                    <br>
                    <div class="d-flex">
                        <button id="btn_decrease" @click="DecreaseNumber">-</button>
                        <input type="text" class="fw-bold" v-model="quantity_item" id="input_quantity">
                        <button id="btn_increase" @click="IncreaseNumber">+</button>
                    </div>
                </div>
                <br>
                <div class="row">
                    <h5>Số ngày mượn :
                    </h5>
                    <br>
                    <div class="d-flex">
                        <button id="btn_decrease" @click="DecreaseDateNumber">-</button>
                        <input type="text" class="fw-bold" v-model="date_item" id="input_quantity">
                        <button id="btn_increase" @click="IncreaseDateNumber">+</button>
                    </div>
                </div>
                
                <div class="row" v-if="DetailProductData.SoQuyen != 0">
                    <p @click="addtoLoanSpace(DetailProductData.TenSach)" id="cart_btn" style="cursor:pointer"><i class="fa-solid fa-cart-shopping"></i>Thêm vào không gian mượn</p>
                </div>
            </div>
        </div>


        <!-- Description Product -->
        <div class="row mt-5" id="description">
            <h5>MÔ TẢ SẢN PHẨM</h5>
            <hr>
            <div>
                <p>
                    {{ DetailProductData.MoTaSach }}
                </p>
            </div>
        </div>


        <!-- Product_Related -->
        <div class="row mt-5" id="description">
            <h5>SẢN PHẨM LIÊN QUAN</h5>
            <hr>
            <div class="d-flex flex-wrap">
                <div class="col-lg-4 mt-4" v-for="item in RelatedProduct">
                    <div class="card" style="width: 18rem;">
                        <img :src="item.HinhAnh[0]" class="card-img-top" alt="..." width="190" height="190" style="object-fit: contain;">
                        <div class="card-body">
                            <span class="card-title" style="height:48px">{{ item.TenSach }}</span>
                            <p class="card-text"><span class="fw-bold"> Giá mượn:</span> <span class="text-danger fw-bold"> {{ item.DonGia.toLocaleString() }} đ</span></p>
                            <router-link :to="{
                                name: 'Details',
                                params: { id: item._id },
                            }">
                                <button type="button" class="btn" id="btn_detail" @click="redirectPage(item._id)">Xem chi tiết</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
#main_page_detail_product {
    height: 100%;
    margin-left: 165px;
    margin-top: 50px;
}

#btn_detail {
    background-color: #62ab00;
    width: 100%;
    font-weight: bold;
    color: white;
}


#btn_decrease {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: none;
}

#btn_increase {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: none;
}


#btn_decrease:hover {
    background-color: #62ab00;
}


#btn_increase:hover {
    background-color: #62ab00;
}

#input_quantity {
    width: 100px;
    text-align: center;
}

#cart_btn {
    padding: 16px;
    border: 1px solid #62ab00;
    color: #62ab00;
    font-weight: bold;
    width: fit-content;
    border-radius: 10px;
    font-size: 17px;
    margin-top: 29px;
}

#description {
    width: 88%;
    border: 2px solid #62ab00;
    padding: 10px;
    border-radius: 10px;
}


.card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.img_introduce:hover {
    border: 4px solid #62ab00 !important;
    cursor: pointer;
}
</style>