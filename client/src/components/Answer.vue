<template>
  <div>
    <div class="d-flex">
      <div class="d-flex flex-column align-items-center pt-4">
        <img src="../assets/up.png" style="width:40px" class="icons" v-if="!isUpvote" @click.prevent="voteUp()">
        <img src="../assets/up2.png" style="width:40px" class="icons" v-else @click.prevent="unvoteUp()">
        <h4 class="m-0">{{ answer.upVotes.length - answer.downVotes.length }}</h4>
        <img src="../assets/down.png" style="width:40px" class="icons" v-if="!isDownvote" @click.prevent="voteDown">
        <img src="../assets/down2.png" style="width:40px" class="icons" v-else @click.prevent="unvoteDown">
      </div>
      <div class="ml-3 pt-4" style="width: 100%">
        <div v-html="answer.description"></div>
        <div class="d-flex justify-content-end">
          <div class="d-flex flex-column">
            <small>{{moment}}</small>
            <small>Author: {{ answer.author.username }}</small>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['answer'],
  computed: {
    isUpvote(){
      let isVote = false
      this.answer.upVotes.forEach(id=>{
        if(id == localStorage.getItem('loggedUser')){
          isVote = true
        }
      })
      if(isVote){
        return true
      }
      else{
        return false
      }
    },
    isDownvote(){
      let isVote = false
      this.answer.downVotes.forEach(id=>{
        if(id == localStorage.getItem('loggedUser')){
          isVote = true
        }
      })
      if(isVote){
        return true
      }
      else{
        return false
      }
    },
    moment(){
      return moment(this.answer.createdAt).startOf('hour').fromNow();
    }
  },
  methods: {
    voteUp(){
      this.$store.dispatch('answerUp', {answer_id: this.answer._id, question_id: this.$route.params.id})
    },
    unvoteUp(){
      this.$store.dispatch('answerUnup', {answer_id: this.answer._id, question_id: this.$route.params.id})
    },
    voteDown(){
      this.$store.dispatch('answerDown', {answer_id: this.answer._id, question_id: this.$route.params.id})
    },
    unvoteDown(){
      this.$store.dispatch('answerUndown', {answer_id: this.answer._id, question_id: this.$route.params.id})
    }
  }
}
</script>

<style>

</style>