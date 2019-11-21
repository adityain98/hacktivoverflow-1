import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axiosCreate from '../configs/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    questions: [],
    question: {
      answers: [],
      upVotes: [],
      downVotes: [],
      author: {
        username: ''
      }
    },
    login: {
      email: '',
      password: ''
    },
    register: {
      email: '',
      username: '',
      password: ''
    },
    addQuestion: {
      title: '',
      description: '',
      tags: [],
      tag: ''
    },
    addAnswer: {
      description: ''
    }
  },
  mutations: {
    CHANGE_IS_LOGIN(state, payload){
      state.isLogin = payload
    },
    CHANGE_LOGIN_EMAIL(state, payload){
      state.login.email = payload
    },
    CHANGE_LOGIN_PASSWORD(state, payload){
      state.login.password = payload
    },
    CHANGE_REGISTER_USERNAME(state, payload){
      state.register.username = payload
    },
    CHANGE_REGISTER_EMAIL(state, payload){
      state.register.email = payload
    },
    CHANGE_REGISTER_PASSWORD(state, payload){
      state.register.password = payload
    },
    CHANGE_QUESTIONS(state, payload){
      state.questions = payload
    },
    CHANGE_QUESTION(state, payload){
      state.question = payload
    },
    ADD_QUESTION_TITLE(state, payload){
      state.addQuestion.title = payload
    },
    ADD_QUESTION_DESCRIPTION(state, payload){
      state.addQuestion.description = payload
    },
    ADD_QUESTION_TAGS(state, payload){
      state.addQuestion.tags = payload
    },
    ADD_QUESTION_TAG(state, payload){
      state.addQuestion.tag = payload
    },
    ADD_ANSWER_DESCRIPTION(state, payload){
      state.addAnswer.description = payload
    }
  },
  actions: {
    login({state, commit}){
      const email = state.login.email
      const password = state.login.password
      axiosCreate({
        url: '/users/login',
        data: {
          email,
          password
        },
        method: 'post'
      })
        .then(({ data })=>{
          localStorage.setItem('token', data.token)
          localStorage.setItem('loggedUser', data._id)
          commit('CHANGE_IS_LOGIN', true)
          Swal.fire({
            icon:'success',
            title: 'Login success'
          })
          router.push('/')
        })
        .catch(err=>{
          console.log(err.response.data)
          Swal.fire({
            icon: 'error',
            title: `${err.response.data}`
          })
        })
    },
    register({state, commit, dispatch}){
      const username = state.register.username
      const email = state.register.email
      const password = state.register.password
      axiosCreate({
        url: '/users/register',
        method: 'post',
        data: {
          username,
          email,
          password
        }
      })
        .then(({ data })=>{
          commit('CHANGE_LOGIN_EMAIL', email)
          commit('CHANGE_LOGIN_PASSWORD', password)
          dispatch('login')
        })
        .catch(err=>{
          console.log(err.response.data)
          Swal.fire({
            icon: 'error',
            title: `${err.response.data}`
          })
        })
    },
    fetchQuestions({state, commit}){
      axiosCreate({
        method: 'get',
        url: '/questions/'
      })
        .then(({ data })=>{
          commit('CHANGE_QUESTIONS', data)
        })
        .catch(({response})=>{
          console.log(response.data)
        })
    },
    fetchOneQuestion({state, commit}, payload){
      const id = payload
      axiosCreate({
        url: `/questions/${id}`,
        method: 'get'
      })
        .then(({ data })=>{
          console.log(data)
          commit('CHANGE_QUESTION', data)
        })
        .catch(({ response })=>{
          console.log(response.data)
          Swal.fire({
            icon: 'error',
            title: `${response.data}`
          })
        })
    },
    addQuestion({state, commit}){
      const arrTag = state.addQuestion.tags
      const title = state.addQuestion.title
      const description = state.addQuestion.description
      const tags = []

      arrTag.forEach(tag=>{
        tags.push(tag.text.toLowerCase())
      })

      axiosCreate({
        method: 'post',
        url: '/questions',
        headers: {
          access_token: localStorage.getItem('token')
        },
        data: {
          title,
          description,
          tags
        }
      })
        .then(({ data })=>{
          Swal.fire({
            icon: 'success',
            title: 'Success add question'
          })
          commit('ADD_QUESTION_TITLE', '')
          commit('ADD_QUESTION_TAGS', [])
          commit('ADD_QUESTION_TAG', '')
          commit('ADD_QUESTION_DESCRIPTION', '')
          router.push('/')
        })
        .catch(({response})=>{
          console.log(response.data)
          Swal.fire({
            icon:'error',
            title: `${response.data}`
          })
        })
    },
    addAnswer({state, dispatch}, payload){
      const description = state.addAnswer.description
      axiosCreate({
        url: '/answers',
        method: 'post',
        data: {
          description,
          question_id: payload
        },
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(({ data })=>{
          console.log(data)
          dispatch('fetchOneQuestion', payload)
        })
        .catch(({ response })=>{
          console.log(response.data)
          Swal.fire({
            icon: 'error',
            title: response.data
          })
        })
    }
  },
  modules: {
  }
})
