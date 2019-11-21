<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-2">
      </div>
      <div class="col-sm border-left p-0 pr-2 pl-4">
        <div class="d-flex flex-column border-bottom pt-2 pb-2">
          <div class="d-flex justify-content-between" style="width: 100%">
            <div class="title" style="width: 80%">
              <strong>{{ question.title }}</strong>
            </div>
            <div>
              <button class="btn btn-primary rounded-sm mt-2" style="font-size: 90%">
                <div class="p-1" @click.prevent="toAsk()">Ask Question</div>
              </button>
            </div>
          </div>
          <small class="mt-4 mb-2">
            Asked: {{ moment }}
          </small>
        </div>
        <div class="d-flex">
          <div class="d-flex flex-column align-items-center pt-4">
            <img src="../assets/up.png" style="width:40px" class="icons" v-if="!isUpvote" @click.prevent="questionUp()">
            <img src="../assets/up2.png" style="width:40px" class="icons" v-else @click.prevent="questionUnup()">
            <h4 class="m-0">{{ question.upVotes.length - question.downVotes.length }}</h4>
            <img src="../assets/down.png" style="width:40px" class="icons" v-if="!isDownvote" @click.prevent="questionDown()">
            <img src="../assets/down2.png" style="width:40px" class="icons" v-else @click.prevent="questionUndown()">
          </div>
          <div class="ml-3 pt-4">
            <div v-html="question.description"></div>
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-wrap" style="width:80%">
                <button class="btn btn-sm tag-button m-1" v-for="tag in question.tags" :key="tag._id">{{ tag.tag }}</button>
              </div>
              <div class="d-flex justify-content-end">
                <div class="d-flex flex-column">
                  <small>{{ moment }}</small>
                  <small>Author: {{ question.author.username }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="title mt-3" style="width: 80%">
          <strong>{{ question.answers.length }} Answers</strong>
        </div>
        <hr>
        <!-- loop answer -->
        <Answer v-for="answer in question.answers" :key="answer._id" :answer="answer"/>
        <div class="mb-3" v-if="isLogin">
          <h4>Your Answer</h4>
          <VueEditor v-model="description"/>
          <hr>
          <div v-html="description"></div>
          <hr>
          <div class="d-flex">
            <button class="btn btn-primary rounded-sm mt-2 mr-2" style="font-size: 90%" @click.prevent="addAnswer()">
              Post your answer
            </button>
            <button class="btn mt-2 mr-2" id="discard" v-if="description" @click.prevent="discard()">
              discard
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-3 pt-2">
        
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Answer from '../components/Answer.vue'
import moment from 'moment'

export default {
  components: {
    VueEditor,
    Answer
  },
  computed: {
    moment(){
      return moment(this.question.createdAt).startOf('hour').fromNow();
    },
    question(){
      return this.$store.state.question
    },
    isUpvote(){
      let isUp = false
      this.question.upVotes.forEach(up=>{
        if(up == localStorage.getItem('loggedUser')){
          isUp = true
        }
      })
      if(isUp){
        return true
      }
      else{
        return false
      }
    },
    isDownvote(){
      let isDown = false
      this.question.downVotes.forEach(Down=>{
        if(Down == localStorage.getItem('loggedUser')){
          isDown = true
        }
      })
      if(isDown){
        return true
      }
      else{
        return false
      }
    },
    description: {
      get(){
        return this.$store.state.addAnswer.description
      },
      set(value){
        this.$store.commit('ADD_ANSWER_DESCRIPTION', value)
      }
    },
    isLogin(){
      return this.$store.state.isLogin
    }
  },
  created(){
    this.$store.dispatch('fetchOneQuestion', this.$route.params.id)
  },
  methods: {
    toAsk(){
      this.$router.push('/ask')
    },
    discard(){
      this.$store.commit('ADD_ANSWER_DESCRIPTION', '')
    },
    addAnswer(){
      const id = this.$route.params.id
      this.$store.dispatch('addAnswer', id)
    },
    questionUp(){
      this.$store.dispatch('questionUp', this.$route.params.id)
    },
    questionUnup(){
      this.$store.dispatch('questionUnup', this.$route.params.id)
    },
    questionDown(){
      this.$store.dispatch('questionDown', this.$route.params.id)
    },
    questionUndown(){
      this.$store.dispatch('questionUndown', this.$route.params.id)
    },
  }
}
</script>

<style>
#discard{
  color: red;
}

#discard:hover{
  background-color: #f4d0d0
}
</style>