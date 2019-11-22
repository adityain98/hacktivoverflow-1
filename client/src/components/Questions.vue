<template>
  <div>
    <div class="d-flex p-2">
      <div class="d-flex flex-column justify-content-center m-2 align-items-center" style="width: 13%">
        <div class="mb-2 d-flex flex-column align-items-center">
          <div style="font-size: 130%">{{ question.upVotes.length - question.downVotes.length }}</div>
          <small>votes</small>
        </div>
        <div class="mb-2 d-flex flex-column align-items-center">
          <div style="font-size: 130%">{{ question.answers.length }}</div>
          <small>Answer</small>
        </div>
      </div>
      <div class="m-2 d-flex flex-column" style="width: 100%">
        <div class="mb-2 d-flex justify-content-between">
          <h6 class="list-question" @click.prevent="toQuestion(question._id)"><strong>{{ question.title }}</strong></h6>
          <img src="../assets/trash2.png" style="width: 20px; object-fit: contain; cursor: pointer" v-if="isQuestion" @click.prevent="deleteQuestion(question._id)">
        </div>
        <small class="mb-2" v-html="tinyDesc"></small>
        <div class="d-flex justify-content-between mb-2">
          <div style="width: 80%">
            <button class="btn btn-sm tag-button mr-1 mb-1" v-for="tag in question.tags" :key="tag._id" @click.prevent="tagSearch(tag.tag)">{{ tag.tag }}</button>
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
    <hr>
  </div>
</template>

<script>
import moment from 'moment'
import Swal from 'sweetalert2'

export default {
  props: ['question'],
  computed: {
    moment(){
      return moment(this.question.createdAt).startOf('hour').fromNow();
    },
    tinyDesc(){
      return this.question.description.slice(0,220) + '...'
    },
    isQuestion(){
      if(this.question.author._id == localStorage.getItem('loggedUser')){
        return true
      }
      else{
        return false
      }
    }
  },
  methods: {
    toQuestion(id){
      this.$router.push(`/question/${id}`)
    },
    tagSearch(tag){
      this.$store.dispatch('tagSearch', tag)
    },
    deleteQuestion(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteQuestion', id)
        }
      })
    }
  }
}
</script>

<style>

</style>