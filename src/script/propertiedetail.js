function getQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id");
  console.log("Extracted Property ID:", propertyId);
  if (propertyId) {
    return propertyId;
  }
  console.error("Property ID not found in URL");
  return null;
}

const SANITY_API_URL =
  "https://nqm8u0oz.api.sanity.io/v2023-05-03/data/query/production";

function dynamicFeaturedQuery(query) {
  return `${SANITY_API_URL}?query=${encodeURIComponent(query)}`;
}

async function getProductData(propertyId) {
  if (!propertyId) {
    console.error("Property ID is not provided.");
    return null;
  }

  try {
    const query = `*[_type=="allproperties" && _id == "${propertyId}"]{
        _id, // Добавлено поле _id
        propertiesName, 
        propertiesAddress, 
        propertiesTag, 
        propertiesPrice, 
        propertiesArea,
        propertiesRoomsCount, 
        propertiesBathroomsCount, 
        propertiesGarageCounts, 
        mainImage{asset->{url}}
      }`;

    console.log("Sanity Query:", query);
    const url = dynamicFeaturedQuery(query);
    console.log("Sanity API URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();
    console.log("Fetched Data:", data);
    return data.result[0] || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function displayProduct() {
  const propertyId = getQueryParam();
  console.log("Property ID: ", propertyId);

  if (propertyId) {
    const propertyData = await getProductData(propertyId);

    if (propertyData) {
      console.log("Property Data: ", propertyData);

      document.querySelector(".product_title").innerHTML = `
              <h3>${propertyData.propertiesName}</h3>
              <p><i class="ri-map-pin-2-line"></i> ${propertyData.propertiesAddress}</p>
            `;
      document.querySelector(".product_about__info").innerHTML = `
              <ul>
                <li><i class="ri-drag-move-2-fill"></i> ${propertyData.propertiesArea}</li>
                <li><i class="ri-hotel-bed-line"></i> ${propertyData.propertiesRoomsCount}</li>
                <li><i class="ri-drop-line"></i> ${propertyData.propertiesBathroomsCount}</li>
                <li><i class="ri-car-line"></i> ${propertyData.propertiesGarageCounts}</li>
              </ul>
            `;
      document.querySelector(
        ".product_img"
      ).innerHTML = `<img src="${propertyData.mainImage.asset.url}" />`;
      document.querySelector(
        ".product_price__title"
      ).innerHTML = `<p>Property for sale</p><h3>${propertyData.propertiesPrice}</h3>`;
    } else {
      console.error("Property data not found");
    }
  } else {
    console.error("Property ID not found in URL");
  }
}

displayProduct();
