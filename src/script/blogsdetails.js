function getQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");
  console.log("Extracted Blog ID:", blogId);
  if (blogId) {
    return blogId;
  }
  console.error("Blog ID not found in URL");
  return null;
}

const SANITY_API_URL =
  "https://nqm8u0oz.api.sanity.io/v2023-05-03/data/query/production";

function dynamicFeaturedQuery(query) {
  return `${SANITY_API_URL}?query=${encodeURIComponent(query)}`;
}

async function getBlogData(blogId) {
  if (!blogId) {
    console.error("Blog ID is not provided.");
    return null;
  }

  try {
    const query = ` *[_type=="allarticles" && _id == "${blogId}"]{articlesName, articlesDate, articlesDuration, articlesImage{asset->{url}},}`;

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

async function displayBlog() {
  const blogId = getQueryParam();
  console.log("Blog ID: ", blogId);

  if (blogId) {
    const blogData = await getBlogData(blogId);

    if (blogData) {
      console.log("Blog Data: ", blogData);

      document.querySelector(".blog_title").innerHTML = `
               <h3>${blogData.articlesName}</h3>
                        <p>This design have it in named overall there, of as parts ourselves, coast little
                            mathematicians lay as know that in you help of get handout on he to tones would be we've
                            the
                            yet outfits century a the temple.</p>`;

      document.querySelector(".blog_date").innerHTML = `
                            <ul>
                            <li><i class="ri-calendar-2-line"></i> ${blogData.articlesDate}
                            </li>
                            <li><i class="ri-time-line"></i> ${blogData.articlesDuration}</li>
                        </ul>`;

      document.querySelector(".blog_img").innerHTML = `
      <img src="${blogData.articlesImage.asset.url}">`;
    } else {
      console.error("Blog data not found");
    }
  } else {
    console.error("Blog ID not found in URL");
  }
}

displayBlog();
