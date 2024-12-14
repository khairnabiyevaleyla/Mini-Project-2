function dynamicFeaturedQuery(query) {
  let PROJECT_ID = "nqm8u0oz";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source);
}
//////querys
let dataFAQQuery = {
  faq: ` *[_type == "faq"]{question, answer}`,
};

//////querys

async function getAPIdata(featuredQuery, cb) {
  let url = dynamicFeaturedQuery(featuredQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}
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

getAPIdata(dataFAQQuery.faq, (data) => {
  renderFAQ(data);
  const faqAccordion = document.querySelectorAll(".faq_accordion__box");

  faqAccordion.forEach((box) => {
    box.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
});
