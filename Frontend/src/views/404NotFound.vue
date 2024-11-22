<template>
    
<section class="error">
    <div>
        <div class="vitri">
            <p>Không tìm thấy trang</p>
        </div>
        <div class="vetrangchu">
            <a><router-link to="/" style="text-decoration: none;">Về trang chủ</router-link></a>
        </div>
    </div>
</section>

</template>

<style>
.error {
    background: url("/src/assets/img/notfound404.png") no-repeat ;
    background-size: 60%;
    height: 500px;
    background-position: center;
}
.error .vitri {
    position: relative;
    top: 55px;
    color: red;
    display: flex;
    justify-content: center;
    font-size: 25px;
}

.error .vetrangchu {
    display: flex;
    justify-content: center;
    position: relative;
    top: 340px;
}
.error .vetrangchu a {
    font-size: 35px;
    padding: 5px 5px;
    border: 0;
    color: white;
    border-radius: .5rem;
    background: orange;
}


.error .vetrangchu a:hover {
    background: var(--green);
}

</style>