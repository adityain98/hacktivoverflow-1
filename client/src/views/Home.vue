<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-2">
      </div>
      <div class="col-sm border-left p-0 pr-2">
        <div class="d-flex flex-column container border-bottom pt-2 pb-2">
          <div class="d-flex justify-content-between align-items-center" style="width: 100%">
            <div class="title">
              <strong>All Question</strong>
            </div>
            <div>
              <button class="btn btn-primary rounded-sm" style="font-size: 90%">
                <div class="p-1" @click.prevent="toAsk()">Ask Question</div>
              </button>
            </div>
          </div>
          <div class="mt-4 mb-2">
            {{ questions.length }} Questions
          </div>
        </div>
        <div>
          <Questions v-for="question in questions" :key="question._id" :question="question"/>
        </div>
        <div></div>
      </div>
      <div class="col-sm-3 pt-2" v-if="isLogin">
        <div class="card shadow-sm" id="watched-tag">
          <div class="card-header d-flex justify-content-between align-content-center">
            <div class="d-flex align-items-center">
              <img src="../assets/eye.png" style="width: 20px; object-fit: contain;">
              <div class="ml-2">Watched Tags</div>
            </div>
            <div>
              <button class="btn btn-sm" style="font-size: 90%" v-if="!isEdit" @click.prevent="editing(true)">Edit</button>
              <button class="btn btn-sm" style="font-size: 90%" v-else @click.prevent="editing(false)">Save</button>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex flex-wrap">
              <div v-if="!isEdit">
                <button class="btn btn-sm tag-button m-1" v-for="tag in loggedUser.tags" :key="tag._id">{{ tag.tag }}</button>
              </div>
              <div v-else>
                <span class="btn btn-sm tag-button m-1" v-for="tag in loggedUser.tags" :key="tag._id">
                  <div>{{ tag.tag }}  <img src="../assets/x.png" style="width: 12px; cursor: pointer" @click.prevent="removeTag(tag.tag)" class="ml-1"></div>
                </span>
              </div>
            </div>
            <autocomplete
              :search="search"
              placeholder="Search tags"
              @submit="addTag"
              auto-select
              v-if="isEdit"
            ></autocomplete>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Questions from '../components/Questions'
import moment from 'moment'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  data() {
    return {
      isEdit: false,
      countries: ['indonesia']
    }
  },
  components: {
    Questions,
    Autocomplete
  },
  created(){
    this.$store.dispatch('fetchQuestions')
    this.$store.dispatch('getTags')
  },
  methods: {
    toAsk(){
      this.$router.push('/ask')
    },
    editing(boolean){
      this.isEdit = boolean
    },
    search(input) {
      if (input.length < 1) { return [] }
      return this.tags.filter(tag => {
        return tag.toLowerCase()
          .startsWith(input.toLowerCase())
      })
    },
    addTag(tag){
      if(!tag){
        Toast.fire({
          icon: 'error',
          title: 'Tag not found'
        })
      }
      else{
        this.$store.dispatch('addTag', tag)
      }
    },
    removeTag(tag){
      this.$store.dispatch('removeTag', tag)
    }
  },
  computed: {
    questions(){
      return this.$store.state.questions
    },
    isLogin(){
      return this.$store.state.isLogin
    },
    tags(){
      const tags = []
      this.$store.state.tags.forEach(tag=>{
        tags.push(tag.tag)
      })
      return tags
    },
    loggedUser(){
      return this.$store.state.loggedUser
    }
  }
}
</script>

<style>
.title{
  font-size: 150%
}
.tag-button{
  background-color:  #CDE0ED;
  font-size: 65%;
  color: #1f76ad
}

.tag-button:hover{
  background-color: #acd4ef;
  color: #1f76ad
}

.list-question{
  cursor: pointer;
  color: #1f76ad  
}

.list-question:hover{
  color: #32aaff  
}

#watched-tag{
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 10px;
}

.icons{
  cursor: pointer;
}
</style>