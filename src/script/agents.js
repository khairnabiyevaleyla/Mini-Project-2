function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source);
}
//////querys
let dataAgentsQuery = {
  agents: ` *[_type=="agents"]{agentName, agentPosition, agentImage{asset->{url}},}`,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}

////agent

const dataAgentsCards = document.querySelector(".data_agents_cards");

const renderAgentsCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataAgentsCards.innerHTML += `<div class="swiper-slide">
                                    <div class="agent_img">
                                        <img
                                            src="${card.agentImage.asset.url}">
                                    </div>
                                    <div class="agent_text">
                                        <h4>${card.agentName}</h4>
                                        <p>${card.agentPosition}</p>
                                    </div>
                                </div>`;
    });
};

getAPIdata(dataAgentsQuery.agents, (data) => {
  renderAgentsCards(data);
  var swiper = new Swiper(".agent_card", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      748: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
});

////agent
