# tour-guide

>F2E-3rd參賽作品

## 簡介

* 台灣觀光網站，包含景點、美食、住宿、活動，使用TDX API

## 功能

* 調整閱讀模式 - 圖文/列表 & 日間/夜間
* 關鍵字搜尋
* 篩選功能(按鈕:景點分類，縣市分類)，進階篩選(多選)選區，景點分類)
* mobile/iPad/desktop介面
* 行程規劃??，地圖指引... ??????????
* dark Mode

* ![頁面展示-gif-1]()
* ![搜尋操作-gif-2]()

---

## 挑戰

### 樣式

* tailwind - dark Mode
* 圖文/列表模式
* BEM規則
* grid排版
* transition、animation、transform

### 技術

* 使用vite, vue Composition API
* TDX API - (Transport Data eXchange)
* oData搜尋語法，(過濾無圖片資料、篩選縣市、關鍵字、...)

---
---

使用??

* D3.js、three.js ??????
* 第二次使用地圖座標...Geolocation? leaflet?
* 閉包??????
* ES7~12??????

markdown in github test

* [x] this is a complete item
* [ ] this is an incomplete item
* [x] this is a complete item [x]
* [*] this is an incomplete item
* [~] this is an incomplete item

刪掉無照片資料`https://ptx.transportdata.tw/MOTC/v2/Tourism/${str}?$filter=Picture/PictureUrl1 ne null &$top=6&$format=JSON`

if -> switch
