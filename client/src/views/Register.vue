<template>
  <div>
    <div class="container-fluid p-0" style="background-color: #EFF0F1; min-height: 83.5vh">
      <div class="container d-flex flex-column justify-content-center align-items-center" style="min-height: 83.5vh">
        <img src="../assets/h8.png" alt="" style="width: 72px" class="mb-4">
        <div style="background-color: white; width: 30%" class="rounded-lg shadow">
          <form class="p-3" @submit.prevent="register()">
            <h4 style="text-align: center">Register</h4>
            <div class="form-group pl-3 pr-3">
              <div style="font-size: 120%"><strong>Username</strong></div>
              <input type="text" class="form-control form-control-sm pt-2" v-model="username">
            </div>
            <div class="form-group pl-3 pr-3">
              <div style="font-size: 120%"><strong>Email</strong></div>
              <input type="email" class="form-control form-control-sm pt-2" v-model="email">
            </div>
            <div class="form-group pl-3 pr-3">
              <div style="font-size: 120%"><strong>Password</strong></div>
              <input type="password" class="form-control form-control-sm pt-2" v-model="password">
            </div>
            <div class="pl-3 pr-3 form-group" style="width: 100%">
              <button class="btn btn-primary rounded-sm" style="font-size: 90%; width: 100%" type="submit">Register</button>
            </div>
          </form>
        </div>
        <div style="text-align: center" class="mt-3">
          Already have an account? <router-link to="/login">Log in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    username: {
      get(){
        return this.$store.state.register.username
      },
      set(value){
        this.$store.commit('CHANGE_REGISTER_USERNAME', value)
      }
    },
    email: {
      get(){
        return this.$store.state.register.email
      },
      set(value){
        this.$store.commit('CHANGE_REGISTER_EMAIL', value)
      }
    },
    password: {
      get(){
        return this.$store.state.register.password
      },
      set(value){
        this.$store.commit('CHANGE_REGISTER_PASSWORD', value)
      }
    }
  },
  methods: {
    register(){
      this.$store.dispatch('register')
    }
  }
}
</script>

<style>

</style>