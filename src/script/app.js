////sanity

let PROJECT_ID = "nqm8u0oz";
let DATASET = "production";
let featuredPropertiesQuery = `*[_type == "featured_properties"]`;

let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${featuredPropertiesQuery}`;

fetch(PROJECT_URL)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
