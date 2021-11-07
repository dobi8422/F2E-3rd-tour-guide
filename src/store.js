import { createStore } from 'vuex'
import JSSHA from 'jsSHA'
import axios from 'axios'
import router from './router.js'
//
import viewList from './db/viewList.json'
import foodList from './db/foodList.json'
import roomList from './db/roomList.json'
import activeList from './db/activeList.json'
import searchList from './db/searchList.json'

const store = createStore({
  state: () => ({
    viewList: [],
    foodList: [],
    roomList: [],
    activeList: [],
    //
    nowPage: '',
    searchPage: '',
    searchList: [],
    nowCounty: '',
    // 還沒用到
    nowType: 'list'
  }),
  actions: {
    getAuthorizationHeader () {
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
      // test
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
      //
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
    SearchList ({ commit, dispatch, state }, payload) {
      // test
      const data = searchList
      commit('SEARCHLIST', data)
      commit('changePage', 'view')
      //
      // const { county, keyword } = payload

      let strCounty
      switch (strCounty) {
        case '臺北市': strCounty = 'Taipei'; break
        case '新北市': strCounty = 'NewTaipei'; break
        case '桃園市': strCounty = 'Taoyuan'; break
        case '臺中市': strCounty = 'Taichung'; break
        case '臺南市': strCounty = 'Tainan'; break
        case '高雄市': strCounty = 'Kaohsiung'; break
        case '基隆市': strCounty = 'Keelung'; break
        case '新竹市': strCounty = 'Hsinchu'; break
        case '新竹縣': strCounty = 'HsinchuCounty'; break
        case '苗栗縣': strCounty = 'MiaoliCounty'; break
        case '彰化縣': strCounty = 'ChanghuaCounty'; break
        case '南投縣': strCounty = 'NantouCounty'; break
        case '雲林縣': strCounty = 'YunlinCounty'; break
        case '嘉義縣': strCounty = 'ChiayiCounty'; break
        case '嘉義市': strCounty = 'Chiayi'; break
        case '屏東縣': strCounty = 'PingtungCounty'; break
        case '宜蘭縣': strCounty = 'YilanCounty'; break
        case '花蓮縣': strCounty = 'HualienCounty'; break
        case '臺東縣': strCounty = 'TaitungCounty'; break
        case '金門縣': strCounty = 'KinmenCounty'; break
        case '澎湖縣': strCounty = 'PenghuCounty'; break
        case '連江縣': strCounty = 'LienchiangCounty'; break
        default: strCounty = ''; break
      }
      // const data = []
      // let str
      // switch (state.nowPage) {
      //   case 'view': str = 'ScenicSpot'; break
      //   case 'food': str = 'Restaurant'; break
      //   case 'room': str = 'Hotel'; break
      //   case 'active': str = 'Activity'; break
      // }
      // axios.get(
      //   `https://ptx.transportdata.tw/MOTC/v2/Tourism/${str}${county ? `/${strCounty}` : ''}?$top=30&$filter=contains(Name,'${keyword}')&$format=JSON`,
      //   { headers: dispatch('getAuthorizationHeader') })
      //   .then(res => {
      //     res.data.forEach(item => {
      //       data.push(item)
      //     })
      //     commit('SEARCHLIST', data)
      //     commit('changePage', 'view')
      //   }).catch(error => console.log(error))
    },
    changePage ({ commit, dispatch, state }, payload) {
      const str = payload.replace(/\//, '')
      if (!state[`${str}List`][0]) {
        dispatch('GetData', str)
      }
      commit('CHANGEPAGE', str)
      router.push(`/${str}`)
    }
  },
  mutations: {
    VIEWLIST (state, payload) { state.viewList = payload },
    FOODLIST (state, payload) { state.foodList = payload },
    ROOMLIST (state, payload) { state.roomList = payload },
    ACTIVELIST (state, payload) { state.activeList = payload },
    //
    CHANGEPAGE (state, payload) { state.nowPage = payload },
    SEARCHPAHE (state, payload) { state.searchPage = payload },
    SEARCHLIST (state, payload) { state.searchList = payload },
    SEARCHCOUNTY (state, payload) { state.nowCounty = payload },
    //
    CHANGETYPE (state, payload) { state.nowType = payload }
  },
  getters: {
    viewList: state => state.viewList,
    foodList: state => state.foodList,
    roomList: state => state.roomList,
    activeList: state => state.activeList,
    //
    nowPage: state => state.nowPage,
    searchPage: state => state.searchPage,
    searchList: state => state.searchList,
    nowCounty: state => state.nowCounty,
    //
    nowType: state => state.nowType
  }
})

export default store
