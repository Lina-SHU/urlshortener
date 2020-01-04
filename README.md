# 短網址產生器
此專案提供短網址產生器，幫助縮短網址以利使用者記錄，並提供Copy按鈕幫助快速複製。

![urlshortener](https://github.com/Lina-SHU/urlshortener/blob/master/A30Q4.png)

----
## 專案說明
1. 輸入欲縮短的url。
2. 產生短網址。
3. 點選Copy按鈕可直接複製，開啟瀏覽器將複製的短網址貼上(ctrl+v)。

----
## 安裝流程
1. 打開你的 terminal，Clone 此專案至本機電腦
```
git clone https://github.com/Lina-SHU/urlshortener.git
```
2. 開啟終端機(Terminal)，進入存放此專案的資料夾
```
cd urlshortener
```
3. 安裝 npm 套件，根據package.json內紀錄之套件進行安裝。
```
npm install
```
4. 啟動專案，並監聽伺服器
```
npm run start
```
5. 開啟瀏覽器，輸入[http://localhost:3000](http://localhost:3000) ，即可使用建立於本端之縮網址網站。

6. 在終端機中輸入Ctrl+C可停止伺服器運行。

----
## 環境說明
### 環境配置
- Express
- MongoDB
- Robo 3T

### 環境套件
- Nodemon
- express-handlebars
- body-parser
- mongoose
- Bootstrap
- clipboard

