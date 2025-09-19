function openNav() {
  document.getElementById("sidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const API_KEY = `비밀`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
//console.log("buttons", menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
const sidemenus = document.querySelectorAll(".side-menu-list button");
sidemenus.forEach((sidemenu) =>
  sidemenu.addEventListener("click", (event) => getNewsByCategory(event))
);
const getLatesNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  //   console.log("uuu", url);
  //fetch 호출 정보를 가져올려는 함수
  //async(비동기 함수 처리) - await (데이터 받을때 까지 기다려주는것)
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("ddd", newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  console.log("Category", category);
  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);
  newsList = data.articles;
  render();
};
const render = () => {
  const newsHTML = newsList
    .map((news) => {
      let summary = "";
      if (news.description) {
        if (news.description.length > 200) {
          summary = news.description.substring(0, 200) + "...";
        } else {
          summary = news.description;
        }
      } else {
        summary = "내용없음.";
      }

      const defaultImage = ".img/image_not_available.png";
      let imageURL;
      if (news.urlToImage) {
        imageURL = news.urlToImage;
      } else {
        imageURL = defaultImage;
      }

      // let checkSource=""
      // if(news.source.name) {
      //   checkSource = news.source.name
      // } else {
      //   checkSource="no source"
      // } // 간단한 버전은
      let checkSource = news.source.name || "no source";

      let timeFormat = moment(news.publishedAt).startOf("day").fromNow();

      return `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size news-info"
              src="${imageURL}"
            />
          </div>
          <div class="col-lg-8 news-info">
            <h2>${news.title}</h2>
            <p>${summary}</p>
            <div>${checkSource} | ${timeFormat}</div>
          </div>
        </div>`;
    })
    .join("");
  document.getElementById(`news-board`).innerHTML = newsHTML;
};
getLatesNews();

//클릭이벤트
//뉴스 카테고리별 가져오기
//뉴스 보여주기
