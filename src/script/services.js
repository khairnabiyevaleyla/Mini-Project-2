function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source);
}
//////querys
let dataQuery = {
  services: ` *[_type=="services"]{icon, title, text,}`,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}
//////services

const dataServicesCards = document.querySelector(".data-services-cards");

const renderServicesCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataServicesCards.innerHTML += ` <div class="col-xl-4">
                        <div class="service_card">
                            ${card.icon}
                            <h3>${card.title}</h3>
                            <p>${card.text}</p>
                        </div>
                    </div>
                        </div>`;
    });
};

getAPIdata(dataQuery.services, (data) => {
  renderServicesCards(data);
});
