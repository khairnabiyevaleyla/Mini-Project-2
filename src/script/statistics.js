function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source);
}
//////querys
let dataStatisticsQuery = {
  statistics: ` *[_type=="statistics"]{statisticsTitle, statisticsNumber, statisticsText,}`,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}

///////statistics

const dataStatistics = document.querySelector(".data-statistics");

const renderStatistics = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataStatistics.innerHTML += `  <div class="statistics_cards">
                                <h3>${card.statisticsNumber}</h3>
                                <span>${card.statisticsTitle}</span>
                                <p>${card.statisticsText}</p>
                            </div>`;
    });
};

getAPIdata(dataStatisticsQuery.statistics, (data) => {
  renderStatistics(data);
});

///////statistics
