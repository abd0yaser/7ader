// Function to create and append elements
const createElement = (tagName, className, content = '') => {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = content;
    return element;
  };
  
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
  
  // Now you can use queryStringParams in your code
  ajaxRequest({
    SP: '[SP_GetServiceCardDetails]',
    SqlParams: {
      "@userID": queryStringParams.userId || 2,
      "@lang": "ar"
    }
  })
    .then(data => {
      // Rest of your code
    })
    .catch(error => console.log(error));
  
  
  // Function to make an Ajax request
  function ajaxRequest(options) {
    return fetch(
      options.host || 'https://www.7ader.net/GeneralApiV11/api/General/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers || {},
        },
        body: JSON.stringify({
          ConnectionStringName: options.ConnectionStringName || 'Teleware',
          StoredProcedureName: options.SP,
          SpParams: options.SqlParams,
          CacheKey: options.cacheKey || null,
          TablesNames: options.TablesNames || null,
          RenameTables: options.renameTables || false,
          IncludesUserID: options.IncludesUserID || false,
        }),
      }
    )
    .then(response => {
      if (response.ok === true && response.status === 200) {
        return response.json().then(res => {
          if (isNaN(res['error-code']) || res['error-code'] === 4) {
            return res;
          } else {
            throw new Error('API Error: ' + res['error-code']);
          }
        });
      } else {
        throw new Error('HTTP Error: ' + response.status);
      }
    });
  }
  
  // Function to calculate responsive font value
  function RFValue(x) {
    return RNRFValue(x);
  }
  
  // Function to convert hex color to rgba
  function hexToRgbA(hex, alpha) {
    if (hex.charAt(0) === '#') {
      hex = hex.substr(1);
    }
    var values = hex.split(''),
      r,
      g,
      b;
  
    if (hex.length === 2) {
      r = parseInt(values[0] + values[1], 16);
      g = r;
      b = r;
    } else if (hex.length === 3) {
      r = parseInt(values[0] + values[0], 16);
      g = parseInt(values[1] + values[1], 16);
      b = parseInt(values[2] + values[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(values[0] + values[1], 16);
      g = parseInt(values[2] + values[3], 16);
      b = parseInt(values[4] + values[5], 16);
    }
    return `rgba(${r}, ${g}, ${b},${alpha})`;
  }
  
  // Function to get colors object
  function Colors(alpha = 1) {
    return {
      App: {
        White: hexToRgbA("#FFF", alpha),
        Dark: hexToRgbA("#000", alpha),
        Primary: hexToRgbA("#E29B29", alpha),
        Secondary: hexToRgbA("#808080", alpha),
        Red: hexToRgbA("#D31C24", alpha),
        lightGrey: hexToRgbA('#A4A4A4', alpha),
        Gray: hexToRgbA('gray', alpha),
        Transparent: hexToRgbA('transparent', alpha),
        Green: hexToRgbA('#005D0F', alpha),
        TextInputBackground: hexToRgbA('#CCCCCC', alpha),
      },
      Text: {
        White: hexToRgbA("#FFF", alpha),
        Dark: hexToRgbA("#000", alpha),
        Primary: hexToRgbA("#E29B29", alpha),
        Secondary: hexToRgbA("#808080", alpha),
        Green: hexToRgbA("#399949", alpha),
        lightGrey: hexToRgbA('#ABABAB', alpha),
        Red: hexToRgbA("#FF2854", alpha),
      }
    };
  }
  
  // Resource object
  const resources = {
    en: {
      translation: {
        "firstScreen": {
          "firstApplication": "First direct communication application",
          "secondParagraph": "With your favorite star",
          "availableOn": "Available on",
          "reserveCall": "Book a call with me",
          "facebook": "Facebook",
          "insta": "Instagram",
          "youtube": "YouTube",
          "tiktok": "TikTok"
        }
      }
    },
    ar: {
      translation: {
        "firstScreen": {
          "firstApplication": "اول تطبيق للإتصال المباشر",
          "secondParagraph": "بنجمك المفضل",
          "availableOn": "متوفر علي",
          "reserveCall": "احجز مكالمة معي",
          "facebook": "فيسبوك",
          "insta": "انستجرام",
          "youtube": "يوتيوب",
          "tiktok": "تيك توك"
        }
      }
    }
  };
  const appContainer = document.getElementById('appContainer');

  // i18n object
  const i18n = {
    use: function (init) {
      this.init = init;
      return this;
    },
    init: function (options) {
      this.resources = options.resources;
      this.fallbackLng = options.fallbackLng || 'en';
      this.interpolation = options.interpolation || { escapeValue: false };
      return this;
    },
    t: function (key) {
      // Basic implementation for demonstration purposes
      const language = this.fallbackLng;
      return this.resources[language].translation[key] || key;
    }
  };
  
  i18n.use(init => ({ init })).init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
  
  // Use ajaxRequest to fetch data
  ajaxRequest({
    SP: '[SP_GetServiceCardDetails]',
    SqlParams: {
      "@userID": queryStringParams.userId || 2,
      "@lang": "ar"
    }
  })
    .then(data => {
      console.log(data);
      setUserData(data.table1[0]);
      setSocialMediaLinks(data.table2);
  
      // Create header after setting userData
      const header = createElement('div', 'header');
      header.innerHTML = `
        <div class="header-content">
          <div class="Navlogo">
            <img alt="service" src="${userData.serImg}" />
          </div>
          <div class="header-text">
            <p class="max-lines">${userData.serName}</p>
            <p class="max-lines">${userData.serTitle}</p>
          </div>
        </div>
        <div class="footer">
          <div>
            <p>${i18n.t('firstScreen.availableOn')}</p>
            <img src="./images/appStore.png" alt="" />
          </div>
          <div class="divider"></div>
          <img src="./images/logo.png" alt="" class="app-logo" />
          <div class="app-info">
            <p>${i18n.t('firstScreen.firstApplication')}</p>
            <p>${i18n.t('firstScreen.secondParagraph')}</p>
          </div>
        </div>
      `;
      appContainer.appendChild(header);
  
      // Buttons Container
      const buttonsContainer = createElement('div', 'buttons-container');
      const buttons = [
        { text: i18n.t('firstScreen.reserveCall'), bgColor: '#6F6F6F', icon: './images/logo.png' },
        { text: 'انستجرام', bgColor: '#FF5631', icon: './images/instagram.png' },
        { text: 'فيسبوك', bgColor: '#379EE9', icon: './images/facebook.png' },
      ];
  
      buttons.forEach(button => {
        const buttonElement = createElement('div', 'button', `
          <img alt="logo" src="${button.icon}" />
          <div class="button-content">${button.text}</div>
        `);
        buttonElement.style.backgroundColor = button.bgColor;
        buttonElement.onclick = () => generateDynamicLink();
        buttonsContainer.appendChild(buttonElement);
      });
  
      appContainer.appendChild(buttonsContainer);
  
      // Footer Text
      const footerText = createElement('div', 'footer-text');
      footerText.innerHTML = `
        <p>Copyrights @ 2021 TELEWARE</p>
        <p>All rights reserved</p>
      `;
      appContainer.appendChild(footerText);
    })
    .catch(error => console.log(error));
  
  // generate Dynamic Link function
  function generateDynamicLink() {
    const queryStringParams = parseQueryString(window.location.search);
    let storeLink;
    const clientId = queryStringParams.userId || 2;
  
    storeLink = `https://www.7aderapp.com/invitefriends?userID=${clientId}&screen=Home`;
  
    const obj = {
      dynamicLinkInfo: {
        domainUriPrefix: "https://app.7ader.net/app",
        link: storeLink,
        androidInfo: {
          androidPackageName: "com.hader",
        },
        iosInfo: {
          iosBundleId: 'org.reactjs.native.example.hader',
          iosIpadBundleId: 'org.reactjs.native.example.hader',
          iosAppStoreId: '1486013982',
        },
        navigationInfo: {},
        desktopInfo: {
          "desktopFallbackLink": storeLink,
        }
      },
      suffix: {
        "option": "SHORT"
      }
    };
  
    const url = "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyB-CXmpHTrk51SQGcf_PvJVihqveDPm95g";
  
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(obj)
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        window.open(data.shortLink, '_blank');
      })
      .catch(e => console.log(e));
  }
  