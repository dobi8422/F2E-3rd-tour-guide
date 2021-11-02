<template>
  <div>
    <input type="text" placeholder="請輸入景點關鍵字" v-model="keyword" @keyup.enter="getData">
    <select v-model="dataNum">
      <option value="5" selected="selected">請選擇你要篩選的筆數</option>
      <option v-for="n in 10" :key="n" :value="n*5">{{ n*5 }}</option>
    </select>
    <input type="button" value="搜尋" @click="getData">
    <h2 class="text-blue-500">景點列表</h2>
    <ul>
      <li v-for="item in list" :key="item.ID">
        <img :src="item.Picture.PictureUrl1" alt="">
        <h5>{{ item.Name }}</h5>
        <p>{{ item.Description }}</p>
        <p>{{ item.DescriptionDetail }}</p>
        <p>{{ item.City }}</p>
        <p>{{ item.Address }}</p>
        <p>{{ item.OpenTime }}</p>
        <p>{{ item.ParkingInfo }}</p>
        <p>{{ item.Phone }}</p>
        <p>{{ item.Position }}</p>
        <p>{{ item.Remarks }}</p>
        <p>{{ item.TravelInfo }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import JSSHA from 'jsSHA'

export default {
  data: () => ({
    keyword: '',
    dataNum: 5,
    list: []
  }),
  methods: {
    getData () {
      const limitNum = this.dataNum
      const keywordTxt = this.keyword
      this.axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(Name,'${keywordTxt}')&$top=${limitNum}&$format=JSON`,
        { headers: this.getAuthorizationHeader() })
        .then(res => {
          res.data.forEach(item => {
            this.list.push(item)
          })
        }).catch(error => console.log(error))
    },
    getAuthorizationHeader () {
      const AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
      const AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
      // const AppID = '3f1a209e632642208b8c84607c4c959b'
      // const AppKey = 'pPkBWEgkY8H3KV-KEQdQ8HWORBo'
      const GMTString = new Date().toGMTString()
      const ShaObj = new JSSHA('SHA-1', 'TEXT', { encoding: 'UTF8' })
      ShaObj.setHMACKey(AppKey, 'TEXT')
      ShaObj.update('x-date: ' + GMTString)
      const HMAC = ShaObj.getHMAC('B64')
      const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`
      return { Authorization: Authorization, 'X-Date': GMTString }
    }
  }
}
</script>
