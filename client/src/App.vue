<template>
  <div>
    <Navbar/>
    <div style="min-height: 83.5vh">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  },
  created(){
    if(localStorage.getItem('token')){
      this.$store.dispatch('fetchLogin')
    }
  }
}
</script>

<style>
</style>
