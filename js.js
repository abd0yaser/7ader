// Function to make an AJAX request
function AjaxRequest(options) {
  return fetch(
    options.host || "https://www.7ader.net/GeneralApiV11/api/General/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify({
        ConnectionStringName: "Teleware",
        StoredProcedureName: options.SP,
        SpParams: options.SqlParams,
      }),
    }
  )
    .then((response) => {
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
    })
    .catch((error) => {
      console.error("AjaxRequest Error:", error);
      throw error; // Re-throw the error to be handled in the main logic
    });
}

// Function to generate dynamic link
async function generateDynamicLink() {
  let storeLink;
  const queryStringParams = queryString.parse(window.location.search);
  let clientId = queryStringParams.userId || 2;

  storeLink = `https://www.7aderapp.com/invitefriends?userID=${clientId}&screen=Home`;

  const obj = {
    dynamicLinkInfo: {
      domainUriPrefix: "https://app.7ader.net/app",
      link: storeLink,
      androidInfo: {
        androidPackageName: "com.hader",
      },
      iosInfo: {
        iosBundleId: "org.reactjs.native.example.hader",
        iosIpadBundleId: "org.reactjs.native.example.hader",
        iosAppStoreId: "1486013982",
      },
      navigationInfo: {},
      desktopInfo: {
        desktopFallbackLink: storeLink,
      },
    },
    suffix: {
      option: "SHORT",
    },
  };

  var Url =
    "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyB-CXmpHTrk51SQGcf_PvJVihqveDPm95g";

  try {
    const response = await fetch(Url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(obj),
    });

    const data = await response.json();
    console.log(data);
    window.open(data.shortLink, "_blank");
  } catch (e) {
    console.log(e);
  }
}

// Function to parse query string parameters
function getQueryStringParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split("&");
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split("=");
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return params;
}

// Function to make an AJAX request using the Fetch API
function ajaxRequest(options) {
  return fetch("your-api-endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      return data;
    });
}

// Your main logic
const queryStringParams = getQueryStringParams();

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
    const socialMediaLinks = data.table2;
    renderApp();
  })
  .catch((error) => console.log(error));
