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
            200 Questions
          </div>
        </div>
        <div>
          <Questions v-for="question in questions" :key="question._id" :question="question"/>
        </div>
        <div></div>
      </div>
      <div class="col-sm-3 pt-2">
        <div class="card shadow-sm" id="watched-tag">
          <div class="card-header d-flex justify-content-between align-content-center">
            <div class="d-flex align-items-center">
              <img src="../assets/eye.png" style="width: 20px; object-fit: contain;">
              <div class="ml-2">Watched Tags</div>
            </div>
            <div>
              <button class="btn btn-sm" style="font-size: 90%">Edit</button>
              <button class="btn btn-sm" style="font-size: 90%">Save</button>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex flex-wrap">
              <button class="btn btn-sm tag-button m-1">Javascript</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Questions from '../components/Questions'
import moment from 'moment'

export default {
  components: {
    Questions
  },
  created(){
    this.$store.dispatch('fetchQuestions')
  },
  methods: {
    toAsk(){
      this.$router.push('/ask')
    }
  },
  computed: {
    questions(){
      return this.$store.state.questions
    },
    isLogin(){
      return this.$store.state.isLogin
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