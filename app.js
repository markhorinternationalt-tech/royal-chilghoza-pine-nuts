const WHATSAPP_NUMBER = "923336665688";
const state = {
  lang: sessionStorage.getItem("royalLanguage") || "en",
  gateway: null,
  hub: null,
  admin: sessionStorage.getItem("royalAdmin") === "1",
  token: sessionStorage.getItem("royalAdminToken") || "",
};
const languages = ["en", "zh", "ar", "ps", "ru"];
const hubData = {
  en: {
    trade: [
      [
        "Global Markets for Chilghoza Pine Nuts",
        "USA â€¢ China â€¢ Central Asia â€¢ Middle East",
      ],
      [
        "USA Market & Buyers for Chilghoza Pine Nuts",
        "Buyers â€¢ requirements â€¢ opportunities",
      ],
      [
        "China Market & Buyers for Chilghoza Pine Nuts",
        "Trade desk â€¢ buyers â€¢ market intelligence",
      ],
      [
        "Export & Logistics for Chilghoza Pine Nuts",
        "Packaging â€¢ documentation â€¢ shipping â€¢ customs",
      ],
      [
        "Product & Quality Standards for Chilghoza Pine Nuts",
        "Kernels â€¢ in-shell â€¢ grades â€¢ specifications",
      ],
      [
        "Supply Chain & Traceability of Chilghoza Pine Nuts",
        "Forest â†’ collector â†’ processing â†’ packing â†’ export",
      ],
      [
        "Geographical Indication (GI) of Chilghoza Pine Nuts",
        "Origin â€¢ identity â€¢ protection",
      ],
      [
        "Organic Chemistry & Natural Quality of Chilghoza Pine Nuts",
        "Natural composition â€¢ quality â€¢ food science",
      ],
      [
        "Processing, Packaging & Value Addition for Chilghoza Pine Nuts",
        "Drying â€¢ roasting â€¢ grading â€¢ storage",
      ],
      [
        "Sustainable & Ethical Trade of Chilghoza Pine Nuts",
        "Communities â€¢ forests â€¢ responsible trade",
      ],
    ],
    research: [
      [
        "Geographical Origin & GI Research on Chilghoza Pine Nuts",
        "Origin â€¢ geography â€¢ GI research",
      ],
      ["Chilghoza Pine Nuts Biology & Botany", "Species â€¢ biology â€¢ botany"],
      [
        "Nutrition Value & Natural Composition of Chilghoza Pine Nuts",
        "Nutrition â€¢ composition â€¢ natural quality",
      ],
      [
        "Chilghoza Pine Nuts Forests & Ecology",
        "Forests â€¢ ecology â€¢ ecosystems",
      ],
      [
        "Biodiversity & Wildlife in Chilghoza Pine Nuts Forests",
        "Wildlife â€¢ biodiversity â€¢ habitats",
      ],
      [
        "Climate & Global Green Environment for Chilghoza Pine Nuts",
        "Climate â€¢ environment â€¢ resilience",
      ],
      [
        "Forest Conservation & Restoration for Chilghoza Pine Nuts",
        "Conservation â€¢ restoration â€¢ stewardship",
      ],
      [
        "Supply Chain & Livelihoods of Chilghoza Pine Nuts Communities",
        "Communities â€¢ livelihoods â€¢ value chain",
      ],
      [
        "Sustainable Harvesting & Awareness for Chilghoza Pine Nuts",
        "Harvesting â€¢ awareness â€¢ best practice",
      ],
      [
        "Research, Policy & Partnerships for Chilghoza Pine Nuts",
        "Research â€¢ policy â€¢ partnerships",
      ],
    ],
  },
  zh: {
    trade: [
      ["Chilghoza Pine Nuts å…¨çƒå¸‚åœº", "ç¾Žå›½ â€¢ ä¸­å›½ â€¢ ä¸­äºš â€¢ ä¸­ä¸œ"],
      ["Chilghoza Pine Nuts ç¾Žå›½å¸‚åœºä¸Žä¹°å®¶", "ä¹°å®¶ â€¢ è¦æ±‚ â€¢ æœºä¼š"],
      ["Chilghoza Pine Nuts ä¸­å›½å¸‚åœºä¸Žä¹°å®¶", "è´¸æ˜“å¹³å° â€¢ ä¹°å®¶ â€¢ å¸‚åœºä¿¡æ¯"],
      ["Chilghoza Pine Nuts å‡ºå£ä¸Žç‰©æµ", "åŒ…è£… â€¢ æ–‡ä»¶ â€¢ è¿è¾“ â€¢ æµ·å…³"],
      ["Chilghoza Pine Nuts äº§å“ä¸Žè´¨é‡æ ‡å‡†", "æžœä» â€¢ å¸¦å£³ â€¢ ç­‰çº§ â€¢ è§„æ ¼"],
      [
        "Chilghoza Pine Nuts ä¾›åº”é“¾ä¸Žå¯è¿½æº¯æ€§",
        "æ£®æž— â†’ é‡‡é›†è€… â†’ åŠ å·¥ â†’ åŒ…è£… â†’ å‡ºå£",
      ],
      ["Chilghoza Pine Nuts åœ°ç†æ ‡å¿—ï¼ˆGIï¼‰", "åŽŸäº§åœ° â€¢ èº«ä»½ â€¢ ä¿æŠ¤"],
      ["Chilghoza Pine Nuts æœ‰æœºåŒ–å­¦ä¸Žå¤©ç„¶å“è´¨", "å¤©ç„¶æˆåˆ† â€¢ å“è´¨ â€¢ é£Ÿå“ç§‘å­¦"],
      ["Chilghoza Pine Nuts åŠ å·¥ã€åŒ…è£…ä¸Žå¢žå€¼", "å¹²ç‡¥ â€¢ çƒ˜ç„™ â€¢ åˆ†çº§ â€¢ å‚¨å­˜"],
      ["Chilghoza Pine Nuts å¯æŒç»­ä¸Žé“å¾·è´¸æ˜“", "ç¤¾åŒº â€¢ æ£®æž— â€¢ è´Ÿè´£ä»»è´¸æ˜“"],
    ],
    research: [
      ["Chilghoza Pine Nuts åœ°ç†åŽŸäº§åœ°ä¸ŽGIç ”ç©¶", "åŽŸäº§åœ° â€¢ åœ°ç† â€¢ GIç ”ç©¶"],
      ["Chilghoza Pine Nuts ç”Ÿç‰©å­¦ä¸Žæ¤ç‰©å­¦", "ç‰©ç§ â€¢ ç”Ÿç‰©å­¦ â€¢ æ¤ç‰©å­¦"],
      ["Chilghoza Pine Nuts è¥å…»ä»·å€¼ä¸Žå¤©ç„¶æˆåˆ†", "è¥å…» â€¢ æˆåˆ† â€¢ å¤©ç„¶å“è´¨"],
      ["Chilghoza Pine Nuts æ£®æž—ä¸Žç”Ÿæ€", "æ£®æž— â€¢ ç”Ÿæ€ â€¢ ç”Ÿæ€ç³»ç»Ÿ"],
      [
        "Chilghoza Pine Nuts æ£®æž—ä¸­çš„ç”Ÿç‰©å¤šæ ·æ€§ä¸Žé‡Žç”ŸåŠ¨ç‰©",
        "é‡Žç”ŸåŠ¨ç‰© â€¢ ç”Ÿç‰©å¤šæ ·æ€§ â€¢ æ –æ¯åœ°",
      ],
      ["Chilghoza Pine Nuts æ°”å€™ä¸Žå…¨çƒç»¿è‰²çŽ¯å¢ƒ", "æ°”å€™ â€¢ çŽ¯å¢ƒ â€¢ éŸ§æ€§"],
      ["Chilghoza Pine Nuts æ£®æž—ä¿æŠ¤ä¸Žæ¢å¤", "ä¿æŠ¤ â€¢ æ¢å¤ â€¢ ç®¡ç†"],
      ["Chilghoza Pine Nuts ç¤¾åŒºçš„ä¾›åº”é“¾ä¸Žç”Ÿè®¡", "ç¤¾åŒº â€¢ ç”Ÿè®¡ â€¢ ä»·å€¼é“¾"],
      ["Chilghoza Pine Nuts å¯æŒç»­é‡‡æ”¶ä¸Žæ„è¯†", "é‡‡æ”¶ â€¢ æ„è¯† â€¢ æœ€ä½³å®žè·µ"],
      ["Chilghoza Pine Nuts ç ”ç©¶ã€æ”¿ç­–ä¸Žä¼™ä¼´å…³ç³»", "ç ”ç©¶ â€¢ æ”¿ç­– â€¢ ä¼™ä¼´å…³ç³»"],
    ],
  },
  ar: {
    trade: [
      [
        "Ø§Ù„Ø£Ø³ÙˆØ§Ù‚ Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠØ© Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„ÙˆÙ„Ø§ÙŠØ§Øª Ø§Ù„Ù…ØªØ­Ø¯Ø© â€¢ Ø§Ù„ØµÙŠÙ† â€¢ Ø¢Ø³ÙŠØ§ Ø§Ù„ÙˆØ³Ø·Ù‰ â€¢ Ø§Ù„Ø´Ø±Ù‚ Ø§Ù„Ø£ÙˆØ³Ø·",
      ],
      [
        "Ø³ÙˆÙ‚ ÙˆÙ…Ø´ØªØ±Ùˆ Chilghoza Pine Nuts ÙÙŠ Ø§Ù„ÙˆÙ„Ø§ÙŠØ§Øª Ø§Ù„Ù…ØªØ­Ø¯Ø©",
        "Ø§Ù„Ù…Ø´ØªØ±ÙˆÙ† â€¢ Ø§Ù„Ù…ØªØ·Ù„Ø¨Ø§Øª â€¢ Ø§Ù„ÙØ±Øµ",
      ],
      [
        "Ø³ÙˆÙ‚ ÙˆÙ…Ø´ØªØ±Ùˆ Chilghoza Pine Nuts ÙÙŠ Ø§Ù„ØµÙŠÙ†",
        "Ù…ÙƒØªØ¨ Ø§Ù„ØªØ¬Ø§Ø±Ø© â€¢ Ø§Ù„Ù…Ø´ØªØ±ÙˆÙ† â€¢ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø³ÙˆÙ‚",
      ],
      [
        "ØªØµØ¯ÙŠØ± ÙˆÙ„ÙˆØ¬Ø³ØªÙŠØ§Øª Chilghoza Pine Nuts",
        "Ø§Ù„ØªØ¹Ø¨Ø¦Ø© â€¢ Ø§Ù„ÙˆØ«Ø§Ø¦Ù‚ â€¢ Ø§Ù„Ø´Ø­Ù† â€¢ Ø§Ù„Ø¬Ù…Ø§Ø±Ùƒ",
      ],
      [
        "Ù…Ø¹Ø§ÙŠÙŠØ± Ø§Ù„Ù…Ù†ØªØ¬ ÙˆØ§Ù„Ø¬ÙˆØ¯Ø© Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„Ù„Ø¨ â€¢ Ø¨Ø§Ù„Ù‚Ø´Ø±Ø© â€¢ Ø§Ù„Ø¯Ø±Ø¬Ø§Øª â€¢ Ø§Ù„Ù…ÙˆØ§ØµÙØ§Øª",
      ],
      [
        "Ø³Ù„Ø³Ù„Ø© Ø§Ù„Ø¥Ù…Ø¯Ø§Ø¯ ÙˆØªØªØ¨Ø¹ Chilghoza Pine Nuts",
        "Ø§Ù„ØºØ§Ø¨Ø© â† Ø§Ù„Ø¬Ø§Ù…Ø¹ â† Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© â† Ø§Ù„ØªØ¹Ø¨Ø¦Ø© â† Ø§Ù„ØªØµØ¯ÙŠØ±",
      ],
      [
        "Ø§Ù„Ù…Ø¤Ø´Ø± Ø§Ù„Ø¬ØºØ±Ø§ÙÙŠ (GI) Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„Ù…Ù†Ø´Ø£ â€¢ Ø§Ù„Ù‡ÙˆÙŠØ© â€¢ Ø§Ù„Ø­Ù…Ø§ÙŠØ©",
      ],
      [
        "Ø§Ù„ÙƒÙŠÙ…ÙŠØ§Ø¡ Ø§Ù„Ø¹Ø¶ÙˆÙŠØ© ÙˆØ§Ù„Ø¬ÙˆØ¯Ø© Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠØ© Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„ØªØ±ÙƒÙŠØ¨ Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠ â€¢ Ø§Ù„Ø¬ÙˆØ¯Ø© â€¢ Ø¹Ù„ÙˆÙ… Ø§Ù„ØºØ°Ø§Ø¡",
      ],
      [
        "Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© ÙˆØ§Ù„ØªØ¹Ø¨Ø¦Ø© ÙˆØ§Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„Ù…Ø¶Ø§ÙØ© Ù„Ù€ Chilghoza Pine Nuts",
        "ØªØ¬ÙÙŠÙ â€¢ ØªØ­Ù…ÙŠØµ â€¢ ÙØ±Ø² â€¢ ØªØ®Ø²ÙŠÙ†",
      ],
      [
        "Ø§Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ù…Ø³ØªØ¯Ø§Ù…Ø© ÙˆØ§Ù„Ø£Ø®Ù„Ø§Ù‚ÙŠØ© Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„Ù…Ø¬ØªÙ…Ø¹Ø§Øª â€¢ Ø§Ù„ØºØ§Ø¨Ø§Øª â€¢ Ø§Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„Ø©",
      ],
    ],
    research: [
      [
        "Ø¨Ø­Ø« Ø§Ù„Ù…Ù†Ø´Ø£ Ø§Ù„Ø¬ØºØ±Ø§ÙÙŠ ÙˆGI Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„Ù…Ù†Ø´Ø£ â€¢ Ø§Ù„Ø¬ØºØ±Ø§ÙÙŠØ§ â€¢ Ø¨Ø­Ø« GI",
      ],
      [
        "Ø¨ÙŠÙˆÙ„ÙˆØ¬ÙŠØ§ ÙˆÙ†Ø¨Ø§ØªØ§Øª Chilghoza Pine Nuts",
        "Ø§Ù„Ø£Ù†ÙˆØ§Ø¹ â€¢ Ø§Ù„Ø¨ÙŠÙˆÙ„ÙˆØ¬ÙŠØ§ â€¢ Ø¹Ù„Ù… Ø§Ù„Ù†Ø¨Ø§Øª",
      ],
      [
        "Ø§Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„ØºØ°Ø§Ø¦ÙŠØ© ÙˆØ§Ù„ØªØ±ÙƒÙŠØ¨ Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠ Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„ØªØºØ°ÙŠØ© â€¢ Ø§Ù„ØªØ±ÙƒÙŠØ¨ â€¢ Ø§Ù„Ø¬ÙˆØ¯Ø© Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠØ©",
      ],
      ["ØºØ§Ø¨Ø§Øª ÙˆØ¨ÙŠØ¦Ø© Chilghoza Pine Nuts", "Ø§Ù„ØºØ§Ø¨Ø§Øª â€¢ Ø§Ù„Ø¨ÙŠØ¦Ø© â€¢ Ø§Ù„Ù†Ø¸Ù… Ø§Ù„Ø¨ÙŠØ¦ÙŠØ©"],
      [
        "Ø§Ù„ØªÙ†ÙˆØ¹ Ø§Ù„Ø­ÙŠÙˆÙŠ ÙˆØ§Ù„Ø­ÙŠØ§Ø© Ø§Ù„Ø¨Ø±ÙŠØ© ÙÙŠ ØºØ§Ø¨Ø§Øª Chilghoza Pine Nuts",
        "Ø§Ù„Ø­ÙŠØ§Ø© Ø§Ù„Ø¨Ø±ÙŠØ© â€¢ Ø§Ù„ØªÙ†ÙˆØ¹ Ø§Ù„Ø­ÙŠÙˆÙŠ â€¢ Ø§Ù„Ù…ÙˆØ§Ø¦Ù„",
      ],
      [
        "Ø§Ù„Ù…Ù†Ø§Ø® ÙˆØ§Ù„Ø¨ÙŠØ¦Ø© Ø§Ù„Ø®Ø¶Ø±Ø§Ø¡ Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠØ© Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„Ù…Ù†Ø§Ø® â€¢ Ø§Ù„Ø¨ÙŠØ¦Ø© â€¢ Ø§Ù„Ù…Ø±ÙˆÙ†Ø©",
      ],
      ["Ø­ÙØ¸ ÙˆØ§Ø³ØªØ¹Ø§Ø¯Ø© ØºØ§Ø¨Ø§Øª Chilghoza Pine Nuts", "Ø§Ù„Ø­ÙØ¸ â€¢ Ø§Ù„Ø§Ø³ØªØ¹Ø§Ø¯Ø© â€¢ Ø§Ù„Ø±Ø¹Ø§ÙŠØ©"],
      [
        "Ø³Ù„Ø³Ù„Ø© Ø§Ù„Ø¥Ù…Ø¯Ø§Ø¯ ÙˆØ³Ø¨Ù„ Ø§Ù„Ø¹ÙŠØ´ Ù„Ù…Ø¬ØªÙ…Ø¹Ø§Øª Chilghoza Pine Nuts",
        "Ø§Ù„Ù…Ø¬ØªÙ…Ø¹Ø§Øª â€¢ Ø³Ø¨Ù„ Ø§Ù„Ø¹ÙŠØ´ â€¢ Ø³Ù„Ø³Ù„Ø© Ø§Ù„Ù‚ÙŠÙ…Ø©",
      ],
      [
        "Ø§Ù„Ø­ØµØ§Ø¯ Ø§Ù„Ù…Ø³ØªØ¯Ø§Ù… ÙˆØ§Ù„ØªÙˆØ¹ÙŠØ© Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„Ø­ØµØ§Ø¯ â€¢ Ø§Ù„ØªÙˆØ¹ÙŠØ© â€¢ Ø£ÙØ¶Ù„ Ø§Ù„Ù…Ù…Ø§Ø±Ø³Ø§Øª",
      ],
      [
        "Ø§Ù„Ø¨Ø­Ø« ÙˆØ§Ù„Ø³ÙŠØ§Ø³Ø§Øª ÙˆØ§Ù„Ø´Ø±Ø§ÙƒØ§Øª Ù„Ù€ Chilghoza Pine Nuts",
        "Ø§Ù„Ø¨Ø­Ø« â€¢ Ø§Ù„Ø³ÙŠØ§Ø³Ø§Øª â€¢ Ø§Ù„Ø´Ø±Ø§ÙƒØ§Øª",
      ],
    ],
  },
  ps: {
    trade: [
      [
        "Ø¯ Chilghoza Pine Nuts Ù†Ú“ÛŒÙˆØ§Ù„ Ø¨Ø§Ø²Ø§Ø±ÙˆÙ†Ù‡",
        "Ø§Ù…Ø±ÛŒÚ©Ø§ â€¢ Ú†ÛŒÙ† â€¢ Ù…Ù†ÚÙ†Û Ø§Ø³ÛŒØ§ â€¢ Ù…Ù†ÚÙ†ÛŒ Ø®ØªÛŒÚ",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ø¯ Ø§Ù…Ø±ÛŒÚ©Ø§ Ø¨Ø§Ø²Ø§Ø± Ø§Ùˆ Ù¾ÛØ±ÙˆØ¯ÙˆÙ†Ú©ÙŠ",
        "Ù¾ÛØ±ÙˆØ¯ÙˆÙ†Ú©ÙŠ â€¢ Ø§Ú“ØªÛŒØ§ÙˆÛ â€¢ ÙØ±ØµØªÙˆÙ†Ù‡",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ø¯ Ú†ÛŒÙ† Ø¨Ø§Ø²Ø§Ø± Ø§Ùˆ Ù¾ÛØ±ÙˆØ¯ÙˆÙ†Ú©ÙŠ",
        "Ø³ÙˆØ¯Ø§Ú«Ø±ÛŒØ² Ù…ÛŒØ² â€¢ Ù¾ÛØ±ÙˆØ¯ÙˆÙ†Ú©ÙŠ â€¢ Ø¯ Ø¨Ø§Ø²Ø§Ø± Ù…Ø¹Ù„ÙˆÙ…Ø§Øª",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts ØµØ§Ø¯Ø±Ø§Øª Ø§Ùˆ Ù„ÙˆÚ˜Ø³ØªÛŒÚ©",
        "Ø¨Ø³ØªÙ‡ Ø¨Ù†Ø¯ÙŠ â€¢ Ø§Ø³Ù†Ø§Ø¯ â€¢ Ù„ÛÚ–Ø¯ â€¢ Ú«Ù…Ø±Ú©",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ø¯ Ù…Ø­ØµÙˆÙ„ Ø§Ùˆ Ú©ÛŒÙÛŒØª Ù…Ø¹ÛŒØ§Ø±ÙˆÙ†Ù‡",
        "Ù…ØºØ² â€¢ Ù„Ù‡ Ù¾ÙˆØ³ØªÚ©ÙŠ Ø³Ø±Ù‡ â€¢ Ø¯Ø±Ø¬Û â€¢ Ù…Ø´Ø®ØµØ§Øª",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ø§Ú©Ù…Ø§Ù„Ø§ØªÙŠ ÚÙ†ÚÛŒØ± Ø§Ùˆ ØªØ¹Ù‚ÛŒØ¨",
        "ÚÙ†Ú«Ù„ â†’ Ø±Ø§Ù¼ÙˆÙ„ÙˆÙˆÙ†Ú©ÛŒ â†’ Ù¾Ø±ÙˆØ³Ø³ â†’ Ø¨Ø³ØªÙ‡ Ø¨Ù†Ø¯ÙŠ â†’ ØµØ§Ø¯Ø±Ø§Øª",
      ],
      ["Ø¯ Chilghoza Pine Nuts Ø¬ØºØ±Ø§ÙÛŒØ§ÛŒÙŠ Ù†ÚšÙ‡ (GI)", "Ø§ØµÙ„ÙŠØª â€¢ Ù¾ÛÚ˜Ù†Ø¯Ù†Ù‡ â€¢ Ø³Ø§ØªÙ†Ù‡"],
      [
        "Ø¯ Chilghoza Pine Nuts Ø¹Ø¶ÙˆÙŠ Ú©ÛŒÙ…ÛŒØ§ Ø§Ùˆ Ø·Ø¨ÛŒØ¹ÙŠ Ú©ÛŒÙÛŒØª",
        "Ø·Ø¨ÛŒØ¹ÙŠ Ø¬ÙˆÚ“ÚšØª â€¢ Ú©ÛŒÙÛŒØª â€¢ Ø¯ Ø®ÙˆÚ“Ùˆ Ø³Ø§ÛŒÙ†Ø³",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ù¾Ø±ÙˆØ³Ø³ØŒ Ø¨Ø³ØªÙ‡ Ø¨Ù†Ø¯ÙŠ Ø§Ùˆ Ø§Ø±Ø²ÚšØª Ø²ÛŒØ§ØªÙˆÙ†Ù‡",
        "ÙˆÚ†ÙˆÙ„ â€¢ Ù¾Ø®ÙˆÙ„ â€¢ Ø¯Ø±Ø¬Ù‡ Ø¨Ù†Ø¯ÙŠ â€¢ Ø²ÛØ±Ù…Ù‡",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ø¯ÙˆØ§Ù…Ø¯Ø§Ø±Ù‡ Ø§Ùˆ Ø§Ø®Ù„Ø§Ù‚ÙŠ Ø³ÙˆØ¯Ø§Ú«Ø±ÙŠ",
        "Ù¼ÙˆÙ„Ù†Û â€¢ ÚÙ†Ú«Ù„ÙˆÙ†Ù‡ â€¢ Ù…Ø³Ø¤Ù„Ù‡ Ø³ÙˆØ¯Ø§Ú«Ø±ÙŠ",
      ],
    ],
    research: [
      [
        "Ø¯ Chilghoza Pine Nuts Ø¬ØºØ±Ø§ÙÛŒØ§ÛŒÙŠ Ø§ØµÙ„ÙŠØª Ø§Ùˆ GI Ú…ÛÚ“Ù†Ù‡",
        "Ø§ØµÙ„ÙŠØª â€¢ Ø¬ØºØ±Ø§ÙÛŒÙ‡ â€¢ GI Ú…ÛÚ“Ù†Ù‡",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ø¨ÛŒÙˆÙ„ÙˆÚ˜ÙŠ Ø§Ùˆ Ø¨ÙˆÙ¼Ù¾ÙˆÙ‡Ù†Ù‡",
        "Ú‰ÙˆÙ„ÙˆÙ†Ù‡ â€¢ Ø¨ÛŒÙˆÙ„ÙˆÚ˜ÙŠ â€¢ Ø¨ÙˆÙ¼Ù¾ÙˆÙ‡Ù†Ù‡",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts ØºØ°Ø§ÛŒÙŠ Ø§Ø±Ø²ÚšØª Ø§Ùˆ Ø·Ø¨ÛŒØ¹ÙŠ Ø¬ÙˆÚ“ÚšØª",
        "ØªØºØ°ÛŒÙ‡ â€¢ Ø¬ÙˆÚ“ÚšØª â€¢ Ø·Ø¨ÛŒØ¹ÙŠ Ú©ÛŒÙÛŒØª",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts ÚÙ†Ú«Ù„ÙˆÙ†Ù‡ Ø§Ùˆ Ø§ÛŒÚ©ÙˆÙ„ÙˆÚ˜ÙŠ",
        "ÚÙ†Ú«Ù„ÙˆÙ†Ù‡ â€¢ Ø§ÛŒÚ©ÙˆÙ„ÙˆÚ˜ÙŠ â€¢ Ø§ÛŒÚ©ÙˆØ³ÛŒØ³ØªÙ…",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts ÚÙ†Ú«Ù„ÙˆÙ†Ùˆ Ú˜ÙˆÙŠ Ø§Ùˆ Ø­ÛŒØ§ØªÙŠ ØªÙ†ÙˆØ¹",
        "Ú˜ÙˆÙŠ â€¢ Ø­ÛŒØ§ØªÙŠ ØªÙ†ÙˆØ¹ â€¢ Ø§Ø³ØªÙˆÚ«Ù†ÚØ§ÛŒÙˆÙ†Ù‡",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ø§Ù‚Ù„ÛŒÙ… Ø§Ùˆ Ù†Ú“ÛŒÙˆØ§Ù„ Ø´ÛŒÙ† Ú†Ø§Ù¾ÛØ±ÛŒØ§Ù„",
        "Ø§Ù‚Ù„ÛŒÙ… â€¢ Ú†Ø§Ù¾ÛØ±ÛŒØ§Ù„ â€¢ Ù…Ù‚Ø§ÙˆÙ…Øª",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ø¯ ÚÙ†Ú«Ù„ Ø³Ø§ØªÙ†Ù‡ Ø§Ùˆ Ø¨ÛŒØ§ Ø±ØºÙˆÙ†Ù‡",
        "Ø³Ø§ØªÙ†Ù‡ â€¢ Ø¨ÛŒØ§ Ø±ØºÙˆÙ†Ù‡ â€¢ Ù¾Ø§Ù„Ù†Ù‡",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ù¼ÙˆÙ„Ù†Ùˆ Ø§Ú©Ù…Ø§Ù„Ø§ØªÙŠ ÚÙ†ÚÛŒØ± Ø§Ùˆ Ù…Ø¹ÛŒØ´Øª",
        "Ù¼ÙˆÙ„Ù†Û â€¢ Ù…Ø¹ÛŒØ´Øª â€¢ Ø§Ø±Ø²ÚšØª ÚÙ†ÚÛŒØ±",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ø¯ÙˆØ§Ù…Ø¯Ø§Ø±Ù‡ Ø­Ø§ØµÙ„ Ø§Ùˆ Ù¾ÙˆÙ‡Ø§ÙˆÛŒ",
        "Ø­Ø§ØµÙ„ â€¢ Ù¾ÙˆÙ‡Ø§ÙˆÛŒ â€¢ ØºÙˆØ±Ù‡ Ú©Ú“Ù†Ù„Ø§Ø±Û",
      ],
      [
        "Ø¯ Chilghoza Pine Nuts Ú…ÛÚ“Ù†Ù‡ØŒ Ù¾Ø§Ù„ÙŠØ³ÙŠ Ø§Ùˆ Ù…Ø´Ø§Ø±Ú©Øª",
        "Ú…ÛÚ“Ù†Ù‡ â€¢ Ù¾Ø§Ù„ÙŠØ³ÙŠ â€¢ Ù…Ø´Ø§Ø±Ú©Øª",
      ],
    ],
  },
  ru: {
    trade: [
      [
        "ÐœÐ¸Ñ€Ð¾Ð²Ñ‹Ðµ Ñ€Ñ‹Ð½ÐºÐ¸ Chilghoza Pine Nuts",
        "Ð¡Ð¨Ð â€¢ ÐšÐ¸Ñ‚Ð°Ð¹ â€¢ Ð¦ÐµÐ½Ñ‚Ñ€Ð°Ð»ÑŒÐ½Ð°Ñ ÐÐ·Ð¸Ñ â€¢ Ð‘Ð»Ð¸Ð¶Ð½Ð¸Ð¹ Ð’Ð¾ÑÑ‚Ð¾Ðº",
      ],
      [
        "Ð Ñ‹Ð½Ð¾Ðº Ð¸ Ð¿Ð¾ÐºÑƒÐ¿Ð°Ñ‚ÐµÐ»Ð¸ Chilghoza Pine Nuts Ð² Ð¡Ð¨Ð",
        "ÐŸÐ¾ÐºÑƒÐ¿Ð°Ñ‚ÐµÐ»Ð¸ â€¢ Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸Ñ â€¢ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚Ð¸",
      ],
      [
        "Ð Ñ‹Ð½Ð¾Ðº Ð¸ Ð¿Ð¾ÐºÑƒÐ¿Ð°Ñ‚ÐµÐ»Ð¸ Chilghoza Pine Nuts Ð² ÐšÐ¸Ñ‚Ð°Ðµ",
        "Ð¢Ð¾Ñ€Ð³Ð¾Ð²Ñ‹Ð¹ ÑÑ‚Ð¾Ð» â€¢ Ð¿Ð¾ÐºÑƒÐ¿Ð°Ñ‚ÐµÐ»Ð¸ â€¢ Ñ€Ñ‹Ð½Ð¾Ñ‡Ð½Ð°Ñ Ð°Ð½Ð°Ð»Ð¸Ñ‚Ð¸ÐºÐ°",
      ],
      [
        "Ð­ÐºÑÐ¿Ð¾Ñ€Ñ‚ Ð¸ Ð»Ð¾Ð³Ð¸ÑÑ‚Ð¸ÐºÐ° Chilghoza Pine Nuts",
        "Ð£Ð¿Ð°ÐºÐ¾Ð²ÐºÐ° â€¢ Ð´Ð¾ÐºÑƒÐ¼ÐµÐ½Ñ‚Ñ‹ â€¢ Ð´Ð¾ÑÑ‚Ð°Ð²ÐºÐ° â€¢ Ñ‚Ð°Ð¼Ð¾Ð¶Ð½Ñ",
      ],
      [
        "Ð¡Ñ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ñ‹ Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ð° Ð¸ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ð° Chilghoza Pine Nuts",
        "Ð¯Ð´Ñ€Ð° â€¢ Ð² ÑÐºÐ¾Ñ€Ð»ÑƒÐ¿Ðµ â€¢ ÑÐ¾Ñ€Ñ‚Ð° â€¢ ÑÐ¿ÐµÑ†Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸",
      ],
      [
        "Ð¦ÐµÐ¿Ð¾Ñ‡ÐºÐ° Ð¿Ð¾ÑÑ‚Ð°Ð²Ð¾Ðº Ð¸ Ð¿Ñ€Ð¾ÑÐ»ÐµÐ¶Ð¸Ð²Ð°ÐµÐ¼Ð¾ÑÑ‚ÑŒ Chilghoza Pine Nuts",
        "Ð›ÐµÑ â†’ ÑÐ±Ð¾Ñ€Ñ‰Ð¸Ðº â†’ Ð¿ÐµÑ€ÐµÑ€Ð°Ð±Ð¾Ñ‚ÐºÐ° â†’ ÑƒÐ¿Ð°ÐºÐ¾Ð²ÐºÐ° â†’ ÑÐºÑÐ¿Ð¾Ñ€Ñ‚",
      ],
      [
        "Ð“ÐµÐ¾Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐµÑÐºÐ¾Ðµ ÑƒÐºÐ°Ð·Ð°Ð½Ð¸Ðµ (GI) Chilghoza Pine Nuts",
        "ÐŸÑ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ðµ â€¢ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ‡Ð½Ð¾ÑÑ‚ÑŒ â€¢ Ð·Ð°Ñ‰Ð¸Ñ‚Ð°",
      ],
      [
        "ÐžÑ€Ð³Ð°Ð½Ð¸Ñ‡ÐµÑÐºÐ°Ñ Ñ…Ð¸Ð¼Ð¸Ñ Ð¸ Ð¿Ñ€Ð¸Ñ€Ð¾Ð´Ð½Ð¾Ðµ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ð¾ Chilghoza Pine Nuts",
        "ÐŸÑ€Ð¸Ñ€Ð¾Ð´Ð½Ñ‹Ð¹ ÑÐ¾ÑÑ‚Ð°Ð² â€¢ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ð¾ â€¢ Ð¿Ð¸Ñ‰ÐµÐ²Ð°Ñ Ð½Ð°ÑƒÐºÐ°",
      ],
      [
        "ÐŸÐµÑ€ÐµÑ€Ð°Ð±Ð¾Ñ‚ÐºÐ°, ÑƒÐ¿Ð°ÐºÐ¾Ð²ÐºÐ° Ð¸ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð½Ð°Ñ ÑÑ‚Ð¾Ð¸Ð¼Ð¾ÑÑ‚ÑŒ Chilghoza Pine Nuts",
        "Ð¡ÑƒÑˆÐºÐ° â€¢ Ð¾Ð±Ð¶Ð°Ñ€ÐºÐ° â€¢ ÑÐ¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²ÐºÐ° â€¢ Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ",
      ],
      [
        "Ð£ÑÑ‚Ð¾Ð¹Ñ‡Ð¸Ð²Ð°Ñ Ð¸ ÑÑ‚Ð¸Ñ‡Ð½Ð°Ñ Ñ‚Ð¾Ñ€Ð³Ð¾Ð²Ð»Ñ Chilghoza Pine Nuts",
        "Ð¡Ð¾Ð¾Ð±Ñ‰ÐµÑÑ‚Ð²Ð° â€¢ Ð»ÐµÑÐ° â€¢ Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²ÐµÐ½Ð½Ð°Ñ Ñ‚Ð¾Ñ€Ð³Ð¾Ð²Ð»Ñ",
      ],
    ],
    research: [
      [
        "Ð˜ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð³ÐµÐ¾Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ñ Ð¸ GI Chilghoza Pine Nuts",
        "ÐŸÑ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ðµ â€¢ Ð³ÐµÐ¾Ð³Ñ€Ð°Ñ„Ð¸Ñ â€¢ Ð¸ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ GI",
      ],
      ["Ð‘Ð¸Ð¾Ð»Ð¾Ð³Ð¸Ñ Ð¸ Ð±Ð¾Ñ‚Ð°Ð½Ð¸ÐºÐ° Chilghoza Pine Nuts", "Ð’Ð¸Ð´ â€¢ Ð±Ð¸Ð¾Ð»Ð¾Ð³Ð¸Ñ â€¢ Ð±Ð¾Ñ‚Ð°Ð½Ð¸ÐºÐ°"],
      [
        "ÐŸÐ¸Ñ‰ÐµÐ²Ð°Ñ Ñ†ÐµÐ½Ð½Ð¾ÑÑ‚ÑŒ Ð¸ Ð¿Ñ€Ð¸Ñ€Ð¾Ð´Ð½Ñ‹Ð¹ ÑÐ¾ÑÑ‚Ð°Ð² Chilghoza Pine Nuts",
        "ÐŸÐ¸Ñ‚Ð°Ð½Ð¸Ðµ â€¢ ÑÐ¾ÑÑ‚Ð°Ð² â€¢ Ð¿Ñ€Ð¸Ñ€Ð¾Ð´Ð½Ð¾Ðµ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ð¾",
      ],
      ["Ð›ÐµÑÐ° Ð¸ ÑÐºÐ¾Ð»Ð¾Ð³Ð¸Ñ Chilghoza Pine Nuts", "Ð›ÐµÑÐ° â€¢ ÑÐºÐ¾Ð»Ð¾Ð³Ð¸Ñ â€¢ ÑÐºÐ¾ÑÐ¸ÑÑ‚ÐµÐ¼Ñ‹"],
      [
        "Ð‘Ð¸Ð¾Ñ€Ð°Ð·Ð½Ð¾Ð¾Ð±Ñ€Ð°Ð·Ð¸Ðµ Ð¸ Ð´Ð¸ÐºÐ°Ñ Ð¿Ñ€Ð¸Ñ€Ð¾Ð´Ð° Ð² Ð»ÐµÑÐ°Ñ… Chilghoza Pine Nuts",
        "Ð”Ð¸ÐºÐ°Ñ Ð¿Ñ€Ð¸Ñ€Ð¾Ð´Ð° â€¢ Ð±Ð¸Ð¾Ñ€Ð°Ð·Ð½Ð¾Ð¾Ð±Ñ€Ð°Ð·Ð¸Ðµ â€¢ ÑÑ€ÐµÐ´Ñ‹",
      ],
      [
        "ÐšÐ»Ð¸Ð¼Ð°Ñ‚ Ð¸ Ð³Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ð°Ñ Ð·ÐµÐ»ÐµÐ½Ð°Ñ ÑÑ€ÐµÐ´Ð° Chilghoza Pine Nuts",
        "ÐšÐ»Ð¸Ð¼Ð°Ñ‚ â€¢ Ð¾ÐºÑ€ÑƒÐ¶Ð°ÑŽÑ‰Ð°Ñ ÑÑ€ÐµÐ´Ð° â€¢ ÑƒÑÑ‚Ð¾Ð¹Ñ‡Ð¸Ð²Ð¾ÑÑ‚ÑŒ",
      ],
      [
        "Ð¡Ð¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð¸ Ð²Ð¾ÑÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð»ÐµÑÐ¾Ð² Chilghoza Pine Nuts",
        "Ð¡Ð¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ â€¢ Ð²Ð¾ÑÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ â€¢ ÑƒÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ",
      ],
      [
        "Ð¦ÐµÐ¿Ð¾Ñ‡ÐºÐ° Ð¿Ð¾ÑÑ‚Ð°Ð²Ð¾Ðº Ð¸ ÑÑ€ÐµÐ´ÑÑ‚Ð²Ð° Ðº ÑÑƒÑ‰ÐµÑÑ‚Ð²Ð¾Ð²Ð°Ð½Ð¸ÑŽ ÑÐ¾Ð¾Ð±Ñ‰ÐµÑÑ‚Ð² Chilghoza Pine Nuts",
        "Ð¡Ð¾Ð¾Ð±Ñ‰ÐµÑÑ‚Ð²Ð° â€¢ ÑÑ€ÐµÐ´ÑÑ‚Ð²Ð° Ðº ÑÑƒÑ‰ÐµÑÑ‚Ð²Ð¾Ð²Ð°Ð½Ð¸ÑŽ â€¢ Ñ†ÐµÐ¿Ð¾Ñ‡ÐºÐ° Ñ†ÐµÐ½Ð½Ð¾ÑÑ‚Ð¸",
      ],
      [
        "Ð£ÑÑ‚Ð¾Ð¹Ñ‡Ð¸Ð²Ñ‹Ð¹ ÑÐ±Ð¾Ñ€ Ð¸ Ð¾ÑÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð½Ð¾ÑÑ‚ÑŒ Ð¾ Chilghoza Pine Nuts",
        "Ð¡Ð±Ð¾Ñ€ â€¢ Ð¾ÑÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð½Ð¾ÑÑ‚ÑŒ â€¢ Ð»ÑƒÑ‡ÑˆÐ¸Ðµ Ð¿Ñ€Ð°ÐºÑ‚Ð¸ÐºÐ¸",
      ],
      [
        "Ð˜ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸Ñ, Ð¿Ð¾Ð»Ð¸Ñ‚Ð¸ÐºÐ° Ð¸ Ð¿Ð°Ñ€Ñ‚Ð½ÐµÑ€ÑÑ‚Ð²Ð° Chilghoza Pine Nuts",
        "Ð˜ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸Ñ â€¢ Ð¿Ð¾Ð»Ð¸Ñ‚Ð¸ÐºÐ° â€¢ Ð¿Ð°Ñ€Ñ‚Ð½ÐµÑ€ÑÑ‚Ð²Ð°",
      ],
    ],
  },
};
const gallery = [
  ["01-chilghoza-lot.jpg", "Chilghoza Pine Nuts Lot Inspection & Grading"],
  ["02-chilghoza-cones.jpg", "Harvested Cones of Chilghoza Pine Nuts"],
  ["03-chilghoza-kernel.jpg", "Premium Shelled Kernels of Chilghoza Pine Nuts"],
  ["04-chilghoza-harvest.jpg", "Sustainable Harvesting of Chilghoza Pine Nuts"],
  ["05-chilghoza-raw-kernels.jpg", "Raw Selection of Chilghoza Pine Nuts"],
  ["06-chilghoza-cone-closeup.jpg", "Macro Detail of Chilghoza Pine Nuts Cone"],
  [
    "07-chilghoza-products-display.jpg",
    "Export Packaging of Chilghoza Pine Nuts",
  ],
  [
    "08-chilghoza-forest.jpg",
    "Chilas, Diamer Native Chilghoza Pine Nuts Forest",
  ],
];
const T = {
  en: {
    navHome: "Home",
    navTrade: "Global Trade",
    navResearch: "Research & Knowledge",
    navGallery: "Gallery",
    admin: "Admin",
    eyebrow: "PAKISTAN Â· ORIGIN Â· GLOBAL",
    heroRoyal: "Royal",
    heroTitle: "Chilghoza Pine Nuts",
    heroText:
      "From the Chilghoza Pine Nuts forests of Pakistan to the world â€” connecting premium quality, authentic origin, responsible supply chains and knowledge.",
    exploreTrade: "Explore Global Trade",
    exploreResearch: "Explore Research",
    gatewayEyebrow: "TWO PRIMARY GATEWAYS",
    gatewayTitle: "One Royal Chilghoza Pine Nuts Ecosystem",
    tradeTitle: "GLOBAL TRADE",
    tradeText: "Premium quality Â· Worldwide export Â· Markets and buyers",
    researchTitle: "RESEARCH & KNOWLEDGE",
    researchText: "Science Â· Origin Â· Forests Â· Ecology Â· Knowledge",
    openGateway: "Open Gateway",
    galleryEyebrow: "ROYAL FIELD ARCHIVE",
    galleryTitle: "Chilghoza Pine Nuts Gallery",
    galleryText:
      "Eight editable visual records from forest, harvest, grading and export.",
    aiTitle: "Royal AI Assistant",
    aiText:
      "Ask about Chilghoza Pine Nuts, trade, quality, forests and research.",
    aiPlaceholder: "Ask about Chilghoza Pine Nuts...",
    ask: "Ask AI",
    directInquiry: "DIRECT TRADE INQUIRY",
    whatsappTitle: "WhatsApp Chilghoza Pine Nuts Trade Desk",
    officeEyebrow: "CONTACT Â· OFFICE Â· PARTNERSHIP",
    officeTitle: "Office Address",
    back: "Back",
    hubContent: "Knowledge Hub",
    hubBody:
      "This full mini-website page is ready for Admin content, articles, market information, research records and detailed descriptions.",
    whatsappTrade: "WhatsApp Trade",
    mediaTitle: "Images Â· Videos Â· PDFs",
    mediaEmpty: "Dynamic media will appear here after upload.",
    visitorAI: "Visitor Assistant",
    adminAI: "Admin Assistant",
  },
  zh: {
    navHome: "é¦–é¡µ",
    navTrade: "å…¨çƒè´¸æ˜“",
    navResearch: "ç ”ç©¶ä¸ŽçŸ¥è¯†",
    navGallery: "å›¾åº“",
    admin: "ç®¡ç†",
    eyebrow: "å·´åŸºæ–¯å¦ Â· åŽŸäº§åœ° Â· å…¨çƒ",
    heroRoyal: "çš‡å®¶",
    heroTitle: "Chilghoza Pine Nuts",
    heroText:
      "ä»Žå·´åŸºæ–¯å¦çš„ Chilghoza Pine Nuts æ£®æž—èµ°å‘ä¸–ç•Œï¼Œè¿žæŽ¥ä¼˜è´¨å“è´¨ã€çœŸå®žåŽŸäº§åœ°ã€è´£ä»»ä¾›åº”é“¾ä¸ŽçŸ¥è¯†ã€‚",
    exploreTrade: "æŽ¢ç´¢å…¨çƒè´¸æ˜“",
    exploreResearch: "æŽ¢ç´¢ç ”ç©¶",
    gatewayEyebrow: "ä¸¤å¤§æ ¸å¿ƒé—¨æˆ·",
    gatewayTitle: "ä¸€ä¸ªçš‡å®¶ Chilghoza Pine Nuts ç”Ÿæ€ç³»ç»Ÿ",
    tradeTitle: "å…¨çƒè´¸æ˜“",
    tradeText: "ä¼˜è´¨å“è´¨ Â· å…¨çƒå‡ºå£ Â· å¸‚åœºä¸Žä¹°å®¶",
    researchTitle: "ç ”ç©¶ä¸ŽçŸ¥è¯†",
    researchText: "ç§‘å­¦ Â· åŽŸäº§åœ° Â· æ£®æž— Â· ç”Ÿæ€ Â· çŸ¥è¯†",
    openGateway: "æ‰“å¼€é—¨æˆ·",
    galleryEyebrow: "çš‡å®¶å®žåœ°æ¡£æ¡ˆ",
    galleryTitle: "Chilghoza Pine Nuts å›¾åº“",
    galleryText: "æ¥è‡ªæ£®æž—ã€é‡‡æ”¶ã€åˆ†çº§å’Œå‡ºå£çš„å…«é¡¹å¯ç¼–è¾‘è§†è§‰è®°å½•ã€‚",
    aiTitle: "çš‡å®¶ AI åŠ©æ‰‹",
    aiText: "å’¨è¯¢ Chilghoza Pine Nutsã€è´¸æ˜“ã€å“è´¨ã€æ£®æž—å’Œç ”ç©¶ã€‚",
    aiPlaceholder: "è¯¢é—® Chilghoza Pine Nuts...",
    ask: "è¯¢é—® AI",
    directInquiry: "ç›´æŽ¥è´¸æ˜“å’¨è¯¢",
    whatsappTitle: "WhatsApp Chilghoza Pine Nuts è´¸æ˜“å°",
    officeEyebrow: "è”ç³» Â· åŠžå…¬å®¤ Â· åˆä½œ",
    officeTitle: "åŠžå…¬å®¤åœ°å€",
    back: "è¿”å›ž",
    hubContent: "çŸ¥è¯†ä¸­å¿ƒ",
    hubBody:
      "æ­¤å®Œæ•´è¿·ä½ ç½‘ç«™é¡µé¢å·²å‡†å¤‡å¥½æŽ¥æ”¶ç®¡ç†å‘˜å†…å®¹ã€æ–‡ç« ã€å¸‚åœºä¿¡æ¯å’Œç ”ç©¶è®°å½•ã€‚",
    whatsappTrade: "WhatsApp è´¸æ˜“",
    mediaTitle: "å›¾ç‰‡ Â· è§†é¢‘ Â· PDF",
    mediaEmpty: "ä¸Šä¼ åŽåŠ¨æ€åª’ä½“å°†æ˜¾ç¤ºåœ¨è¿™é‡Œã€‚",
    visitorAI: "è®¿å®¢åŠ©æ‰‹",
    adminAI: "ç®¡ç†å‘˜åŠ©æ‰‹",
  },
  ar: {
    navHome: "Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©",
    navTrade: "Ø§Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠØ©",
    navResearch: "Ø§Ù„Ø¨Ø­Ø« ÙˆØ§Ù„Ù…Ø¹Ø±ÙØ©",
    navGallery: "Ø§Ù„Ù…Ø¹Ø±Ø¶",
    admin: "Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©",
    eyebrow: "Ø¨Ø§ÙƒØ³ØªØ§Ù† Â· Ø§Ù„Ù…Ù†Ø´Ø£ Â· Ø§Ù„Ø¹Ø§Ù„Ù…",
    heroRoyal: "Ø±ÙˆÙŠØ§Ù„",
    heroTitle: "Chilghoza Pine Nuts",
    heroText:
      "Ù…Ù† ØºØ§Ø¨Ø§Øª Chilghoza Pine Nuts ÙÙŠ Ø¨Ø§ÙƒØ³ØªØ§Ù† Ø¥Ù„Ù‰ Ø§Ù„Ø¹Ø§Ù„Ù…ØŒ Ù†Ø±Ø¨Ø· Ø§Ù„Ø¬ÙˆØ¯Ø© Ø§Ù„ÙØ§Ø®Ø±Ø© ÙˆØ§Ù„Ù…Ù†Ø´Ø£ Ø§Ù„Ø£ØµÙŠÙ„ ÙˆØ³Ù„Ø§Ø³Ù„ Ø§Ù„Ø¥Ù…Ø¯Ø§Ø¯ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„Ø© ÙˆØ§Ù„Ù…Ø¹Ø±ÙØ©.",
    exploreTrade: "Ø§Ø³ØªÙƒØ´Ù Ø§Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠØ©",
    exploreResearch: "Ø§Ø³ØªÙƒØ´Ù Ø§Ù„Ø¨Ø­Ø«",
    gatewayEyebrow: "Ø¨ÙˆØ§Ø¨ØªØ§Ù† Ø±Ø¦ÙŠØ³ÙŠØªØ§Ù†",
    gatewayTitle: "Ù…Ù†Ø¸ÙˆÙ…Ø© Royal Chilghoza Pine Nuts ÙˆØ§Ø­Ø¯Ø©",
    tradeTitle: "Ø§Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠØ©",
    tradeText: "Ø¬ÙˆØ¯Ø© ÙØ§Ø®Ø±Ø© Â· ØªØµØ¯ÙŠØ± Ø¹Ø§Ù„Ù…ÙŠ Â· Ø£Ø³ÙˆØ§Ù‚ ÙˆÙ…Ø´ØªØ±ÙˆÙ†",
    researchTitle: "Ø§Ù„Ø¨Ø­Ø« ÙˆØ§Ù„Ù…Ø¹Ø±ÙØ©",
    researchText: "Ø¹Ù„Ù… Â· Ù…Ù†Ø´Ø£ Â· ØºØ§Ø¨Ø§Øª Â· Ø¨ÙŠØ¦Ø© Â· Ù…Ø¹Ø±ÙØ©",
    openGateway: "Ø§ÙØªØ­ Ø§Ù„Ø¨ÙˆØ§Ø¨Ø©",
    galleryEyebrow: "Ø§Ù„Ø£Ø±Ø´ÙŠÙ Ø§Ù„Ù…ÙŠØ¯Ø§Ù†ÙŠ Ø§Ù„Ù…Ù„ÙƒÙŠ",
    galleryTitle: "Ù…Ø¹Ø±Ø¶ Chilghoza Pine Nuts",
    galleryText:
      "Ø«Ù…Ø§Ù†ÙŠØ© Ø³Ø¬Ù„Ø§Øª Ù…Ø±Ø¦ÙŠØ© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªØ­Ø±ÙŠØ± Ù…Ù† Ø§Ù„ØºØ§Ø¨Ø© ÙˆØ§Ù„Ø­ØµØ§Ø¯ ÙˆØ§Ù„ÙØ±Ø² ÙˆØ§Ù„ØªØµØ¯ÙŠØ±.",
    aiTitle: "Ù…Ø³Ø§Ø¹Ø¯ Ø±ÙˆÙŠØ§Ù„ Ø§Ù„Ø°ÙƒÙŠ",
    aiText: "Ø§Ø³Ø£Ù„ Ø¹Ù† Chilghoza Pine Nuts ÙˆØ§Ù„ØªØ¬Ø§Ø±Ø© ÙˆØ§Ù„Ø¬ÙˆØ¯Ø© ÙˆØ§Ù„ØºØ§Ø¨Ø§Øª ÙˆØ§Ù„Ø¨Ø­Ø«.",
    aiPlaceholder: "Ø§Ø³Ø£Ù„ Ø¹Ù† Chilghoza Pine Nuts...",
    ask: "Ø§Ø³Ø£Ù„ AI",
    directInquiry: "Ø§Ø³ØªÙØ³Ø§Ø± ØªØ¬Ø§Ø±ÙŠ Ù…Ø¨Ø§Ø´Ø±",
    whatsappTitle: "Ù…ÙƒØªØ¨ WhatsApp Ù„ØªØ¬Ø§Ø±Ø© Chilghoza Pine Nuts",
    officeEyebrow: "Ø§ØªØµØ§Ù„ Â· Ù…ÙƒØªØ¨ Â· Ø´Ø±Ø§ÙƒØ©",
    officeTitle: "Ø¹Ù†Ø§ÙˆÙŠÙ† Ø§Ù„Ù…ÙƒØ§ØªØ¨",
    back: "Ø±Ø¬ÙˆØ¹",
    hubContent: "Ù…Ø±ÙƒØ² Ø§Ù„Ù…Ø¹Ø±ÙØ©",
    hubBody:
      "ØµÙØ­Ø© Ù…ÙˆÙ‚Ø¹ Ù…ØµØºØ± ÙƒØ§Ù…Ù„Ø© Ø¬Ø§Ù‡Ø²Ø© Ù„Ù„Ù…Ø­ØªÙˆÙ‰ ÙˆØ§Ù„Ù…Ù‚Ø§Ù„Ø§Øª ÙˆÙ…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø³ÙˆÙ‚ ÙˆØ³Ø¬Ù„Ø§Øª Ø§Ù„Ø¨Ø­Ø«.",
    whatsappTrade: "ØªØ¬Ø§Ø±Ø© WhatsApp",
    mediaTitle: "ØµÙˆØ± Â· ÙÙŠØ¯ÙŠÙˆ Â· PDF",
    mediaEmpty: "Ø³ØªØ¸Ù‡Ø± Ø§Ù„ÙˆØ³Ø§Ø¦Ø· Ø§Ù„Ø¯ÙŠÙ†Ø§Ù…ÙŠÙƒÙŠØ© Ù‡Ù†Ø§ Ø¨Ø¹Ø¯ Ø§Ù„Ø±ÙØ¹.",
    visitorAI: "Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø²ÙˆØ§Ø±",
    adminAI: "Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©",
  },
  ps: {
    navHome: "Ú©ÙˆØ±",
    navTrade: "Ù†Ú“ÛŒÙˆØ§Ù„Ù‡ Ø³ÙˆØ¯Ø§Ú«Ø±ÙŠ",
    navResearch: "Ú…ÛÚ“Ù†Ù‡ Ø§Ùˆ Ù¾ÙˆÙ‡Ù‡",
    navGallery: "Ø§Ù†ÚÙˆØ±ÙˆÙ†Ù‡",
    admin: "Ø§Ø¯Ø§Ø±Ù‡",
    eyebrow: "Ù¾Ø§Ú©Ø³ØªØ§Ù† Â· Ø§ØµÙ„ÙŠØª Â· Ù†Ú“Û",
    heroRoyal: "Ø±Ø§ÛŒÙ„",
    heroTitle: "Chilghoza Pine Nuts",
    heroText:
      "Ø¯ Ù¾Ø§Ú©Ø³ØªØ§Ù† Ø¯ Chilghoza Pine Nuts Ù„Ù‡ ÚÙ†Ú«Ù„ÙˆÙ†Ùˆ Ú…Ø®Ù‡ Ù†Ú“Û ØªÙ‡ â€” ØºÙˆØ±Ù‡ Ú©ÛŒÙÛŒØªØŒ Ø§ØµÙ„ÙŠØªØŒ Ù…Ø³Ø¤Ù„ Ø§Ú©Ù…Ø§Ù„Ø§ØªÙŠ ÚÙ†ÚÛŒØ± Ø§Ùˆ Ù¾ÙˆÙ‡Ù‡ Ø³Ø±Ù‡ Ù†ÚšÙ„ÙˆÙˆ.",
    exploreTrade: "Ù†Ú“ÛŒÙˆØ§Ù„Ù‡ Ø³ÙˆØ¯Ø§Ú«Ø±ÙŠ ÙˆÚ«ÙˆØ±Ø¦",
    exploreResearch: "Ú…ÛÚ“Ù†Ù‡ ÙˆÚ«ÙˆØ±Ø¦",
    gatewayEyebrow: "Ø¯ÙˆÙ‡ Ø§Ø³Ø§Ø³ÙŠ Ø¯Ø±ÙˆØ§Ø²Û",
    gatewayTitle: "ÛŒÙˆ Royal Chilghoza Pine Nuts Ø§ÛŒÚ©ÙˆØ³ÛŒØ³ØªÙ…",
    tradeTitle: "Ù†Ú“ÛŒÙˆØ§Ù„Ù‡ Ø³ÙˆØ¯Ø§Ú«Ø±ÙŠ",
    tradeText: "ØºÙˆØ±Ù‡ Ú©ÛŒÙÛŒØª Â· Ù†Ú“ÛŒÙˆØ§Ù„ ØµØ§Ø¯Ø±Ø§Øª Â· Ø¨Ø§Ø²Ø§Ø±ÙˆÙ†Ù‡ Ø§Ùˆ Ù¾ÛØ±ÙˆØ¯ÙˆÙ†Ú©ÙŠ",
    researchTitle: "Ú…ÛÚ“Ù†Ù‡ Ø§Ùˆ Ù¾ÙˆÙ‡Ù‡",
    researchText: "Ø³Ø§ÛŒÙ†Ø³ Â· Ø§ØµÙ„ÙŠØª Â· ÚÙ†Ú«Ù„ÙˆÙ†Ù‡ Â· Ø§ÛŒÚ©ÙˆÙ„ÙˆÚ˜ÙŠ Â· Ù¾ÙˆÙ‡Ù‡",
    openGateway: "Ø¯Ø±ÙˆØ§Ø²Ù‡ Ù¾Ø±Ø§Ù†ÛŒØ²Ø¦",
    galleryEyebrow: "Ø±Ø§ÛŒÙ„ Ù…ÛŒØ¯Ø§Ù†ÙŠ Ø§Ø±Ø´ÛŒÙ",
    galleryTitle: "Chilghoza Pine Nuts Ú«Ø§Ù„Ø±ÙŠ",
    galleryText:
      "Ø¯ ÚÙ†Ú«Ù„ØŒ Ø­Ø§ØµÙ„ØŒ Ø¯Ø±Ø¬Ù‡ Ø¨Ù†Ø¯Û Ø§Ùˆ ØµØ§Ø¯Ø±Ø§ØªÙˆ Ø§ØªÙ‡ Ø¯ Ø¨Ø¯Ù„ÙˆÙ† ÙˆÚ“ Ø¨ØµØ±ÙŠ Ø±ÛŒÚ©Ø§Ø±Ú‰ÙˆÙ†Ù‡.",
    aiTitle: "Ø±Ø§ÛŒÙ„ AI Ù…Ø±Ø³ØªÛŒØ§Ù„",
    aiText:
      "Ø¯ Chilghoza Pine NutsØŒ Ø³ÙˆØ¯Ø§Ú«Ø±ÛØŒ Ú©ÛŒÙÛŒØªØŒ ÚÙ†Ú«Ù„ÙˆÙ†Ùˆ Ø§Ùˆ Ú…ÛÚ“Ù†Û Ù¾Ù‡ Ø§Ú“Ù‡ ÙˆÙ¾ÙˆÚšØªØ¦.",
    aiPlaceholder: "Ø¯ Chilghoza Pine Nuts Ù¾Ù‡ Ø§Ú“Ù‡ ÙˆÙ¾ÙˆÚšØªØ¦...",
    ask: "AI ÙˆÙ¾ÙˆÚšØªØ¦",
    directInquiry: "Ù…Ø³ØªÙ‚ÛŒÙ… Ø³ÙˆØ¯Ø§Ú«Ø±ÛŒØ² ØªÙ…Ø§Ø³",
    whatsappTitle: "WhatsApp Chilghoza Pine Nuts Ø³ÙˆØ¯Ø§Ú«Ø±ÛŒØ² Ø¯ÙØªØ±",
    officeEyebrow: "Ø§Ú“ÛŒÚ©Ù‡ Â· Ø¯ÙØªØ± Â· Ù…Ø´Ø§Ø±Ú©Øª",
    officeTitle: "Ø¯ Ø¯ÙØªØ± Ù¾ØªÙ‡",
    back: "Ø´Ø§ØªÙ‡",
    hubContent: "Ø¯ Ù¾ÙˆÙ‡Û Ù…Ø±Ú©Ø²",
    hubBody:
      "Ø¯Ø§ Ø¨Ø´Ù¾Ú“Ù‡ Mini-Website Ù¾Ø§Ú¼Ù‡ Ø¯ Ø§Ú‰Ù…ÛŒÙ† Ù…Ø­ØªÙˆØ§ØŒ Ù…Ù‚Ø§Ù„ÙˆØŒ Ø¨Ø§Ø²Ø§Ø± Ù…Ø¹Ù„ÙˆÙ…Ø§ØªÙˆ Ø§Ùˆ Ú…ÛÚ“Ù†ÛŒØ²Ùˆ Ø±ÛŒÚ©Ø§Ø±Ú‰ÙˆÙ†Ùˆ Ù„Ù¾Ø§Ø±Ù‡ Ú†Ù…ØªÙˆ Ø¯Ù‡.",
    whatsappTrade: "WhatsApp Ø³ÙˆØ¯Ø§Ú«Ø±ÙŠ",
    mediaTitle: "Ø§Ù†ÚÙˆØ±ÙˆÙ†Ù‡ Â· ÙˆÛŒÚ‰ÛŒÙˆ Â· PDF",
    mediaEmpty: "Ù…ØªØ­Ø±Ú© Ø±Ø³Ù†Û Ø¨Ù‡ Ø¯ Ø§Ù¾Ù„ÙˆÚ‰ ÙˆØ±ÙˆØ³ØªÙ‡ Ø¯Ù„ØªÙ‡ ÚšÚ©Ø§Ø±Ù‡ Ø´ÙŠ.",
    visitorAI: "Ø¯ Ú©Ø§Ø±ÙˆÙˆÙ†Ú©ÙŠ Ù…Ø±Ø³ØªÛŒØ§Ù„",
    adminAI: "Ø¯ Ø§Ú‰Ù…ÛŒÙ† Ù…Ø±Ø³ØªÛŒØ§Ù„",
  },
  ru: {
    navHome: "Ð“Ð»Ð°Ð²Ð½Ð°Ñ",
    navTrade: "ÐœÐ¸Ñ€Ð¾Ð²Ð°Ñ Ñ‚Ð¾Ñ€Ð³Ð¾Ð²Ð»Ñ",
    navResearch: "Ð˜ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸Ñ Ð¸ Ð·Ð½Ð°Ð½Ð¸Ñ",
    navGallery: "Ð“Ð°Ð»ÐµÑ€ÐµÑ",
    admin: "ÐÐ´Ð¼Ð¸Ð½",
    eyebrow: "ÐŸÐÐšÐ˜Ð¡Ð¢ÐÐ Â· ÐŸÐ ÐžÐ˜Ð¡Ð¥ÐžÐ–Ð”Ð•ÐÐ˜Ð• Â· ÐœÐ˜Ð ",
    heroRoyal: "Ð Ð¾ÑÐ»",
    heroTitle: "Chilghoza Pine Nuts",
    heroText:
      "Ð˜Ð· Ð»ÐµÑÐ¾Ð² Chilghoza Pine Nuts ÐŸÐ°ÐºÐ¸ÑÑ‚Ð°Ð½Ð° Ð² Ð¼Ð¸Ñ€ â€” Ð¿Ñ€ÐµÐ¼Ð¸Ð°Ð»ÑŒÐ½Ð¾Ðµ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ð¾, Ð¿Ð¾Ð´Ð»Ð¸Ð½Ð½Ð¾Ðµ Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ðµ, Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²ÐµÐ½Ð½Ð°Ñ Ñ†ÐµÐ¿Ð¾Ñ‡ÐºÐ° Ð¿Ð¾ÑÑ‚Ð°Ð²Ð¾Ðº Ð¸ Ð·Ð½Ð°Ð½Ð¸Ñ.",
    exploreTrade: "ÐœÐ¸Ñ€Ð¾Ð²Ð°Ñ Ñ‚Ð¾Ñ€Ð³Ð¾Ð²Ð»Ñ",
    exploreResearch: "Ð˜ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸Ñ",
    gatewayEyebrow: "Ð”Ð’Ð ÐžÐ¡ÐÐžÐ’ÐÐ«Ð¥ ÐŸÐžÐ Ð¢ÐÐ›Ð",
    gatewayTitle: "Ð•Ð´Ð¸Ð½Ð°Ñ ÑÐºÐ¾ÑÐ¸ÑÑ‚ÐµÐ¼Ð° Royal Chilghoza Pine Nuts",
    tradeTitle: "ÐœÐ˜Ð ÐžÐ’ÐÐ¯ Ð¢ÐžÐ Ð“ÐžÐ’Ð›Ð¯",
    tradeText: "ÐŸÑ€ÐµÐ¼Ð¸Ð°Ð»ÑŒÐ½Ð¾Ðµ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ð¾ Â· Ð¼Ð¸Ñ€Ð¾Ð²Ð¾Ð¹ ÑÐºÑÐ¿Ð¾Ñ€Ñ‚ Â· Ñ€Ñ‹Ð½ÐºÐ¸ Ð¸ Ð¿Ð¾ÐºÑƒÐ¿Ð°Ñ‚ÐµÐ»Ð¸",
    researchTitle: "Ð˜Ð¡Ð¡Ð›Ð•Ð”ÐžÐ’ÐÐÐ˜Ð¯ Ð˜ Ð—ÐÐÐÐ˜Ð¯",
    researchText: "ÐÐ°ÑƒÐºÐ° Â· Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ðµ Â· Ð»ÐµÑÐ° Â· ÑÐºÐ¾Ð»Ð¾Ð³Ð¸Ñ Â· Ð·Ð½Ð°Ð½Ð¸Ñ",
    openGateway: "ÐžÑ‚ÐºÑ€Ñ‹Ñ‚ÑŒ Ð¿Ð¾Ñ€Ñ‚Ð°Ð»",
    galleryEyebrow: "ÐšÐžÐ ÐžÐ›Ð•Ð’Ð¡ÐšÐ˜Ð™ ÐŸÐžÐ›Ð•Ð’ÐžÐ™ ÐÐ Ð¥Ð˜Ð’",
    galleryTitle: "Ð“Ð°Ð»ÐµÑ€ÐµÑ Chilghoza Pine Nuts",
    galleryText:
      "Ð’Ð¾ÑÐµÐ¼ÑŒ Ñ€ÐµÐ´Ð°ÐºÑ‚Ð¸Ñ€ÑƒÐµÐ¼Ñ‹Ñ… Ð²Ð¸Ð·ÑƒÐ°Ð»ÑŒÐ½Ñ‹Ñ… Ð·Ð°Ð¿Ð¸ÑÐµÐ¹ Ð¸Ð· Ð»ÐµÑÐ°, ÑÐ±Ð¾Ñ€Ð°, ÑÐ¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²ÐºÐ¸ Ð¸ ÑÐºÑÐ¿Ð¾Ñ€Ñ‚Ð°.",
    aiTitle: "ÐšÐ¾Ñ€Ð¾Ð»ÐµÐ²ÑÐºÐ¸Ð¹ AI Ð¿Ð¾Ð¼Ð¾Ñ‰Ð½Ð¸Ðº",
    aiText:
      "Ð¡Ð¿Ñ€Ð¾ÑÐ¸Ñ‚Ðµ Ð¾ Chilghoza Pine Nuts, Ñ‚Ð¾Ñ€Ð³Ð¾Ð²Ð»Ðµ, ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ðµ, Ð»ÐµÑÐ°Ñ… Ð¸ Ð¸ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸ÑÑ….",
    aiPlaceholder: "Ð¡Ð¿Ñ€Ð¾ÑÐ¸Ñ‚Ðµ Ð¾ Chilghoza Pine Nuts...",
    ask: "Ð¡Ð¿Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ AI",
    directInquiry: "ÐŸÐ Ð¯ÐœÐžÐ™ Ð¢ÐžÐ Ð“ÐžÐ’Ð«Ð™ Ð—ÐÐŸÐ ÐžÐ¡",
    whatsappTitle: "WhatsApp Ñ‚Ð¾Ñ€Ð³Ð¾Ð²Ñ‹Ð¹ Ð¾Ñ‚Ð´ÐµÐ» Chilghoza Pine Nuts",
    officeEyebrow: "ÐšÐžÐÐ¢ÐÐšÐ¢ Â· ÐžÐ¤Ð˜Ð¡ Â· ÐŸÐÐ Ð¢ÐÐ•Ð Ð¡Ð¢Ð’Ðž",
    officeTitle: "ÐÐ´Ñ€ÐµÑÐ° Ð¾Ñ„Ð¸ÑÐ¾Ð²",
    back: "ÐÐ°Ð·Ð°Ð´",
    hubContent: "Ð¦ÐµÐ½Ñ‚Ñ€ Ð·Ð½Ð°Ð½Ð¸Ð¹",
    hubBody:
      "Ð­Ñ‚Ð° Ð¿Ð¾Ð»Ð½Ð°Ñ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð¼Ð¸Ð½Ð¸-ÑÐ°Ð¹Ñ‚Ð° Ð³Ð¾Ñ‚Ð¾Ð²Ð° Ð´Ð»Ñ ÐºÐ¾Ð½Ñ‚ÐµÐ½Ñ‚Ð° Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°, ÑÑ‚Ð°Ñ‚ÐµÐ¹, Ñ€Ñ‹Ð½Ð¾Ñ‡Ð½Ð¾Ð¹ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ Ð¸ Ð¸ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸Ð¹.",
    whatsappTrade: "WhatsApp Ñ‚Ð¾Ñ€Ð³Ð¾Ð²Ð»Ñ",
    mediaTitle: "Ð˜Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ñ Â· Ð’Ð¸Ð´ÐµÐ¾ Â· PDF",
    mediaEmpty: "Ð”Ð¸Ð½Ð°Ð¼Ð¸Ñ‡ÐµÑÐºÐ¸Ðµ Ð¼Ð°Ñ‚ÐµÑ€Ð¸Ð°Ð»Ñ‹ Ð¿Ð¾ÑÐ²ÑÑ‚ÑÑ Ð·Ð´ÐµÑÑŒ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸.",
    visitorAI: "ÐŸÐ¾Ð¼Ð¾Ñ‰Ð½Ð¸Ðº Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚ÐµÐ»Ñ",
    adminAI: "ÐŸÐ¾Ð¼Ð¾Ñ‰Ð½Ð¸Ðº Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°",
  },
};
const offices = [
  "Chilas, Diamer District, Gilgit-Baltistan, Pakistan",
  "Gilgit, Gilgit-Baltistan, Pakistan",
  "Islamabad, Pakistan",
  "China / International Export Hub",
];
function tx(k) {
  return (T[state.lang] && T[state.lang][k]) || T.en[k] || k;
}
function hubs(type) {
  return (hubData[state.lang] || hubData.en)[type] || hubData.en[type];
}
function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document
    .querySelectorAll("[data-i18n]")
    .forEach((e) => (e.textContent = tx(e.dataset.i18n)));
  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach((e) => (e.placeholder = tx(e.dataset.i18nPlaceholder)));
  document
    .querySelectorAll("#languageSelect,#gatewayLanguage,#hubLanguage")
    .forEach((s) => (s.value = state.lang));
  document.getElementById("aiModeLabel").textContent = state.admin
    ? tx("adminAI")
    : tx("visitorAI");
  renderOffices();
  renderGallery();
  if (state.gateway) renderGateway(state.gateway);
  if (state.hub) renderHub(state.hub.type, state.hub.index);
}
function setLanguage(lang) {
  if (!languages.includes(lang)) return;
  state.lang = lang;
  sessionStorage.setItem("royalLanguage", lang);
  applyLanguage();
}
function renderGallery() {
  document.getElementById("galleryGrid").innerHTML = gallery
    .map(
      ([src, cap], i) =>
        `<figure class="gallery-item"><img src="${src}" alt="${cap}" loading="lazy" onerror="this.classList.add('failed')"><figcaption><span>${String( i + 1 ).padStart(2, "0")}</span>${cap}</figcaption></figure>`
    )
    .join("");
}
function renderOffices() {
  const titles = [
    "Headquarters & Native Origin",
    "Regional Operations Hub",
    "Federal & Trade Desk",
    "International Trade Desk",
  ];
  document.getElementById("officeGrid").innerHTML = offices
    .map(
      (a, i) =>
        `<article class="office-card"><span>${String(i + 1).padStart( 2, "0" )}</span><h3>${titles[i]}</h3><p>${a}</p></article>`
    )
    .join("");
}
function openGateway(type) {
  document.body.classList.add("subview");
  state.gateway = type;
  state.hub = null;
  document.getElementById("mainPage").hidden = true;
  document.getElementById("hubView").classList.remove("open");
  document.getElementById("gatewayView").classList.add("open");
  renderGateway(type);
  window.scrollTo(0, 0);
}
function renderGateway(type) {
  const isTrade = type === "trade";
  document.getElementById("gatewayEyebrow").textContent = isTrade
    ? "PRIMARY GATEWAY 01"
    : "PRIMARY GATEWAY 02";
  document.getElementById("gatewayTitleText").textContent = isTrade
    ? tx("tradeTitle")
    : tx("researchTitle");
  document.getElementById("gatewayDescription").textContent = isTrade
    ? tx("tradeText")
    : tx("researchText");
  document.getElementById("hubGridPage").innerHTML = hubs(type)
    .map(
      ([title, desc], i) =>
        `<button class="hub-card" data-hub="${type}:${i}"><span>${String( i + 1 ).padStart( 2, "0" )}</span><h2>${title}</h2><p>${desc}</p><b>â†’</b></button>`
    )
    .join("");
  document.querySelectorAll("[data-hub]").forEach(
    (b) =>
      (b.onclick = () => {
        const [type, index] = b.dataset.hub.split(":");
        openHub(type, +index);
      })
  );
}
function openHub(type, index) {
  state.hub = { type, index };
  document.getElementById("gatewayView").classList.remove("open");
  document.getElementById("hubView").classList.add("open");
  renderHub(type, index);
  window.scrollTo(0, 0);
}
function renderHub(type, index) {
  const [title, desc] = hubs(type)[index];
  document.getElementById("hubNo").textContent = `${ type === "trade" ? tx("tradeTitle") : tx("researchTitle") } Â· ${String(index + 1).padStart(2, "0")}`;
  document.getElementById("hubTitleText").textContent = title;
  document.getElementById("hubDescription").textContent = desc;
  document.getElementById(
    "hubWhatsapp"
  ).href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent( "Inquiry about " + title )}`;
}
function closeGateway() {
  document.body.classList.remove("subview");
  state.gateway = null;
  state.hub = null;
  document.getElementById("gatewayView").classList.remove("open");
  document.getElementById("hubView").classList.remove("open");
  document.getElementById("mainPage").hidden = false;
}
async function askAI(message) {
  const box = document.getElementById("aiMessages");
  box.innerHTML += `<p><b>You:</b> ${escapeHtml(message)}</p>`;
  try {
    const headers = { "Content-Type": "application/json" };
    if (state.admin && state.token)
      headers.Authorization = `Bearer ${state.token}`;
    const r = await fetch("/api/ai", {
      method: "POST",
      headers,
      body: JSON.stringify({
        message,
        mode: state.admin ? "admin" : "visitor",
        language: state.lang,
      }),
    });
    const data = await r.json();
    box.innerHTML += `<p><b>Royal AI:</b> ${escapeHtml( data.reply || "No reply." )}</p>`;
  } catch {
    box.innerHTML += `<p><b>Royal AI:</b> ${ state.admin ? "Admin AI will connect after the Cloudflare Worker is deployed." : "Visitor AI will connect after the Cloudflare Worker is deployed." }</p>`;
  }
  box.scrollTop = box.scrollHeight;
}
function escapeHtml(s) {
  return String(s).replace(
    /[&<>'"]/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[
        c
      ])
  );
}
function init() {
  renderGallery();
  renderOffices();
  document.getElementById(
    "mainWhatsapp"
  ).href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent( "Chilghoza Pine Nuts Trade Inquiry" )}`;
  document.querySelectorAll("[data-open-gateway]").forEach(
    (b) =>
      (b.onclick = (e) => {
        e.preventDefault();
        document.getElementById("mobileDrawer").classList.remove("open");
        openGateway(b.dataset.openGateway);
      })
  );
  document.getElementById("gatewayBack").onclick = closeGateway;
  document.getElementById("hubBack").onclick = () => {
    state.hub = null;
    document.getElementById("hubView").classList.remove("open");
    document.getElementById("gatewayView").classList.add("open");
    renderGateway(state.gateway);
  };
  ["languageSelect", "gatewayLanguage", "hubLanguage"].forEach((id) => {
    const s = document.getElementById(id);
    s.innerHTML = document.getElementById("languageSelect").innerHTML;
    s.onchange = (e) => setLanguage(e.target.value);
  });
  document.getElementById("menuOpen").onclick = () =>
    document.getElementById("mobileDrawer").classList.add("open");
  document.getElementById("menuClose").onclick = () =>
    document.getElementById("mobileDrawer").classList.remove("open");
  document.getElementById("adminOpen").onclick = () =>
    document.getElementById("adminDialog").showModal();
  document.getElementById("adminClose").onclick = () =>
    document.getElementById("adminDialog").close();
  function activateAdminUI() {
    document.getElementById("adminLoginBox").hidden = true;
    document.getElementById("adminTools").hidden = false;
    document.getElementById("adminStatus").textContent =
      "Admin Mode active. Theme, media and Royal AI Admin Assistant controls are ready.";
    const saved = JSON.parse(localStorage.getItem("royalTheme") || "null");
    if (saved) applyTheme(saved);
  }
  function applyTheme(v) {
    document.documentElement.style.setProperty("--forest", v.bg);
    document.documentElement.style.setProperty("--gold", v.gold);
    document.documentElement.style.setProperty("--text", v.text);
    document.documentElement.style.setProperty("--card-accent", v.card);
    document.documentElement.style.setProperty("--font-scale", v.scale);
    document.getElementById("themeBg").value = v.bg;
    document.getElementById("themeGold").value = v.gold;
    document.getElementById("themeText").value = v.text;
    document.getElementById("themeCard").value = v.card;
    document.getElementById("themeScale").value = v.scale;
  }
  function readTheme() {
    return {
      bg: document.getElementById("themeBg").value,
      gold: document.getElementById("themeGold").value,
      text: document.getElementById("themeText").value,
      card: document.getElementById("themeCard").value,
      scale: document.getElementById("themeScale").value,
    };
  }
  ["themeBg", "themeGold", "themeText", "themeCard", "themeScale"].forEach(
    (id) =>
      (document.getElementById(id).oninput = () => applyTheme(readTheme()))
  );
  document.getElementById("themeSave").onclick = () => {
    localStorage.setItem("royalTheme", JSON.stringify(readTheme()));
    document.getElementById("adminStatus").textContent =
      "Theme saved on this device.";
  };
  document.getElementById("themeReset").onclick = () => {
    localStorage.removeItem("royalTheme");
    applyTheme({
      bg: "#03140a",
      gold: "#d4af37",
      text: "#f5f1e8",
      card: "#163d2a",
      scale: "1",
    });
  };
  document.getElementById("mediaUpload").onclick = async () => {
    const file = document.getElementById("mediaFile").files[0],
      status = document.getElementById("mediaStatus");
    if (!file) {
      status.textContent = "Select an image, video or PDF first.";
      return;
    }
    status.textContent = "Uploadingâ€¦";
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", document.getElementById("mediaFolder").value);
      const r = await fetch("/api/media/upload", {
        method: "POST",
        headers: { Authorization: "Bearer " + state.token },
        body: fd,
      });
      const d = await r.json();
      status.textContent = d.ok
        ? "Uploaded: " + d.key
        : d.error || "Upload failed";
    } catch (e) {
      status.textContent = "Upload failed. Check Cloudflare R2 MEDIA binding.";
    }
  };
  document.getElementById("adminLogin").onclick = () => {
    const token = document.getElementById("adminToken").value.trim();
    if (!token) return;
    state.admin = true;
    state.token = token;
    sessionStorage.setItem("royalAdmin", "1");
    sessionStorage.setItem("royalAdminToken", token);
    activateAdminUI();
    applyLanguage();
  };
  const savedTheme = JSON.parse(localStorage.getItem("royalTheme") || "null");
  if (savedTheme) applyTheme(savedTheme);
  if (state.admin) activateAdminUI();
  document.getElementById("aiForm").onsubmit = (e) => {
    e.preventDefault();
    const q = document.getElementById("aiInput").value.trim();
    if (q) {
      askAI(q);
      document.getElementById("aiInput").value = "";
    }
  };
  applyLanguage();
}
document.addEventListener("DOMContentLoaded", init);
