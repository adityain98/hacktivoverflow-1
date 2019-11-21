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
        <h6 class="list-question mb-2" @click.prevent="toQuestion(question._id)"><strong>{{ question.title }}</strong></h6>
        <small class="mb-2" v-html="tinyDesc"></small>
        <div class="d-flex justify-content-between mb-2">
          <div style="width: 80%">
            <button class="btn btn-sm tag-button mr-1 mb-1" v-for="tag in question.tags" :key="tag._id">{{ tag.tag }}</button>
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

export default {
  props: ['question'],
  computed: {
    moment(){
      return moment(this.question.createdAt).startOf('hour').fromNow();
    },
    tinyDesc(){
      return this.question.description.slice(0,220) + '...'
    }
  },
  methods: {
    toQuestion(id){
      this.$router.push(`/question/${id}`)
    }
  }
}
</script>

<style>

</style>