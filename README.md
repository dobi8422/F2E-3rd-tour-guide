# tour-guide

>F2E-3rd參賽作品
>
>TDX API - (Transport Data eXchange)

## 簡介

* 台灣觀光網站，包含景點、美食、住宿、活動

## 功能

* 調整閱讀模式(圖文/列表)
* 關鍵字搜尋
* 篩選功能(按鈕:景點分類，縣市分類)，進階篩選(多選)選區，景點分類)
* mobile/iPad/desktop介面
* 行程規劃??，地圖指引... ??????????

* ![頁面展示-gif-1]()
* ![搜尋操作-gif-2]()

---

## 自我要求

### 樣式

* tailwind - dark Mode
* grid
* 圖文/列表模式
* transition、animation、transform

### 技術

* 使用vite, vue Composition API, `<script setup> defineProps...`
* oData搜尋語法，(過濾無圖片資料、篩選縣市、關鍵字、...)

---
---

* 第二次使用地圖座標...Geolocation? leaflet?
* 閉包??????
* ES7~12??????

刪掉無照片資料`https://ptx.transportdata.tw/MOTC/v2/Tourism/${str}?$filter=Picture/PictureUrl1 ne null &$top=6&$format=JSON`

能不能用mutation監聽APP/theme
分業功能
查詢功能 分成縣市..類別...
nav跑版
---
主頁內容
詳細資訊內容
---
製作地圖
