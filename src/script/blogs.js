function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${encodeURIComponent(
    query
  )}`;
}

let dataBlogsPageQuery = {
  agentspage: (start, limit) =>
    `*[_type=="allarticles"]{_id, articlesName, articlesDate, articlesDuration, articlesImage{asset->{url}}}[${start}...${
      start + limit
    }]`,
};

async function getAPIdata(featuredQuery, start, limit, cb) {
  let url = dynamicFeaturedQuery(featuredQuery(start, limit));
  console.log("Fetching URL:", url);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Fetched data:", data);

    if (data && data.result) {
      if (typeof cb === "function") {
        cb(data.result);
      } else {
        console.error("Callback is not a function");
      }
    } else {
      console.error("No data returned from API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const dataBlogsPageCards = document.querySelector(".data-all-articles-cards");

const renderBlogsPageCards = (cards) => {
  dataBlogsPageCards.innerHTML = "";
  cards &&
    cards.forEach((card) => {
      dataBlogsPageCards.innerHTML += `
       <div class="col-xl-4 col-sm-12 d-flex">
                        <div class="articles__cards">
                            <div class="articles__cards__top">
                                <div class="articles__cards__top__img">
                                    <img
                                        src="${card.articlesImage.asset.url}">
                                </div>
                            </div>
                            <div class="articles__cards__body">
                                <div class="articles__cards__body__text">
                                    <h4>${card.articlesName}</h4>
                                    <ul>
                                        <li><i class="ri-calendar-2-line"></i> ${card.articlesDate}</li>
                                        <li><i class="ri-time-line"></i> ${card.articlesDuration}</li>
                                    </ul>
                                </div>
                                <div class="articles__cards__body__btn">
                                    <div class="articles_btn">
                                        <a href="blogsinglepage.html?id=${card._id}"><span>Read more</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    });
};

let currentPage = 1;
const limit = 6;
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");

const loadAgentsPage = (page) => {
  const start = (page - 1) * limit;
  getAPIdata(dataBlogsPageQuery.agentspage, start, limit, (data) => {
    renderBlogsPageCards(data);
  });
};

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadAgentsPage(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  currentPage++;
  loadAgentsPage(currentPage);
});

loadAgentsPage(currentPage);

/* function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source);
}
//////querys
let dataQuery = {
  allarticles: ` *[_type=="allarticles"]{_id, articlesName, articlesDate, articlesDuration, articlesImage{asset->{url}},}`,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}

///////all articles
const dataAllArticlesCards = document.querySelector(".data-all-articles-cards");

const renderAllArticlesCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataAllArticlesCards.innerHTML += ` <div class="col-xl-4 col-sm-12 d-flex">
                        <div class="articles__cards">
                            <div class="articles__cards__top">
                                <div class="articles__cards__top__img">
                                    <img
                                        src="${card.articlesImage.asset.url}">
                                </div>
                            </div>
                            <div class="articles__cards__body">
                                <div class="articles__cards__body__text">
                                    <h4>${card.articlesName}</h4>
                                    <ul>
                                        <li><i class="ri-calendar-2-line"></i> ${card.articlesDate}</li>
                                        <li><i class="ri-time-line"></i> ${card.articlesDuration}</li>
                                    </ul>
                                </div>
                                <div class="articles__cards__body__btn">
                                    <div class="articles_btn">
                                        <a href="blogsinglepage.html?id=${card._id}"><span>Read more</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    });
};

getAPIdata(dataQuery.allarticles, (data) => {
  renderAllArticlesCards(data);
});


 */
