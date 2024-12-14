function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source);
}
//////querys
let dataPropertyQuery = {
  propertycategories: ` *[_type=="propertycategories"]{categoriesName, categoriesText, mainImage{asset->{url}},}`,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}

///////property_categories

const dataCategoriesCard = document.querySelector(".data-categories-cards");

const renderCategoriesCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataCategoriesCard.innerHTML += ` <div class="col-xl-4">
                        <div class="property_categories__card">
                            <div class="property_categories__card__top">
                                <div class="property_categories__card__top__img">
                                    <img
                                        src="${card.mainImage.asset.url}">
                                </div>
                            </div>
                            <div class="property_categories__card__body">
                                <div class="property_categories__card__body__text">
                                    <h4>${card.categoriesName}</h4>
                                    <p>${card.categoriesText}</p>
                                </div>
                                <div class="property_categories__card__body__btn">
                                    <div class="explore_btn">
                                        <a href="#"><span>Explore now</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    });
};

getAPIdata(dataPropertyQuery.propertycategories, (data) => {
  renderCategoriesCards(data);
});

///////property_categories
