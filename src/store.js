import { createStore } from 'vuex'
import JSSHA from 'jsSHA'
import axios from 'axios'
import router from './router.js'

const store = createStore({
  state: () => ({
    nowPage: '',
    viewList: [],
    foodList: [],
    roomList: [],
    activeList: [],
    searchState: false,
    searchList: []
  }),
  actions: {
    getAuthorizationHeader () {
      // const AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFFF'
      // const AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFFF'
      const AppID = '3f1a209e632642208b8c84607c4c959b'
      const AppKey = 'pPkBWEgkY8H3KV-KEQdQ8HWORBo'
      const GMTString = new Date().toGMTString()
      const ShaObj = new JSSHA('SHA-1', 'TEXT', { encoding: 'UTF8' })
      ShaObj.setHMACKey(AppKey, 'TEXT')
      ShaObj.update('x-date: ' + GMTString)
      const HMAC = ShaObj.getHMAC('B64')
      const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`
      return { Authorization: Authorization, 'X-Date': GMTString }
    },
    GetData ({ commit, dispatch }, payload) {
      console.log(`get data: ${payload}`)
      // const data = []
      // let str
      // switch (payload) {
      //   case 'view': str = 'ScenicSpot'; break
      //   case 'food': str = 'Restaurant'; break
      //   case 'room': str = 'Hotel'; break
      //   case 'active': str = 'Activity'; break
      // }
      // axios.get(
      //   `https://ptx.transportdata.tw/MOTC/v2/Tourism/${str}?$top=6&$format=JSON`,
      //   { headers: dispatch('getAuthorizationHeader') })
      //   .then(res => {
      //     res.data.forEach(item => {
      //       data.push(item)
      //     })
      //     commit(`${payload.toUpperCase()}LIST`, data)
      //   }).catch(error => console.log(error))
    },
    SearchList ({ commit, dispatch }, payload) {
      const { type, keyword } = payload
      // const data = []
      console.log(type, keyword)
      // if (type === '桃園市') {
      //   axios.get(
      //     `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=6&$filter=contains(Name,'${keyword}')&$format=JSON`,
      //     { headers: dispatch('getAuthorizationHeader') })
      //     .then(res => {
      //       res.data.forEach(item => {
      //         data.push(item)
      //       })
      //       commit('SEARCHLIST', data)
      //     }).catch(error => console.log(error))
      // }
    },
    LookDetail ({ commit }, payload) {
      router.push(`/view/${payload}`)
    }
  },
  mutations: {
    CHANGELIST (state, payload) { state.nowPage = payload },
    VIEWLIST (state, payload) { state.viewList = payload },
    FOODLIST (state, payload) { state.foodList = payload },
    ROOMLIST (state, payload) { state.roomList = payload },
    ACTIVELIST (state, payload) { state.activeList = payload },
    SEARCHSTATE (state, payload) { state.searchState = payload },
    SEARCHLIST (state, payload) { state.searchList = payload }
  },
  getters: {
    nowPage: state => state.nowPage,
    viewList: state => state.viewList,
    foodList: state => state.foodList,
    roomList: state => state.roomList,
    activeList: state => state.activeList,
    searchState: state => state.searchState,
    searchList: state => state.searchList
  }
})

export default store
