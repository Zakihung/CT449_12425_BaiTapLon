///---- TÌM KIẾM DỮ LIỆU ----///
function checkSearch(event) {
    if ((event.keyCode || event.which) == 13)
        document.getElementById('search-form').search();
}

function search() {
    var contentSearch = document.getElementById('search-box').value;
    if (contentSearch.length > 0) {
        this.submit();
        return true;
    };
    alert('Vui lòng nhập nội dung cần tìm!');
    return false;
}

/*NÚT ON TOP*/

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/*ĐĂNG NHẬP*/

function frmValidate5(frm) {
    alert("Đăng nhập thành công")
    return frm.checkValidity();
}

function frmValidate6(frm) {
    alert("Đăng ký thành công")
    return frm.checkValidity();
}

function validateForm(frm) {
    alert("Gửi dữ liệu thành công")
    return frm.checkValidity();
}

function validateForm1(frm) {
    alert("Đăng ký nhận thông tin khuyến mãi thành công")
    return frm.checkValidity();
}

//Thêm giỏ hàng

function addCart(barcode) {
    var number = parseInt(document.getElementById(barcode).value);
    if (number == 0) alert('Số sản phẩm tối thiểu là 1!');
    else {
        if (typeof localStorage[barcode] === "undefined") {
            if (number > 100) alert('Chỉ được đặt mỗi loại tối đa 100 sản phẩm!');
            else {
                window.localStorage.setItem(barcode, number);
                alert(`Đã đưa ${number} sản phẩm ${itemList[barcode].name} vào giỏ hàng!`);
            }
        } else {
            var current = parseInt(window.localStorage.getItem(barcode));
            if (number + current > 100) {
                window.localStorage.setItem(barcode, 100);
                alert('Chỉ được đặt mỗi loại tối đa 100 sản phẩm!');
                alert(`Đã đưa 100 sản phẩm ${itemList[barcode].name} vào giỏ hàng!`);
            } else {
                window.localStorage.setItem(barcode, current + number);
                alert(`Đã đưa ${number+current} sản phẩm ${itemList[barcode].name} vào giỏ hàng!`);
            }
        }
    }
}