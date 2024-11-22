<script>

</script>

<style scoped>
    /* @import "@/assets/css/style.css"; */
    /* @import "@/assets/css/bootstrap.min.css";
    @import "@/assets/css/bootstrap-table.min.css";
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700&display=swap'); */
</style>

<template>
    
        <div class="footer" style="font-size: 5px;"> 
           <!-- logo và lời chào chân trang-->
            <hr>
           <div class="box-container">
           
               <!-- bên trái -->
           
               <div class="box">
                <router-link to="/" style="text-decoration: none;">
               <a  class="logofooter"><img style="width: 100px; " src="/src/assets/img/logo.png" alt=""></a>
               
            </router-link><div >
                <p >Uy Tín - Chất Lượng - Tận Tâm</p><p >Kết nối với chúng tôi</p>
            </div>
            
               <div class="share">
                   <a href="#" class="btn fab fa-facebook-f"></a>
                   <a href="#" class="btn fab fa-twitter"></a>
                   <a href="#" class="btn fab fa-instagram"></a>
                   <a href="#" class="btn fab fa-linkedin"></a>
               </div>
           </div>
           
           <!-- giữa, liên kết trang sản phẩm-->
           
           <div class="box">
               <h3>Về Hubo</h3>
               <div class="links">
                <router-link to="/introduce" style="text-decoration: none;">Giới Thiệu</router-link>
                <router-link to="/contact" style="text-decoration: none;">Liên Hệ</router-link>
                
               </div>
           </div>
           
           <!-- phải, Liên hệ-->
           
           <div class="box" >
               <h3>Liên Hệ</h3>
               
                <p class="fas fa-home" > Xuan Khanh, Ninh Kieu, Can Tho</p>
                <br>
                <p class="fas fa-envelope">
                    test@example.com
                </p><br>
                <p class="fas fa-phone">0123456789</p>
                
            </div>
        </div>
       
   
   
   
   <!-- Bản Quyền-->
   
   <div class="text-center p-4" >
       <a class="text-reset fw-bold" style="text-decoration: none; font-size: 15px;">© 2024 Copyright: Hệ thống quản lý mượn sách trực tuyến HUBO BOOKS (B2110124 CT44904-12425)</a>
   </div>
   </div>
</template>

<style>
.box-container {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
}
.box {
    flex: 1;
    font-size: 5px;
}

.share a {
    padding: 0;
    height: 4rem;
    width: 4rem;
    line-height: 4rem;
    text-align: center;
    font-size: 25px;
}

.box h3 {
    font-size: 2.0rem;
    color: var(--black);
}

.box p {
    font-size: 1.0rem;
    color: #666;
    padding: .7rem 0;
}

.box .links {
    padding: 1rem 0;
}

.box .links a {
    display: block;
    padding: .5rem 0;
    font-size: 1.7rem;
    color: #333;
}

.box .links a:hover {
    text-decoration: underline;
    color: var(--green);
}

</style>

