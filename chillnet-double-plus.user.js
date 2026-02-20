// ==UserScript==
// @name         Chillnet Double Plus
// @description  Multi-theme styling, user/phrase filtering, URL auto-linking, and inline media embeds (YouTube, Spotify, X, Reddit, TikTok) for Chillnet.
// @namespace    https://chillnet.me/
// @homepageURL  https://github.com/Artificial-Sweetener/chillnet-double-plus
// @supportURL   https://github.com/Artificial-Sweetener/chillnet-double-plus/issues
// @downloadURL  https://raw.githubusercontent.com/Artificial-Sweetener/chillnet-double-plus/main/chillnet-double-plus.user.js
// @updateURL    https://raw.githubusercontent.com/Artificial-Sweetener/chillnet-double-plus/main/chillnet-double-plus.user.js
// @version      1.0.0
// @author       Artificial Sweetener
// @license      GPL-3.0-only; https://www.gnu.org/licenses/gpl-3.0.html
// @match        https://chillnet.me/*
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.registerMenuCommand
// @run-at       document-start
// ==/UserScript==

(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/theme/theme-registry.js
  var require_theme_registry = __commonJS({
    "src/theme/theme-registry.js"(exports, module) {
      var ORIGINAL_THEME_ID = "original";
      var DARK_THEME_ID = "dark";
      var OLDEN_THEME_ID = "olden";
      var BROWN_THEME_ID = "brown";
      var PINK_THEME_ID = "pink";
      var AURORA_THEME_ID = "aurora";
      var DEFAULT_THEME_ID = DARK_THEME_ID;
      var BASE_DARK_THEME_TOKENS = Object.freeze({
        pageBg: "#000000",
        foreground: "#e8edf2",
        panel: "#111111",
        panelMuted: "#1a1a1a",
        border: "#2a2a2a",
        muted: "#a2adba",
        accent: "#cf5b2d",
        accentStrong: "#e17346",
        accentSoft: "#3d2417",
        accentGlow: "rgba(207, 91, 45, 0.35)",
        shadow: "0 24px 54px -36px rgba(0, 0, 0, 0.95)",
        commentPanel: "#1f1f1f",
        commentBorder: "#323232",
        inlineTriggerBg: "#1a1a1a",
        navActiveStart: "#20150f",
        navActiveEnd: "#161616",
        primaryText: "#fff5f0",
        actionBg: "#151c24",
        actionBorder: "#293a4a",
        actionInk: "#a7c2d9",
        actionActiveBg: "#2a1d16",
        actionActiveBorder: "#5a3525",
        actionActiveInk: "#f0b18f",
        feedSwitchActiveStart: "#26160f",
        feedSwitchActiveEnd: "#171717",
        dangerSoft: "#371616",
        dangerBorder: "#6c2d2d",
        dangerInk: "#f6b9b9",
        sqwangBg: "#20192d",
        sqwangBorder: "#4a3a67",
        sqwangInk: "#d2b8ff",
        commentCallToActionBg: "#162224",
        commentCallToActionBorder: "#2f4a4f",
        commentCallToActionInk: "#a6d5dc",
        hoverBg: "#1f1f1f",
        pollCardBg: "#141414",
        pollOptionBg: "#1a1a1a",
        pollOptionHoverBg: "#202020",
        pollOptionBarBg: "#2a2a2a",
        donateTagBg: "#2a1f18",
        donateTagBorder: "#5e3d2a",
        donateTagInk: "#efc7a0",
        donateSurfaceBg: "#111111",
        donateFeaturedBg: "#17120e",
        donateFeaturedBorder: "#6a4428",
        donateFeaturedShadow: "0 20px 36px -26px rgba(116, 72, 37, 0.55)",
        specialChipBg: "#3a2e11",
        specialChipBorder: "#6a5624",
        specialChipInk: "#f2d992",
        specialItemBg: "#15120c",
        specialItemBorder: "#5b4322",
        specialItemShadow: "inset 0 0 0 1px rgba(255, 210, 140, 0.06)",
        specialItemHoverBg: "#1a150d",
        specialItemHoverBorder: "#735529",
        specialItemText: "#f4e5ba",
        specialItemMuted: "#c7b487",
        emojiButtonBg: "#161616",
        emojiButtonBorder: "#363636",
        emojiButtonInk: "#e9eef3",
        emojiButtonHoverBg: "#1f1f1f",
        canvasWrapBg: "#0f0f0f",
        canvasWrapBorder: "#2e2e2e",
        canvasBg: "#171717",
        canvasBorder: "#343434",
        moduleBlockBg: "#171717",
        moduleBlockBorder: "#353535",
        moduleBlockInk: "#d7e2ee",
        moduleMuted: "#a2adba",
        statusBg: "#143226",
        statusBorder: "#2e624b",
        statusInk: "#9fe9cb",
        inputBg: "#0a0a0a"
      });
      var THEMES = Object.freeze([
        Object.freeze({
          id: ORIGINAL_THEME_ID,
          label: "Original theme",
          mode: "light",
          useCustomStyles: false,
          tokens: Object.freeze({})
        }),
        Object.freeze({
          id: DARK_THEME_ID,
          label: "Dark mode",
          mode: "dark",
          useCustomStyles: true,
          tokens: BASE_DARK_THEME_TOKENS,
          cssOverrides: ""
        }),
        Object.freeze({
          id: OLDEN_THEME_ID,
          label: "Olden mode",
          mode: "light",
          useCustomStyles: true,
          tokens: Object.freeze({
            ...BASE_DARK_THEME_TOKENS,
            pageBg: "#efe2c8",
            foreground: "#2f2114",
            panel: "#f6ead1",
            panelMuted: "#ead9b7",
            border: "#b89963",
            muted: "#6f5736",
            accent: "#7f4224",
            accentStrong: "#9f6038",
            accentSoft: "#d5ba8a",
            accentGlow: "rgba(127, 66, 36, 0.28)",
            shadow: "0 24px 44px -34px rgba(78, 52, 27, 0.5)",
            commentPanel: "#f2e3c4",
            commentBorder: "#c8ad7c",
            inlineTriggerBg: "#e5d2ae",
            navActiveStart: "#e6d2ab",
            navActiveEnd: "#d7be8f",
            primaryText: "#fff7ec",
            actionBg: "#e5d0a9",
            actionBorder: "#b99259",
            actionInk: "#5a3d23",
            actionActiveBg: "#d3b07a",
            actionActiveBorder: "#996534",
            actionActiveInk: "#3d2614",
            feedSwitchActiveStart: "#dcc08f",
            feedSwitchActiveEnd: "#cfab73",
            dangerSoft: "#e7c3b8",
            dangerBorder: "#b16952",
            dangerInk: "#5f2316",
            sqwangBg: "#d6c2db",
            sqwangBorder: "#9673ab",
            sqwangInk: "#4f355f",
            commentCallToActionBg: "#d9d2b6",
            commentCallToActionBorder: "#8b8762",
            commentCallToActionInk: "#3e3a1d",
            hoverBg: "#ecddbf",
            pollCardBg: "#f1e1c1",
            pollOptionBg: "#ead4ae",
            pollOptionHoverBg: "#e1c699",
            pollOptionBarBg: "#cfb183",
            donateTagBg: "#d4bc8e",
            donateTagBorder: "#a37b48",
            donateTagInk: "#4b2f1b",
            donateSurfaceBg: "#f1e2c4",
            donateFeaturedBg: "#e8d0a5",
            donateFeaturedBorder: "#a57742",
            donateFeaturedShadow: "0 20px 34px -24px rgba(131, 91, 49, 0.44)",
            specialChipBg: "#e2d29a",
            specialChipBorder: "#9f8642",
            specialChipInk: "#4d3a10",
            specialItemBg: "#efe0c0",
            specialItemBorder: "#b69b66",
            specialItemShadow: "inset 0 0 0 1px rgba(117, 89, 52, 0.12)",
            specialItemHoverBg: "#e7d2aa",
            specialItemHoverBorder: "#a88753",
            specialItemText: "#4c351f",
            specialItemMuted: "#765635",
            emojiButtonBg: "#e8d4ad",
            emojiButtonBorder: "#ad8b56",
            emojiButtonInk: "#4d311a",
            emojiButtonHoverBg: "#dcc092",
            canvasWrapBg: "#e8d8b8",
            canvasWrapBorder: "#b79a68",
            canvasBg: "#f2e3c7",
            canvasBorder: "#c6a874",
            moduleBlockBg: "#ebd9b4",
            moduleBlockBorder: "#b39261",
            moduleBlockInk: "#4d331d",
            moduleMuted: "#6f5839",
            statusBg: "#d2ddc2",
            statusBorder: "#86a16c",
            statusInk: "#304420",
            inputBg: "#f9efd9"
          }),
          cssOverrides: `
@font-face {
  font-family: "UnifrakturCook";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("https://fonts.gstatic.com/s/unifrakturcook/v25/IurA6Yli8YOdcoky-0PTTdkm56n05Uw1.ttf")
    format("truetype");
}

@font-face {
  font-family: "Pirata One";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("https://fonts.gstatic.com/s/pirataone/v23/I_urMpiDvgLdLh0fAtoftig.ttf")
    format("truetype");
}

html[data-cdp-theme="olden"],
html[data-cdp-theme="olden"] body {
  font-family:
    "Palatino Linotype",
    "Book Antiqua",
    "Goudy Old Style",
    "Times New Roman",
    serif !important;
}

html[data-cdp-theme="olden"] .cn-feed-text,
html[data-cdp-theme="olden"] .cn-comment-text {
  font-family:
    "Pirata One",
    "Book Antiqua",
    "Palatino Linotype",
    "Times New Roman",
    cursive !important;
  letter-spacing: 0.013em;
}

html[data-cdp-theme="olden"] .cn-feed-text,
html[data-cdp-theme="olden"] .cn-comment-text {
  font-size: 1.08em;
  line-height: 1.56;
}

html[data-cdp-theme="olden"] body {
  background-image:
    radial-gradient(circle at 14% 12%, rgba(160, 115, 49, 0.16), transparent 34%),
    radial-gradient(circle at 88% 18%, rgba(112, 79, 34, 0.12), transparent 36%),
    linear-gradient(180deg, rgba(255, 248, 232, 0.24), rgba(255, 248, 232, 0.06));
}

html[data-cdp-theme="olden"] .cn-feed-card,
html[data-cdp-theme="olden"] .cn-compose-card,
html[data-cdp-theme="olden"] .cn-rail-card,
html[data-cdp-theme="olden"] .cn-comments-block,
html[data-cdp-theme="olden"] .cn-comment-item {
  background-image:
    linear-gradient(180deg, rgba(255, 252, 244, 0.28), rgba(255, 252, 244, 0)),
    repeating-linear-gradient(
      -8deg,
      rgba(120, 85, 44, 0.028) 0px,
      rgba(120, 85, 44, 0.028) 1px,
      transparent 1px,
      transparent 7px
    ) !important;
}

html[data-cdp-theme="olden"] .cn-feed-text,
html[data-cdp-theme="olden"] .cn-comment-text,
html[data-cdp-theme="olden"] .cn-post-stats,
html[data-cdp-theme="olden"] .cn-post-actions {
  letter-spacing: 0.012em;
}

html[data-cdp-theme="olden"] .cn-feed-card .cn-feed-text::first-letter {
  float: left;
  margin: 0.08em 0.24em 0 0;
  padding: 0.14em 0.22em 0.1em;
  border: 1px solid #8f6a3f;
  border-radius: 3px;
  background:
    linear-gradient(180deg, rgba(255, 251, 242, 0.75), rgba(226, 198, 151, 0.66)),
    repeating-linear-gradient(
      -10deg,
      rgba(126, 86, 37, 0.15) 0px,
      rgba(126, 86, 37, 0.15) 1px,
      transparent 1px,
      transparent 6px
    );
  color: #5e3116;
  font-family:
    "UnifrakturCook",
    "Old English Text MT",
    "Book Antiqua",
    cursive !important;
  font-size: 2.3em;
  line-height: 0.9;
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.44);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.34),
    0 2px 5px rgba(69, 43, 16, 0.24);
}
`
        }),
        Object.freeze({
          id: BROWN_THEME_ID,
          label: "Brown mode",
          mode: "dark",
          useCustomStyles: true,
          tokens: Object.freeze({
            ...BASE_DARK_THEME_TOKENS,
            pageBg: "#100b07",
            foreground: "#f1e7dc",
            panel: "#1a130f",
            panelMuted: "#251a15",
            border: "#3c2d23",
            muted: "#c0a895",
            accent: "#a26b3f",
            accentStrong: "#c88d59",
            accentSoft: "#3f2a1e",
            accentGlow: "rgba(162, 107, 63, 0.36)",
            commentPanel: "#211814",
            commentBorder: "#463428",
            navActiveStart: "#2d1d15",
            navActiveEnd: "#1b1310",
            actionBg: "#201a16",
            actionBorder: "#4f3d31",
            actionInk: "#d6beab",
            actionActiveBg: "#352319",
            actionActiveBorder: "#7a4e31",
            actionActiveInk: "#f4c79c",
            sqwangBg: "#2a1f31",
            sqwangBorder: "#5f4a6f",
            sqwangInk: "#dcbdf0",
            commentCallToActionBg: "#1a2520",
            commentCallToActionBorder: "#3b5d4f",
            commentCallToActionInk: "#b4ddcf",
            pollCardBg: "#1a130f",
            pollOptionBg: "#241913",
            pollOptionHoverBg: "#2b1e17",
            pollOptionBarBg: "#3e3025",
            donateTagBg: "#342619",
            donateTagBorder: "#735234",
            donateTagInk: "#f0cda8",
            donateFeaturedBg: "#21160f",
            donateFeaturedBorder: "#7a532f",
            donateFeaturedShadow: "0 20px 36px -26px rgba(129, 86, 49, 0.52)",
            specialChipBg: "#4b3a1b",
            specialChipBorder: "#8c7131",
            specialChipInk: "#f8dfa2",
            specialItemBg: "#1b150e",
            specialItemBorder: "#6f542b",
            specialItemHoverBg: "#251b11",
            specialItemHoverBorder: "#8a6835",
            moduleBlockBg: "#211914",
            moduleBlockBorder: "#4b382a",
            moduleMuted: "#b99f8a",
            inputBg: "#140f0b"
          }),
          cssOverrides: ""
        }),
        Object.freeze({
          id: PINK_THEME_ID,
          label: "Pink mode",
          mode: "dark",
          useCustomStyles: true,
          tokens: Object.freeze({
            ...BASE_DARK_THEME_TOKENS,
            pageBg: "#09090c",
            foreground: "#f2eef8",
            panel: "#141418",
            panelMuted: "#1f1f26",
            border: "#363544",
            muted: "#c1b2ce",
            accent: "#cd4f94",
            accentStrong: "#e774b2",
            accentSoft: "#3f1e34",
            accentGlow: "rgba(205, 79, 148, 0.34)",
            commentPanel: "#1d1c24",
            commentBorder: "#3f3d4f",
            navActiveStart: "#2e1830",
            navActiveEnd: "#191720",
            actionBg: "#1c1f2a",
            actionBorder: "#434765",
            actionInk: "#c4d4f2",
            actionActiveBg: "#3a1f38",
            actionActiveBorder: "#7f3f73",
            actionActiveInk: "#f1b2d7",
            feedSwitchActiveStart: "#331a34",
            feedSwitchActiveEnd: "#1b1824",
            sqwangBg: "#2a1d38",
            sqwangBorder: "#5d4482",
            sqwangInk: "#debcff",
            commentCallToActionBg: "#1a2731",
            commentCallToActionBorder: "#3c6072",
            commentCallToActionInk: "#b9e0f1",
            hoverBg: "#252632",
            pollCardBg: "#171824",
            pollOptionBg: "#222332",
            pollOptionHoverBg: "#2a2c3f",
            pollOptionBarBg: "#3a3f58",
            donateTagBg: "#3a2132",
            donateTagBorder: "#7f4668",
            donateTagInk: "#f2bfdc",
            donateFeaturedBg: "#241824",
            donateFeaturedBorder: "#7f4f7f",
            donateFeaturedShadow: "0 20px 36px -26px rgba(140, 79, 134, 0.54)",
            specialChipBg: "#4b2c47",
            specialChipBorder: "#935c88",
            specialChipInk: "#f6d6ee",
            specialItemBg: "#1d1625",
            specialItemBorder: "#69407a",
            specialItemHoverBg: "#281d32",
            specialItemHoverBorder: "#81509a",
            specialItemText: "#f5dff7",
            specialItemMuted: "#d3b5dc",
            emojiButtonBg: "#201f2d",
            emojiButtonBorder: "#474563",
            emojiButtonInk: "#f3eefd",
            emojiButtonHoverBg: "#2b2a3d",
            canvasWrapBg: "#111321",
            canvasWrapBorder: "#333a58",
            canvasBg: "#1a1d2f",
            canvasBorder: "#3f4769",
            moduleBlockBg: "#211f2d",
            moduleBlockBorder: "#474363",
            moduleBlockInk: "#e8def7",
            moduleMuted: "#c5b3d7",
            statusBg: "#243424",
            statusBorder: "#49714a",
            statusInk: "#c2efc4",
            inputBg: "#12131e"
          }),
          cssOverrides: ""
        }),
        Object.freeze({
          id: AURORA_THEME_ID,
          label: "Aurora mode",
          mode: "dark",
          useCustomStyles: true,
          tokens: Object.freeze({
            ...BASE_DARK_THEME_TOKENS,
            pageBg: "#070a10",
            foreground: "#ebf3ff",
            panel: "#121723",
            panelMuted: "#1b2434",
            border: "#32435f",
            muted: "#aac0e2",
            accent: "#4db4ff",
            accentStrong: "#7ae874",
            accentSoft: "#1f3556",
            accentGlow: "rgba(109, 200, 255, 0.35)",
            shadow: "0 24px 54px -36px rgba(12, 25, 47, 0.92)",
            commentPanel: "#1a2230",
            commentBorder: "#405271",
            navActiveStart: "#2b2f5a",
            navActiveEnd: "#182337",
            actionBg: "#162336",
            actionBorder: "#315681",
            actionInk: "#a9d4ff",
            actionActiveBg: "#2a2c56",
            actionActiveBorder: "#5b63aa",
            actionActiveInk: "#d3d8ff",
            feedSwitchActiveStart: "#2f2b63",
            feedSwitchActiveEnd: "#16283d",
            sqwangBg: "#2a1f45",
            sqwangBorder: "#5f49a3",
            sqwangInk: "#d6c7ff",
            commentCallToActionBg: "#1b2d2a",
            commentCallToActionBorder: "#3e7568",
            commentCallToActionInk: "#bcf2e4",
            hoverBg: "#233149",
            pollCardBg: "#182235",
            pollOptionBg: "#24324a",
            pollOptionHoverBg: "#2d3d59",
            pollOptionBarBg: "#3c547b",
            donateTagBg: "#312a53",
            donateTagBorder: "#7265bc",
            donateTagInk: "#dbd3ff",
            donateSurfaceBg: "#121826",
            donateFeaturedBg: "#1e2240",
            donateFeaturedBorder: "#5b66b5",
            donateFeaturedShadow: "0 20px 36px -26px rgba(89, 129, 210, 0.52)",
            specialChipBg: "#3f3d14",
            specialChipBorder: "#87833a",
            specialChipInk: "#f5efb4",
            specialItemBg: "#191f30",
            specialItemBorder: "#4b5f88",
            specialItemHoverBg: "#202a3f",
            specialItemHoverBorder: "#6077ab",
            specialItemText: "#dce8ff",
            specialItemMuted: "#b8c7e8",
            emojiButtonBg: "#1e2940",
            emojiButtonBorder: "#48608e",
            emojiButtonInk: "#e6f2ff",
            emojiButtonHoverBg: "#263655",
            canvasWrapBg: "#121c2c",
            canvasWrapBorder: "#3c567f",
            canvasBg: "#1a2940",
            canvasBorder: "#4f6e9f",
            moduleBlockBg: "#1d2a3f",
            moduleBlockBorder: "#466696",
            moduleBlockInk: "#dcecff",
            moduleMuted: "#afc7ea",
            statusBg: "#213525",
            statusBorder: "#4d8758",
            statusInk: "#caf8d3",
            inputBg: "#0f1726"
          }),
          cssOverrides: ""
        })
      ]);
      var THEME_DEFINITION_BY_ID = new Map(THEMES.map((theme) => [theme.id, theme]));
      function getThemeDefinition(themeId) {
        if (typeof themeId === "string" && THEME_DEFINITION_BY_ID.has(themeId)) {
          return (
            /** @type {any} */
            THEME_DEFINITION_BY_ID.get(themeId)
          );
        }
        return (
          /** @type {any} */
          THEME_DEFINITION_BY_ID.get(DEFAULT_THEME_ID)
        );
      }
      function isValidThemeId(themeId) {
        return typeof themeId === "string" && THEME_DEFINITION_BY_ID.has(themeId);
      }
      function listThemeOptions() {
        return THEMES.map((theme) => ({
          id: theme.id,
          label: theme.label
        }));
      }
      module.exports = {
        BASE_DARK_THEME_TOKENS,
        BROWN_THEME_ID,
        DARK_THEME_ID,
        DEFAULT_THEME_ID,
        OLDEN_THEME_ID,
        ORIGINAL_THEME_ID,
        PINK_THEME_ID,
        AURORA_THEME_ID,
        THEMES,
        getThemeDefinition,
        isValidThemeId,
        listThemeOptions
      };
    }
  });

  // src/dom/style-manager.js
  var require_style_manager = __commonJS({
    "src/dom/style-manager.js"(exports, module) {
      var { getThemeDefinition } = require_theme_registry();
      var STYLE_ID = "cdp-runtime-style";
      var THEME_ID_ATTRIBUTE = "data-cdp-theme";
      var THEME_MODE_ATTRIBUTE = "data-cdp-theme-mode";
      function queueThemeApplyOnDocumentReady(themeId) {
        if (!globalThis.document || globalThis.document.documentElement) {
          return;
        }
        const onReadyStateChange = () => {
          if (globalThis.document.documentElement) {
            setActiveTheme(themeId);
            globalThis.document.removeEventListener("readystatechange", onReadyStateChange);
          }
        };
        globalThis.document.addEventListener("readystatechange", onReadyStateChange);
      }
      function queueStyleInjectionOnHeadReady(cssText) {
        if (!globalThis.document || globalThis.document.head) {
          return;
        }
        const onReadyStateChange = () => {
          if (globalThis.document.head) {
            ensureThemeStyleTag(cssText);
            globalThis.document.removeEventListener("readystatechange", onReadyStateChange);
          }
        };
        globalThis.document.addEventListener("readystatechange", onReadyStateChange);
      }
      function ensureThemeStyleTag(cssText) {
        if (!globalThis.document || !globalThis.document.head) {
          queueStyleInjectionOnHeadReady(cssText);
          return null;
        }
        let styleTag = globalThis.document.getElementById(STYLE_ID);
        if (!styleTag) {
          styleTag = globalThis.document.createElement("style");
          styleTag.id = STYLE_ID;
          globalThis.document.head.appendChild(styleTag);
        }
        if (styleTag.textContent !== cssText) {
          styleTag.textContent = cssText;
        }
        return styleTag;
      }
      function setActiveTheme(themeId) {
        if (!globalThis.document || !globalThis.document.documentElement) {
          queueThemeApplyOnDocumentReady(themeId);
          return;
        }
        const themeDefinition = getThemeDefinition(themeId);
        globalThis.document.documentElement.setAttribute(THEME_ID_ATTRIBUTE, themeDefinition.id);
        globalThis.document.documentElement.setAttribute(THEME_MODE_ATTRIBUTE, themeDefinition.mode);
      }
      function queueIntegrityWatchersOnDocumentReady(getThemeId, cssText) {
        if (!globalThis.document || globalThis.document.documentElement) {
          return;
        }
        const onReadyStateChange = () => {
          if (globalThis.document.documentElement) {
            installThemeIntegrityWatchers(getThemeId, cssText);
            globalThis.document.removeEventListener("readystatechange", onReadyStateChange);
          }
        };
        globalThis.document.addEventListener("readystatechange", onReadyStateChange);
      }
      function hasExpectedThemeAttributes(themeId) {
        if (!globalThis.document || !globalThis.document.documentElement) {
          return false;
        }
        const themeDefinition = getThemeDefinition(themeId);
        const activeThemeId = globalThis.document.documentElement.getAttribute(THEME_ID_ATTRIBUTE);
        const activeThemeMode = globalThis.document.documentElement.getAttribute(THEME_MODE_ATTRIBUTE);
        return activeThemeId === themeDefinition.id && activeThemeMode === themeDefinition.mode;
      }
      function installThemeIntegrityWatchers(getThemeId, cssText) {
        if (!globalThis.document || !globalThis.document.documentElement) {
          queueIntegrityWatchersOnDocumentReady(getThemeId, cssText);
          return;
        }
        const refreshThemeState = () => {
          ensureThemeStyleTag(cssText);
          setActiveTheme(getThemeId());
        };
        refreshThemeState();
        if (globalThis.document.head && typeof globalThis.MutationObserver === "function") {
          const headObserver = new globalThis.MutationObserver(() => {
            if (!globalThis.document.getElementById(STYLE_ID)) {
              refreshThemeState();
            }
          });
          headObserver.observe(globalThis.document.head, { childList: true });
        }
        if (typeof globalThis.MutationObserver === "function") {
          const htmlAttributeObserver = new globalThis.MutationObserver(() => {
            if (!hasExpectedThemeAttributes(getThemeId())) {
              refreshThemeState();
            }
          });
          htmlAttributeObserver.observe(globalThis.document.documentElement, {
            attributes: true,
            attributeFilter: [THEME_ID_ATTRIBUTE, THEME_MODE_ATTRIBUTE]
          });
        }
        globalThis.document.addEventListener("readystatechange", refreshThemeState);
        globalThis.addEventListener("DOMContentLoaded", refreshThemeState);
        globalThis.addEventListener("load", refreshThemeState);
        globalThis.addEventListener("popstate", refreshThemeState);
        globalThis.addEventListener("pageshow", refreshThemeState);
        globalThis.document.addEventListener("visibilitychange", () => {
          if (!globalThis.document.hidden) {
            refreshThemeState();
          }
        });
      }
      module.exports = {
        STYLE_ID,
        THEME_ID_ATTRIBUTE,
        THEME_MODE_ATTRIBUTE,
        ensureThemeStyleTag,
        installThemeIntegrityWatchers,
        setActiveTheme
      };
    }
  });

  // src/dom/embed-renderer.js
  var require_embed_renderer = __commonJS({
    "src/dom/embed-renderer.js"(exports, module) {
      var { THEME_MODE_ATTRIBUTE } = require_style_manager();
      var EMBED_STACK_SELECTOR = "[data-cdp-embed-stack]";
      function createImageFallbackLink(sourceUrl) {
        const fallbackLink = globalThis.document.createElement("a");
        fallbackLink.href = sourceUrl;
        fallbackLink.target = "_blank";
        fallbackLink.rel = "noopener noreferrer";
        fallbackLink.className = "cdp-embed-link cdp-embed-link-fallback";
        fallbackLink.textContent = "Open image";
        return fallbackLink;
      }
      function resolveXFrameUrl(rawUrl) {
        let parsedUrl;
        try {
          parsedUrl = new URL(rawUrl);
        } catch (_error) {
          return rawUrl;
        }
        const isDarkTheme = globalThis.document && globalThis.document.documentElement.getAttribute(THEME_MODE_ATTRIBUTE) === "dark";
        parsedUrl.searchParams.set("theme", isDarkTheme ? "dark" : "light");
        return parsedUrl.toString();
      }
      function createIframeEmbedCard(options) {
        const embedCard = globalThis.document.createElement("div");
        embedCard.className = "cdp-embed-card";
        embedCard.setAttribute("data-cdp-embed-key", options.descriptor.key);
        const frameWrap = globalThis.document.createElement("div");
        frameWrap.className = options.frameClassName;
        const iframeElement = globalThis.document.createElement("iframe");
        iframeElement.src = options.descriptor.embedUrl || "";
        iframeElement.loading = "lazy";
        iframeElement.width = "100%";
        iframeElement.height = String(options.descriptor.frameHeight || options.fallbackHeight);
        iframeElement.allow = options.iframeAllow;
        iframeElement.referrerPolicy = "strict-origin-when-cross-origin";
        iframeElement.title = options.descriptor.title || options.fallbackTitle;
        if (options.allowFullscreen) {
          iframeElement.allowFullscreen = true;
        }
        frameWrap.appendChild(iframeElement);
        embedCard.appendChild(frameWrap);
        return embedCard;
      }
      function ensureEmbedStack(postCard) {
        const existingStack = postCard.querySelector(EMBED_STACK_SELECTOR);
        if (existingStack) {
          return (
            /** @type {HTMLElement} */
            existingStack
          );
        }
        const embedStack = globalThis.document.createElement("div");
        embedStack.className = "cdp-embed-stack";
        embedStack.setAttribute("data-cdp-embed-stack", "true");
        const anchorElement = postCard.querySelector(".cn-feed-text, .cn-poll-card");
        if (anchorElement && anchorElement.parentElement) {
          anchorElement.insertAdjacentElement("afterend", embedStack);
        } else {
          postCard.appendChild(embedStack);
        }
        return embedStack;
      }
      function createEmbedNode(descriptor) {
        if (descriptor.kind === "youtube") {
          return createIframeEmbedCard({
            descriptor,
            frameClassName: "cdp-embed-video",
            iframeAllow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullscreen: true,
            fallbackHeight: 400,
            fallbackTitle: "YouTube video preview"
          });
        }
        if (descriptor.kind === "spotify") {
          return createIframeEmbedCard({
            descriptor,
            frameClassName: "cdp-embed-spotify",
            iframeAllow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
            fallbackHeight: 352,
            fallbackTitle: "Spotify preview"
          });
        }
        if (descriptor.kind === "x") {
          return createIframeEmbedCard({
            descriptor: {
              ...descriptor,
              embedUrl: resolveXFrameUrl(descriptor.embedUrl || "")
            },
            frameClassName: "cdp-embed-social",
            iframeAllow: "clipboard-write; encrypted-media; fullscreen; picture-in-picture",
            allowFullscreen: true,
            fallbackHeight: 560,
            fallbackTitle: "X post preview"
          });
        }
        if (descriptor.kind === "reddit") {
          return createIframeEmbedCard({
            descriptor,
            frameClassName: "cdp-embed-social",
            iframeAllow: "clipboard-write; encrypted-media; fullscreen; picture-in-picture",
            allowFullscreen: true,
            fallbackHeight: 520,
            fallbackTitle: "Reddit post preview"
          });
        }
        if (descriptor.kind === "tiktok") {
          return createIframeEmbedCard({
            descriptor,
            frameClassName: "cdp-embed-social cdp-embed-social-vertical",
            iframeAllow: "autoplay; encrypted-media; fullscreen; picture-in-picture",
            allowFullscreen: true,
            fallbackHeight: 760,
            fallbackTitle: "TikTok video preview"
          });
        }
        const embedCard = globalThis.document.createElement("div");
        embedCard.className = "cdp-embed-card";
        embedCard.setAttribute("data-cdp-embed-key", descriptor.key);
        const imageLink = globalThis.document.createElement("a");
        imageLink.href = descriptor.sourceUrl;
        imageLink.target = "_blank";
        imageLink.rel = "noopener noreferrer";
        imageLink.className = "cdp-embed-link";
        const imageElement = globalThis.document.createElement("img");
        imageElement.src = descriptor.sourceUrl;
        imageElement.loading = "lazy";
        imageElement.alt = "Embedded image";
        imageElement.addEventListener(
          "error",
          () => {
            if (!imageLink.isConnected) {
              return;
            }
            imageLink.replaceWith(createImageFallbackLink(descriptor.sourceUrl));
          },
          { once: true }
        );
        imageLink.appendChild(imageElement);
        embedCard.appendChild(imageLink);
        return embedCard;
      }
      function clearEmbeds(postCard) {
        const embedStack = postCard.querySelector(EMBED_STACK_SELECTOR);
        if (!embedStack) {
          return;
        }
        embedStack.remove();
      }
      function renderEmbeds(postCard, descriptors) {
        if (descriptors.length === 0) {
          clearEmbeds(postCard);
          return;
        }
        const embedStack = ensureEmbedStack(postCard);
        if (!embedStack) {
          return;
        }
        const existingByKey = /* @__PURE__ */ new Map();
        for (const childElement of Array.from(embedStack.children)) {
          const embedKey = childElement.getAttribute("data-cdp-embed-key");
          if (embedKey) {
            existingByKey.set(embedKey, childElement);
          }
        }
        const desiredKeys = /* @__PURE__ */ new Set();
        for (const descriptor of descriptors) {
          desiredKeys.add(descriptor.key);
          if (!existingByKey.has(descriptor.key)) {
            embedStack.appendChild(createEmbedNode(descriptor));
          }
        }
        for (const [embedKey, element] of existingByKey.entries()) {
          if (!desiredKeys.has(embedKey)) {
            element.remove();
          }
        }
      }
      module.exports = {
        clearEmbeds,
        renderEmbeds
      };
    }
  });

  // src/core/post-model.js
  var require_post_model = __commonJS({
    "src/core/post-model.js"(exports, module) {
      function normalizeWhitespace(value) {
        return value.replace(/\s+/g, " ").trim();
      }
      function createPostSignature(postModel) {
        const urlSignature = postModel.externalUrls.join("|");
        return normalizeWhitespace(
          `${postModel.postId}|${postModel.username}|${postModel.displayName}|${postModel.textContent}|${urlSignature}`
        );
      }
      module.exports = {
        createPostSignature,
        normalizeWhitespace
      };
    }
  });

  // src/core/url-utils.js
  var require_url_utils = __commonJS({
    "src/core/url-utils.js"(exports, module) {
      var URL_PATTERN = /https?:\/\/[^\s<>"')\]]+/gi;
      function parseUrl(rawUrl) {
        try {
          return new URL(rawUrl);
        } catch (_error) {
          return null;
        }
      }
      function trimUrlPunctuation(rawUrl) {
        return rawUrl.replace(/[),.!?]+$/g, "");
      }
      function isChillnetUrl(parsedUrl) {
        return /(^|\.)chillnet\.me$/i.test(parsedUrl.hostname);
      }
      function middleElideUrl(urlText, maxChars) {
        if (urlText.length <= maxChars) {
          return urlText;
        }
        const safeMax = Math.max(18, maxChars);
        const headChars = Math.floor((safeMax - 1) * 0.62);
        const tailChars = safeMax - 1 - headChars;
        return `${urlText.slice(0, headChars)}\u2026${urlText.slice(-tailChars)}`;
      }
      module.exports = {
        URL_PATTERN,
        isChillnetUrl,
        middleElideUrl,
        parseUrl,
        trimUrlPunctuation
      };
    }
  });

  // src/dom/post-selectors.js
  var require_post_selectors = __commonJS({
    "src/dom/post-selectors.js"(exports, module) {
      var POST_CARD_SELECTOR = ".cn-feed-card";
      var POST_USER_NAME_SELECTOR = ".cn-feed-user-name";
      var POST_USER_HANDLE_SELECTOR = ".cn-feed-user-handle";
      var POST_DATE_LINK_SELECTOR = '.cn-feed-date-link, .cn-feed-date a, a[href*="/p/"]';
      var POST_EXTERNAL_LINK_SELECTOR = 'a[href^="http"]';
      var POST_CONTENT_TEXT_SELECTORS = [".cn-feed-text", ".cn-poll-title", ".cn-poll-option-label"];
      var COMMENT_ITEM_SELECTOR = ".cn-comment-item";
      var COMMENT_AUTHOR_SELECTOR = ".cn-comment-author";
      var COMMENT_TEXT_SELECTOR = ".cn-comment-text";
      var COMMENT_STATS_SELECTOR = ".cn-post-stats-right";
      module.exports = {
        COMMENT_AUTHOR_SELECTOR,
        COMMENT_ITEM_SELECTOR,
        COMMENT_STATS_SELECTOR,
        COMMENT_TEXT_SELECTOR,
        POST_CARD_SELECTOR,
        POST_CONTENT_TEXT_SELECTORS,
        POST_DATE_LINK_SELECTOR,
        POST_EXTERNAL_LINK_SELECTOR,
        POST_USER_HANDLE_SELECTOR,
        POST_USER_NAME_SELECTOR
      };
    }
  });

  // src/dom/post-extractor.js
  var require_post_extractor = __commonJS({
    "src/dom/post-extractor.js"(exports, module) {
      var { createPostSignature, normalizeWhitespace } = require_post_model();
      var { URL_PATTERN, isChillnetUrl, parseUrl, trimUrlPunctuation } = require_url_utils();
      var {
        POST_CONTENT_TEXT_SELECTORS,
        POST_DATE_LINK_SELECTOR,
        POST_EXTERNAL_LINK_SELECTOR,
        POST_USER_HANDLE_SELECTOR,
        POST_USER_NAME_SELECTOR
      } = require_post_selectors();
      function normalizeUsername(username) {
        return username.replace(/^@+/, "").trim();
      }
      function extractUsernameFromProfileLink(postCard) {
        const profileLink = postCard.querySelector('a[href*="/u/"]');
        if (!profileLink) {
          return "";
        }
        const href = profileLink.getAttribute("href") || "";
        const absoluteUrl = href.startsWith("http") ? href : `https://chillnet.me${href}`;
        const parsedUrl = parseUrl(absoluteUrl);
        if (!parsedUrl) {
          return "";
        }
        const pathMatch = parsedUrl.pathname.match(/\/u\/([^/?#]+)/i);
        if (!pathMatch) {
          return "";
        }
        return normalizeUsername(decodeURIComponent(pathMatch[1]));
      }
      function extractUsernameFromHandle(postCard) {
        const handleElement = postCard.querySelector(POST_USER_HANDLE_SELECTOR);
        const handleText = normalizeWhitespace(handleElement ? handleElement.textContent || "" : "");
        const usernameMatch = handleText.match(/@([A-Za-z0-9_]+)/);
        if (!usernameMatch) {
          return "";
        }
        return normalizeUsername(usernameMatch[1]);
      }
      function extractDisplayName(postCard) {
        const nameElement = postCard.querySelector(POST_USER_NAME_SELECTOR);
        return normalizeWhitespace(nameElement ? nameElement.textContent || "" : "");
      }
      function extractPostId(postCard, index) {
        const permalinkElement = postCard.querySelector(POST_DATE_LINK_SELECTOR);
        if (permalinkElement) {
          const href = permalinkElement.getAttribute("href") || "";
          const absoluteUrl = href.startsWith("http") ? href : `https://chillnet.me${href}`;
          const parsedUrl = parseUrl(absoluteUrl);
          if (parsedUrl) {
            const pathMatch = parsedUrl.pathname.match(/\/p\/([^/?#]+)/i);
            if (pathMatch) {
              return `post:${pathMatch[1]}`;
            }
          }
        }
        return `card-index:${index}`;
      }
      function extractCardText(postCard) {
        const uniqueChunks = /* @__PURE__ */ new Set();
        for (const selector of POST_CONTENT_TEXT_SELECTORS) {
          for (const element of postCard.querySelectorAll(selector)) {
            const chunk = normalizeWhitespace(element.textContent || "");
            if (chunk) {
              uniqueChunks.add(chunk);
            }
          }
        }
        return Array.from(uniqueChunks).join("\n");
      }
      function addExternalUrl(urls, rawUrl) {
        const normalizedUrl = trimUrlPunctuation(rawUrl);
        const parsedUrl = parseUrl(normalizedUrl);
        if (!parsedUrl || isChillnetUrl(parsedUrl)) {
          return;
        }
        urls.add(parsedUrl.toString());
      }
      function extractExternalUrlsFromPlainText(postCard) {
        const urls = /* @__PURE__ */ new Set();
        const walker = globalThis.document.createTreeWalker(postCard, globalThis.NodeFilter.SHOW_TEXT);
        let currentNode = walker.nextNode();
        while (currentNode) {
          const parentElement = currentNode.parentElement;
          if (parentElement && parentElement.closest("a")) {
            currentNode = walker.nextNode();
            continue;
          }
          const textValue = currentNode.nodeValue || "";
          URL_PATTERN.lastIndex = 0;
          const matches = textValue.match(URL_PATTERN) || [];
          for (const match of matches) {
            addExternalUrl(urls, match);
          }
          currentNode = walker.nextNode();
        }
        return Array.from(urls);
      }
      function extractExternalUrls(postCard) {
        const urls = /* @__PURE__ */ new Set();
        for (const anchorElement of postCard.querySelectorAll(POST_EXTERNAL_LINK_SELECTOR)) {
          addExternalUrl(urls, anchorElement.getAttribute("href") || "");
        }
        for (const plainTextUrl of extractExternalUrlsFromPlainText(postCard)) {
          urls.add(plainTextUrl);
        }
        return Array.from(urls);
      }
      function extractPostModel(postCard, index) {
        const usernameFromLink = extractUsernameFromProfileLink(postCard);
        const usernameFromHandle = extractUsernameFromHandle(postCard);
        const username = usernameFromLink || usernameFromHandle;
        const displayName = extractDisplayName(postCard);
        const textContent = extractCardText(postCard);
        const externalUrls = extractExternalUrls(postCard);
        const postModel = {
          postId: extractPostId(postCard, index),
          username,
          displayName,
          textContent,
          searchText: normalizeWhitespace(`${username} ${displayName} ${textContent}`),
          externalUrls,
          signature: ""
        };
        postModel.signature = createPostSignature(postModel);
        return postModel;
      }
      module.exports = {
        extractPostModel,
        extractUsernameFromHandle,
        extractUsernameFromProfileLink
      };
    }
  });

  // src/dom/link-renderer.js
  var require_link_renderer = __commonJS({
    "src/dom/link-renderer.js"(exports, module) {
      var { URL_PATTERN, middleElideUrl, parseUrl, trimUrlPunctuation } = require_url_utils();
      var LINKIFY_TARGET_SELECTORS = [".cn-feed-text", ".cn-comment-text", ".cn-poll-title"];
      function splitTextIntoUrlParts(rawText) {
        const parts = [];
        let cursor = 0;
        const matches = Array.from(rawText.matchAll(URL_PATTERN));
        for (const match of matches) {
          const fullMatch = match[0];
          const matchIndex = match.index || 0;
          if (matchIndex > cursor) {
            parts.push({
              kind: "text",
              value: rawText.slice(cursor, matchIndex),
              trailing: ""
            });
          }
          const trimmedUrl = trimUrlPunctuation(fullMatch);
          const trailingText = fullMatch.slice(trimmedUrl.length);
          parts.push({
            kind: "url",
            value: trimmedUrl,
            trailing: trailingText
          });
          cursor = matchIndex + fullMatch.length;
        }
        if (cursor < rawText.length) {
          parts.push({
            kind: "text",
            value: rawText.slice(cursor),
            trailing: ""
          });
        }
        return parts;
      }
      function createAutoLinkNode(urlText) {
        const parsedUrl = parseUrl(urlText);
        if (!parsedUrl) {
          return null;
        }
        const linkElement = globalThis.document.createElement("a");
        linkElement.href = parsedUrl.toString();
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.className = "cdp-auto-link";
        linkElement.setAttribute("data-cdp-tooltip", parsedUrl.toString());
        linkElement.setAttribute("aria-label", parsedUrl.toString());
        linkElement.textContent = middleElideUrl(parsedUrl.toString(), 58);
        return linkElement;
      }
      function linkifyTextNode(textNode) {
        const sourceText = textNode.nodeValue || "";
        if (!URL_PATTERN.test(sourceText)) {
          URL_PATTERN.lastIndex = 0;
          return false;
        }
        URL_PATTERN.lastIndex = 0;
        const fragment = globalThis.document.createDocumentFragment();
        const parts = splitTextIntoUrlParts(sourceText);
        let changed = false;
        for (const part of parts) {
          if (part.kind === "text") {
            fragment.appendChild(globalThis.document.createTextNode(part.value));
            continue;
          }
          const linkNode = createAutoLinkNode(part.value);
          if (linkNode) {
            fragment.appendChild(linkNode);
            changed = true;
          } else {
            fragment.appendChild(globalThis.document.createTextNode(part.value));
          }
          if (part.trailing) {
            fragment.appendChild(globalThis.document.createTextNode(part.trailing));
          }
        }
        if (!changed) {
          return false;
        }
        textNode.parentNode.replaceChild(fragment, textNode);
        return true;
      }
      function linkifyPostContent(postCard) {
        for (const selector of LINKIFY_TARGET_SELECTORS) {
          const contentContainers = Array.from(postCard.querySelectorAll(selector));
          for (const contentContainer of contentContainers) {
            const walker = globalThis.document.createTreeWalker(
              contentContainer,
              globalThis.NodeFilter.SHOW_TEXT
            );
            const textNodes = [];
            let currentNode = walker.nextNode();
            while (currentNode) {
              if (currentNode.parentElement && !currentNode.parentElement.closest("a")) {
                textNodes.push(currentNode);
              }
              currentNode = walker.nextNode();
            }
            for (const textNode of textNodes) {
              linkifyTextNode(textNode);
            }
          }
        }
      }
      module.exports = {
        linkifyPostContent,
        splitTextIntoUrlParts
      };
    }
  });

  // src/dom/post-renderer.js
  var require_post_renderer = __commonJS({
    "src/dom/post-renderer.js"(exports, module) {
      var FILTERED_POST_CLASS = "cdp-hidden-post";
      function applyFilterDecision(postCard, filterDecision) {
        if (filterDecision.blocked) {
          postCard.classList.add(FILTERED_POST_CLASS);
          postCard.setAttribute("data-cdp-filter-reason", filterDecision.reasons.join("|"));
          return;
        }
        postCard.classList.remove(FILTERED_POST_CLASS);
        postCard.removeAttribute("data-cdp-filter-reason");
      }
      module.exports = {
        FILTERED_POST_CLASS,
        applyFilterDecision
      };
    }
  });

  // src/features/embeds/providers/image-provider.js
  var require_image_provider = __commonJS({
    "src/features/embeds/providers/image-provider.js"(exports, module) {
      var IMAGE_EXTENSIONS = /\.(avif|gif|jpe?g|png|webp)$/i;
      function resolveImageEmbed(sourceUrl) {
        let parsedUrl;
        try {
          parsedUrl = new URL(sourceUrl);
        } catch (_error) {
          return null;
        }
        if (!IMAGE_EXTENSIONS.test(parsedUrl.pathname)) {
          return null;
        }
        return {
          key: `image:${parsedUrl.toString()}`,
          kind: "image",
          sourceUrl: parsedUrl.toString()
        };
      }
      module.exports = {
        resolveImageEmbed
      };
    }
  });

  // src/features/embeds/providers/reddit-provider.js
  var require_reddit_provider = __commonJS({
    "src/features/embeds/providers/reddit-provider.js"(exports, module) {
      var REDDIT_HOST_SUFFIX = "reddit.com";
      var REDDIT_SHORT_HOST = "redd.it";
      function isRedditHostname(hostname) {
        return hostname === REDDIT_SHORT_HOST || hostname.endsWith(`.${REDDIT_HOST_SUFFIX}`) || hostname === REDDIT_HOST_SUFFIX;
      }
      function extractRedditEmbedPath(parsedUrl) {
        const hostname = parsedUrl.hostname.toLowerCase();
        if (!isRedditHostname(hostname)) {
          return "";
        }
        if (hostname === REDDIT_SHORT_HOST) {
          const shortId = parsedUrl.pathname.replace(/^\/+/, "").split("/")[0] || "";
          const sanitizedShortId = shortId.replace(/[^A-Za-z0-9]/g, "");
          if (!sanitizedShortId) {
            return "";
          }
          return `/comments/${sanitizedShortId}/`;
        }
        if (!/\/comments\/[A-Za-z0-9]+/i.test(parsedUrl.pathname)) {
          return "";
        }
        return `${parsedUrl.pathname.replace(/\/+$/, "")}/`;
      }
      function resolveRedditEmbed(sourceUrl) {
        let parsedUrl;
        try {
          parsedUrl = new URL(sourceUrl);
        } catch (_error) {
          return null;
        }
        const embedPath = extractRedditEmbedPath(parsedUrl);
        if (!embedPath) {
          return null;
        }
        const queryParams = new URLSearchParams({
          embed: "true",
          ref: "share",
          ref_source: "embed",
          showmedia: "true"
        });
        return {
          key: `reddit:${embedPath.toLowerCase()}`,
          kind: "reddit",
          sourceUrl: parsedUrl.toString(),
          embedUrl: `https://www.redditmedia.com${embedPath}?${queryParams.toString()}`,
          frameHeight: 520,
          title: "Reddit post preview"
        };
      }
      module.exports = {
        extractRedditEmbedPath,
        resolveRedditEmbed
      };
    }
  });

  // src/features/embeds/providers/spotify-provider.js
  var require_spotify_provider = __commonJS({
    "src/features/embeds/providers/spotify-provider.js"(exports, module) {
      var SPOTIFY_EMBED_TYPES = /* @__PURE__ */ new Set(["track", "album", "playlist", "episode", "show"]);
      var SPOTIFY_COMPACT_TYPES = /* @__PURE__ */ new Set(["track", "episode"]);
      function extractSpotifyEmbedPayload(parsedUrl) {
        const hostname = parsedUrl.hostname.toLowerCase();
        if (!hostname.endsWith("open.spotify.com")) {
          return null;
        }
        const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
        if (pathSegments.length < 2) {
          return null;
        }
        const normalizedSegments = pathSegments[0].toLowerCase().startsWith("intl-") ? pathSegments.slice(1) : pathSegments;
        if (normalizedSegments.length < 2) {
          return null;
        }
        const embedType = normalizedSegments[0].toLowerCase();
        const embedId = normalizedSegments[1];
        if (!SPOTIFY_EMBED_TYPES.has(embedType)) {
          return null;
        }
        const sanitizedEmbedId = embedId.replace(/[^A-Za-z0-9]/g, "");
        if (!sanitizedEmbedId) {
          return null;
        }
        return {
          embedType,
          embedId: sanitizedEmbedId
        };
      }
      function resolveSpotifyFrameHeight(embedType) {
        return SPOTIFY_COMPACT_TYPES.has(embedType) ? 152 : 352;
      }
      function resolveSpotifyEmbed(sourceUrl) {
        let parsedUrl;
        try {
          parsedUrl = new URL(sourceUrl);
        } catch (_error) {
          return null;
        }
        const payload = extractSpotifyEmbedPayload(parsedUrl);
        if (!payload) {
          return null;
        }
        return {
          key: `spotify:${payload.embedType}:${payload.embedId}`,
          kind: "spotify",
          sourceUrl: parsedUrl.toString(),
          embedUrl: `https://open.spotify.com/embed/${payload.embedType}/${payload.embedId}`,
          frameHeight: resolveSpotifyFrameHeight(payload.embedType),
          title: `Spotify ${payload.embedType}`
        };
      }
      module.exports = {
        extractSpotifyEmbedPayload,
        resolveSpotifyEmbed,
        resolveSpotifyFrameHeight
      };
    }
  });

  // src/features/embeds/providers/tiktok-provider.js
  var require_tiktok_provider = __commonJS({
    "src/features/embeds/providers/tiktok-provider.js"(exports, module) {
      function extractTiktokVideoId(parsedUrl) {
        const hostname = parsedUrl.hostname.toLowerCase();
        if (!hostname.endsWith("tiktok.com")) {
          return "";
        }
        const videoPathMatch = parsedUrl.pathname.match(/\/video\/([0-9]{8,25})/i);
        if (videoPathMatch) {
          return videoPathMatch[1];
        }
        const embedPathMatch = parsedUrl.pathname.match(/\/embed\/v2\/([0-9]{8,25})/i);
        if (embedPathMatch) {
          return embedPathMatch[1];
        }
        return "";
      }
      function resolveTiktokEmbed(sourceUrl) {
        let parsedUrl;
        try {
          parsedUrl = new URL(sourceUrl);
        } catch (_error) {
          return null;
        }
        const videoId = extractTiktokVideoId(parsedUrl);
        if (!videoId) {
          return null;
        }
        const queryParams = new URLSearchParams({
          controls: "1",
          description: "1",
          music_info: "1"
        });
        return {
          key: `tiktok:${videoId}`,
          kind: "tiktok",
          sourceUrl: parsedUrl.toString(),
          embedUrl: `https://www.tiktok.com/player/v1/${videoId}?${queryParams.toString()}`,
          frameHeight: 760,
          title: "TikTok video preview"
        };
      }
      module.exports = {
        extractTiktokVideoId,
        resolveTiktokEmbed
      };
    }
  });

  // src/features/embeds/providers/x-provider.js
  var require_x_provider = __commonJS({
    "src/features/embeds/providers/x-provider.js"(exports, module) {
      function extractXPostId(parsedUrl) {
        const hostname = parsedUrl.hostname.toLowerCase();
        if (!hostname.endsWith("x.com") && !hostname.endsWith("twitter.com")) {
          return "";
        }
        const statusMatch = parsedUrl.pathname.match(/\/status\/([0-9]{6,25})/i);
        if (!statusMatch) {
          return "";
        }
        return statusMatch[1];
      }
      function resolveXEmbed(sourceUrl) {
        let parsedUrl;
        try {
          parsedUrl = new URL(sourceUrl);
        } catch (_error) {
          return null;
        }
        const postId = extractXPostId(parsedUrl);
        if (!postId) {
          return null;
        }
        const queryParams = new URLSearchParams({
          id: postId,
          dnt: "true"
        });
        return {
          key: `x:${postId}`,
          kind: "x",
          sourceUrl: parsedUrl.toString(),
          embedUrl: `https://platform.twitter.com/embed/Tweet.html?${queryParams.toString()}`,
          frameHeight: 560,
          title: "X post preview"
        };
      }
      module.exports = {
        extractXPostId,
        resolveXEmbed
      };
    }
  });

  // src/features/embeds/providers/youtube-provider.js
  var require_youtube_provider = __commonJS({
    "src/features/embeds/providers/youtube-provider.js"(exports, module) {
      function extractYoutubeVideoId(parsedUrl) {
        const hostname = parsedUrl.hostname.toLowerCase();
        if (hostname === "youtu.be") {
          return parsedUrl.pathname.replace(/^\/+/, "").split("/")[0] || "";
        }
        if (hostname.endsWith("youtube.com")) {
          if (parsedUrl.pathname === "/watch") {
            return parsedUrl.searchParams.get("v") || "";
          }
          const embedMatch = parsedUrl.pathname.match(/^\/(?:embed|shorts)\/([^/?#]+)/i);
          if (embedMatch) {
            return embedMatch[1];
          }
        }
        return "";
      }
      function resolveYoutubeEmbed(sourceUrl) {
        let parsedUrl;
        try {
          parsedUrl = new URL(sourceUrl);
        } catch (_error) {
          return null;
        }
        const videoId = extractYoutubeVideoId(parsedUrl);
        if (!videoId) {
          return null;
        }
        const sanitizedVideoId = videoId.replace(/[^A-Za-z0-9_-]/g, "");
        if (!sanitizedVideoId) {
          return null;
        }
        return {
          key: `youtube:${sanitizedVideoId}`,
          kind: "youtube",
          sourceUrl: parsedUrl.toString(),
          embedUrl: `https://www.youtube-nocookie.com/embed/${sanitizedVideoId}`
        };
      }
      module.exports = {
        resolveYoutubeEmbed
      };
    }
  });

  // src/features/embeds/embed-engine.js
  var require_embed_engine = __commonJS({
    "src/features/embeds/embed-engine.js"(exports, module) {
      var { resolveImageEmbed } = require_image_provider();
      var { resolveRedditEmbed } = require_reddit_provider();
      var { resolveSpotifyEmbed } = require_spotify_provider();
      var { resolveTiktokEmbed } = require_tiktok_provider();
      var { resolveXEmbed } = require_x_provider();
      var { resolveYoutubeEmbed } = require_youtube_provider();
      function resolveEmbedDescriptors(postModel, embedSettings) {
        if (!embedSettings.enabled) {
          return [];
        }
        const descriptors = [];
        const seenKeys = /* @__PURE__ */ new Set();
        const maxEmbeds = Math.max(1, Math.min(6, embedSettings.maxPerPost));
        for (const externalUrl of postModel.externalUrls) {
          if (descriptors.length >= maxEmbeds) {
            break;
          }
          let descriptor = null;
          if (embedSettings.youtube) {
            descriptor = resolveYoutubeEmbed(externalUrl);
          }
          if (!descriptor && embedSettings.spotify) {
            descriptor = resolveSpotifyEmbed(externalUrl);
          }
          if (!descriptor && embedSettings.x) {
            descriptor = resolveXEmbed(externalUrl);
          }
          if (!descriptor && embedSettings.reddit) {
            descriptor = resolveRedditEmbed(externalUrl);
          }
          if (!descriptor && embedSettings.tiktok) {
            descriptor = resolveTiktokEmbed(externalUrl);
          }
          if (!descriptor && embedSettings.image) {
            descriptor = resolveImageEmbed(externalUrl);
          }
          if (!descriptor || seenKeys.has(descriptor.key)) {
            continue;
          }
          seenKeys.add(descriptor.key);
          descriptors.push(descriptor);
        }
        return descriptors;
      }
      module.exports = {
        resolveEmbedDescriptors
      };
    }
  });

  // src/dom/current-user.js
  var require_current_user = __commonJS({
    "src/dom/current-user.js"(exports, module) {
      function normalizeUsernameToken(username) {
        return String(username || "").replace(/^@+/, "").trim();
      }
      function extractUsernameFromAccountName() {
        const accountNameElement = globalThis.document.querySelector(".cn-account-name");
        const accountNameText = accountNameElement ? accountNameElement.textContent || "" : "";
        const usernameMatch = accountNameText.match(/@([A-Za-z0-9_]+)/);
        if (!usernameMatch) {
          return "";
        }
        return normalizeUsernameToken(usernameMatch[1]);
      }
      function extractUsernameFromAccountPillLabel() {
        const accountMenuButton = globalThis.document.querySelector('button[aria-label*=" menu"]');
        const ariaLabel = accountMenuButton ? accountMenuButton.getAttribute("aria-label") || "" : "";
        const usernameMatch = ariaLabel.match(/@([A-Za-z0-9_]+)\s+menu/i);
        if (!usernameMatch) {
          return "";
        }
        return normalizeUsernameToken(usernameMatch[1]);
      }
      function extractCurrentUsername() {
        return extractUsernameFromAccountName() || extractUsernameFromAccountPillLabel();
      }
      module.exports = {
        extractCurrentUsername,
        normalizeUsernameToken
      };
    }
  });

  // src/dom/block-control-renderer.js
  var require_block_control_renderer = __commonJS({
    "src/dom/block-control-renderer.js"(exports, module) {
      var BLOCK_CONTROL_CLASS = "cdp-inline-block-user-btn";
      var BLOCK_CONTROL_MARKER_ATTRIBUTE = "data-cdp-inline-block-control";
      function createBlockControlButton() {
        const buttonElement = globalThis.document.createElement("button");
        buttonElement.type = "button";
        buttonElement.className = BLOCK_CONTROL_CLASS;
        buttonElement.setAttribute(BLOCK_CONTROL_MARKER_ATTRIBUTE, "true");
        return buttonElement;
      }
      function resolveUserLabel(blockTarget) {
        const username = String(blockTarget.username || "").replace(/^@+/, "").trim();
        if (username) {
          return `@${username}`;
        }
        const displayName = String(blockTarget.displayName || "").trim();
        return displayName || "this user";
      }
      function syncInlineBlockControl(options) {
        const { container, beforeElement, hidden, blockTarget, blocked, onRequestBlockUser } = options;
        if (!container) {
          return;
        }
        const userLabel = resolveUserLabel(blockTarget);
        if (userLabel === "this user") {
          const staleButton = container.querySelector(`[${BLOCK_CONTROL_MARKER_ATTRIBUTE}="true"]`);
          if (staleButton) {
            staleButton.remove();
          }
          return;
        }
        if (hidden === true) {
          const staleButton = container.querySelector(`[${BLOCK_CONTROL_MARKER_ATTRIBUTE}="true"]`);
          if (staleButton) {
            staleButton.remove();
          }
          return;
        }
        let buttonElement = (
          /** @type {HTMLButtonElement | null} */
          container.querySelector(`[${BLOCK_CONTROL_MARKER_ATTRIBUTE}="true"]`)
        );
        if (!buttonElement) {
          buttonElement = createBlockControlButton();
          buttonElement.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (buttonElement.disabled) {
              return;
            }
            onRequestBlockUser({
              username: buttonElement.dataset.cdpBlockUsername || "",
              displayName: buttonElement.dataset.cdpBlockDisplayName || "",
              sourceKind: buttonElement.dataset.cdpBlockSourceKind || "post"
            });
          });
        }
        buttonElement.dataset.cdpBlockUsername = String(blockTarget.username || "");
        buttonElement.dataset.cdpBlockDisplayName = String(blockTarget.displayName || "");
        buttonElement.dataset.cdpBlockSourceKind = String(blockTarget.sourceKind || "post");
        buttonElement.dataset.cdpBlockState = blocked ? "blocked" : "ready";
        buttonElement.disabled = blocked;
        buttonElement.textContent = blocked ? "Blocked" : "Block";
        buttonElement.setAttribute(
          "aria-label",
          blocked ? `${userLabel} is already blocked` : `Block ${userLabel}`
        );
        buttonElement.title = blocked ? `${userLabel} is already in blocked users` : `Block ${userLabel}`;
        if (beforeElement && beforeElement.parentElement === container && buttonElement.nextElementSibling !== beforeElement) {
          container.insertBefore(buttonElement, beforeElement);
          return;
        }
        if (buttonElement.parentElement !== container) {
          container.prepend(buttonElement);
        }
      }
      module.exports = {
        BLOCK_CONTROL_CLASS,
        BLOCK_CONTROL_MARKER_ATTRIBUTE,
        syncInlineBlockControl
      };
    }
  });

  // src/dom/comment-extractor.js
  var require_comment_extractor = __commonJS({
    "src/dom/comment-extractor.js"(exports, module) {
      var { normalizeWhitespace } = require_post_model();
      var { parseUrl } = require_url_utils();
      var { COMMENT_AUTHOR_SELECTOR, COMMENT_TEXT_SELECTOR } = require_post_selectors();
      var REACT_PROPS_KEY_PREFIX = "__reactProps$";
      var COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE = "data-cdp-comment-react-username";
      var COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE = "data-cdp-comment-react-username-scanned";
      var MAX_REACT_PROPS_NODES = 2500;
      function normalizeUsername(username) {
        return username.replace(/^@+/, "").trim();
      }
      function extractUsernameFromProfileLink(commentItem) {
        const profileLink = commentItem.querySelector('a[href*="/u/"]');
        if (!profileLink) {
          return "";
        }
        const href = profileLink.getAttribute("href") || "";
        const absoluteUrl = href.startsWith("http") ? href : `https://chillnet.me${href}`;
        const parsedUrl = parseUrl(absoluteUrl);
        if (!parsedUrl) {
          return "";
        }
        const pathMatch = parsedUrl.pathname.match(/\/u\/([^/?#]+)/i);
        if (!pathMatch) {
          return "";
        }
        return normalizeUsername(decodeURIComponent(pathMatch[1]));
      }
      function extractUsernameFromAuthorText(commentItem) {
        const authorElement = commentItem.querySelector(COMMENT_AUTHOR_SELECTOR);
        const authorText = normalizeWhitespace(authorElement ? authorElement.textContent || "" : "");
        const usernameMatch = authorText.match(/@([A-Za-z0-9_]+)/);
        if (!usernameMatch) {
          return "";
        }
        return normalizeUsername(usernameMatch[1]);
      }
      function getReactPropsObject(element) {
        const ownPropertyNames = Object.getOwnPropertyNames(element);
        const reactPropsKey = ownPropertyNames.find(
          (propertyName) => propertyName.startsWith(REACT_PROPS_KEY_PREFIX)
        );
        if (!reactPropsKey) {
          return null;
        }
        const reactPropsValue = element[reactPropsKey];
        if (!reactPropsValue || typeof reactPropsValue !== "object") {
          return null;
        }
        return (
          /** @type {Record<string, unknown>} */
          reactPropsValue
        );
      }
      function selectReactUsernameCandidate(candidateObject, authorDisplayName) {
        const candidateUsername = typeof candidateObject.username === "string" ? normalizeUsername(candidateObject.username) : "";
        if (!candidateUsername) {
          return { preferred: "", fallback: "" };
        }
        const candidateDisplayName = typeof candidateObject.displayName === "string" ? normalizeWhitespace(candidateObject.displayName) : "";
        const normalizedAuthorDisplayName = normalizeWhitespace(authorDisplayName);
        if (candidateDisplayName && normalizedAuthorDisplayName && candidateDisplayName.toLowerCase() === normalizedAuthorDisplayName.toLowerCase()) {
          return { preferred: candidateUsername, fallback: "" };
        }
        return { preferred: "", fallback: candidateUsername };
      }
      function extractUsernameFromReactProps(commentItem, displayName) {
        if (commentItem.hasAttribute(COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE)) {
          return normalizeUsername(
            commentItem.getAttribute(COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE) || ""
          );
        }
        const reactPropsObject = getReactPropsObject(commentItem);
        if (!reactPropsObject) {
          commentItem.setAttribute(COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE, "true");
          commentItem.setAttribute(COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE, "");
          return "";
        }
        const seenNodes = /* @__PURE__ */ new WeakSet();
        const nodesToScan = [reactPropsObject];
        let scannedNodeCount = 0;
        let fallbackUsername = "";
        while (nodesToScan.length > 0 && scannedNodeCount < MAX_REACT_PROPS_NODES) {
          const currentNode = nodesToScan.pop();
          if (!currentNode || typeof currentNode !== "object") {
            continue;
          }
          if (seenNodes.has(currentNode)) {
            continue;
          }
          seenNodes.add(currentNode);
          scannedNodeCount += 1;
          if (Array.isArray(currentNode)) {
            for (const nestedValue of currentNode) {
              if (nestedValue && typeof nestedValue === "object") {
                nodesToScan.push(nestedValue);
              }
            }
            continue;
          }
          const candidate = selectReactUsernameCandidate(
            /** @type {Record<string, unknown>} */
            currentNode,
            displayName
          );
          if (candidate.preferred) {
            commentItem.setAttribute(COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE, "true");
            commentItem.setAttribute(COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE, candidate.preferred);
            return candidate.preferred;
          }
          if (!fallbackUsername && candidate.fallback) {
            fallbackUsername = candidate.fallback;
          }
          for (const nestedValue of Object.values(currentNode)) {
            if (nestedValue && typeof nestedValue === "object") {
              nodesToScan.push(nestedValue);
            }
          }
        }
        commentItem.setAttribute(COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE, "true");
        commentItem.setAttribute(COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE, fallbackUsername);
        return fallbackUsername;
      }
      function extractDisplayName(commentItem) {
        const authorElement = commentItem.querySelector(COMMENT_AUTHOR_SELECTOR);
        if (!authorElement) {
          return "";
        }
        const linkedAuthor = authorElement.querySelector('a[href*="/u/"]');
        if (linkedAuthor) {
          return normalizeWhitespace(linkedAuthor.textContent || "");
        }
        return normalizeWhitespace(authorElement.textContent || "");
      }
      function extractCommentText(commentItem) {
        const commentTextElements = Array.from(commentItem.querySelectorAll(COMMENT_TEXT_SELECTOR));
        const textChunks = commentTextElements.map((commentTextElement) => normalizeWhitespace(commentTextElement.textContent || "")).filter(Boolean);
        return textChunks.join("\n");
      }
      function extractCommentModel(commentItem) {
        const displayName = extractDisplayName(commentItem);
        const username = extractUsernameFromProfileLink(commentItem) || extractUsernameFromAuthorText(commentItem) || extractUsernameFromReactProps(commentItem, displayName);
        const textContent = extractCommentText(commentItem);
        return {
          username,
          displayName,
          textContent,
          searchText: normalizeWhitespace(`${username} ${displayName} ${textContent}`)
        };
      }
      module.exports = {
        extractCommentModel,
        extractDisplayName,
        extractUsernameFromAuthorText,
        extractUsernameFromProfileLink,
        extractUsernameFromReactProps,
        getReactPropsObject
      };
    }
  });

  // src/features/filtering/matchers.js
  var require_matchers = __commonJS({
    "src/features/filtering/matchers.js"(exports, module) {
      function normalizeForMatch(value) {
        return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
      }
      function buildBlockedUserSet(blockedUsers) {
        const blockedSet = /* @__PURE__ */ new Set();
        for (const rawUser of blockedUsers) {
          const normalizedUser = normalizeForMatch(String(rawUser).replace(/^@+/, ""));
          if (normalizedUser) {
            blockedSet.add(normalizedUser);
          }
        }
        return blockedSet;
      }
      function buildBlockedPhraseList(blockedPhrases) {
        const phraseSet = /* @__PURE__ */ new Set();
        for (const rawPhrase of blockedPhrases) {
          const normalizedPhrase = normalizeForMatch(rawPhrase);
          if (normalizedPhrase) {
            phraseSet.add(normalizedPhrase);
          }
        }
        return Array.from(phraseSet);
      }
      function parseListText(rawList) {
        return rawList.split(",").map((entry) => entry.trim()).filter(Boolean);
      }
      module.exports = {
        buildBlockedPhraseList,
        buildBlockedUserSet,
        normalizeForMatch,
        parseListText
      };
    }
  });

  // src/features/filtering/block-control-stage.js
  var require_block_control_stage = __commonJS({
    "src/features/filtering/block-control-stage.js"(exports, module) {
      var { extractCurrentUsername } = require_current_user();
      var { syncInlineBlockControl } = require_block_control_renderer();
      var { extractCommentModel } = require_comment_extractor();
      var {
        COMMENT_ITEM_SELECTOR,
        POST_CARD_SELECTOR,
        POST_DATE_LINK_SELECTOR
      } = require_post_selectors();
      var { buildBlockedUserSet, normalizeForMatch } = require_matchers();
      var POST_HEAD_RIGHT_SELECTOR = ".cn-feed-head-right";
      var COMMENT_HEAD_RIGHT_SELECTOR = ".cn-comment-head-right";
      var COMMENT_DATE_SELECTOR = ".cn-comment-date";
      function normalizeUsername(username) {
        return String(username || "").replace(/^@+/, "").trim();
      }
      function isBlockedUserTarget(userTarget, blockedUserSet) {
        const normalizedUsername = normalizeForMatch(normalizeUsername(userTarget.username));
        const normalizedDisplayName = normalizeForMatch(userTarget.displayName || "");
        return Boolean(normalizedUsername && blockedUserSet.has(normalizedUsername)) || Boolean(normalizedDisplayName && blockedUserSet.has(normalizedDisplayName));
      }
      function isSelfTarget(currentUsername, userTarget) {
        const normalizedCurrent = normalizeForMatch(normalizeUsername(currentUsername));
        const normalizedTarget = normalizeForMatch(normalizeUsername(userTarget.username));
        return Boolean(normalizedCurrent && normalizedTarget && normalizedCurrent === normalizedTarget);
      }
      function syncPostHeaderBlockControl(postCard, postModel, blockedUserSet, currentUsername, onRequestBlockUser) {
        const postHeadRight = postCard.querySelector(POST_HEAD_RIGHT_SELECTOR);
        const dateElement = postHeadRight ? postHeadRight.querySelector(POST_DATE_LINK_SELECTOR) : null;
        const userTarget = {
          username: normalizeUsername(postModel.username),
          displayName: String(postModel.displayName || "").trim(),
          sourceKind: "post"
        };
        syncInlineBlockControl({
          container: postHeadRight,
          beforeElement: dateElement,
          hidden: isSelfTarget(currentUsername, userTarget),
          blockTarget: userTarget,
          blocked: isBlockedUserTarget(userTarget, blockedUserSet),
          onRequestBlockUser
        });
      }
      function syncCommentHeaderBlockControls(commentItems, blockedUserSet, currentUsername, onRequestBlockUser) {
        for (const commentItem of commentItems) {
          const commentHeadRight = commentItem.querySelector(COMMENT_HEAD_RIGHT_SELECTOR);
          const commentDateElement = commentHeadRight ? commentHeadRight.querySelector(COMMENT_DATE_SELECTOR) : null;
          const commentModel = extractCommentModel(commentItem);
          const userTarget = {
            username: normalizeUsername(commentModel.username),
            displayName: String(commentModel.displayName || "").trim(),
            sourceKind: "comment"
          };
          syncInlineBlockControl({
            container: commentHeadRight,
            beforeElement: commentDateElement,
            hidden: isSelfTarget(currentUsername, userTarget),
            blockTarget: userTarget,
            blocked: isBlockedUserTarget(userTarget, blockedUserSet),
            onRequestBlockUser
          });
        }
      }
      function syncPostAndCommentBlockControls(options) {
        const { postCard, postModel, filterSettings, onRequestBlockUser } = options;
        const currentUsername = extractCurrentUsername();
        const blockedUserSet = buildBlockedUserSet(filterSettings.blockedUsers);
        syncPostHeaderBlockControl(
          postCard,
          postModel,
          blockedUserSet,
          currentUsername,
          onRequestBlockUser
        );
        syncCommentHeaderBlockControls(
          Array.from(postCard.querySelectorAll(COMMENT_ITEM_SELECTOR)),
          blockedUserSet,
          currentUsername,
          onRequestBlockUser
        );
      }
      function syncDetachedCommentBlockControls(options) {
        const { filterSettings, onRequestBlockUser } = options;
        const currentUsername = extractCurrentUsername();
        const blockedUserSet = buildBlockedUserSet(filterSettings.blockedUsers);
        const detachedCommentItems = Array.from(
          globalThis.document.querySelectorAll(COMMENT_ITEM_SELECTOR)
        ).filter((commentItem) => !commentItem.closest(POST_CARD_SELECTOR));
        syncCommentHeaderBlockControls(
          detachedCommentItems,
          blockedUserSet,
          currentUsername,
          onRequestBlockUser
        );
      }
      module.exports = {
        syncDetachedCommentBlockControls,
        syncPostAndCommentBlockControls
      };
    }
  });

  // src/dom/comment-renderer.js
  var require_comment_renderer = __commonJS({
    "src/dom/comment-renderer.js"(exports, module) {
      var { COMMENT_STATS_SELECTOR } = require_post_selectors();
      var FILTERED_COMMENT_CLASS = "cdp-hidden-comment";
      var FILTERED_COMMENT_COUNT_CLASS = "cdp-filtered-comment-count";
      function applyCommentFilterDecision(commentItem, filterDecision) {
        if (filterDecision.blocked) {
          commentItem.classList.add(FILTERED_COMMENT_CLASS);
          commentItem.setAttribute("data-cdp-comment-filter-reason", filterDecision.reasons.join("|"));
          return;
        }
        commentItem.classList.remove(FILTERED_COMMENT_CLASS);
        commentItem.removeAttribute("data-cdp-comment-filter-reason");
      }
      function syncFilteredCommentSummary(postCard, filteredCommentCount) {
        const statsContainer = postCard.querySelector(COMMENT_STATS_SELECTOR);
        if (!statsContainer) {
          return;
        }
        const existingIndicator = statsContainer.querySelector(`.${FILTERED_COMMENT_COUNT_CLASS}`);
        if (filteredCommentCount <= 0) {
          if (existingIndicator) {
            existingIndicator.remove();
          }
          return;
        }
        const indicator = existingIndicator || globalThis.document.createElement("span");
        indicator.className = FILTERED_COMMENT_COUNT_CLASS;
        indicator.textContent = ` - ${filteredCommentCount} filtered`;
        if (!existingIndicator) {
          statsContainer.appendChild(indicator);
        }
      }
      module.exports = {
        FILTERED_COMMENT_CLASS,
        FILTERED_COMMENT_COUNT_CLASS,
        applyCommentFilterDecision,
        syncFilteredCommentSummary
      };
    }
  });

  // src/features/filtering/filter-engine.js
  var require_filter_engine = __commonJS({
    "src/features/filtering/filter-engine.js"(exports, module) {
      var { buildBlockedPhraseList, buildBlockedUserSet, normalizeForMatch } = require_matchers();
      function evaluateFilterDecision(contentModel, filterSettings) {
        if (!filterSettings.enabled) {
          return {
            blocked: false,
            reasons: []
          };
        }
        const blockedUserSet = buildBlockedUserSet(filterSettings.blockedUsers);
        const blockedPhraseList = buildBlockedPhraseList(filterSettings.blockedPhrases);
        const normalizedUsername = normalizeForMatch(contentModel.username);
        const normalizedDisplayName = normalizeForMatch(contentModel.displayName);
        const normalizedSearchText = normalizeForMatch(contentModel.searchText);
        const reasons = [];
        const blockedByUsername = normalizedUsername && blockedUserSet.has(normalizedUsername);
        const blockedByDisplayName = normalizedDisplayName && blockedUserSet.has(normalizedDisplayName);
        if (blockedByUsername || blockedByDisplayName) {
          reasons.push(`user:${blockedByUsername ? normalizedUsername : normalizedDisplayName}`);
        }
        for (const blockedPhrase of blockedPhraseList) {
          if (!blockedPhrase) {
            continue;
          }
          if (normalizedSearchText.includes(blockedPhrase)) {
            reasons.push(`phrase:${blockedPhrase}`);
            break;
          }
        }
        return {
          blocked: reasons.length > 0,
          reasons
        };
      }
      module.exports = {
        evaluateFilterDecision
      };
    }
  });

  // src/features/filtering/comment-filter-stage.js
  var require_comment_filter_stage = __commonJS({
    "src/features/filtering/comment-filter-stage.js"(exports, module) {
      var { extractCommentModel } = require_comment_extractor();
      var {
        FILTERED_COMMENT_CLASS,
        applyCommentFilterDecision,
        syncFilteredCommentSummary
      } = require_comment_renderer();
      var { COMMENT_ITEM_SELECTOR, POST_CARD_SELECTOR } = require_post_selectors();
      var { evaluateFilterDecision } = require_filter_engine();
      function isCommentHiddenByFilter(commentItem) {
        return Boolean(commentItem.closest(`.${FILTERED_COMMENT_CLASS}`));
      }
      function filterCommentItems(commentItems, filterSettings) {
        for (const commentItem of commentItems) {
          const commentModel = extractCommentModel(commentItem);
          const filterDecision = evaluateFilterDecision(commentModel, filterSettings);
          applyCommentFilterDecision(commentItem, filterDecision);
        }
        return commentItems.filter((commentItem) => isCommentHiddenByFilter(commentItem)).length;
      }
      function filterPostComments(postCard, filterSettings) {
        const commentItems = Array.from(postCard.querySelectorAll(COMMENT_ITEM_SELECTOR));
        const filteredCommentCount = filterCommentItems(commentItems, filterSettings);
        syncFilteredCommentSummary(postCard, filteredCommentCount);
        return filteredCommentCount;
      }
      function filterDetachedComments(postCard, filterSettings) {
        const detachedCommentItems = Array.from(
          globalThis.document.querySelectorAll(COMMENT_ITEM_SELECTOR)
        ).filter((commentItem) => !commentItem.closest(POST_CARD_SELECTOR));
        const filteredCommentCount = filterCommentItems(detachedCommentItems, filterSettings);
        syncFilteredCommentSummary(postCard, filteredCommentCount);
        return filteredCommentCount;
      }
      module.exports = {
        filterDetachedComments,
        filterCommentItems,
        filterPostComments,
        isCommentHiddenByFilter
      };
    }
  });

  // src/dom/notification-selectors.js
  var require_notification_selectors = __commonJS({
    "src/dom/notification-selectors.js"(exports, module) {
      var NOTIFICATION_ITEM_SELECTOR = ".cn-notification-item";
      var NOTIFICATION_ITEM_TOP_SELECTOR = ".cn-notification-item-top";
      var NOTIFICATION_LINK_SELECTOR = "a.cn-notification-link";
      var NOTIFICATION_USER_LINK_SELECTOR = 'a[href*="/u/"]';
      module.exports = {
        NOTIFICATION_ITEM_SELECTOR,
        NOTIFICATION_ITEM_TOP_SELECTOR,
        NOTIFICATION_LINK_SELECTOR,
        NOTIFICATION_USER_LINK_SELECTOR
      };
    }
  });

  // src/dom/notification-extractor.js
  var require_notification_extractor = __commonJS({
    "src/dom/notification-extractor.js"(exports, module) {
      var { normalizeWhitespace } = require_post_model();
      var { parseUrl } = require_url_utils();
      var {
        NOTIFICATION_ITEM_TOP_SELECTOR,
        NOTIFICATION_LINK_SELECTOR,
        NOTIFICATION_USER_LINK_SELECTOR
      } = require_notification_selectors();
      var USER_HANDLE_PATTERN = /@([A-Za-z0-9_]+)/g;
      function normalizeUsernameToken(username) {
        return String(username || "").replace(/^@+/, "").trim();
      }
      function extractUsernameFromUserPath(userPath) {
        const absoluteUrl = userPath.startsWith("http") ? userPath : `https://chillnet.me${userPath}`;
        const parsedUrl = parseUrl(absoluteUrl);
        if (!parsedUrl) {
          return "";
        }
        const pathMatch = parsedUrl.pathname.match(/\/u\/([^/?#]+)/i);
        if (!pathMatch) {
          return "";
        }
        return normalizeUsernameToken(decodeURIComponent(pathMatch[1]));
      }
      function extractUsernamesFromText(textContent) {
        const usernames = /* @__PURE__ */ new Set();
        const normalizedText = normalizeWhitespace(String(textContent || ""));
        for (const handleMatch of normalizedText.matchAll(USER_HANDLE_PATTERN)) {
          const username = normalizeUsernameToken(handleMatch[1]);
          if (username) {
            usernames.add(username);
          }
        }
        return Array.from(usernames);
      }
      function extractUsernamesFromLinks(notificationItem) {
        const usernames = /* @__PURE__ */ new Set();
        const userLinks = Array.from(notificationItem.querySelectorAll(NOTIFICATION_USER_LINK_SELECTOR));
        const primaryNotificationLink = notificationItem.querySelector(NOTIFICATION_LINK_SELECTOR);
        if (primaryNotificationLink) {
          userLinks.push(primaryNotificationLink);
        }
        for (const userLink of userLinks) {
          const usernameFromPath = extractUsernameFromUserPath(userLink.getAttribute("href") || "");
          if (usernameFromPath) {
            usernames.add(usernameFromPath);
          }
          const usernameFromText = extractUsernamesFromText(userLink.textContent || "");
          for (const username of usernameFromText) {
            usernames.add(username);
          }
        }
        return Array.from(usernames);
      }
      function extractNotificationModel(notificationItem) {
        const topTextElement = notificationItem.querySelector(NOTIFICATION_ITEM_TOP_SELECTOR);
        const topText = normalizeWhitespace(topTextElement ? topTextElement.textContent || "" : "");
        const itemText = normalizeWhitespace(notificationItem.textContent || "");
        const usernames = /* @__PURE__ */ new Set();
        for (const username of extractUsernamesFromLinks(notificationItem)) {
          usernames.add(username);
        }
        for (const username of extractUsernamesFromText(topText)) {
          usernames.add(username);
        }
        for (const username of extractUsernamesFromText(itemText)) {
          usernames.add(username);
        }
        return {
          usernames: Array.from(usernames)
        };
      }
      module.exports = {
        extractNotificationModel,
        extractUsernameFromUserPath,
        extractUsernamesFromLinks,
        extractUsernamesFromText,
        normalizeUsernameToken
      };
    }
  });

  // src/dom/notification-renderer.js
  var require_notification_renderer = __commonJS({
    "src/dom/notification-renderer.js"(exports, module) {
      var FILTERED_NOTIFICATION_CLASS = "cdp-hidden-notification";
      function applyNotificationFilterDecision(notificationItem, filterDecision) {
        if (filterDecision.blocked) {
          notificationItem.classList.add(FILTERED_NOTIFICATION_CLASS);
          notificationItem.setAttribute(
            "data-cdp-notification-filter-reason",
            filterDecision.reasons.join("|")
          );
          return;
        }
        notificationItem.classList.remove(FILTERED_NOTIFICATION_CLASS);
        notificationItem.removeAttribute("data-cdp-notification-filter-reason");
      }
      module.exports = {
        FILTERED_NOTIFICATION_CLASS,
        applyNotificationFilterDecision
      };
    }
  });

  // src/features/filtering/notification-filter-stage.js
  var require_notification_filter_stage = __commonJS({
    "src/features/filtering/notification-filter-stage.js"(exports, module) {
      var { extractNotificationModel } = require_notification_extractor();
      var {
        FILTERED_NOTIFICATION_CLASS,
        applyNotificationFilterDecision
      } = require_notification_renderer();
      var { NOTIFICATION_ITEM_SELECTOR } = require_notification_selectors();
      var { buildBlockedUserSet, normalizeForMatch } = require_matchers();
      function findBlockedNotificationUsername(notificationModel, blockedUserSet) {
        for (const candidateUsername of notificationModel.usernames) {
          const normalizedUsername = normalizeForMatch(
            String(candidateUsername || "").replace(/^@+/, "")
          );
          if (normalizedUsername && blockedUserSet.has(normalizedUsername)) {
            return normalizedUsername;
          }
        }
        return "";
      }
      function isNotificationHiddenByFilter(notificationItem) {
        return notificationItem.classList.contains(FILTERED_NOTIFICATION_CLASS);
      }
      function buildNotificationFilterDecision(notificationItem, blockedUserSet) {
        if (blockedUserSet.size === 0) {
          return {
            blocked: false,
            reasons: []
          };
        }
        const notificationModel = extractNotificationModel(notificationItem);
        const blockedUsername = findBlockedNotificationUsername(notificationModel, blockedUserSet);
        if (blockedUsername) {
          return {
            blocked: true,
            reasons: [`user:${blockedUsername}`]
          };
        }
        return {
          blocked: false,
          reasons: []
        };
      }
      function filterNotificationItems(filterSettings) {
        const notificationItems = Array.from(
          globalThis.document.querySelectorAll(NOTIFICATION_ITEM_SELECTOR)
        );
        if (notificationItems.length === 0) {
          return 0;
        }
        const blockedUserSet = filterSettings.enabled ? buildBlockedUserSet(filterSettings.blockedUsers) : /* @__PURE__ */ new Set();
        for (const notificationItem of notificationItems) {
          const filterDecision = buildNotificationFilterDecision(notificationItem, blockedUserSet);
          applyNotificationFilterDecision(notificationItem, filterDecision);
        }
        return notificationItems.filter(
          (notificationItem) => isNotificationHiddenByFilter(notificationItem)
        ).length;
      }
      module.exports = {
        buildNotificationFilterDecision,
        filterNotificationItems,
        findBlockedNotificationUsername,
        isNotificationHiddenByFilter
      };
    }
  });

  // src/dom/rail-selectors.js
  var require_rail_selectors = __commonJS({
    "src/dom/rail-selectors.js"(exports, module) {
      var RIGHT_RAIL_SELECTOR = ".cn-right-rail";
      var RAIL_CARD_SELECTOR = ".cn-rail-card";
      var RAIL_TITLE_SELECTOR = ".cn-rail-title";
      var SUGGEST_LIST_SELECTOR = ".cn-suggest-list";
      var SUGGEST_ITEM_SELECTOR = ".cn-suggest-item";
      var SUGGEST_USER_LINK_SELECTOR = 'a.cn-suggest-user[href*="/u/"]';
      var SUGGEST_HANDLE_LINK_SELECTOR = 'a.cn-suggest-handle[href*="/u/"]';
      var SCOREBOARD_TITLE_SELECTOR = ".cn-scoreboard-title";
      var SCOREBOARD_LIST_SELECTOR = ".cn-scoreboard-list";
      var SCOREBOARD_ROW_SELECTOR = ".cn-scoreboard-row";
      var SCOREBOARD_USER_LINK_SELECTOR = 'a.cn-scoreboard-user-link[href*="/u/"]';
      module.exports = {
        RAIL_CARD_SELECTOR,
        RAIL_TITLE_SELECTOR,
        RIGHT_RAIL_SELECTOR,
        SCOREBOARD_LIST_SELECTOR,
        SCOREBOARD_ROW_SELECTOR,
        SCOREBOARD_TITLE_SELECTOR,
        SCOREBOARD_USER_LINK_SELECTOR,
        SUGGEST_HANDLE_LINK_SELECTOR,
        SUGGEST_ITEM_SELECTOR,
        SUGGEST_LIST_SELECTOR,
        SUGGEST_USER_LINK_SELECTOR
      };
    }
  });

  // src/features/filtering/rail-filter-stage.js
  var require_rail_filter_stage = __commonJS({
    "src/features/filtering/rail-filter-stage.js"(exports, module) {
      var { parseUrl } = require_url_utils();
      var {
        RAIL_CARD_SELECTOR,
        RAIL_TITLE_SELECTOR,
        RIGHT_RAIL_SELECTOR,
        SCOREBOARD_LIST_SELECTOR,
        SCOREBOARD_ROW_SELECTOR,
        SCOREBOARD_TITLE_SELECTOR,
        SCOREBOARD_USER_LINK_SELECTOR,
        SUGGEST_HANDLE_LINK_SELECTOR,
        SUGGEST_ITEM_SELECTOR,
        SUGGEST_LIST_SELECTOR,
        SUGGEST_USER_LINK_SELECTOR
      } = require_rail_selectors();
      var { buildBlockedUserSet, normalizeForMatch } = require_matchers();
      var TARGETED_SCOREBOARD_TITLES = ["nuggiebash daily scoreboard", "emojart lifetime scoreboard"];
      function extractUsernameFromUserPath(userPath) {
        const absoluteUrl = userPath.startsWith("http") ? userPath : `https://chillnet.me${userPath}`;
        const parsedUrl = parseUrl(absoluteUrl);
        if (!parsedUrl) {
          return "";
        }
        const userPathMatch = parsedUrl.pathname.match(/\/u\/([^/?#]+)/i);
        if (!userPathMatch) {
          return "";
        }
        return normalizeForMatch(decodeURIComponent(userPathMatch[1]).replace(/^@+/, ""));
      }
      function extractUsernameFromText(textContent) {
        const normalizedText = String(textContent || "").trim();
        const handleMatch = normalizedText.match(/@([A-Za-z0-9_]+)/);
        if (handleMatch) {
          return normalizeForMatch(handleMatch[1]);
        }
        return normalizeForMatch(normalizedText.replace(/^@+/, ""));
      }
      function extractUsernameFromLink(linkElement) {
        if (!linkElement) {
          return "";
        }
        return extractUsernameFromUserPath(linkElement.getAttribute("href") || "") || extractUsernameFromText(linkElement.textContent || "");
      }
      function filterWhoToFollow(rightRail, blockedUserSet) {
        const railCards = Array.from(rightRail.querySelectorAll(`:scope > ${RAIL_CARD_SELECTOR}`));
        for (const railCard of railCards) {
          const railTitleElement = railCard.querySelector(RAIL_TITLE_SELECTOR);
          const railTitle = normalizeForMatch(railTitleElement ? railTitleElement.textContent || "" : "");
          if (railTitle !== "who to follow") {
            continue;
          }
          const suggestList = railCard.querySelector(SUGGEST_LIST_SELECTOR);
          if (!suggestList) {
            continue;
          }
          for (const suggestItem of Array.from(suggestList.querySelectorAll(SUGGEST_ITEM_SELECTOR))) {
            const handleLink = suggestItem.querySelector(SUGGEST_HANDLE_LINK_SELECTOR);
            const userLink = suggestItem.querySelector(SUGGEST_USER_LINK_SELECTOR);
            const username = extractUsernameFromLink(handleLink) || extractUsernameFromLink(userLink) || extractUsernameFromText(suggestItem.textContent || "");
            if (username && blockedUserSet.has(username)) {
              suggestItem.remove();
            }
          }
          if (!suggestList.querySelector(SUGGEST_ITEM_SELECTOR)) {
            railCard.remove();
          }
        }
      }
      function isTargetedScoreboard(scoreboardTitle) {
        const normalizedTitle = normalizeForMatch(scoreboardTitle);
        return TARGETED_SCOREBOARD_TITLES.some((title) => normalizedTitle.includes(title));
      }
      function filterScoreboards(rightRail, blockedUserSet) {
        const railCards = Array.from(rightRail.querySelectorAll(`:scope > ${RAIL_CARD_SELECTOR}`));
        for (const railCard of railCards) {
          const scoreboardTitleElement = railCard.querySelector(SCOREBOARD_TITLE_SELECTOR);
          const scoreboardTitle = scoreboardTitleElement ? scoreboardTitleElement.textContent || "" : "";
          if (!isTargetedScoreboard(scoreboardTitle)) {
            continue;
          }
          const scoreboardList = railCard.querySelector(SCOREBOARD_LIST_SELECTOR);
          if (!scoreboardList) {
            continue;
          }
          for (const scoreboardRow of Array.from(
            scoreboardList.querySelectorAll(SCOREBOARD_ROW_SELECTOR)
          )) {
            const userLink = scoreboardRow.querySelector(SCOREBOARD_USER_LINK_SELECTOR);
            const username = extractUsernameFromLink(userLink) || extractUsernameFromText(scoreboardRow.textContent || "");
            if (username && blockedUserSet.has(username)) {
              scoreboardRow.remove();
            }
          }
          if (!scoreboardList.querySelector(SCOREBOARD_ROW_SELECTOR)) {
            railCard.remove();
          }
        }
      }
      function filterRailSections(filterSettings) {
        const rightRail = globalThis.document.querySelector(RIGHT_RAIL_SELECTOR);
        if (!rightRail) {
          return;
        }
        const blockedUserSet = filterSettings.enabled ? buildBlockedUserSet(filterSettings.blockedUsers) : /* @__PURE__ */ new Set();
        if (blockedUserSet.size === 0) {
          return;
        }
        filterWhoToFollow(rightRail, blockedUserSet);
        filterScoreboards(rightRail, blockedUserSet);
      }
      module.exports = {
        extractUsernameFromLink,
        extractUsernameFromText,
        extractUsernameFromUserPath,
        filterRailSections,
        isTargetedScoreboard
      };
    }
  });

  // src/core/post-pipeline.js
  var require_post_pipeline = __commonJS({
    "src/core/post-pipeline.js"(exports, module) {
      var { renderEmbeds, clearEmbeds } = require_embed_renderer();
      var { extractPostModel } = require_post_extractor();
      var { linkifyPostContent } = require_link_renderer();
      var { POST_CARD_SELECTOR } = require_post_selectors();
      var { applyFilterDecision } = require_post_renderer();
      var { resolveEmbedDescriptors } = require_embed_engine();
      var {
        syncDetachedCommentBlockControls,
        syncPostAndCommentBlockControls
      } = require_block_control_stage();
      var {
        filterDetachedComments,
        filterPostComments
      } = require_comment_filter_stage();
      var { evaluateFilterDecision } = require_filter_engine();
      var { filterNotificationItems } = require_notification_filter_stage();
      var { filterRailSections } = require_rail_filter_stage();
      var CARD_FINGERPRINT_ATTRIBUTE = "data-cdp-fingerprint";
      var PERMALINK_PATH_PATTERN = /^\/p\/[^/?#]+/i;
      function createProcessingFingerprint(settings, signature) {
        return JSON.stringify({
          filters: settings.filters,
          embeds: settings.embeds,
          signature
        });
      }
      function createPostPipeline(getSettings, onRequestBlockUser = () => {
      }) {
        let mutationObserver = null;
        let locationWatcherTimer = null;
        let debounceTimer = null;
        let lastKnownUrl = "";
        function run(options = {}) {
          const settings = getSettings();
          const shouldForce = options.force === true;
          const postCards = Array.from(globalThis.document.querySelectorAll(POST_CARD_SELECTOR));
          filterNotificationItems(settings.filters);
          filterRailSections(settings.filters);
          postCards.forEach((postCard, index) => {
            filterPostComments(postCard, settings.filters);
            const postModel = extractPostModel(postCard, index);
            syncPostAndCommentBlockControls({
              postCard,
              postModel,
              filterSettings: settings.filters,
              onRequestBlockUser
            });
            const fingerprint = createProcessingFingerprint(settings, postModel.signature);
            const previousFingerprint = postCard.getAttribute(CARD_FINGERPRINT_ATTRIBUTE);
            if (!shouldForce && previousFingerprint === fingerprint) {
              return;
            }
            const filterDecision = evaluateFilterDecision(postModel, settings.filters);
            applyFilterDecision(postCard, filterDecision);
            if (filterDecision.blocked) {
              clearEmbeds(postCard);
              postCard.setAttribute(CARD_FINGERPRINT_ATTRIBUTE, fingerprint);
              return;
            }
            linkifyPostContent(postCard);
            const embedDescriptors = resolveEmbedDescriptors(postModel, settings.embeds);
            renderEmbeds(postCard, embedDescriptors);
            postCard.setAttribute(CARD_FINGERPRINT_ATTRIBUTE, fingerprint);
          });
          if (postCards.length > 0 && PERMALINK_PATH_PATTERN.test(globalThis.location.pathname)) {
            filterDetachedComments(postCards[0], settings.filters);
            syncDetachedCommentBlockControls({
              filterSettings: settings.filters,
              onRequestBlockUser
            });
          }
        }
        function scheduleRun(force) {
          if (debounceTimer) {
            clearTimeout(debounceTimer);
          }
          debounceTimer = setTimeout(() => {
            run({ force });
          }, 120);
        }
        function start() {
          if (!globalThis.document || !globalThis.document.body) {
            return;
          }
          run({ force: true });
          lastKnownUrl = globalThis.location.href;
          mutationObserver = new globalThis.MutationObserver(() => {
            scheduleRun(false);
          });
          mutationObserver.observe(globalThis.document.body, {
            childList: true,
            subtree: true
          });
          locationWatcherTimer = setInterval(() => {
            if (globalThis.location.href === lastKnownUrl) {
              return;
            }
            lastKnownUrl = globalThis.location.href;
            scheduleRun(true);
          }, 750);
        }
        function stop() {
          if (mutationObserver) {
            mutationObserver.disconnect();
            mutationObserver = null;
          }
          if (locationWatcherTimer) {
            clearInterval(locationWatcherTimer);
            locationWatcherTimer = null;
          }
          if (debounceTimer) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
          }
        }
        return {
          run,
          start,
          stop
        };
      }
      module.exports = {
        createPostPipeline
      };
    }
  });

  // src/dom/body-ready.js
  var require_body_ready = __commonJS({
    "src/dom/body-ready.js"(exports, module) {
      function whenBodyReady(onReady) {
        if (globalThis.document && globalThis.document.body) {
          onReady();
          return;
        }
        const onReadyStateChange = () => {
          if (globalThis.document && globalThis.document.body) {
            globalThis.document.removeEventListener("readystatechange", onReadyStateChange);
            onReady();
          }
        };
        globalThis.document.addEventListener("readystatechange", onReadyStateChange);
      }
      module.exports = {
        whenBodyReady
      };
    }
  });

  // src/dom/tooltip.js
  var require_tooltip = __commonJS({
    "src/dom/tooltip.js"(exports, module) {
      var TOOLTIP_ID = "cdp-hover-tooltip";
      var LINK_SELECTOR = ".cdp-auto-link[data-cdp-tooltip]";
      var TOOLTIP_SHOW_DELAY_MS = 650;
      var TOOLTIP_HIDE_DELAY_MS = 140;
      var TOOLTIP_INSTALL_FLAG = "__cdpTooltipInstalled";
      function clamp(value, minValue, maxValue) {
        return Math.min(maxValue, Math.max(minValue, value));
      }
      function ensureTooltipElement() {
        if (!globalThis.document || !globalThis.document.body) {
          return null;
        }
        let tooltipElement = globalThis.document.getElementById(TOOLTIP_ID);
        if (tooltipElement) {
          return tooltipElement;
        }
        tooltipElement = globalThis.document.createElement("div");
        tooltipElement.id = TOOLTIP_ID;
        tooltipElement.setAttribute("role", "tooltip");
        tooltipElement.hidden = true;
        globalThis.document.body.appendChild(tooltipElement);
        return tooltipElement;
      }
      function positionTooltip(tooltipElement, linkElement) {
        const linkRect = linkElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        const gap = 10;
        let top = linkRect.top - tooltipRect.height - gap;
        if (top < 8) {
          top = linkRect.bottom + gap;
        }
        const left = clamp(linkRect.left, 8, globalThis.innerWidth - tooltipRect.width - 8);
        tooltipElement.style.left = `${left}px`;
        tooltipElement.style.top = `${top}px`;
      }
      function installAutoLinkTooltip() {
        if (globalThis[TOOLTIP_INSTALL_FLAG]) {
          return;
        }
        globalThis[TOOLTIP_INSTALL_FLAG] = true;
        const tooltipElement = ensureTooltipElement();
        if (!tooltipElement) {
          return;
        }
        let activeLink = null;
        let showTimerId = null;
        let hideTimerId = null;
        function refreshTooltip() {
          if (!activeLink || !globalThis.document.contains(activeLink)) {
            tooltipElement.hidden = true;
            activeLink = null;
            return;
          }
          const tooltipText = activeLink.getAttribute("data-cdp-tooltip") || activeLink.href || "";
          if (!tooltipText) {
            tooltipElement.hidden = true;
            return;
          }
          tooltipElement.textContent = tooltipText;
          tooltipElement.hidden = false;
          positionTooltip(tooltipElement, activeLink);
        }
        function clearTimers() {
          if (showTimerId) {
            clearTimeout(showTimerId);
            showTimerId = null;
          }
          if (hideTimerId) {
            clearTimeout(hideTimerId);
            hideTimerId = null;
          }
        }
        function activateLink(linkElement, immediate) {
          clearTimers();
          if (!linkElement) {
            hideTimerId = setTimeout(
              () => {
                activeLink = null;
                refreshTooltip();
              },
              immediate ? 0 : TOOLTIP_HIDE_DELAY_MS
            );
            return;
          }
          showTimerId = setTimeout(
            () => {
              activeLink = /** @type {HTMLAnchorElement} */
              linkElement;
              refreshTooltip();
            },
            immediate ? 0 : TOOLTIP_SHOW_DELAY_MS
          );
        }
        globalThis.document.addEventListener("mouseover", (event) => {
          const linkElement = event.target instanceof Element ? event.target.closest(LINK_SELECTOR) : null;
          activateLink(linkElement, false);
        });
        globalThis.document.addEventListener("mouseout", (event) => {
          if (!activeLink) {
            return;
          }
          const relatedTarget = event.relatedTarget;
          if (relatedTarget instanceof Element && relatedTarget.closest(LINK_SELECTOR) === activeLink) {
            return;
          }
          const currentTargetLink = event.target instanceof Element ? event.target.closest(LINK_SELECTOR) : null;
          if (currentTargetLink === activeLink) {
            activateLink(null, false);
          }
        });
        globalThis.document.addEventListener("focusin", (event) => {
          const linkElement = event.target instanceof Element ? event.target.closest(LINK_SELECTOR) : null;
          if (linkElement) {
            activateLink(linkElement, true);
          }
        });
        globalThis.document.addEventListener("focusout", (event) => {
          const currentTargetLink = event.target instanceof Element ? event.target.closest(LINK_SELECTOR) : null;
          if (currentTargetLink === activeLink) {
            activateLink(null, true);
          }
        });
        globalThis.addEventListener("scroll", refreshTooltip, { passive: true });
        globalThis.addEventListener("resize", refreshTooltip);
      }
      module.exports = {
        installAutoLinkTooltip
      };
    }
  });

  // src/storage/userscript-storage.js
  var require_userscript_storage = __commonJS({
    "src/storage/userscript-storage.js"(exports, module) {
      async function getValue(key, fallbackValue) {
        const gm = globalThis.GM;
        if (gm && typeof gm.getValue === "function") {
          return gm.getValue(key, fallbackValue);
        }
        const legacyGetter = globalThis.GM_getValue;
        if (typeof legacyGetter === "function") {
          return legacyGetter(key, fallbackValue);
        }
        try {
          const rawValue = globalThis.localStorage.getItem(key);
          if (rawValue === null) {
            return fallbackValue;
          }
          return JSON.parse(rawValue);
        } catch (_error) {
          return fallbackValue;
        }
      }
      async function setValue(key, value) {
        const gm = globalThis.GM;
        if (gm && typeof gm.setValue === "function") {
          await gm.setValue(key, value);
          return;
        }
        const legacySetter = globalThis.GM_setValue;
        if (typeof legacySetter === "function") {
          legacySetter(key, value);
          return;
        }
        try {
          globalThis.localStorage.setItem(key, JSON.stringify(value));
        } catch (_error) {
        }
      }
      module.exports = {
        getValue,
        setValue
      };
    }
  });

  // src/storage/settings-schema.js
  var require_settings_schema = __commonJS({
    "src/storage/settings-schema.js"(exports, module) {
      var {
        DARK_THEME_ID,
        DEFAULT_THEME_ID,
        ORIGINAL_THEME_ID,
        isValidThemeId
      } = require_theme_registry();
      var SETTINGS_SCHEMA_VERSION = 1;
      var LEGACY_DARK_MODE_KEY = "chillnetDarkModePreference";
      var SETTINGS_STORAGE_KEY = "cdp:settings";
      function createDefaultSettings() {
        return {
          schemaVersion: SETTINGS_SCHEMA_VERSION,
          theme: {
            id: DEFAULT_THEME_ID
          },
          filters: {
            enabled: true,
            blockedUsers: [],
            blockedPhrases: []
          },
          embeds: {
            enabled: true,
            image: true,
            reddit: true,
            spotify: true,
            tiktok: true,
            x: true,
            youtube: true,
            maxPerPost: 3
          }
        };
      }
      function normalizeBoundedInteger(rawValue, fallbackValue, minValue, maxValue) {
        const parsedValue = Number.parseInt(String(rawValue), 10);
        if (!Number.isFinite(parsedValue)) {
          return fallbackValue;
        }
        return Math.min(maxValue, Math.max(minValue, parsedValue));
      }
      function normalizeStringList(rawValue) {
        if (!Array.isArray(rawValue)) {
          return [];
        }
        const normalizedSet = /* @__PURE__ */ new Set();
        for (const entry of rawValue) {
          const normalizedEntry = String(entry === null || entry === void 0 ? "" : entry).trim();
          if (!normalizedEntry) {
            continue;
          }
          normalizedSet.add(normalizedEntry);
        }
        return Array.from(normalizedSet);
      }
      function resolveThemeId(themeCandidate, legacyThemePreference, fallbackThemeId) {
        if (isValidThemeId(themeCandidate.id)) {
          return themeCandidate.id;
        }
        if (typeof themeCandidate.enabled === "boolean") {
          return themeCandidate.enabled ? DARK_THEME_ID : ORIGINAL_THEME_ID;
        }
        if (legacyThemePreference === "enabled") {
          return DARK_THEME_ID;
        }
        if (legacyThemePreference === "disabled") {
          return ORIGINAL_THEME_ID;
        }
        return fallbackThemeId;
      }
      function normalizeSettings(rawSettings, legacyThemePreference) {
        const defaults = createDefaultSettings();
        const settingsCandidate = rawSettings && typeof rawSettings === "object" ? (
          /** @type {Record<string, unknown>} */
          rawSettings
        ) : {};
        const themeCandidate = settingsCandidate.theme && typeof settingsCandidate.theme === "object" ? (
          /** @type {Record<string, unknown>} */
          settingsCandidate.theme
        ) : {};
        const filtersCandidate = settingsCandidate.filters && typeof settingsCandidate.filters === "object" ? (
          /** @type {Record<string, unknown>} */
          settingsCandidate.filters
        ) : {};
        const embedsCandidate = settingsCandidate.embeds && typeof settingsCandidate.embeds === "object" ? (
          /** @type {Record<string, unknown>} */
          settingsCandidate.embeds
        ) : {};
        return {
          schemaVersion: SETTINGS_SCHEMA_VERSION,
          theme: {
            id: resolveThemeId(themeCandidate, legacyThemePreference, defaults.theme.id)
          },
          filters: {
            enabled: typeof filtersCandidate.enabled === "boolean" ? filtersCandidate.enabled : defaults.filters.enabled,
            blockedUsers: normalizeStringList(filtersCandidate.blockedUsers),
            blockedPhrases: normalizeStringList(filtersCandidate.blockedPhrases)
          },
          embeds: {
            enabled: typeof embedsCandidate.enabled === "boolean" ? embedsCandidate.enabled : defaults.embeds.enabled,
            image: typeof embedsCandidate.image === "boolean" ? embedsCandidate.image : defaults.embeds.image,
            reddit: typeof embedsCandidate.reddit === "boolean" ? embedsCandidate.reddit : defaults.embeds.reddit,
            spotify: typeof embedsCandidate.spotify === "boolean" ? embedsCandidate.spotify : defaults.embeds.spotify,
            tiktok: typeof embedsCandidate.tiktok === "boolean" ? embedsCandidate.tiktok : defaults.embeds.tiktok,
            x: typeof embedsCandidate.x === "boolean" ? embedsCandidate.x : defaults.embeds.x,
            youtube: typeof embedsCandidate.youtube === "boolean" ? embedsCandidate.youtube : defaults.embeds.youtube,
            maxPerPost: normalizeBoundedInteger(
              embedsCandidate.maxPerPost,
              defaults.embeds.maxPerPost,
              1,
              6
            )
          }
        };
      }
      module.exports = {
        LEGACY_DARK_MODE_KEY,
        SETTINGS_SCHEMA_VERSION,
        SETTINGS_STORAGE_KEY,
        createDefaultSettings,
        normalizeSettings
      };
    }
  });

  // src/storage/settings-store.js
  var require_settings_store = __commonJS({
    "src/storage/settings-store.js"(exports, module) {
      var { getValue, setValue } = require_userscript_storage();
      var {
        LEGACY_DARK_MODE_KEY,
        SETTINGS_STORAGE_KEY,
        normalizeSettings
      } = require_settings_schema();
      function createSettingsStore() {
        async function load() {
          const [storedSettings, legacyThemePreference] = await Promise.all([
            getValue(SETTINGS_STORAGE_KEY, null),
            getValue(LEGACY_DARK_MODE_KEY, null)
          ]);
          const normalizedSettings = normalizeSettings(storedSettings, legacyThemePreference);
          await setValue(SETTINGS_STORAGE_KEY, normalizedSettings);
          return normalizedSettings;
        }
        async function save(nextSettings) {
          const normalizedSettings = normalizeSettings(nextSettings, null);
          await setValue(SETTINGS_STORAGE_KEY, normalizedSettings);
          return normalizedSettings;
        }
        function normalize(nextSettings) {
          return normalizeSettings(nextSettings, null);
        }
        return {
          load,
          save,
          normalize
        };
      }
      module.exports = {
        createSettingsStore
      };
    }
  });

  // src/features/filtering/block-list-updater.js
  var require_block_list_updater = __commonJS({
    "src/features/filtering/block-list-updater.js"(exports, module) {
      var { buildBlockedUserSet, normalizeForMatch } = require_matchers();
      function normalizeUsernameToken(username) {
        return String(username || "").replace(/^@+/, "").trim();
      }
      function buildBlockedEntry(blockTarget) {
        const normalizedUsername = normalizeUsernameToken(blockTarget.username);
        if (normalizedUsername) {
          return `@${normalizedUsername}`;
        }
        return String(blockTarget.displayName || "").trim();
      }
      function isTargetAlreadyBlocked(blockTarget, blockedUserSet) {
        const normalizedUsername = normalizeForMatch(normalizeUsernameToken(blockTarget.username));
        const normalizedDisplayName = normalizeForMatch(blockTarget.displayName || "");
        return Boolean(normalizedUsername && blockedUserSet.has(normalizedUsername)) || Boolean(normalizedDisplayName && blockedUserSet.has(normalizedDisplayName));
      }
      function addBlockedUserToSettings(currentSettings, blockTarget) {
        const blockedUserSet = buildBlockedUserSet(currentSettings.filters.blockedUsers);
        if (isTargetAlreadyBlocked(blockTarget, blockedUserSet)) {
          return {
            changed: false,
            addedEntry: "",
            nextSettings: currentSettings
          };
        }
        const blockedEntry = buildBlockedEntry(blockTarget);
        if (!blockedEntry) {
          return {
            changed: false,
            addedEntry: "",
            nextSettings: currentSettings
          };
        }
        return {
          changed: true,
          addedEntry: blockedEntry,
          nextSettings: {
            ...currentSettings,
            filters: {
              ...currentSettings.filters,
              enabled: true,
              blockedUsers: [...currentSettings.filters.blockedUsers, blockedEntry]
            }
          }
        };
      }
      module.exports = {
        addBlockedUserToSettings,
        buildBlockedEntry,
        normalizeUsernameToken
      };
    }
  });

  // src/theme/feature-styles.js
  var require_feature_styles = __commonJS({
    "src/theme/feature-styles.js"(exports, module) {
      function buildFeatureStylesCss() {
        return `
.cdp-hidden-post {
  display: none !important;
}

.cdp-hidden-comment {
  display: none !important;
}

.cdp-hidden-notification {
  display: none !important;
}

.cdp-embed-stack {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}

.cdp-auto-link {
  position: relative;
  display: inline-block;
  max-width: min(100%, 560px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
  color: #efc79d !important;
  text-decoration: underline;
  text-decoration-color: rgba(239, 199, 157, 0.48);
  text-underline-offset: 2px;
}

.cdp-auto-link:hover {
  color: #ffd9b2 !important;
  text-decoration-color: rgba(255, 217, 178, 0.8);
}

#cdp-hover-tooltip {
  position: fixed;
  left: 0;
  top: 0;
  max-width: min(74vw, 700px);
  padding: 7px 10px;
  border: 1px solid #464646;
  border-radius: 10px;
  background: #141414;
  color: #e7edf3;
  font-size: 12px;
  line-height: 1.35;
  white-space: nowrap;
  pointer-events: none;
  z-index: 200000;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.56);
}

.cdp-embed-card {
  width: 100%;
  max-width: 100%;
  border: 1px solid #2f2f2f;
  border-radius: 12px;
  overflow: hidden;
  background: #121212;
}

.cdp-embed-link {
  display: block;
}

.cdp-embed-link-fallback {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  color: #e6c39e !important;
  text-decoration: none;
}

.cdp-embed-link-fallback:hover {
  background: #1b1b1b;
}

.cdp-embed-link img {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(58vh, 420px);
  object-fit: contain;
  background: #0a0a0a;
}

.cdp-embed-video {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #0a0a0a;
}

.cdp-embed-video iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.cdp-embed-spotify {
  width: 100%;
  background: #0a0a0a;
}

.cdp-embed-spotify iframe {
  display: block;
  width: 100%;
  border: 0;
}

.cdp-embed-social {
  width: 100%;
  background: #0a0a0a;
}

.cdp-embed-social iframe {
  display: block;
  width: 100%;
  border: 0;
}

.cdp-embed-social-vertical iframe {
  min-height: min(80vh, 760px);
}

.cn-feed-head-right .cdp-inline-block-user-btn,
.cn-comment-head-right .cdp-inline-block-user-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--cdp-modal-button-border);
  background: var(--cdp-modal-button);
  color: var(--cdp-modal-button-text);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1;
  padding: 4px 8px;
  min-height: 22px;
  cursor: pointer;
  transition:
    border-color 120ms ease,
    color 120ms ease,
    background 120ms ease,
    transform 120ms ease;
}

.cn-feed-head-right .cdp-inline-block-user-btn:hover,
.cn-comment-head-right .cdp-inline-block-user-btn:hover {
  border-color: var(--cdp-modal-button-hover-border);
  background: var(--cdp-modal-button);
  color: var(--cdp-modal-button-text);
  box-shadow:
    0 8px 18px -12px rgba(0, 0, 0, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  transform: translateY(-1px);
}

.cn-feed-head-right .cdp-inline-block-user-btn:active,
.cn-comment-head-right .cdp-inline-block-user-btn:active {
  transform: translateY(0);
}

.cn-feed-head-right .cdp-inline-block-user-btn[disabled],
.cn-comment-head-right .cdp-inline-block-user-btn[disabled] {
  cursor: default;
  border-color: var(--cdp-modal-danger-border);
  background: var(--cdp-modal-danger-bg);
  color: var(--cdp-modal-danger-text);
  transform: translateY(0);
  box-shadow: none;
}

.cdp-confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 100001;
  display: grid;
  place-items: center;
  padding: 18px;
  background: var(--cdp-modal-backdrop);
  backdrop-filter: blur(2px);
}

.cdp-confirm-overlay[hidden] {
  display: none !important;
}

.cdp-confirm-panel {
  width: min(430px, calc(100vw - 30px));
  border-radius: 16px;
  border: 1px solid var(--cdp-modal-border);
  background: linear-gradient(180deg, var(--cdp-modal-surface-elevated), var(--cdp-modal-surface));
  color: var(--cdp-modal-text);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.34);
  padding: 16px;
  display: grid;
  gap: 12px;
}

.cdp-confirm-panel h3 {
  margin: 0;
  font-size: 18px;
}

.cdp-confirm-text {
  margin: 0;
  color: var(--cdp-modal-text-muted);
  font-size: 14px;
  line-height: 1.45;
}

.cdp-confirm-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.cdp-confirm-btn {
  --cdp-confirm-btn-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.07), var(--cdp-modal-button));
  --cdp-confirm-btn-border: var(--cdp-modal-button-border);
  --cdp-confirm-btn-ink: var(--cdp-modal-button-text);
  border-radius: 999px;
  border: 1px solid var(--cdp-confirm-btn-border);
  background: var(--cdp-confirm-btn-bg);
  background-image: var(--cdp-confirm-btn-bg);
  color: var(--cdp-confirm-btn-ink);
  padding: 7px 13px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    transform 120ms ease,
    border-color 140ms ease,
    box-shadow 140ms ease;
}

.cdp-confirm-panel button.cdp-confirm-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: var(--cdp-modal-button-hover-border) !important;
  background: var(--cdp-confirm-btn-bg) !important;
  background-image: var(--cdp-confirm-btn-bg) !important;
  color: var(--cdp-confirm-btn-ink) !important;
  box-shadow:
    0 8px 18px -12px rgba(0, 0, 0, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06) !important;
}

.cdp-confirm-btn.is-danger {
  --cdp-confirm-btn-border: var(--cdp-modal-danger-border);
  --cdp-confirm-btn-bg: var(--cdp-modal-danger-bg);
  --cdp-confirm-btn-ink: var(--cdp-modal-danger-text);
  --cdp-modal-button-hover-border: var(--cdp-modal-danger-border);
}

.cdp-confirm-panel button.cdp-confirm-btn.is-danger:hover:not(:disabled) {
  border-color: var(--cdp-confirm-btn-border);
  background: var(--cdp-confirm-btn-bg);
  background-image: var(--cdp-confirm-btn-bg);
  color: var(--cdp-confirm-btn-ink);
}

.cdp-confirm-btn:active {
  transform: translateY(0);
  box-shadow:
    0 4px 10px -10px rgba(0, 0, 0, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.cdp-confirm-panel button.cdp-confirm-btn:focus-visible {
  outline: 2px solid var(--cdp-modal-button-border) !important;
  outline-offset: 2px;
  box-shadow: none !important;
}

.cdp-confirm-btn:disabled {
  opacity: 0.7;
  cursor: default;
}

:root {
  --cdp-modal-backdrop: rgba(9, 15, 27, 0.38);
  --cdp-modal-surface: #f7f9fd;
  --cdp-modal-surface-elevated: #ffffff;
  --cdp-modal-border: #ccd8ea;
  --cdp-modal-card-border: #dde6f4;
  --cdp-modal-text: #1c2f4c;
  --cdp-modal-text-muted: #5f7492;
  --cdp-modal-input: #ffffff;
  --cdp-modal-input-border: #c5d3e8;
  --cdp-modal-button: #e8effb;
  --cdp-modal-button-border: #bfd0e8;
  --cdp-modal-button-text: #1a3359;
  --cdp-modal-button-hover-border: #a8bddc;
  --cdp-modal-accent: #2e67cf;
  --cdp-modal-accent-strong: #4f88f0;
  --cdp-modal-primary-border: #1f468e;
  --cdp-modal-primary-bg: linear-gradient(
    180deg,
    var(--cdp-modal-accent-strong),
    var(--cdp-modal-accent)
  );
  --cdp-modal-primary-text: #f5f9ff;
  --cdp-modal-danger-border: #caa28e;
  --cdp-modal-danger-bg: linear-gradient(180deg, #f4dbcf, #e7c6b6);
  --cdp-modal-danger-text: #3e2316;
  --cdp-filtered-comment-text: #6b7a93;
}

html[data-cdp-theme-mode="dark"] {
  --cdp-modal-backdrop: rgba(0, 0, 0, 0.64);
  --cdp-modal-surface: #0f0f0f;
  --cdp-modal-surface-elevated: #151515;
  --cdp-modal-border: #2d2d2d;
  --cdp-modal-card-border: #353535;
  --cdp-modal-text: #e8edf2;
  --cdp-modal-text-muted: #9eabba;
  --cdp-modal-input: #161616;
  --cdp-modal-input-border: #3b3b3b;
  --cdp-modal-button: #1e1e1e;
  --cdp-modal-button-border: #424242;
  --cdp-modal-button-text: #e8edf2;
  --cdp-modal-button-hover-border: #5a5a5a;
  --cdp-modal-primary-text: #1f130c;
  --cdp-modal-danger-border: #7e4343;
  --cdp-modal-danger-bg: linear-gradient(180deg, #4b2525, #341818);
  --cdp-modal-danger-text: #f7dddf;
  --cdp-filtered-comment-text: #b2bcc8;
}

html[data-cdp-theme="dark"] {
  --cdp-modal-accent: #cf5b2d;
  --cdp-modal-accent-strong: #e17346;
  --cdp-modal-primary-border: #6f3b22;
  --cdp-modal-primary-bg: linear-gradient(180deg, #da7448, #c4572d);
  --cdp-modal-primary-text: #21130b;
  --cdp-modal-danger-border: #8a4545;
  --cdp-modal-danger-bg: linear-gradient(180deg, #552a2a, #3b1b1b);
  --cdp-modal-danger-text: #ffe1e3;
}

html[data-cdp-theme="brown"] {
  --cdp-modal-accent: #a26b3f;
  --cdp-modal-accent-strong: #c88d59;
  --cdp-modal-primary-border: #5f3d24;
  --cdp-modal-primary-bg: linear-gradient(180deg, #bf8756, #9b653c);
  --cdp-modal-primary-text: #21130b;
  --cdp-modal-danger-border: #7d4f3b;
  --cdp-modal-danger-bg: linear-gradient(180deg, #5a3628, #3f251b);
  --cdp-modal-danger-text: #f6e0d3;
}

html[data-cdp-theme="pink"] {
  --cdp-modal-accent: #cd4f94;
  --cdp-modal-accent-strong: #e774b2;
  --cdp-modal-primary-border: #74375d;
  --cdp-modal-primary-bg: linear-gradient(180deg, #dc72ad, #bf4b8b);
  --cdp-modal-primary-text: #2a1021;
  --cdp-modal-danger-border: #7f4467;
  --cdp-modal-danger-bg: linear-gradient(180deg, #5a2d4a, #3f1f33);
  --cdp-modal-danger-text: #f8deef;
}

html[data-cdp-theme="olden"] {
  --cdp-modal-backdrop: rgba(90, 60, 27, 0.3);
  --cdp-modal-surface: #f5e7ca;
  --cdp-modal-surface-elevated: #fbf2de;
  --cdp-modal-border: #b99766;
  --cdp-modal-card-border: #c9ab76;
  --cdp-modal-text: #3a2816;
  --cdp-modal-text-muted: #6f5635;
  --cdp-modal-input: #f9efda;
  --cdp-modal-input-border: #b99869;
  --cdp-modal-button: #ead6af;
  --cdp-modal-button-border: #a68552;
  --cdp-modal-button-text: #4d321b;
  --cdp-modal-accent: #7f4224;
  --cdp-modal-accent-strong: #9f6038;
  --cdp-modal-primary-border: #6e3a1f;
  --cdp-modal-primary-bg: linear-gradient(180deg, #a86a40, #804427);
  --cdp-modal-primary-text: #fff5e5;
  --cdp-modal-danger-border: #8d6244;
  --cdp-modal-danger-bg: linear-gradient(180deg, #c49767, #996744);
  --cdp-modal-danger-text: #29170d;
  --cdp-filtered-comment-text: #7f6846;
}

html[data-cdp-theme="aurora"] {
  --cdp-modal-accent: #4db4ff;
  --cdp-modal-accent-strong: #7ae874;
  --cdp-modal-primary-border: #3974a8;
  --cdp-modal-primary-bg: linear-gradient(120deg, #57b6ff, #6fd7a3, #b987ff);
  --cdp-modal-primary-text: #13243f;
  --cdp-modal-danger-border: #40557d;
  --cdp-modal-danger-bg: linear-gradient(180deg, #2b3b5c, #1f2b45);
  --cdp-modal-danger-text: #dce8ff;
}

html[data-cdp-theme="olden"] #cdp-settings-panel {
  font-family:
    "Edwardian Script ITC",
    "Kunstler Script",
    "French Script MT",
    "Segoe Script",
    "Lucida Handwriting",
    "Brush Script MT",
    "Palatino Linotype",
    "Book Antiqua",
    cursive;
}

#cdp-settings-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: grid;
  place-items: center;
  padding: 18px;
  background: var(--cdp-modal-backdrop);
  backdrop-filter: blur(2px);
}

#cdp-settings-overlay[hidden] {
  display: none !important;
}

#cdp-settings-panel {
  width: min(700px, calc(100vw - 30px));
  max-height: min(84vh, 860px);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--cdp-modal-border);
  background: linear-gradient(180deg, var(--cdp-modal-surface-elevated), var(--cdp-modal-surface));
  color: var(--cdp-modal-text);
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.36);
  font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
}

.cdp-settings-head,
.cdp-settings-body {
  padding: 14px 16px;
}

.cdp-settings-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid var(--cdp-modal-border);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0)
  );
}

.cdp-settings-head-copy {
  display: grid;
  gap: 3px;
}

.cdp-settings-kicker {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--cdp-modal-text-muted);
}

.cdp-settings-head h3 {
  margin: 0;
  font-size: 19px;
}

.cdp-settings-head-actions {
  position: relative;
  display: grid;
  align-items: center;
  justify-items: end;
}

.cdp-settings-action-set {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition:
    opacity 160ms ease,
    transform 180ms ease;
}

.cdp-settings-action-set[data-cdp-actions-clean] {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.cdp-settings-action-set[data-cdp-actions-dirty] {
  opacity: 0;
  transform: translateY(-4px);
  pointer-events: none;
}

.cdp-settings-head-actions.is-dirty .cdp-settings-action-set[data-cdp-actions-clean] {
  opacity: 0;
  transform: translateY(4px);
  pointer-events: none;
}

.cdp-settings-head-actions.is-dirty .cdp-settings-action-set[data-cdp-actions-dirty] {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.cdp-settings-body {
  display: grid;
  gap: 14px;
  min-height: 0;
  overflow: auto;
  scrollbar-gutter: stable;
}

.cdp-settings-section {
  display: grid;
  gap: 10px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--cdp-modal-card-border);
  background: var(--cdp-modal-surface-elevated);
}

.cdp-settings-section h4 {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--cdp-modal-text-muted);
}

.cdp-settings-field-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--cdp-modal-text-muted);
}

.cdp-settings-theme-select-wrap {
  display: block;
}

#cdp-settings-panel input[type="checkbox"] {
  accent-color: var(--cdp-modal-accent-strong);
}

.cdp-settings-panel-input,
.cdp-settings-panel-textarea {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--cdp-modal-input-border);
  background: var(--cdp-modal-input);
  color: var(--cdp-modal-text);
  padding: 9px 10px;
  font-size: 13px;
}

.cdp-settings-panel-textarea {
  min-height: 84px;
  resize: vertical;
}

.cdp-settings-token-editor {
  padding: 6px 8px;
  border-radius: 10px;
  border: 1px solid var(--cdp-modal-input-border);
  background: var(--cdp-modal-input);
  cursor: text;
}

.cdp-settings-token-editor:focus-within {
  outline: 2px solid var(--cdp-modal-accent-strong);
  outline-offset: 2px;
}

.cdp-settings-token-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  min-height: 26px;
}

.cdp-settings-token-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid var(--cdp-modal-input-border);
  background: rgba(127, 146, 170, 0.14);
  color: var(--cdp-modal-text);
  padding: 3px 9px;
  font-size: 13px;
  line-height: 1.25;
  cursor: pointer;
  transition:
    border-color 120ms ease,
    background-color 120ms ease;
}

#cdp-settings-panel button.cdp-settings-token-chip:hover:not(:disabled) {
  border-color: var(--cdp-modal-input-border) !important;
  background: rgba(127, 146, 170, 0.16) !important;
  color: var(--cdp-modal-text) !important;
  box-shadow: none !important;
  transform: none !important;
}

#cdp-settings-panel button.cdp-settings-token-chip:focus-visible {
  outline: 2px solid var(--cdp-modal-button-border) !important;
  outline-offset: 2px;
  box-shadow: none !important;
}

#cdp-settings-panel .cdp-settings-token-input {
  flex: 1 0 180px;
  min-width: 150px;
  max-width: 100%;
  appearance: none;
  -webkit-appearance: none;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
  color: var(--cdp-modal-text);
  font: inherit;
  font-size: 13px;
  line-height: 1.35;
  padding: 3px 2px;
}

#cdp-settings-panel .cdp-settings-token-input:hover,
#cdp-settings-panel .cdp-settings-token-input:focus,
#cdp-settings-panel .cdp-settings-token-input:focus-visible {
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
}

#cdp-settings-panel .cdp-settings-token-input::placeholder {
  color: var(--cdp-modal-text-muted);
}

.cdp-settings-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.cdp-settings-inline-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(180px, 220px);
  gap: 8px;
  align-items: stretch;
}

.cdp-settings-inline-row .cdp-settings-switch,
.cdp-settings-inline-row .cdp-settings-max-field {
  min-height: 42px;
}

.cdp-settings-max-field {
  min-height: 42px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 78px;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--cdp-modal-card-border);
  background: rgba(127, 146, 170, 0.08);
}

.cdp-settings-max-field .cdp-settings-field-label {
  font-size: 12px;
  margin: 0;
  white-space: nowrap;
}

.cdp-settings-max-field .cdp-settings-panel-input {
  width: 100%;
  height: 28px;
  line-height: 1.2;
  padding: 4px 8px;
}

.cdp-settings-switch {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--cdp-modal-card-border);
  background: rgba(127, 146, 170, 0.08);
  font-size: 14px;
  color: var(--cdp-modal-text);
}

.cdp-settings-switch input[type="checkbox"] {
  width: 16px !important;
  height: 16px !important;
  margin: 0 !important;
  display: block !important;
  flex: 0 0 auto !important;
}

.cdp-settings-switch-label {
  line-height: 1.4;
}

#cdp-settings-panel .cdp-settings-btn {
  --cdp-settings-btn-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.07), var(--cdp-modal-button));
  --cdp-settings-btn-border: var(--cdp-modal-button-border);
  --cdp-settings-btn-ink: var(--cdp-modal-button-text);
  border-radius: 999px;
  border: 1px solid var(--cdp-settings-btn-border) !important;
  background: var(--cdp-settings-btn-bg) !important;
  background-image: var(--cdp-settings-btn-bg) !important;
  background-color: transparent !important;
  color: var(--cdp-settings-btn-ink) !important;
  padding: 7px 13px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    transform 120ms ease,
    border-color 140ms ease,
    box-shadow 140ms ease;
}

#cdp-settings-panel .cdp-settings-btn:hover {
  transform: translateY(-1px);
  border-color: var(--cdp-modal-button-hover-border) !important;
  background: var(--cdp-settings-btn-bg) !important;
  background-image: var(--cdp-settings-btn-bg) !important;
  background-color: transparent !important;
  color: var(--cdp-settings-btn-ink) !important;
  box-shadow:
    0 8px 18px -12px rgba(0, 0, 0, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08) !important;
}

#cdp-settings-panel .cdp-settings-btn:active {
  transform: translateY(0);
  box-shadow:
    0 4px 10px -10px rgba(0, 0, 0, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

#cdp-settings-panel .cdp-settings-btn:disabled {
  opacity: 0.72;
  cursor: default;
}

#cdp-settings-panel .cdp-settings-btn.is-danger {
  --cdp-settings-btn-border: var(--cdp-modal-danger-border);
  --cdp-settings-btn-bg: var(--cdp-modal-danger-bg);
  --cdp-settings-btn-ink: var(--cdp-modal-danger-text);
  --cdp-modal-button-hover-border: var(--cdp-modal-danger-border);
}

#cdp-settings-panel .cdp-settings-btn.is-primary {
  --cdp-settings-btn-border: var(--cdp-modal-primary-border);
  --cdp-settings-btn-bg: var(--cdp-modal-primary-bg);
  --cdp-settings-btn-ink: var(--cdp-modal-primary-text);
  --cdp-modal-button-hover-border: var(--cdp-modal-primary-border);
  font-weight: 600;
}

.cdp-settings-panel-input:focus,
.cdp-settings-panel-textarea:focus,
#cdp-settings-panel .cdp-settings-btn:focus-visible {
  outline: 2px solid var(--cdp-modal-accent-strong);
  outline-offset: 2px;
}

.cdp-settings-nav-link {
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-align: start;
  font: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-weight: 400;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.cdp-settings-nav-icon {
  flex: 0 0 auto;
  line-height: 1;
}

.cn-left-rail .cn-nav-link + .cdp-settings-nav-link,
.cn-left-rail .cdp-settings-nav-link + .cn-nav-link {
  margin-top: 8px;
}

.cdp-settings-nav-link.is-active {
  border-color: var(--cdp-modal-accent) !important;
}

.cdp-filtered-comment-count {
  color: var(--cdp-filtered-comment-text);
  font-size: 0.94em;
  white-space: nowrap;
}

@media (max-width: 720px) {
  .cdp-settings-head {
    align-items: flex-start;
  }

  .cdp-settings-head-actions {
    width: 100%;
    justify-items: stretch;
  }

  .cdp-settings-action-set {
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .cdp-settings-inline-row {
    grid-template-columns: 1fr;
  }

  .cdp-settings-grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .cdp-settings-grid-3 {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cdp-settings-action-set,
  .cdp-settings-btn {
    transition: none !important;
  }
}
`;
      }
      module.exports = {
        buildFeatureStylesCss
      };
    }
  });

  // src/theme/palette.js
  var require_palette = __commonJS({
    "src/theme/palette.js"(exports, module) {
      var { DARK_THEME_ID, THEMES, getThemeDefinition } = require_theme_registry();
      var APP_BACKGROUND_SELECTORS = Object.freeze([
        ".cn-shell-main",
        ".cn-shell-grid",
        ".cn-center-column",
        ".cn-left-rail",
        ".cn-right-rail"
      ]);
      var SURFACE_SELECTORS = Object.freeze([
        ".cn-topbar",
        ".cn-mobile-nav",
        ".cn-compose-card",
        ".cn-rail-card",
        ".cn-feed-card",
        ".cn-feed-switch",
        ".cn-comments-block",
        ".cn-user-pill",
        ".cn-account-pill",
        ".cn-notification-menu",
        ".cn-avatar-menu",
        ".cn-inline-menu-popover",
        ".cn-admin-user-card",
        ".cn-admin-invite-item",
        ".cn-admin-user-block",
        '[class^="cn-admin-"]',
        '[class*=" cn-admin-"]'
      ]);
      var MUTED_TEXT_SELECTORS = Object.freeze([
        ".cn-topic-button",
        ".cn-comment-author",
        ".cn-handle-with-medal",
        ".cn-dookie-stack",
        ".cn-post-stats-right",
        ".cn-action-label",
        ".cn-action-icon"
      ]);
      var MODULE_BLOCK_SELECTORS = Object.freeze([
        '[class*="__howToPlayStat"]',
        '[class*="__inviteLink"]',
        '[class*="__inviteIconButton"]',
        '[class*="__desktopGiantKnob"]',
        '[class*="__limitCard"]'
      ]);
      var MODULE_MUTED_SELECTORS = Object.freeze([
        '[class*="__howToPlayTitle"]',
        '[class*="__howToPlayLead"]',
        '[class*="__howToPlayList"]',
        '[class*="__eyebrow"]',
        '[class*="__subtitle"]',
        '[class*="__inviteCopy"]',
        '[class*="__inviteCounter"]',
        '[class*="__toolsMeta"]',
        '[class*="__boardHint"]',
        '[class*="__leaderboardEmpty"]',
        '[class*="__limitLabel"]',
        '[class*="__limitMeta"]'
      ]);
      var MODULE_ACCENT_SELECTORS = Object.freeze(['[class*="__limitValue"]']);
      var STATUS_SELECTORS = Object.freeze([
        '[class*="__statusPill"]',
        '[class*="__statusPillCompact"]',
        '[class*="__statusLive"]'
      ]);
      function scopeSelectors(themeId, selectors) {
        return selectors.map((selector) => `html[data-cdp-theme="${themeId}"] ${selector}`).join(",\n");
      }
      function buildTokenVariableDeclarations(tokens) {
        return Object.entries(tokens).map(([tokenKey, tokenValue]) => `  --cdp-theme-${tokenKey}: ${tokenValue};`).join("\n");
      }
      function buildScopedThemeCss(themeDefinition) {
        if (!themeDefinition.useCustomStyles) {
          return "";
        }
        const tokenDeclarations = buildTokenVariableDeclarations(themeDefinition.tokens);
        const scopedSurfaces = scopeSelectors(themeDefinition.id, SURFACE_SELECTORS);
        const scopedAppBackground = scopeSelectors(themeDefinition.id, APP_BACKGROUND_SELECTORS);
        const scopedMutedText = scopeSelectors(themeDefinition.id, MUTED_TEXT_SELECTORS);
        const scopedModuleBlocks = scopeSelectors(themeDefinition.id, MODULE_BLOCK_SELECTORS);
        const scopedModuleMuted = scopeSelectors(themeDefinition.id, MODULE_MUTED_SELECTORS);
        const scopedModuleAccent = scopeSelectors(themeDefinition.id, MODULE_ACCENT_SELECTORS);
        const scopedStatus = scopeSelectors(themeDefinition.id, STATUS_SELECTORS);
        const cssOverrides = typeof themeDefinition.cssOverrides === "string" ? themeDefinition.cssOverrides : "";
        return `
html[data-cdp-theme="${themeDefinition.id}"] {
  color-scheme: ${themeDefinition.mode};
${tokenDeclarations}
  --background: var(--cdp-theme-pageBg);
  --foreground: var(--cdp-theme-foreground);
  --panel: var(--cdp-theme-panel);
  --panel-muted: var(--cdp-theme-panelMuted);
  --border: var(--cdp-theme-border);
  --muted: var(--cdp-theme-muted);
  --accent: var(--cdp-theme-accent);
  --accent-strong: var(--cdp-theme-accentStrong);
  --accent-soft: var(--cdp-theme-accentSoft);
  --ok-soft: var(--cdp-theme-statusBg);
  --ok-border: var(--cdp-theme-statusBorder);
  --ok-ink: var(--cdp-theme-statusInk);
  --shadow: var(--cdp-theme-shadow);
}

html[data-cdp-theme="${themeDefinition.id}"],
html[data-cdp-theme="${themeDefinition.id}"] body {
  background: var(--cdp-theme-pageBg) !important;
  color: var(--cdp-theme-foreground);
}

${scopedAppBackground} {
  background: var(--cdp-theme-pageBg) !important;
}

${scopedSurfaces} {
  background: var(--cdp-theme-panel) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-item {
  background: var(--cdp-theme-commentPanel) !important;
  border-color: var(--cdp-theme-commentBorder) !important;
  color: var(--cdp-theme-foreground);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-card,
html[data-cdp-theme="${themeDefinition.id}"] .cn-compose-card,
html[data-cdp-theme="${themeDefinition.id}"] .cn-rail-card {
  box-shadow: var(--cdp-theme-shadow);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-trigger {
  background: var(--cdp-theme-inlineTriggerBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-popover button,
html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-popover a {
  background: transparent !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-popover button:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-popover a:hover {
  background: var(--cdp-theme-hoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-menu {
  background: var(--cdp-theme-panelMuted) !important;
  border: 1px solid var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
  box-shadow: var(--cdp-theme-shadow);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-list {
  background: transparent !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-list > li {
  border-bottom: 1px solid var(--cdp-theme-border);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-list > li:last-child {
  border-bottom: 0;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-option {
  width: 100%;
  background: transparent !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-option span:last-child {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-option:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-option.is-active {
  background: var(--cdp-theme-hoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-nav-link,
html[data-cdp-theme="${themeDefinition.id}"] .cn-mobile-nav-link,
html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-link {
  color: var(--cdp-theme-foreground);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-nav-link.is-active,
html[data-cdp-theme="${themeDefinition.id}"] .cn-mobile-nav-link[aria-current="page"] {
  background: linear-gradient(
    180deg,
    var(--cdp-theme-navActiveStart),
    var(--cdp-theme-navActiveEnd)
  ) !important;
  border-color: var(--cdp-theme-accent) !important;
  box-shadow: inset 0 0 0 1px var(--cdp-theme-accentGlow);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-btn-primary {
  background: linear-gradient(
    180deg,
    var(--cdp-theme-accentStrong),
    var(--cdp-theme-accent)
  ) !important;
  border-color: var(--cdp-theme-accent) !important;
  color: var(--cdp-theme-primaryText) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-btn-soft,
html[data-cdp-theme="${themeDefinition.id}"] .cn-icon-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-compose-tool-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-format-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-reply-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-topic-button {
  background: var(--cdp-theme-panelMuted) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn {
  background: var(--cdp-theme-actionBg) !important;
  border-color: var(--cdp-theme-actionBorder) !important;
  color: var(--cdp-theme-actionInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn .cn-action-label,
html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn .cn-action-icon {
  color: inherit !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn.is-active {
  background: var(--cdp-theme-actionActiveBg) !important;
  border-color: var(--cdp-theme-actionActiveBorder) !important;
  color: var(--cdp-theme-actionActiveInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn.is-active,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn[aria-pressed="true"] {
  background: linear-gradient(
    180deg,
    var(--cdp-theme-feedSwitchActiveStart),
    var(--cdp-theme-feedSwitchActiveEnd)
  ) !important;
  border-color: var(--cdp-theme-accent) !important;
  box-shadow: inset 0 0 0 1px var(--cdp-theme-accentGlow);
  color: var(--cdp-theme-accentStrong) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-btn-soft.is-danger,
html[data-cdp-theme="${themeDefinition.id}"] .cn-alert-error {
  background: var(--cdp-theme-dangerSoft) !important;
  border-color: var(--cdp-theme-dangerBorder) !important;
  color: var(--cdp-theme-dangerInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] a,
html[data-cdp-theme="${themeDefinition.id}"] .cn-brand-title,
html[data-cdp-theme="${themeDefinition.id}"] .cn-account-name,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-author {
  color: var(--cdp-theme-foreground);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-handle-medal,
html[data-cdp-theme="${themeDefinition.id}"] .cn-brand-count,
html[data-cdp-theme="${themeDefinition.id}"] .cn-scoreboard-score,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn[aria-pressed="true"] {
  color: var(--cdp-theme-accentStrong) !important;
}

${scopedMutedText} {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn.is-sqwang,
html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn.is-sqwang .cn-action-label,
html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn.is-sqwang .cn-action-icon {
  background: var(--cdp-theme-sqwangBg) !important;
  border-color: var(--cdp-theme-sqwangBorder) !important;
  color: var(--cdp-theme-sqwangInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-actions > .cn-post-action-btn:last-child {
  background: var(--cdp-theme-actionActiveBg) !important;
  border-color: var(--cdp-theme-actionActiveBorder) !important;
  color: var(--cdp-theme-actionActiveInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"]
  .cn-post-actions
  > .cn-post-action-btn:last-child
  .cn-action-label,
html[data-cdp-theme="${themeDefinition.id}"]
  .cn-post-actions
  > .cn-post-action-btn:last-child
  .cn-action-icon {
  color: inherit !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-reply-btn {
  background: var(--cdp-theme-commentCallToActionBg) !important;
  border-color: var(--cdp-theme-commentCallToActionBorder) !important;
  color: var(--cdp-theme-commentCallToActionInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-reply-btn:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-format-btn:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-topic-button:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn:hover {
  border-color: var(--cdp-theme-border) !important;
  background: var(--cdp-theme-hoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn:hover {
  filter: brightness(1.08);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-card {
  background: var(--cdp-theme-pollCardBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-btn {
  background: var(--cdp-theme-pollOptionBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-btn:hover {
  background: var(--cdp-theme-pollOptionHoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-bar {
  background: var(--cdp-theme-pollOptionBarBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-label,
html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-votes,
html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-meta {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-tag {
  background: var(--cdp-theme-donateTagBg) !important;
  border-color: var(--cdp-theme-donateTagBorder) !important;
  color: var(--cdp-theme-donateTagInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-hero,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-grid,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-card,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-card-head,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-actions {
  background: var(--cdp-theme-donateSurfaceBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-card.is-featured {
  background: var(--cdp-theme-donateFeaturedBg) !important;
  border-color: var(--cdp-theme-donateFeaturedBorder) !important;
  box-shadow: var(--cdp-theme-donateFeaturedShadow) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-eyebrow,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-point {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-special-chip {
  background: var(--cdp-theme-specialChipBg) !important;
  border-color: var(--cdp-theme-specialChipBorder) !important;
  color: var(--cdp-theme-specialChipInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special {
  background: var(--cdp-theme-specialItemBg) !important;
  border-color: var(--cdp-theme-specialItemBorder) !important;
  box-shadow: var(--cdp-theme-specialItemShadow);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special:hover {
  background: var(--cdp-theme-specialItemHoverBg) !important;
  border-color: var(--cdp-theme-specialItemHoverBorder) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special .cn-notification-link,
html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special .cn-notification-item-top {
  color: var(--cdp-theme-specialItemText) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special .cn-notification-time,
html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special .cn-notification-post {
  color: var(--cdp-theme-specialItemMuted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] [class*="__emojiBtn"] {
  background: var(--cdp-theme-emojiButtonBg) !important;
  border-color: var(--cdp-theme-emojiButtonBorder) !important;
  color: var(--cdp-theme-emojiButtonInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] [class*="__emojiBtn"]:hover {
  background: var(--cdp-theme-emojiButtonHoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] [class*="__canvasWrap"] {
  background: var(--cdp-theme-canvasWrapBg) !important;
  border-color: var(--cdp-theme-canvasWrapBorder) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] [class*="__canvas"] {
  background: var(--cdp-theme-canvasBg) !important;
  border-color: var(--cdp-theme-canvasBorder) !important;
}

${scopedModuleBlocks} {
  background: var(--cdp-theme-moduleBlockBg) !important;
  border-color: var(--cdp-theme-moduleBlockBorder) !important;
  color: var(--cdp-theme-moduleBlockInk) !important;
}

${scopedModuleMuted} {
  color: var(--cdp-theme-moduleMuted) !important;
}

${scopedModuleAccent} {
  color: var(--cdp-theme-accentStrong) !important;
}

${scopedStatus} {
  background: var(--cdp-theme-statusBg) !important;
  border-color: var(--cdp-theme-statusBorder) !important;
  color: var(--cdp-theme-statusInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] input,
html[data-cdp-theme="${themeDefinition.id}"] textarea,
html[data-cdp-theme="${themeDefinition.id}"] select {
  background: var(--cdp-theme-inputBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] input::placeholder,
html[data-cdp-theme="${themeDefinition.id}"] textarea::placeholder {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] input:focus,
html[data-cdp-theme="${themeDefinition.id}"] textarea:focus,
html[data-cdp-theme="${themeDefinition.id}"] select:focus,
html[data-cdp-theme="${themeDefinition.id}"] button:focus-visible,
html[data-cdp-theme="${themeDefinition.id}"] a:focus-visible {
  outline: 2px solid var(--cdp-theme-accentStrong) !important;
  outline-offset: 2px !important;
}

html[data-cdp-theme="${themeDefinition.id}"] img {
  background: transparent;
}
${cssOverrides}
`;
      }
      function buildThemeStylesheetCss() {
        return THEMES.map((themeDefinition) => buildScopedThemeCss(themeDefinition)).join("\n");
      }
      function buildAmoledThemeCss() {
        return buildScopedThemeCss(getThemeDefinition(DARK_THEME_ID));
      }
      module.exports = {
        buildAmoledThemeCss,
        buildThemeStylesheetCss,
        buildScopedThemeCss
      };
    }
  });

  // src/ui/confirm-modal.js
  var require_confirm_modal = __commonJS({
    "src/ui/confirm-modal.js"(exports, module) {
      function createConfirmModal(options) {
        const overlayElement = globalThis.document.createElement("div");
        overlayElement.id = options.overlayId;
        overlayElement.className = "cdp-confirm-overlay";
        overlayElement.hidden = true;
        overlayElement.innerHTML = `
    <section id="${options.panelId}" class="cdp-confirm-panel" role="dialog" aria-modal="true" aria-labelledby="${options.panelId}-title">
      <h3 id="${options.panelId}-title">${options.title}</h3>
      <p class="cdp-confirm-text" data-cdp-confirm-message></p>
      <div class="cdp-confirm-actions">
        <button type="button" class="cdp-confirm-btn" data-cdp-confirm-cancel>${options.cancelLabel}</button>
        <button type="button" class="cdp-confirm-btn ${options.confirmButtonClass || ""}" data-cdp-confirm-confirm>${options.confirmLabel}</button>
      </div>
    </section>
  `;
        const messageElement = (
          /** @type {HTMLElement} */
          overlayElement.querySelector("[data-cdp-confirm-message]")
        );
        const cancelButton = (
          /** @type {HTMLButtonElement} */
          overlayElement.querySelector("[data-cdp-confirm-cancel]")
        );
        const confirmButton = (
          /** @type {HTMLButtonElement} */
          overlayElement.querySelector("[data-cdp-confirm-confirm]")
        );
        let pendingPayload = null;
        let isSaving = false;
        function ensureMounted() {
          if (!globalThis.document || !globalThis.document.body) {
            return;
          }
          if (overlayElement.parentElement !== globalThis.document.body) {
            globalThis.document.body.appendChild(overlayElement);
          }
        }
        function close() {
          if (isSaving) {
            return;
          }
          overlayElement.hidden = true;
          pendingPayload = null;
        }
        function open(payload) {
          ensureMounted();
          pendingPayload = payload;
          messageElement.textContent = options.formatMessage(payload);
          overlayElement.hidden = false;
          cancelButton.focus();
        }
        overlayElement.addEventListener("click", (event) => {
          if (event.target === overlayElement) {
            close();
          }
        });
        globalThis.document.addEventListener("keydown", (event) => {
          if (event.key === "Escape" && !overlayElement.hidden) {
            close();
          }
        });
        cancelButton.addEventListener("click", close);
        confirmButton.addEventListener("click", async () => {
          if (pendingPayload === null || isSaving) {
            return;
          }
          isSaving = true;
          confirmButton.disabled = true;
          cancelButton.disabled = true;
          try {
            await options.onConfirm(pendingPayload);
            overlayElement.hidden = true;
            pendingPayload = null;
          } finally {
            isSaving = false;
            confirmButton.disabled = false;
            cancelButton.disabled = false;
          }
        });
        ensureMounted();
        return {
          close,
          open
        };
      }
      module.exports = {
        createConfirmModal
      };
    }
  });

  // src/ui/block-user-modal.js
  var require_block_user_modal = __commonJS({
    "src/ui/block-user-modal.js"(exports, module) {
      var { createConfirmModal } = require_confirm_modal();
      function resolveTargetLabel(blockTarget) {
        const username = String(blockTarget.username || "").replace(/^@+/, "").trim();
        if (username) {
          return `@${username}`;
        }
        const displayName = String(blockTarget.displayName || "").trim();
        return displayName || "this user";
      }
      function createBlockUserModal(options) {
        return createConfirmModal({
          overlayId: "cdp-block-confirm-overlay",
          panelId: "cdp-block-confirm-panel",
          title: "Block user?",
          cancelLabel: "Nevermind",
          confirmLabel: "Block and Filter",
          confirmButtonClass: "is-danger",
          formatMessage: (blockTarget) => `Add ${resolveTargetLabel(
            /** @type {{ username: string, displayName: string }} */
            blockTarget
          )} to blocked users?`,
          onConfirm: async (blockTarget) => {
            await options.onConfirm(
              /** @type {{ username: string, displayName: string, sourceKind: string }} */
              blockTarget
            );
          }
        });
      }
      module.exports = {
        createBlockUserModal
      };
    }
  });

  // src/ui/menu.js
  var require_menu = __commonJS({
    "src/ui/menu.js"(exports, module) {
      function registerMenuCommand(label, onSelect) {
        const gm = globalThis.GM;
        if (gm && typeof gm.registerMenuCommand === "function") {
          gm.registerMenuCommand(label, onSelect);
          return;
        }
        const legacyRegister = globalThis.GM_registerMenuCommand;
        if (typeof legacyRegister === "function") {
          legacyRegister(label, onSelect);
        }
      }
      module.exports = {
        registerMenuCommand
      };
    }
  });

  // src/ui/settings-panel.js
  var require_settings_panel = __commonJS({
    "src/ui/settings-panel.js"(exports, module) {
      var { normalizeForMatch, parseListText } = require_matchers();
      var { getThemeDefinition, listThemeOptions } = require_theme_registry();
      var { createConfirmModal } = require_confirm_modal();
      var NAV_LAUNCHER_ID = "cdp-settings-nav-button";
      var OVERLAY_ID = "cdp-settings-overlay";
      var IS_JSDOM = typeof globalThis.navigator !== "undefined" && /jsdom/i.test(globalThis.navigator.userAgent || "");
      function toBlockedUserKey(value) {
        return normalizeForMatch(value.replace(/^@+/, "").trim());
      }
      function dedupeBlockedUsers(values) {
        const uniqueValues = [];
        const seenKeys = /* @__PURE__ */ new Set();
        for (const value of values) {
          const trimmedValue = String(value || "").trim();
          if (!trimmedValue) {
            continue;
          }
          const key = toBlockedUserKey(trimmedValue);
          if (!key || seenKeys.has(key)) {
            continue;
          }
          seenKeys.add(key);
          uniqueValues.push(trimmedValue);
        }
        return uniqueValues;
      }
      function toBlockedPhraseKey(value) {
        return normalizeForMatch(String(value || "").trim());
      }
      function dedupeBlockedPhrases(values) {
        const uniqueValues = [];
        const seenKeys = /* @__PURE__ */ new Set();
        for (const value of values) {
          const trimmedValue = String(value || "").trim();
          if (!trimmedValue) {
            continue;
          }
          const key = toBlockedPhraseKey(trimmedValue);
          if (!key || seenKeys.has(key)) {
            continue;
          }
          seenKeys.add(key);
          uniqueValues.push(trimmedValue);
        }
        return uniqueValues;
      }
      function parseMaxEmbeds(rawValue, fallbackValue) {
        const parsedValue = Number.parseInt(rawValue, 10);
        if (Number.isNaN(parsedValue)) {
          return fallbackValue;
        }
        return Math.min(6, Math.max(1, parsedValue));
      }
      function buildThemeOptionMarkup() {
        return listThemeOptions().map((themeOption) => `<option value="${themeOption.id}">${themeOption.label}</option>`).join("");
      }
      function createNavigationLauncherButton() {
        const launcherButton = globalThis.document.createElement("a");
        launcherButton.id = NAV_LAUNCHER_ID;
        launcherButton.href = "#double-plus-settings";
        launcherButton.setAttribute("role", "button");
        launcherButton.className = "cn-nav-link cdp-settings-nav-link";
        launcherButton.innerHTML = '<span class="cn-nav-icon cdp-settings-nav-icon" aria-hidden="true">\u2795</span><span>Double Plus</span>';
        launcherButton.title = "Open Double Plus settings";
        launcherButton.setAttribute("aria-label", "Open Double Plus settings");
        return launcherButton;
      }
      function createSettingsPanel(options) {
        const launcherButton = createNavigationLauncherButton();
        const themeOptionMarkup = buildThemeOptionMarkup();
        const overlayElement = globalThis.document.createElement("div");
        overlayElement.id = OVERLAY_ID;
        overlayElement.hidden = true;
        overlayElement.innerHTML = `
    <section id="cdp-settings-panel" role="dialog" aria-modal="true" aria-labelledby="cdp-settings-title">
      <div class="cdp-settings-head">
        <div class="cdp-settings-head-copy">
          <p class="cdp-settings-kicker">CHILLNET DOUBLE PLUS</p>
          <h3 id="cdp-settings-title">Preferences</h3>
        </div>
        <div class="cdp-settings-head-actions" data-cdp-head-actions>
          <div class="cdp-settings-action-set" data-cdp-actions-clean aria-hidden="false">
            <button type="button" class="cdp-settings-btn" data-cdp-close-clean>Close</button>
          </div>
          <div class="cdp-settings-action-set" data-cdp-actions-dirty aria-hidden="true">
            <button type="button" class="cdp-settings-btn is-danger" data-cdp-discard>Discard and Close</button>
            <button type="button" class="cdp-settings-btn is-primary" data-cdp-save>Save and Close</button>
          </div>
        </div>
      </div>
      <div class="cdp-settings-body">
        <div class="cdp-settings-section">
          <h4>Theme</h4>
          <label class="cdp-settings-field-label" for="cdp-theme-select">Theme preset</label>
          <label class="cdp-settings-theme-select-wrap">
            <select id="cdp-theme-select" class="cdp-settings-panel-input" data-cdp-theme-id>
              ${themeOptionMarkup}
            </select>
          </label>
        </div>
        <div class="cdp-settings-section">
          <h4>Filtering</h4>
          <label class="cdp-settings-switch">
            <input type="checkbox" data-cdp-filters-enabled />
            <span class="cdp-settings-switch-label">Enable filtering</span>
          </label>
          <label class="cdp-settings-field-label">Blocked users (comma separated)</label>
          <div class="cdp-settings-token-editor" data-cdp-blocked-users-editor>
            <div class="cdp-settings-token-list" data-cdp-blocked-users-list>
              <input
                class="cdp-settings-token-input"
                type="text"
                data-cdp-blocked-users-entry
                placeholder="Type usernames, separated by commas"
                aria-label="Add blocked users"
              />
            </div>
          </div>
          <label class="cdp-settings-field-label">Blocked phrases/words (comma separated)</label>
          <div class="cdp-settings-token-editor" data-cdp-blocked-phrases-editor>
            <div class="cdp-settings-token-list" data-cdp-blocked-phrases-list>
              <input
                class="cdp-settings-token-input"
                type="text"
                data-cdp-blocked-phrases-entry
                placeholder="Type phrases/words, separated by commas"
                aria-label="Add blocked phrases"
              />
            </div>
          </div>
        </div>
        <div class="cdp-settings-section">
          <h4>Embeds</h4>
          <div class="cdp-settings-inline-row">
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-enabled />
              <span class="cdp-settings-switch-label">Enable inline embeds</span>
            </label>
            <label class="cdp-settings-max-field">
              <span class="cdp-settings-field-label">Max embeds per post</span>
              <input class="cdp-settings-panel-input" type="number" min="1" max="6" data-cdp-max-embeds />
            </label>
          </div>
          <div class="cdp-settings-grid-3">
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-image />
              <span class="cdp-settings-switch-label">Images</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-youtube />
              <span class="cdp-settings-switch-label">YouTube</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-spotify />
              <span class="cdp-settings-switch-label">Spotify</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-x />
              <span class="cdp-settings-switch-label">X</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-reddit />
              <span class="cdp-settings-switch-label">Reddit</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-tiktok />
              <span class="cdp-settings-switch-label">TikTok</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  `;
        const panelElement = (
          /** @type {HTMLElement} */
          overlayElement.querySelector("#cdp-settings-panel")
        );
        if (!panelElement) {
          throw new Error("Settings panel root is required.");
        }
        function ensureOverlayMounted() {
          if (!globalThis.document || !globalThis.document.body) {
            return;
          }
          if (overlayElement.parentElement !== globalThis.document.body) {
            globalThis.document.body.appendChild(overlayElement);
          }
        }
        function ensureNavigationLauncherMounted() {
          if (!globalThis.document || !globalThis.document.body) {
            return;
          }
          const leftRail = globalThis.document.querySelector(".cn-left-rail");
          if (!leftRail) {
            return;
          }
          const nativeNavigationLinks = Array.from(leftRail.querySelectorAll(".cn-nav-link")).filter(
            (element) => element !== launcherButton
          );
          if (nativeNavigationLinks.length === 0) {
            return;
          }
          const lastNavigationLink = nativeNavigationLinks[nativeNavigationLinks.length - 1];
          const navigationContainer = lastNavigationLink.parentElement;
          if (!navigationContainer) {
            return;
          }
          if (launcherButton.parentElement !== navigationContainer || launcherButton.previousElementSibling !== lastNavigationLink) {
            navigationContainer.insertBefore(launcherButton, lastNavigationLink.nextSibling);
          }
        }
        function mountUiNodesWhenReady() {
          ensureOverlayMounted();
          ensureNavigationLauncherMounted();
          if (IS_JSDOM || typeof globalThis.MutationObserver !== "function") {
            return;
          }
          const navigationObserver = new globalThis.MutationObserver(() => {
            ensureOverlayMounted();
            ensureNavigationLauncherMounted();
          });
          navigationObserver.observe(globalThis.document.documentElement, {
            childList: true,
            subtree: true
          });
        }
        if (globalThis.document.readyState === "complete") {
          mountUiNodesWhenReady();
        } else {
          globalThis.addEventListener("load", mountUiNodesWhenReady, { once: true });
        }
        function syncLauncherState(isOpen) {
          launcherButton.classList.toggle("is-active", isOpen);
          if (isOpen) {
            launcherButton.setAttribute("aria-current", "page");
            return;
          }
          launcherButton.removeAttribute("aria-current");
        }
        function closeOnEscape(event) {
          if (event.key !== "Escape" || overlayElement.hidden) {
            return;
          }
          close();
        }
        globalThis.document.addEventListener("keydown", closeOnEscape);
        overlayElement.addEventListener("click", (event) => {
          if (event.target === overlayElement) {
            close();
          }
        });
        launcherButton.addEventListener("click", (event) => {
          event.preventDefault();
          open();
        });
        function open() {
          ensureOverlayMounted();
          sync(options.getSettings());
          overlayElement.hidden = false;
          syncLauncherState(true);
          themeIdInput.focus();
        }
        function close() {
          overlayElement.hidden = true;
          syncLauncherState(false);
          unblockUserModal.close();
          unblockPhraseModal.close();
        }
        const themeIdInput = (
          /** @type {HTMLSelectElement} */
          panelElement.querySelector("[data-cdp-theme-id]")
        );
        const filtersEnabledInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-filters-enabled]")
        );
        const blockedUsersEditorElement = (
          /** @type {HTMLElement} */
          panelElement.querySelector("[data-cdp-blocked-users-editor]")
        );
        const blockedUsersListElement = (
          /** @type {HTMLElement} */
          panelElement.querySelector("[data-cdp-blocked-users-list]")
        );
        const blockedUsersEntryInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-blocked-users-entry]")
        );
        const blockedPhrasesEditorElement = (
          /** @type {HTMLElement} */
          panelElement.querySelector("[data-cdp-blocked-phrases-editor]")
        );
        const blockedPhrasesListElement = (
          /** @type {HTMLElement} */
          panelElement.querySelector("[data-cdp-blocked-phrases-list]")
        );
        const blockedPhrasesEntryInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-blocked-phrases-entry]")
        );
        const embedsEnabledInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-embeds-enabled]")
        );
        const embedsImageInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-embeds-image]")
        );
        const embedsSpotifyInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-embeds-spotify]")
        );
        const embedsXInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-embeds-x]")
        );
        const embedsRedditInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-embeds-reddit]")
        );
        const embedsTiktokInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-embeds-tiktok]")
        );
        const embedsYoutubeInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-embeds-youtube]")
        );
        const maxEmbedsInput = (
          /** @type {HTMLInputElement} */
          panelElement.querySelector("[data-cdp-max-embeds]")
        );
        const closeCleanButton = (
          /** @type {HTMLButtonElement} */
          panelElement.querySelector("[data-cdp-close-clean]")
        );
        const headActionsElement = (
          /** @type {HTMLElement} */
          panelElement.querySelector("[data-cdp-head-actions]")
        );
        const cleanActionSetElement = (
          /** @type {HTMLElement} */
          panelElement.querySelector("[data-cdp-actions-clean]")
        );
        const dirtyActionSetElement = (
          /** @type {HTMLElement} */
          panelElement.querySelector("[data-cdp-actions-dirty]")
        );
        const discardButton = (
          /** @type {HTMLButtonElement} */
          panelElement.querySelector("[data-cdp-discard]")
        );
        const saveButton = (
          /** @type {HTMLButtonElement} */
          panelElement.querySelector("[data-cdp-save]")
        );
        let draftBlockedUsers = [];
        let draftBlockedPhrases = [];
        let baselineSnapshot = "";
        const unblockUserModal = createConfirmModal({
          overlayId: "cdp-unblock-confirm-overlay",
          panelId: "cdp-unblock-confirm-panel",
          title: "Unblock user?",
          cancelLabel: "Nevermind",
          confirmLabel: "Yes, Unblock",
          formatMessage: (blockedEntry) => `Remove ${String(blockedEntry || "").trim()} from blocked users?`,
          onConfirm: async (blockedEntry) => {
            const nextBlockedUsers = draftBlockedUsers.filter(
              (entry) => toBlockedUserKey(entry) !== toBlockedUserKey(String(blockedEntry || ""))
            );
            draftBlockedUsers = nextBlockedUsers;
            renderBlockedUserChips();
            syncDirtyState();
          }
        });
        const unblockPhraseModal = createConfirmModal({
          overlayId: "cdp-unblock-phrase-confirm-overlay",
          panelId: "cdp-unblock-phrase-confirm-panel",
          title: "Remove blocked phrase?",
          cancelLabel: "Nevermind",
          confirmLabel: "Yes, Remove",
          formatMessage: (blockedEntry) => `Remove "${String(blockedEntry || "").trim()}" from blocked phrases?`,
          onConfirm: async (blockedEntry) => {
            const nextBlockedPhrases = draftBlockedPhrases.filter(
              (entry) => toBlockedPhraseKey(entry) !== toBlockedPhraseKey(String(blockedEntry || ""))
            );
            draftBlockedPhrases = nextBlockedPhrases;
            renderBlockedPhraseChips();
            syncDirtyState();
          }
        });
        function renderBlockedUserChips() {
          blockedUsersListElement.textContent = "";
          for (const blockedUserEntry of draftBlockedUsers) {
            const chipButton = globalThis.document.createElement("button");
            chipButton.type = "button";
            chipButton.className = "cdp-settings-token-chip";
            chipButton.textContent = blockedUserEntry;
            chipButton.title = `Unblock ${blockedUserEntry}`;
            chipButton.addEventListener("click", () => {
              unblockUserModal.open(blockedUserEntry);
            });
            blockedUsersListElement.appendChild(chipButton);
          }
          blockedUsersListElement.appendChild(blockedUsersEntryInput);
        }
        function commitBlockedUserEntryInput(options2 = {}) {
          const preserveFocus = options2.preserveFocus === true;
          const shouldRefocus = preserveFocus && globalThis.document.activeElement === blockedUsersEntryInput;
          const pendingEntries = parseListText(blockedUsersEntryInput.value);
          blockedUsersEntryInput.value = "";
          if (pendingEntries.length === 0) {
            if (shouldRefocus) {
              blockedUsersEntryInput.focus();
            }
            return;
          }
          const nextBlockedUsers = dedupeBlockedUsers([...draftBlockedUsers, ...pendingEntries]);
          if (nextBlockedUsers.length === draftBlockedUsers.length && nextBlockedUsers.every((entry, index) => entry === draftBlockedUsers[index])) {
            return;
          }
          draftBlockedUsers = nextBlockedUsers;
          renderBlockedUserChips();
          if (shouldRefocus) {
            blockedUsersEntryInput.focus();
          }
          syncDirtyState();
        }
        function renderBlockedPhraseChips() {
          blockedPhrasesListElement.textContent = "";
          for (const blockedPhraseEntry of draftBlockedPhrases) {
            const chipButton = globalThis.document.createElement("button");
            chipButton.type = "button";
            chipButton.className = "cdp-settings-token-chip";
            chipButton.textContent = blockedPhraseEntry;
            chipButton.title = `Remove phrase "${blockedPhraseEntry}"`;
            chipButton.addEventListener("click", () => {
              unblockPhraseModal.open(blockedPhraseEntry);
            });
            blockedPhrasesListElement.appendChild(chipButton);
          }
          blockedPhrasesListElement.appendChild(blockedPhrasesEntryInput);
        }
        function commitBlockedPhraseEntryInput(options2 = {}) {
          const preserveFocus = options2.preserveFocus === true;
          const shouldRefocus = preserveFocus && globalThis.document.activeElement === blockedPhrasesEntryInput;
          const pendingEntries = parseListText(blockedPhrasesEntryInput.value);
          blockedPhrasesEntryInput.value = "";
          if (pendingEntries.length === 0) {
            if (shouldRefocus) {
              blockedPhrasesEntryInput.focus();
            }
            return;
          }
          const nextBlockedPhrases = dedupeBlockedPhrases([...draftBlockedPhrases, ...pendingEntries]);
          if (nextBlockedPhrases.length === draftBlockedPhrases.length && nextBlockedPhrases.every((entry, index) => entry === draftBlockedPhrases[index])) {
            return;
          }
          draftBlockedPhrases = nextBlockedPhrases;
          renderBlockedPhraseChips();
          if (shouldRefocus) {
            blockedPhrasesEntryInput.focus();
          }
          syncDirtyState();
        }
        blockedUsersEntryInput.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== ",") {
            return;
          }
          event.preventDefault();
          commitBlockedUserEntryInput({ preserveFocus: true });
        });
        blockedUsersEntryInput.addEventListener("blur", commitBlockedUserEntryInput);
        blockedUsersEditorElement.addEventListener("click", (event) => {
          const eventTarget = (
            /** @type {HTMLElement|null} */
            event.target instanceof globalThis.HTMLElement ? event.target : null
          );
          if (eventTarget && eventTarget.closest(".cdp-settings-token-chip")) {
            return;
          }
          blockedUsersEntryInput.focus();
        });
        blockedPhrasesEntryInput.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== ",") {
            return;
          }
          event.preventDefault();
          commitBlockedPhraseEntryInput({ preserveFocus: true });
        });
        blockedPhrasesEntryInput.addEventListener("blur", commitBlockedPhraseEntryInput);
        blockedPhrasesEditorElement.addEventListener("click", (event) => {
          const eventTarget = (
            /** @type {HTMLElement|null} */
            event.target instanceof globalThis.HTMLElement ? event.target : null
          );
          if (eventTarget && eventTarget.closest(".cdp-settings-token-chip")) {
            return;
          }
          blockedPhrasesEntryInput.focus();
        });
        function serializeSettingsSnapshot(settings) {
          return JSON.stringify({
            theme: {
              id: getThemeDefinition(settings.theme.id).id
            },
            filters: {
              enabled: settings.filters.enabled,
              blockedUsers: settings.filters.blockedUsers,
              blockedPhrases: settings.filters.blockedPhrases
            },
            embeds: {
              enabled: settings.embeds.enabled,
              image: settings.embeds.image,
              youtube: settings.embeds.youtube,
              spotify: settings.embeds.spotify,
              x: settings.embeds.x,
              reddit: settings.embeds.reddit,
              tiktok: settings.embeds.tiktok,
              maxPerPost: settings.embeds.maxPerPost
            }
          });
        }
        function buildDraftSettings(currentSettings) {
          return {
            ...currentSettings,
            theme: {
              ...currentSettings.theme,
              id: getThemeDefinition(themeIdInput.value).id
            },
            filters: {
              ...currentSettings.filters,
              enabled: filtersEnabledInput.checked,
              blockedUsers: [...draftBlockedUsers],
              blockedPhrases: [...draftBlockedPhrases]
            },
            embeds: {
              ...currentSettings.embeds,
              enabled: embedsEnabledInput.checked,
              image: embedsImageInput.checked,
              spotify: embedsSpotifyInput.checked,
              x: embedsXInput.checked,
              reddit: embedsRedditInput.checked,
              tiktok: embedsTiktokInput.checked,
              youtube: embedsYoutubeInput.checked,
              maxPerPost: parseMaxEmbeds(maxEmbedsInput.value, currentSettings.embeds.maxPerPost)
            }
          };
        }
        function syncHeaderActions(isDirty) {
          headActionsElement.classList.toggle("is-dirty", isDirty);
          cleanActionSetElement.setAttribute("aria-hidden", String(isDirty));
          dirtyActionSetElement.setAttribute("aria-hidden", String(!isDirty));
          closeCleanButton.disabled = isDirty;
          discardButton.disabled = !isDirty;
          saveButton.disabled = !isDirty;
        }
        function syncDirtyState() {
          const draftSnapshot = serializeSettingsSnapshot(buildDraftSettings(options.getSettings()));
          syncHeaderActions(draftSnapshot !== baselineSnapshot);
        }
        function discardAndClose() {
          sync(options.getSettings());
          close();
        }
        closeCleanButton.addEventListener("click", close);
        discardButton.addEventListener("click", discardAndClose);
        panelElement.addEventListener("input", syncDirtyState);
        panelElement.addEventListener("change", syncDirtyState);
        function sync(settings) {
          themeIdInput.value = getThemeDefinition(settings.theme.id).id;
          filtersEnabledInput.checked = settings.filters.enabled;
          draftBlockedUsers = dedupeBlockedUsers(settings.filters.blockedUsers);
          blockedUsersEntryInput.value = "";
          renderBlockedUserChips();
          draftBlockedPhrases = dedupeBlockedPhrases(settings.filters.blockedPhrases);
          blockedPhrasesEntryInput.value = "";
          renderBlockedPhraseChips();
          embedsEnabledInput.checked = settings.embeds.enabled;
          embedsImageInput.checked = settings.embeds.image;
          embedsSpotifyInput.checked = settings.embeds.spotify;
          embedsXInput.checked = settings.embeds.x;
          embedsRedditInput.checked = settings.embeds.reddit;
          embedsTiktokInput.checked = settings.embeds.tiktok;
          embedsYoutubeInput.checked = settings.embeds.youtube;
          maxEmbedsInput.value = String(settings.embeds.maxPerPost);
          baselineSnapshot = serializeSettingsSnapshot(settings);
          syncHeaderActions(false);
        }
        saveButton.addEventListener("click", async () => {
          commitBlockedUserEntryInput();
          commitBlockedPhraseEntryInput();
          const nextSettings = buildDraftSettings(options.getSettings());
          await options.onSave(nextSettings);
          sync(options.getSettings());
          close();
        });
        return {
          open,
          close,
          sync
        };
      }
      module.exports = {
        createSettingsPanel
      };
    }
  });

  // src/entry/userscript.js
  var require_userscript = __commonJS({
    "src/entry/userscript.js"() {
      var { createPostPipeline } = require_post_pipeline();
      var { whenBodyReady } = require_body_ready();
      var {
        ensureThemeStyleTag,
        installThemeIntegrityWatchers,
        setActiveTheme
      } = require_style_manager();
      var { installAutoLinkTooltip } = require_tooltip();
      var { createSettingsStore } = require_settings_store();
      var { addBlockedUserToSettings } = require_block_list_updater();
      var { buildFeatureStylesCss } = require_feature_styles();
      var { buildThemeStylesheetCss } = require_palette();
      var { createBlockUserModal } = require_block_user_modal();
      var { registerMenuCommand } = require_menu();
      var { createSettingsPanel } = require_settings_panel();
      async function startUserscript() {
        const settingsStore = createSettingsStore();
        let settings = await settingsStore.load();
        const combinedCss = `${buildThemeStylesheetCss()}
${buildFeatureStylesCss()}`;
        ensureThemeStyleTag(combinedCss);
        setActiveTheme(settings.theme.id);
        const blockUserModal = createBlockUserModal({
          onConfirm: async (blockTarget) => {
            const blockUpdateResult = addBlockedUserToSettings(settings, blockTarget);
            if (!blockUpdateResult.changed) {
              return;
            }
            await applySettings(blockUpdateResult.nextSettings);
          }
        });
        const postPipeline = createPostPipeline(
          () => settings,
          (blockTarget) => {
            blockUserModal.open(blockTarget);
          }
        );
        let settingsPanel = null;
        async function applySettings(nextSettings, options = {}) {
          settings = await settingsStore.save(nextSettings);
          setActiveTheme(settings.theme.id);
          if (settingsPanel) {
            settingsPanel.sync(settings);
          }
          if (options.rerunPipeline !== false) {
            postPipeline.run({ force: true });
          }
        }
        registerMenuCommand("Chillnet Double Plus: Open Settings", () => {
          if (settingsPanel) {
            settingsPanel.open();
            return;
          }
          whenBodyReady(() => {
            if (settingsPanel) {
              settingsPanel.open();
            }
          });
        });
        whenBodyReady(() => {
          settingsPanel = createSettingsPanel({
            getSettings: () => settings,
            onSave: applySettings
          });
          installAutoLinkTooltip();
          postPipeline.start();
          postPipeline.run({ force: true });
        });
        installThemeIntegrityWatchers(() => settings.theme.id, combinedCss);
      }
      startUserscript().catch(() => {
      });
    }
  });
  require_userscript();
})();
