<template>
  <div class="container-fluid p-0" style="background-color: #EFF0F1; min-height: 83.5vh">
    <div class="container">
      <div style="height: 10vh;" id="ask-question" class="d-flex flex-column justify-content-center">
        <h4><strong>Ask a public question</strong></h4>
      </div>
      <div class="row">
        <div class="col-sm">
          <form @submit.prevent="addQuestion()">
            <div style="background-color: white" class="shadow-sm rounded-sm p-3 mb-2">
              <div class="form-group">
                <div style="font-size: 120%"><strong>Title</strong></div>
                <small>Be specific and imagine you’re asking a question to another person</small>
                <input type="text" class="form-control form-control-sm pt-1" v-model="title">
              </div>
              <div class="form-group">
                <div style="font-size: 120%"><strong>Body</strong></div>
                <small>Include all the information someone would need to answer your question</small>
                <VueEditor class="pt-1" v-model="description"/>
              </div>
              <hr>
              <div v-html="description"></div>
              <hr>
              <div class="form-group">
                <div style="font-size: 120%"><strong>Tags</strong></div>
                <small>Add up to 5 tags to describe what your question is about</small>
                <vue-tags-input
                  v-model="tag"
                  :tags="tags"
                  @tags-changed="newTags => tags = newTags"
                />
              </div>
            </div>
            <button class="btn btn-primary rounded-sm mt-2 mb-3" style="font-size: 90%" type="submit">
              <div class="pt-1 pb-1">Ask Question</div>
            </button>
          </form>
        </div>
        <div class="col-sm-2 pt-2">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
    VueEditor
  },
  computed: {
    tags: {
      get(){
        return this.$store.state.addQuestion.tags
      },
      set(value){
        this.$store.commit('ADD_QUESTION_TAGS', value)
      }
    },
    tag: {
      get(){
        return this.$store.state.addQuestion.tag
      },
      set(value){
        this.$store.commit('ADD_QUESTION_TAG', value)
      }
    },
    title: {
      get(){
        return this.$store.state.addQuestion.title
      },
      set(value){
        this.$store.commit('ADD_QUESTION_TITLE', value)
      }
    },
    description: {
      get(){
        return this.$store.state.addQuestion.description
      },
      set(value){
        this.$store.commit('ADD_QUESTION_DESCRIPTION', value)
      }
    }
  },
  methods: {
    addQuestion(){
      this.$store.dispatch('addQuestion')
    }
  }
}
</script>

<style>
.vue-tags-input .ti-tag {
  position: relative;
  background: #CDE0ED;
  color: #1f76ad;
}

#ask-question{
  background: url('../assets/bkg.png') no-repeat right center;
  background-size: contain;

}
</style>