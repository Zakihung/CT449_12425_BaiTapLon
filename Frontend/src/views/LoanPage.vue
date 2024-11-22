<script>
import TheoDoiMuonSachService from '@/services/TheoDoiMuonSach.service';

export default {
    beforeRouteEnter: (to) => {
        if (!localStorage.getItem('isloggin') && to.name !== 'HomePage') {
            alert("Bạn cần phải đăng nhập để vào không gian mượn !")
            return '/'
        }
    },
    data() {
        return {
            data_show_loan_space: [],
            total: 0
        }
    },
    methods: {
        async loadLoanSpace() {
            let loan_localStorage = JSON.parse(localStorage.getItem('loanspace'));
            const dataLoan = await TheoDoiMuonSachService.getAll();
            //cap nhat csdl
            if (loan_localStorage && dataLoan) {
                for (let i = 0; i < loan_localStorage.length; i++) {
                    for (let j = 0; j< dataLoan.length; j++) {
                        if (loan_localStorage[i].ma_docgia === dataLoan[j].MaDocGia && loan_localStorage[i].ma_sach === dataLoan[j].MaSach) {
                            await TheoDoiMuonSachService.update({MaDocGia: loan_localStorage[i].ma_docgia, MaSach: loan_localStorage[i].ma_sach, SoNgayMuon: loan_localStorage[i].date_loan, SoLuong: loan_localStorage[i].quantity_product, GiaSauMuon: loan_localStorage[i].gia_sau_muon, TrangThaiTT: loan_localStorage[i].trang_thai_tt})
                        }
                    }    
                }
                this.data_show_loan_space = loan_localStorage;
                var totalSum = 0;
                loan_localStorage.forEach((item, index)=>{
                    totalSum+= item.gia_sau_muon;
                })
                this.total = totalSum;
            }
            
        },
        async UpdateGiaSauMuon(titleProduct) {
            function roundToThousands(number) {
                return Math.round(number / 1000) * 1000; 
            }
            let loanLocalStorage = JSON.parse(localStorage.getItem('loanspace'));
            for (let i = 0; i < loanLocalStorage.length; i++) {
                if (loanLocalStorage[i].title_product === titleProduct) {
                    if (loanLocalStorage[i].date_loan <=7) {
                        loanLocalStorage[i].gia_sau_muon = loanLocalStorage[i].price_product;
                    } else {
                        const temp = loanLocalStorage[i].date_loan - 7;
                        // GiaSauMuon = (originalPrice*Math.pow((1 + LaiSuat/100), temp))*SoLuong;
                        loanLocalStorage[i].gia_sau_muon = (loanLocalStorage[i].price_product*Math.pow((1 + loanLocalStorage[i].lai_suat/100), temp))*loanLocalStorage[i].quantity_product;
                        loanLocalStorage[i].gia_sau_muon = roundToThousands(loanLocalStorage[i].gia_sau_muon);
                        localStorage.setItem('loanspace', JSON.stringify(loanLocalStorage));
                        break;
                    }
                }
            }
            this.loadLoanSpace();
        },
        async DecreaseNumber(titleProduct) {
            let loanLocalStorage = JSON.parse(localStorage.getItem('loanspace'));
            for (let i = 0; i < loanLocalStorage.length; i++) {
                if (loanLocalStorage[i].title_product === titleProduct) {
                    if (loanLocalStorage[i].quantity_product == 1) {
                        loanLocalStorage[i].quantity_product = 1;
                        alert('Số lượng sách thấp nhất là 1.')
                        break;
                    } else {
                        loanLocalStorage[i].quantity_product = loanLocalStorage[i].quantity_product - 1;
                        localStorage.setItem('loanspace', JSON.stringify(loanLocalStorage));
                        break;
                    }
                }
            }
            this.loadLoanSpace();
        },
        async DecreaseDateNumber(titleProduct) {
            let loanLocalStorage = JSON.parse(localStorage.getItem('loanspace'));
            for (let i = 0; i < loanLocalStorage.length; i++) {
                if (loanLocalStorage[i].title_product === titleProduct) {
                    if (loanLocalStorage[i].date_loan == 1) {
                        loanLocalStorage[i].date_loan = 1;
                        alert('Số ngày mượn thấp nhất là 1.')
                        break;
                    } else {
                        loanLocalStorage[i].date_loan = loanLocalStorage[i].date_loan - 1;
                        localStorage.setItem('loanspace', JSON.stringify(loanLocalStorage));
                        break;
                    }
                }
            }
            this.loadLoanSpace();
        },
        async removeItem(index) {
            var loanLocalStorage = JSON.parse(localStorage.getItem('loanspace'));
            await TheoDoiMuonSachService.delete({ MaDocGia: loanLocalStorage[index].ma_docgia, MaSach: loanLocalStorage[index].ma_sach });
            loanLocalStorage.splice(index, 1);
            window.location.reload();
            if(loanLocalStorage.length == 0){
                localStorage.removeItem("loanspace");
            } else {
                localStorage.setItem('loanspace', JSON.stringify(loanLocalStorage));
            }
            this.loadLoanSpace();
        },
        async IncreaseNumber(titleProduct) {
            let loanLocalStorage = JSON.parse(localStorage.getItem('loanspace'));
            for (let i = 0; i < loanLocalStorage.length; i++) {
                if (loanLocalStorage[i].title_product === titleProduct) {
                    loanLocalStorage[i].quantity_product = loanLocalStorage[i].quantity_product + 1;
                    localStorage.setItem('loanspace', JSON.stringify(loanLocalStorage));
                    break;
                }
            }
            this.loadLoanSpace();
        },
        async IncreaseDateNumber(titleProduct) {
            let loanLocalStorage = JSON.parse(localStorage.getItem('loanspace'));
            for (let i = 0; i < loanLocalStorage.length; i++) {
                if (loanLocalStorage[i].title_product === titleProduct) {
                    loanLocalStorage[i].date_loan = loanLocalStorage[i].date_loan + 1;
                    localStorage.setItem('loanspace', JSON.stringify(loanLocalStorage));
                    break;
                }
            }
            this.loadLoanSpace();
        },
        async PayLoan(ma_docgia, ma_sach) {
            let payloan = JSON.parse(localStorage.getItem('loanspace'));
            let data = await TheoDoiMuonSachService.getAll();
            if (payloan && data) {
                for (let i = 0; i < payloan.length; i++) {
                    for (let j = 0; j< data.length; j++) {
                        if (payloan[i].ma_docgia === ma_docgia && payloan[i].ma_sach === ma_sach && data[j].MaDocGia === ma_docgia && data[j].MaSach === ma_sach) {
                            await TheoDoiMuonSachService.pay({ MaDocGia: ma_docgia, MaSach: ma_sach});
                            payloan[i].trang_thai_tt=true;
                            localStorage.setItem('loanspace', JSON.stringify(payloan));
                            break;
                        }
                    }    
                }
            }
            this.loadLoanSpace();
            alert('Thanh toán thành công!');
        }
    },
    mounted() {
        this.loadLoanSpace();
    }
}
</script>

<template>
    <div class="container" id="cartPage">
        <h4>KHÔNG GIAN MƯỢN SÁCH ({{ data_show_loan_space.length }} sản phẩm)</h4>
        <div class="row">
            <div class="col-lg-11">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mô tả sách</th>
                            <th scope="col">Số Lượng</th>
                            <th scope="col">Số Ngày Mượn</th>
                            <th scope="col text-center">Thành Tiền</th>
                            <th scope="col">Trạng thái thanh toán</th>
                            <th scope="col">Xóa Sản Phẩm</th>
                             <th scope="col">Thanh toán</th>
                        </tr>
                    </thead>
                    <tbody style="border:1px solid #ccc;border-radius:5px;">
                        <tr v-if="data_show_loan_space.length == 0">
                            <h5 style="color:#62ab00;border:1px solid #ccc;border-radius:5px;">Không có sản phẩm nào trong không gian mượn!</h5>
                        </tr>
                        <tr v-for="(item, index) in data_show_loan_space" v-if="data_show_loan_space.length != 0">
                            <td>
                                {{ ++index }}
                            </td>
                            <td class="d-flex" style="width: 300px;">
                                <div class="col-lg-6">
                                    <img :src="item.img_product" class="img-thumbnail" alt="..." style="width: 85px; margin-left: -50px;">
                                </div>
                                <div class="col-lg" style="margin-left:-50px;">
                                    <p> {{ item.title_product }}</p>
                                    <p style="font-weight:bold">Đơn giá: {{ item.price_product.toLocaleString() }} đ</p>
                                    <p style="font-weight:bold">Lãi suất: {{ item.lai_suat.toLocaleString() }}%</p>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex" style="width: 100px;">
                                    <button id="btn_decrease" @click="DecreaseNumber(item.title_product); UpdateGiaSauMuon(item.title_product)">-</button>
                                    <input type="text" v-model="item.quantity_product" class="fw-bold" id="input_quantity">
                                    <button id="btn_increase" @click="IncreaseNumber(item.title_product); UpdateGiaSauMuon(item.title_product)">+</button>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex" style="width: 100px;">
                                    <button id="btn_decrease" @click="DecreaseDateNumber(item.title_product); UpdateGiaSauMuon(item.title_product)">-</button>
                                    <input type="text" v-model="item.date_loan" class="fw-bold" id="input_quantity">
                                    <button id="btn_increase" @click="IncreaseDateNumber(item.title_product); UpdateGiaSauMuon(item.title_product)">+</button>
                                </div>
                            </td>
                            <td style="font-weight:bold;color:red;">
                                {{ item.gia_sau_muon.toLocaleString() }} đ
                            </td>
                            <td>
                                {{ item.trang_thai_tt ? "Đã thanh toán" : "Chưa thanh toán" }}
                            </td>
                            <td class="text-center">
                                <i @click="removeItem(index - 1)" class="fa-solid fa-trash" id="btn_delete"></i>
                            </td>
                            <td>
                                <button type="button" @click="PayLoan(item.ma_docgia, item.ma_sach)" class="btn btn-info text-white fw-bold" style="width:100%;background-color:#62ab00;" :disabled="item.trang_thai_tt">THANH TOÁN</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <div class="col-lg-4">
                <div style="border:1px solid #ccc;padding:10px;border-radius:10px; width: 75%;">
                    <div class="row d-flex">
                        <h5>Tổng Số Tiền</h5>
                        <span style="margin-left:20px;font-size:28px;color:red;font-weight:bold;margin-top:50px;">{{total.toLocaleString()}} đ</span>
                    </div>
                    <br>
                    <br>
                    <button type="button" @click="PayLoan()" class="btn btn-info text-white fw-bold" style="width:100%;background-color:#62ab00;">THANH TOÁN</button>
                </div>
            </div> -->
        </div>

    </div>
</template>

<style>
#cartPage {
    margin-left: 160px;
    margin-top: 50px;
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

#input_quantity {
    width: 50px;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: center;
}


#btn_decrease:hover {
    background-color: #62ab00;
}


#btn_increase:hover {
    background-color: #62ab00;
}

.input_quantity {
    width: 100px;
    text-align: center;
}

#btn_delete:hover {
    color: #62ab00;
    cursor: pointer;
}
</style>