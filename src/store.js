import { createStore } from 'vuex'
import JSSHA from 'jsSHA'
import axios from 'axios'
import router from './router.js'
import viewList from './viewList.json'
import foodList from './foodList.json'
import roomList from './roomList.json'
import activeList from './activeList.json'

const store = createStore({
  state: () => ({
    viewList: [],
    foodList: [],
    roomList: [],
    activeList: [],
    //
    nowPage: '',
    searchState: false,
    searchList: [],
    nowType: 'list'
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
      // 因API每日限50次，暫時用資料檔代替
      let data
      switch (payload) {
        case 'view': data = viewList; break
        case 'food': data = foodList; break
        case 'room': data = roomList; break
        case 'active': data = activeList; break
      }
      commit(`${payload.toUpperCase()}LIST`, data)
      // const data = []
      // let str
      // switch (payload) {
      //   case 'view': str = 'ScenicSpot'; break
      //   case 'food': str = 'Restaurant'; break
      //   case 'room': str = 'Hotel'; break
      //   case 'active': str = 'Activity'; break
      // }
      // axios.get(
      //   `https://ptx.transportdata.tw/MOTC/v2/Tourism/${str}?$top=50&$format=JSON`,
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
    changePage ({ commit, dispatch, state }, payload) {
      payload = payload.replace(/\//, '')
      if (!state[`${payload}List`[0]]) {
        dispatch('GetData', payload)
      }
      commit('CHANGEPAGE', payload)
      router.push(`/${payload}`)
    }
  },
  mutations: {
    VIEWLIST (state, payload) { state.viewList = payload },
    FOODLIST (state, payload) { state.foodList = payload },
    ROOMLIST (state, payload) { state.roomList = payload },
    ACTIVELIST (state, payload) { state.activeList = payload },
    //
    CHANGEPAGE (state, payload) { state.nowPage = payload },
    SEARCHSTATE (state, payload) { state.searchState = payload },
    SEARCHLIST (state, payload) { state.searchList = payload },
    CHANGETYPE (state, payload) { state.nowType = payload }
  },
  getters: {
    viewList: state => state.viewList,
    foodList: state => state.foodList,
    roomList: state => state.roomList,
    activeList: state => state.activeList,
    //
    nowPage: state => state.nowPage,
    searchState: state => state.searchState,
    searchList: state => state.searchList,
    nowType: state => state.nowType
  }
})

export default store
