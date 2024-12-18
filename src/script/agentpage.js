function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${encodeURIComponent(
    query
  )}`;
}

let dataAgentsPageQuery = {
  agentspage: (start, limit) =>
    `*[_type=="agentspage"]{agentName, agentPosition, agentImage{asset->{url}}}[${start}...${
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

const dataAgentsPageCards = document.querySelector(".data-agent-page");

const renderAgentsPageCards = (cards) => {
  dataAgentsPageCards.innerHTML = "";
  cards &&
    cards.forEach((card) => {
      dataAgentsPageCards.innerHTML += `
        <div class="col-xl-4">
          <div class="agent_card">
            <div class="agent_img">
              <img src="${card.agentImage.asset.url}" alt="${card.agentName}">
            </div>
            <div class="agent_text">
              <h4>${card.agentName}</h4>
              <p>${card.agentPosition}</p>
            </div>
          </div>
        </div>`;
    });
};

let currentPage = 1;
const limit = 3;
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");

const loadAgentsPage = (page) => {
  const start = (page - 1) * limit;
  getAPIdata(dataAgentsPageQuery.agentspage, start, limit, (data) => {
    renderAgentsPageCards(data);
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
 */
