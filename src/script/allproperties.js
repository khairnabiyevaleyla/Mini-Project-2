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
  allproperties: `*[_type=="allproperties"]{propertiesName, propertiesAddress,
  propertiesTag, propertiesPrice, propertiesArea,
  propertiesRoomsCount, propertiesBathroomsCount, propertiesGarageCounts, mainImage{asset->{url}},}
 `,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}
//////all properties

const dataAllPropertiesCards = document.querySelector(
  ".data-all-properties-cards"
);
const renderAllPropertiesCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataAllPropertiesCards.innerHTML += `<div class="col-xl-4 col-sm-12">
                              <div class="propertie_card">
                                  <div class="propertie_card__top">
                                      <div class="propertie_card__top__img">
                                          <a href="#"> <img
                                                  src="${card.mainImage.asset.url}"></a>
  
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

//////all properties
