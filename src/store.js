import { createStore } from 'vuex'
import JSSHA from 'jsSHA'
import axios from 'axios'
import router from './router.js'

const store = createStore({
  state: () => ({
    viewList: [],
    foodList: [],
    roomList: [],
    activeList: [],
    nowList: [],
    //
    nowPage: '',
    searchPage: '',
    searchList: [],
    nowCounty: '',
    detailData: [],
    listMode: true,
    filterPanel: false
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
    GetData ({ commit, dispatch, state }, payload) {
      const { page, connect } = payload
      const data = []
      let str
      switch (page) {
        case 'view': str = 'ScenicSpot'; break
        case 'food': str = 'Restaurant'; break
        case 'room': str = 'Hotel'; break
        case 'active': str = 'Activity'; break
      }
      axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/${str}?$top=60&${connect ? '$skip=60&' : ''}$format=JSON`,
        { headers: dispatch('getAuthorizationHeader') })
        .then(res => {
          res.data.forEach(item => {
            data.push(item)
          })
          commit(`${page.toUpperCase()}LIST`, [...state[`${page}List`], ...data])
        }).catch(error => console.log(error))
    },
    SearchList ({ commit, dispatch, state }, payload) {
      const { county, keyword } = payload
      let strCounty
      switch (county) {
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
      const data = []
      let str
      switch (state.nowPage) {
        case 'view': str = 'ScenicSpot'; break
        case 'food': str = 'Restaurant'; break
        case 'room': str = 'Hotel'; break
        case 'active': str = 'Activity'; break
      }
      axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/${str}${county ? `/${strCounty}` : ''}?$filter=contains(Name,'${keyword}')&$format=JSON`,
        { headers: dispatch('getAuthorizationHeader') })
        .then(res => {
          res.data.forEach(item => {
            data.push(item)
          })
          commit('SEARCHLIST', data)
          dispatch('changePage', state.nowPage)
        }).catch(error => console.log(error))
    },
    changePage ({ commit, dispatch, state }, payload) {
      const str = payload.replace(/\//, '')
      if (!state[`${str}List`][0]) {
        dispatch('GetData', { page: str, connect: false })
      }
      commit('NOWLIST', [])
      commit('CHANGEPAGE', str)
      router.push(`/${str}`)
      dispatch('addNowList', str)
    },
    addNowList ({ commit, dispatch, state }, payload) {
      const num = state.nowList.length
      const arr = []
      if (num % 60 !== 0) {
        state[`${payload}List`].forEach((item, index) => {
          if (index > num && index < num + 13) arr.push(item)
        })
      } else {
        dispatch('GetData', { page: state.nowPage, connect: true })
        state[`${payload}List`].forEach((item, index) => {
          if (index > num && index < num + 13) arr.push(item)
        })
      }
      commit('NOWLIST', [...state.nowList, ...arr])
    }
  },
  mutations: {
    VIEWLIST (state, payload) { state.viewList = payload },
    FOODLIST (state, payload) { state.foodList = payload },
    ROOMLIST (state, payload) { state.roomList = payload },
    ACTIVELIST (state, payload) { state.activeList = payload },
    NOWLIST (state, payload) { state.nowList = payload },
    //
    CHANGEPAGE (state, payload) { state.nowPage = payload },
    SEARCHPAGE (state, payload) { state.searchPage = payload },
    SEARCHLIST (state, payload) { state.searchList = payload },
    SEARCHCOUNTY (state, payload) { state.nowCounty = payload },
    DETAILDATA (state, payload) { state.detailData = payload },
    LISTMODE (state) { state.listMode = !state.listMode },
    FILTERPANEL (state) { state.filterPanel = !state.filterPanel }
  },
  getters: {
    viewList: state => state.viewList,
    foodList: state => state.foodList,
    roomList: state => state.roomList,
    activeList: state => state.activeList,
    nowList: state => state.nowList,
    //
    nowPage: state => state.nowPage,
    searchPage: state => state.searchPage,
    searchList: state => state.searchList,
    nowCounty: state => state.nowCounty,
    detailData: state => state.detailData,
    listMode: state => state.listMode,
    filterPanel: state => state.filterPanel
  }
})

export default store
