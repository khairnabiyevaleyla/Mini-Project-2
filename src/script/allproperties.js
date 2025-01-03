const dataAllPropertiesCards = document.querySelector(
  ".data-all-properties-cards"
);
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector(".search-form");

let allProperties = [];

function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

let dataQuery = {
  allproperties: `*[_type=="allproperties"]{_id, propertiesName, propertiesAddress, propertiesTag, propertiesPrice, propertiesArea, propertiesRoomsCount, propertiesBathroomsCount, propertiesGarageCounts, mainImage{asset->{url}}}`,
};

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      allProperties = res.result;
      cb(allProperties);
    });
}

const renderAllPropertiesCards = (cards) => {
  dataAllPropertiesCards.innerHTML = "";
  cards &&
    cards.forEach((card) => {
      dataAllPropertiesCards.innerHTML += `
        <div class="col-xl-4 col-sm-12">
                              <div class="propertie_card">
                                  <div class="propertie_card__top">
                                      <div class="propertie_card__top__img">
                                          <!-- Динамическая генерация ссылки с параметром id -->
                                          <a href="productsinglepage.html?id=${card._id}">
                                            <img src="${card.mainImage.asset.url}">
                                          </a>
                                      </div>
                                  </div>
                              </div>
                              <div class="propertie_card__body">
                                  <div class="propertie_card__body__tag">
                                      <span class="properties_tag">${card.propertiesTag}</span>
                                      <span class="properties_price">${card.propertiesPrice}</span>
                                  </div>
                                  <p>${card.propertiesName}</p>
                                  <span><i class="ri-map-pin-2-line"></i> ${card.propertiesAddress}</span>
                                  <ul>
                                      <li><i class="ri-drag-move-2-fill"></i> ${card.propertiesArea}</li>
                                      <li><i class="ri-hotel-bed-line"></i> ${card.propertiesRoomsCount}</li>
                                      <li><i class="ri-drop-line"></i> ${card.propertiesBathroomsCount}</li>
                                      <li><i class="ri-car-line"></i> ${card.propertiesGarageCounts}</li>
                                  </ul>
                              </div>
                          </div>`;
    });
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = searchInput.value.toLowerCase();

  const filteredProperties = allProperties.filter(
    (property) =>
      property.propertiesName.toLowerCase().includes(searchText) ||
      property.propertiesAddress.toLowerCase().includes(searchText) ||
      property.propertiesTag.toLowerCase().includes(searchText)
  );

  renderAllPropertiesCards(filteredProperties);
});

getAPIdata(dataQuery.allproperties, renderAllPropertiesCards);

/* const dataAllPropertiesCards = document.querySelector(
  ".data-all-properties-cards"
);

function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

let dataQuery = {
  allproperties: `*[_type=="allproperties"]{_id, propertiesName, propertiesAddress, propertiesTag, propertiesPrice, propertiesArea, propertiesRoomsCount, propertiesBathroomsCount, propertiesGarageCounts, mainImage{asset->{url}}}`,
};

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}

const renderAllPropertiesCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataAllPropertiesCards.innerHTML += `<div class="col-xl-4 col-sm-12">
                              <div class="propertie_card">
                                  <div class="propertie_card__top">
                                      <div class="propertie_card__top__img">
                                          <!-- Динамическая генерация ссылки с параметром id -->
                                          <a href="productsinglepage.html?id=${card._id}">
                                            <img src="${card.mainImage.asset.url}">
                                          </a>
                                      </div>
                                  </div>
                              </div>
                              <div class="propertie_card__body">
                                  <div class="propertie_card__body__tag">
                                      <span class="properties_tag">${card.propertiesTag}</span>
                                      <span class="properties_price">${card.propertiesPrice}</span>
                                  </div>
                                  <p>${card.propertiesName}</p>
                                  <span><i class="ri-map-pin-2-line"></i> ${card.propertiesAddress}</span>
                                  <ul>
                                      <li><i class="ri-drag-move-2-fill"></i> ${card.propertiesArea}</li>
                                      <li><i class="ri-hotel-bed-line"></i> ${card.propertiesRoomsCount}</li>
                                      <li><i class="ri-drop-line"></i> ${card.propertiesBathroomsCount}</li>
                                      <li><i class="ri-car-line"></i> ${card.propertiesGarageCounts}</li>
                                  </ul>
                              </div>
                          </div>`;
    });
};

getAPIdata(dataQuery.allproperties, (data) => {
  renderAllPropertiesCards(data);
});
 */
