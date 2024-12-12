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
  agents: ` *[_type=="agents"]{agentName, agentPosition, agentImage{asset->{url}},}`,
  testimonials: ` *[_type=="testimonials"]{customerName, testimonialsTitle, testimonialsText, customerAddress, customerImage{asset->{url}},}`,
  articles: ` *[_type=="articles"]{articlesName, articlesDate, articlesDuration, articlesImage{asset->{url}},}`,
  faq: ` *[_type == "faq"]{question, answer}`,
  agentspage: ` *[_type=="agentspage"]{agentName, agentPosition, agentImage{asset->{url}},}`,
  services: ` *[_type=="services"]{icon, title, text,}`,
  allarticles: ` *[_type=="allarticles"]{articlesName, articlesDate, articlesDuration, articlesImage{asset->{url}},}`,
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

getAPIdata(dataQuery.agents, (data) => {
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

/////testimonials

const dataTestimonialsCards = document.querySelector(
  ".data_testimonials_cards"
);

const renderTestimonialsCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataTestimonialsCards.innerHTML += ` <div class="swiper-slide">
                                <div class="testimonial__card">
                                    <div class="testimonial__card__content">
                                        <h2>"${card.testimonialsTitle}"
                                        </h2>
                                        <p>${card.testimonialsText}
                                        </p>
                                        <h3>${card.customerName}</h3>
                                        <span>San Jose, South Dakota</span>
                                    </div>
                                    <div class="testimonial__card__img">
                                        <img
                                            src="${card.customerImage.asset.url}">
                                    </div>
                                </div>
                            </div>`;
    });
};

getAPIdata(dataQuery.testimonials, (data) => {
  renderTestimonialsCards(data);
  new Swiper(".testimonials_cards", {
    slidesPerView: 1,
    spaceBetween: 200,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });
});
/////testimonials

///////articles
const dataArticlesCards = document.querySelector(".data-articles-cards");

const renderArticlesCards = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataArticlesCards.innerHTML += ` <div class="col-xl-4 col-sm-12 d-flex">
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
                                        <a href="#"><span>Read more</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    });
};

getAPIdata(dataQuery.articles, (data) => {
  renderArticlesCards(data);
});
///////articles

////faq

const dataFAQ = document.querySelector(".data-faq");

const renderFAQ = (cards) => {
  cards &&
    cards.forEach((card) => {
      dataFAQ.innerHTML += ` 
                      <div class="faq_accordion__box">
                                <div class="faq_accordion__box__question">
                                   ${card.question}
                                </div>
                                <div class="faq_accordion__box__answer">
                                    <p>${card.answer}</p>
                                </div>
                            </div>  `;
    });
};

getAPIdata(dataQuery.faq, (data) => {
  renderFAQ(data);
  const faqAccordion = document.querySelectorAll(".faq_accordion__box");

  faqAccordion.forEach((box) => {
    box.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
});

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

getAPIdata(dataQuery.agentspage, (data) => {
  renderAgentsPageCards(data);
});

////agentpage

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
                                        <a href="#"><span>Read more</span></a>
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
///////all articles
