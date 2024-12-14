function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source);
}
//////querys
let dataAgentsPageQuery = {
  agentspage: ` *[_type=="agentspage"]{agentName, agentPosition, agentImage{asset->{url}},}`,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}

////agentpage

const dataAgentsPageCards = document.querySelector(".data-agent-page");

const renderAgentsPageCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataAgentsPageCards.innerHTML += ` <div class="col-xl-4">
                            <div class="agent_card ">
                                <div class="agent_img">
                                    <img
                                        src="${card.agentImage.asset.url}">
                                </div>
                                <div class="agent_text">
                                    <h4>${card.agentName}</h4>
                                    <p>${card.agentPosition}</p>
                                </div>
                            </div>
                        </div>`;
    });
};

getAPIdata(dataAgentsPageQuery.agentspage, (data) => {
  renderAgentsPageCards(data);
});

////agentpage
