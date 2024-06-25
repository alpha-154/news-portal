const API_KEY = "ad7c115d81c24d4a8c1dd20ea3659033";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("bangladesh"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

     console.log(res);
    // console.log(typeof(res));
     console.log(data);
    // console.log(data.articles[5].author);
    // console.log(typeof(data));
    bindData(data.articles);
}

function bindData(articles){

    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemp = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        
        /*   here, (by condition) ensuring that if any article doesn't have image
        then it wouldn't be added to cardClone  */

        if(!article.urlToImage) return;

        const cardClone = newsCardTemp.content.cloneNode(true);

        //adding the article's data into the card
        fillDataInCard(cardClone, article);

        //adding the cardClone to the cardsContainer
        cardsContainer.appendChild(cardClone);
    });

}

function fillDataInCard(cardClone, article){

    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;

    //to direct user's to theirs clicked website
    cardClone.firstElementChild.addEventListener("click", () => {
          window.open(article.url, "_blank");
    });

}

//declaring this variable to store the current clicked nav item
let currSelectedNav = null;

function onNavItemClick(id){

   //calling the fetchNews() method to browse that nav item related contents
    fetchNews(id);
    
   //accessing the current selected nav item
   const navItem = document.getElementById(id);
   //removing active class from the previous active class
   currSelectedNav?.classList.remove("active");
   //storing the current active nav item to `currSelectedNav` variable
   currSelectedNav = navItem;
   //assiging active class to `currSelectedNav` stored nav item
   currSelectedNav.classList.add("active"); 
    
}

//implementing search option

const searchText = document.querySelector("#search-text");
const searchBtn = document.querySelector("#search-button");

searchBtn.addEventListener("click" , () => {

    const query = searchText.value;
   
    /* if user didn't put any query in the search bar and hit search button 
    then simply return  */
    if(!query) return;

    fetchNews(query);
   
    //removing the active class from nav items links when users
    //looking for through search bar
    currSelectedNav?.classList.remove("active");
    currSelectedNav = null;
    
})