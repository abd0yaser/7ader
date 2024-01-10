document.addEventListener("DOMContentLoaded", function () {
  // Function to create and append elements
  const createElement = (tagName, className, content = "") => {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = content;
    return element;
  };
  const outerContainer = document.getElementById("outer-container");

  // Create appContainer dynamically
  const appContainer = createElement("div", "app-container");
  document.body.appendChild(appContainer);

  if (!appContainer) {
    console.error("App container not found.");
    return;
  }

  // Function to parse query string
  function parseQueryString(query) {
    return query
      ? JSON.parse(
          '{"' +
            decodeURI(query.substring(1))
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        )
      : {};
  }

  // Get query parameters
  const queryStringParams = parseQueryString(window.location.search);

  // Function to make an Ajax request
  function ajaxRequest(options) {
    return fetch(
      options.host || "https://www.7ader.net/GeneralApiV11/api/General/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        body: JSON.stringify({
          ConnectionStringName: options.ConnectionStringName || "Teleware",
          StoredProcedureName: options.SP,
          SpParams: options.SqlParams,
          CacheKey: options.cacheKey || null,
          TablesNames: options.TablesNames || null,
          RenameTables: options.renameTables || false,
          IncludesUserID: options.IncludesUserID || false,
        }),
      }
    ).then((response) => {
      if (response.ok === true && response.status === 200) {
        return response.json().then((res) => {
          if (isNaN(res["error-code"]) || res["error-code"] === 4) {
            return res;
          } else {
            throw new Error("API Error: " + res["error-code"]);
          }
        });
      } else {
        throw new Error("HTTP Error: " + response.status);
      }
    });
  }

  // Function to set social media links
  function setSocialMediaLinks(links) {
    const socialMediaContainer = document.createElement("div");
    socialMediaContainer.className = "social-media-container";

    // Add the static button
    const staticButtonContainer = createElement(
      "div",
      "button-container button-call"
    );
    const staticLogoImage = createElement("img", "logo-image");
    const staticButtonText = createElement("div", "button-text");

    staticLogoImage.src = "./images/7ader new vision 2.png";
    staticLogoImage.alt = "logo";
    staticButtonText.innerText = "احجز مكالمة معي";

    staticButtonContainer.appendChild(staticLogoImage);
    staticButtonContainer.appendChild(staticButtonText);

    staticButtonContainer.addEventListener("click", () => {
      console.log("Static button clicked");
    });

    socialMediaContainer.appendChild(staticButtonContainer);

    links.forEach((linkData) => {
      const socialMediaButton = createElement(
        "div",
        "button-container button-5"
      );
      const logoImage = createElement("img", "logo-image");
      const buttonText = createElement("div", "button-text");

      socialMediaButton.id = "button-" + linkData.TypeID;
      logoImage.src = `/images/${linkData.TypeID}.png`;
      logoImage.alt = "logo";
      buttonText.innerText = linkData.Type;

      socialMediaButton.appendChild(logoImage);
      socialMediaButton.appendChild(buttonText);

      socialMediaButton.addEventListener("click", () =>
        openSocialMediaLink(linkData.Link)
      );
      socialMediaContainer.appendChild(socialMediaButton);
    });

    appContainer.appendChild(socialMediaContainer);
  }

  // Function to open social media link in a new tab
  function openSocialMediaLink(link) {
    window.open(link, "_blank");
  }

  // Use ajaxRequest to fetch data
  ajaxRequest({
    SP: "[SP_GetServiceCardDetails]",
    SqlParams: {
      "@userID": queryStringParams.userId || 2,
      "@lang": "ar",
    },
  })
    .then((data) => {
      console.log(data);
      const userData = data.table1[0];
      const serName = userData.serName;
      setSocialMediaLinks(data.table2);
    })
    .catch((error) => console.error(error));
});
