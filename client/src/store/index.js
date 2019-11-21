import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axiosCreate from '../configs/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    loggedUser: '',
    tags: [],
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
    CHANGE_LOGGED_USER(state, payload){
      state.loggedUser = payload
    },
    CHANGE_TAGS(state, payload){
      state.tags = payload
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
          commit('CHANGE_LOGIN_EMAIL', '')
          commit('CHANGE_LOGIN_PASSWORD', '')
          commit('CHANGE_REGISTER_EMAIL', '')
          commit('CHANGE_REGISTER_PASSWORD', '')
          commit('CHANGE_REGISTER_USERNAME', '')

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
    logout({commit}){
      localStorage.removeItem('token')
      localStorage.removeItem('loggedUser')
      commit('CHANGE_IS_LOGIN', false)
      router.push('/login')
      Swal.fire({
        icon: 'success',
        title: 'Logout success'
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
    addAnswer({state, commit ,dispatch}, payload){
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
          commit('ADD_ANSWER_DESCRIPTION', '')
          dispatch('fetchOneQuestion', payload)
          Swal.fire({
            icon: 'success',
            title: 'Success add answer'
          })
        })
        .catch(({ response })=>{
          console.log(response.data)
          Swal.fire({
            icon: 'error',
            title: response.data
          })
        })
    },
    fetchLogin({commit}){
      axiosCreate({
        method: 'get',
        url: '/users',
        headers:{
          access_token: localStorage.getItem('token')
        }
      })
        .then(({ data })=>{
          commit('CHANGE_IS_LOGIN', true)
          commit('CHANGE_LOGGED_USER', data)
        })
        .catch(({ response })=>{
          console.log(response.data)
          Swal.fire({
            icon: 'error',
            title: response.data
          })
          localStorage.removeItem('token')
          localStorage.removeItem('loggedUser')
          commit('CHANGE_IS_LOGIN', false)
          router.push('/login')
        })
    },
    getTags({commit}){
      axiosCreate({
        url: '/tags',
        method: 'get'
      })
        .then(({ data })=>{
          console.log(data)
          commit('CHANGE_TAGS', data)
        })
        .catch(({ response })=>{
          Swal.fire({
            icon: 'error',
            title: response.data
          })
        })
    },
    questionUp({dispatch}, payload){
      axiosCreate({
        method: 'patch',
        url: `/questions/up/add/${payload}`,
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
    },
    questionUnup({dispatch}, payload){
      axiosCreate({
        method: 'patch',
        url: `/questions/up/remove/${payload}`,
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
    },
    questionDown({dispatch}, payload){
      axiosCreate({
        method: 'patch',
        url: `/questions/down/add/${payload}`,
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
    },
    questionUndown({dispatch}, payload){
      axiosCreate({
        method: 'patch',
        url: `/questions/down/remove/${payload}`,
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
    },
    answerUp({dispatch}, payload){
      axiosCreate({
        url: `/answers/up/add/${payload.answer_id}`,
        method: 'patch',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        console.log(data)
        dispatch('fetchOneQuestion', payload.question_id)
      })
      .catch(({ response })=>{
        console.log(response.data)
        Swal.fire({
          icon: 'error',
          title: response.data
        })
      })
    },
    answerUnup({dispatch}, payload){
      axiosCreate({
        url: `/answers/up/remove/${payload.answer_id}`,
        method: 'patch',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        console.log(data)
        dispatch('fetchOneQuestion', payload.question_id)
      })
      .catch(({ response })=>{
        console.log(response.data)
        Swal.fire({
          icon: 'error',
          title: response.data
        })
      })
    },
    answerDown({dispatch}, payload){
      axiosCreate({
        url: `/answers/down/add/${payload.answer_id}`,
        method: 'patch',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        console.log(data)
        dispatch('fetchOneQuestion', payload.question_id)
      })
      .catch(({ response })=>{
        console.log(response.data)
        Swal.fire({
          icon: 'error',
          title: response.data
        })
      })
    },
    answerUndown({dispatch}, payload){
      axiosCreate({
        url: `/answers/down/remove/${payload.answer_id}`,
        method: 'patch',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        console.log(data)
        dispatch('fetchOneQuestion', payload.question_id)
      })
      .catch(({ response })=>{
        console.log(response.data)
        Swal.fire({
          icon: 'error',
          title: response.data
        })
      })
    },
    addTag({dispatch}, payload){
      axiosCreate({
        url: '/users/tag',
        method: 'patch',
        data: {
          tag: payload
        },
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(({ data })=>{
          console.log(data)
          dispatch('fetchLogin')
        })
        .catch(({ response })=>{
          console.log(response)
          Swal.fire({
            icon: 'error',
            title: response.data
          })
        })
    },
    removeTag({dispatch}, payload){
      axiosCreate({
        url: '/users/tag/delete',
        method: 'patch',
        data: {
          tag: payload
        },
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(({ data })=>{
          dispatch('fetchLogin')
        })
        .catch(({ response })=>{
          console.log(response)
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
