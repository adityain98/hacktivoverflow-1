<template>
  <div style="background-color: #FAFAFB" class="container-fluid p-0 border-bottom shadow-sm">
    
    <div style="height: 3px; background-color: #F37E26"></div>
    <nav class="container d-flex justify-content-between align-items-center" style="height:6vh">
      <div class="d-flex align-items-center" style="cursor: pointer" @click.prevent="toHome()">
        <div class="d-flex align-items-center">
          <div style="font-size: 170%">H8</div>
          <img src="../assets/h8.png" style="object-fit: contain; width:24px">
        </div>
        <div style="font-size: 170%">
          verflow
        </div>
      </div>
      <div style="height: 100%; width:60%" class="d-flex flex-column justify-content-center">
        <form class="form-group p-0 m-0" @submit.prevent="enterSearch()">
          <input type="text" class="form-control form-control-sm" placeholder="🔍 Search..." v-model="search">
        </form>
      </div>
      <div class="d-flex">
        <div v-if="isLogin" @click.prevent="logout()" style="cursor: pointer">
          Logout
        </div>
        <div v-else @click.prevent="toLogin()" style="cursor: pointer">
          Login
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin(){
      return this.$store.state.isLogin
    },
    search: {
      get(){
        return this.$store.state.search
      },
      set(value){
        this.$store.commit('CHANGE_SEARCH', value)
      }
    }
  },
  methods: {
    toHome(){
      this.$store.dispatch('fetchQuestions')
      this.$router.push('/')
    },
    toLogin(){
      this.$router.push('/login')
    },
    logout(){
      this.$store.dispatch('logout')
    },
    enterSearch(){
      console.log(this.search)
    }
  },
  watch: {
    search(){
      if(this.search){
        this.$store.dispatch('fetchSearch')
      }
      else{
        this.$store.dispatch('fetchQuestions')
      }
    }
  }
}
</script>

<style>

</style>