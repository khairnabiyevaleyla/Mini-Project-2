////sanity

let featuredPropertiesQuery = `*[_type == "featuredproperties"]`;

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
  featuredproperties: `*[_type=="featuredproperties"]{propertiesName, propertiesAddress,
  propertiesTag, propertiesPrice, propertiesArea,
  propertiesRoomsCount, propertiesBathroomsCount, propertiesGarageCounts, mainImage{asset->{url}},}
 `,
  propertycategories: ` *[_type=="propertycategories"]{categoriesName, categoriesText, mainImage{asset->{url}},}`,
  statistics: ` *[_type=="statistics"]{statisticsTitle, statisticsNumber, statisticsText,}`,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}
////// featured_properties
const dataCards = document.querySelector(".data-featured-cards");
const renderFeaturedCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataCards.innerHTML += `<div class="col-xl-4 col-md-6 col-sm-12">
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

getAPIdata(dataQuery.featuredproperties, (data) => {
  renderFeaturedCards(data);
});

//////featured_properties

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

getAPIdata(dataQuery.propertycategories, (data) => {
  renderCategoriesCards(data);
});

///////property_categories

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

getAPIdata(dataQuery.statistics, (data) => {
  renderStatistics(data);
});

///////statistics

//////scoll
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".our_process_img");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  images.forEach((img) => observer.observe(img));
});

//////scoll
