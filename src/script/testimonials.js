function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source);
}
//////querys
let dataTestimonialsQuery = {
  testimonials: ` *[_type=="testimonials"]{customerName, testimonialsTitle, testimonialsText, customerAddress, customerImage{asset->{url}},}`,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}

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

getAPIdata(dataTestimonialsQuery.testimonials, (data) => {
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
