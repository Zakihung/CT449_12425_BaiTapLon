<script>
  import Header from "@/components/Header.vue"
  import Footer from "@/components/Footer.vue";
  import { computed } from 'vue'; 
  import { useRoute } from 'vue-router';
  export default {
    components: {
      Header,
      Footer
    },
    setup() { 
      const route = useRoute();
      const showHeaderFooter = computed(() => {
        return !['/login', '/register'].includes(route.path);
      });
      return { showHeaderFooter };
    }
  };
</script>

<template>
  <div class="header">
    <!-- <Header/> -->
    <Header v-if="showHeaderFooter"/>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
  
  <div class="footer">
    <!-- <Footer/> -->
    <Footer v-if="showHeaderFooter"/>
  </div>
</template>

<style>
.header {
  position: sticky; top: 0; background-color: #ffffff; z-index: 1000;
}
</style>