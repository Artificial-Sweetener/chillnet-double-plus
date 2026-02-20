/**
 * @file Theme registry and lookup helpers.
 */

const ORIGINAL_THEME_ID = 'original';
const DARK_THEME_ID = 'dark';
const OLDEN_THEME_ID = 'olden';
const BROWN_THEME_ID = 'brown';
const PINK_THEME_ID = 'pink';
const AURORA_THEME_ID = 'aurora';
const DEFAULT_THEME_ID = DARK_THEME_ID;

const BASE_DARK_THEME_TOKENS = Object.freeze({
  pageBg: '#000000',
  foreground: '#e8edf2',
  panel: '#111111',
  panelMuted: '#1a1a1a',
  border: '#2a2a2a',
  muted: '#a2adba',
  accent: '#cf5b2d',
  accentStrong: '#e17346',
  accentSoft: '#3d2417',
  accentGlow: 'rgba(207, 91, 45, 0.35)',
  shadow: '0 24px 54px -36px rgba(0, 0, 0, 0.95)',
  commentPanel: '#1f1f1f',
  commentBorder: '#323232',
  inlineTriggerBg: '#1a1a1a',
  navActiveStart: '#20150f',
  navActiveEnd: '#161616',
  primaryText: '#fff5f0',
  actionBg: '#151c24',
  actionBorder: '#293a4a',
  actionInk: '#a7c2d9',
  actionActiveBg: '#2a1d16',
  actionActiveBorder: '#5a3525',
  actionActiveInk: '#f0b18f',
  feedSwitchActiveStart: '#26160f',
  feedSwitchActiveEnd: '#171717',
  dangerSoft: '#371616',
  dangerBorder: '#6c2d2d',
  dangerInk: '#f6b9b9',
  sqwangBg: '#20192d',
  sqwangBorder: '#4a3a67',
  sqwangInk: '#d2b8ff',
  commentCallToActionBg: '#162224',
  commentCallToActionBorder: '#2f4a4f',
  commentCallToActionInk: '#a6d5dc',
  hoverBg: '#1f1f1f',
  pollCardBg: '#141414',
  pollOptionBg: '#1a1a1a',
  pollOptionHoverBg: '#202020',
  pollOptionBarBg: '#2a2a2a',
  donateTagBg: '#2a1f18',
  donateTagBorder: '#5e3d2a',
  donateTagInk: '#efc7a0',
  donateSurfaceBg: '#111111',
  donateFeaturedBg: '#17120e',
  donateFeaturedBorder: '#6a4428',
  donateFeaturedShadow: '0 20px 36px -26px rgba(116, 72, 37, 0.55)',
  specialChipBg: '#3a2e11',
  specialChipBorder: '#6a5624',
  specialChipInk: '#f2d992',
  specialItemBg: '#15120c',
  specialItemBorder: '#5b4322',
  specialItemShadow: 'inset 0 0 0 1px rgba(255, 210, 140, 0.06)',
  specialItemHoverBg: '#1a150d',
  specialItemHoverBorder: '#735529',
  specialItemText: '#f4e5ba',
  specialItemMuted: '#c7b487',
  emojiButtonBg: '#161616',
  emojiButtonBorder: '#363636',
  emojiButtonInk: '#e9eef3',
  emojiButtonHoverBg: '#1f1f1f',
  canvasWrapBg: '#0f0f0f',
  canvasWrapBorder: '#2e2e2e',
  canvasBg: '#171717',
  canvasBorder: '#343434',
  moduleBlockBg: '#171717',
  moduleBlockBorder: '#353535',
  moduleBlockInk: '#d7e2ee',
  moduleMuted: '#a2adba',
  statusBg: '#143226',
  statusBorder: '#2e624b',
  statusInk: '#9fe9cb',
  inputBg: '#0a0a0a',
});

const THEMES = Object.freeze([
  Object.freeze({
    id: ORIGINAL_THEME_ID,
    label: 'Original theme',
    mode: 'light',
    useCustomStyles: false,
    tokens: Object.freeze({}),
  }),
  Object.freeze({
    id: DARK_THEME_ID,
    label: 'Dark mode',
    mode: 'dark',
    useCustomStyles: true,
    tokens: BASE_DARK_THEME_TOKENS,
    cssOverrides: '',
  }),
  Object.freeze({
    id: OLDEN_THEME_ID,
    label: 'Olden mode',
    mode: 'light',
    useCustomStyles: true,
    tokens: Object.freeze({
      ...BASE_DARK_THEME_TOKENS,
      pageBg: '#efe2c8',
      foreground: '#2f2114',
      panel: '#f6ead1',
      panelMuted: '#ead9b7',
      border: '#b89963',
      muted: '#6f5736',
      accent: '#7f4224',
      accentStrong: '#9f6038',
      accentSoft: '#d5ba8a',
      accentGlow: 'rgba(127, 66, 36, 0.28)',
      shadow: '0 24px 44px -34px rgba(78, 52, 27, 0.5)',
      commentPanel: '#f2e3c4',
      commentBorder: '#c8ad7c',
      inlineTriggerBg: '#e5d2ae',
      navActiveStart: '#e6d2ab',
      navActiveEnd: '#d7be8f',
      primaryText: '#fff7ec',
      actionBg: '#e5d0a9',
      actionBorder: '#b99259',
      actionInk: '#5a3d23',
      actionActiveBg: '#d3b07a',
      actionActiveBorder: '#996534',
      actionActiveInk: '#3d2614',
      feedSwitchActiveStart: '#dcc08f',
      feedSwitchActiveEnd: '#cfab73',
      dangerSoft: '#e7c3b8',
      dangerBorder: '#b16952',
      dangerInk: '#5f2316',
      sqwangBg: '#d6c2db',
      sqwangBorder: '#9673ab',
      sqwangInk: '#4f355f',
      commentCallToActionBg: '#d9d2b6',
      commentCallToActionBorder: '#8b8762',
      commentCallToActionInk: '#3e3a1d',
      hoverBg: '#ecddbf',
      pollCardBg: '#f1e1c1',
      pollOptionBg: '#ead4ae',
      pollOptionHoverBg: '#e1c699',
      pollOptionBarBg: '#cfb183',
      donateTagBg: '#d4bc8e',
      donateTagBorder: '#a37b48',
      donateTagInk: '#4b2f1b',
      donateSurfaceBg: '#f1e2c4',
      donateFeaturedBg: '#e8d0a5',
      donateFeaturedBorder: '#a57742',
      donateFeaturedShadow: '0 20px 34px -24px rgba(131, 91, 49, 0.44)',
      specialChipBg: '#e2d29a',
      specialChipBorder: '#9f8642',
      specialChipInk: '#4d3a10',
      specialItemBg: '#efe0c0',
      specialItemBorder: '#b69b66',
      specialItemShadow: 'inset 0 0 0 1px rgba(117, 89, 52, 0.12)',
      specialItemHoverBg: '#e7d2aa',
      specialItemHoverBorder: '#a88753',
      specialItemText: '#4c351f',
      specialItemMuted: '#765635',
      emojiButtonBg: '#e8d4ad',
      emojiButtonBorder: '#ad8b56',
      emojiButtonInk: '#4d311a',
      emojiButtonHoverBg: '#dcc092',
      canvasWrapBg: '#e8d8b8',
      canvasWrapBorder: '#b79a68',
      canvasBg: '#f2e3c7',
      canvasBorder: '#c6a874',
      moduleBlockBg: '#ebd9b4',
      moduleBlockBorder: '#b39261',
      moduleBlockInk: '#4d331d',
      moduleMuted: '#6f5839',
      statusBg: '#d2ddc2',
      statusBorder: '#86a16c',
      statusInk: '#304420',
      inputBg: '#f9efd9',
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
`,
  }),
  Object.freeze({
    id: BROWN_THEME_ID,
    label: 'Brown mode',
    mode: 'dark',
    useCustomStyles: true,
    tokens: Object.freeze({
      ...BASE_DARK_THEME_TOKENS,
      pageBg: '#100b07',
      foreground: '#f1e7dc',
      panel: '#1a130f',
      panelMuted: '#251a15',
      border: '#3c2d23',
      muted: '#c0a895',
      accent: '#a26b3f',
      accentStrong: '#c88d59',
      accentSoft: '#3f2a1e',
      accentGlow: 'rgba(162, 107, 63, 0.36)',
      commentPanel: '#211814',
      commentBorder: '#463428',
      navActiveStart: '#2d1d15',
      navActiveEnd: '#1b1310',
      actionBg: '#201a16',
      actionBorder: '#4f3d31',
      actionInk: '#d6beab',
      actionActiveBg: '#352319',
      actionActiveBorder: '#7a4e31',
      actionActiveInk: '#f4c79c',
      sqwangBg: '#2a1f31',
      sqwangBorder: '#5f4a6f',
      sqwangInk: '#dcbdf0',
      commentCallToActionBg: '#1a2520',
      commentCallToActionBorder: '#3b5d4f',
      commentCallToActionInk: '#b4ddcf',
      pollCardBg: '#1a130f',
      pollOptionBg: '#241913',
      pollOptionHoverBg: '#2b1e17',
      pollOptionBarBg: '#3e3025',
      donateTagBg: '#342619',
      donateTagBorder: '#735234',
      donateTagInk: '#f0cda8',
      donateFeaturedBg: '#21160f',
      donateFeaturedBorder: '#7a532f',
      donateFeaturedShadow: '0 20px 36px -26px rgba(129, 86, 49, 0.52)',
      specialChipBg: '#4b3a1b',
      specialChipBorder: '#8c7131',
      specialChipInk: '#f8dfa2',
      specialItemBg: '#1b150e',
      specialItemBorder: '#6f542b',
      specialItemHoverBg: '#251b11',
      specialItemHoverBorder: '#8a6835',
      moduleBlockBg: '#211914',
      moduleBlockBorder: '#4b382a',
      moduleMuted: '#b99f8a',
      inputBg: '#140f0b',
    }),
    cssOverrides: '',
  }),
  Object.freeze({
    id: PINK_THEME_ID,
    label: 'Pink mode',
    mode: 'dark',
    useCustomStyles: true,
    tokens: Object.freeze({
      ...BASE_DARK_THEME_TOKENS,
      pageBg: '#09090c',
      foreground: '#f2eef8',
      panel: '#141418',
      panelMuted: '#1f1f26',
      border: '#363544',
      muted: '#c1b2ce',
      accent: '#cd4f94',
      accentStrong: '#e774b2',
      accentSoft: '#3f1e34',
      accentGlow: 'rgba(205, 79, 148, 0.34)',
      commentPanel: '#1d1c24',
      commentBorder: '#3f3d4f',
      navActiveStart: '#2e1830',
      navActiveEnd: '#191720',
      actionBg: '#1c1f2a',
      actionBorder: '#434765',
      actionInk: '#c4d4f2',
      actionActiveBg: '#3a1f38',
      actionActiveBorder: '#7f3f73',
      actionActiveInk: '#f1b2d7',
      feedSwitchActiveStart: '#331a34',
      feedSwitchActiveEnd: '#1b1824',
      sqwangBg: '#2a1d38',
      sqwangBorder: '#5d4482',
      sqwangInk: '#debcff',
      commentCallToActionBg: '#1a2731',
      commentCallToActionBorder: '#3c6072',
      commentCallToActionInk: '#b9e0f1',
      hoverBg: '#252632',
      pollCardBg: '#171824',
      pollOptionBg: '#222332',
      pollOptionHoverBg: '#2a2c3f',
      pollOptionBarBg: '#3a3f58',
      donateTagBg: '#3a2132',
      donateTagBorder: '#7f4668',
      donateTagInk: '#f2bfdc',
      donateFeaturedBg: '#241824',
      donateFeaturedBorder: '#7f4f7f',
      donateFeaturedShadow: '0 20px 36px -26px rgba(140, 79, 134, 0.54)',
      specialChipBg: '#4b2c47',
      specialChipBorder: '#935c88',
      specialChipInk: '#f6d6ee',
      specialItemBg: '#1d1625',
      specialItemBorder: '#69407a',
      specialItemHoverBg: '#281d32',
      specialItemHoverBorder: '#81509a',
      specialItemText: '#f5dff7',
      specialItemMuted: '#d3b5dc',
      emojiButtonBg: '#201f2d',
      emojiButtonBorder: '#474563',
      emojiButtonInk: '#f3eefd',
      emojiButtonHoverBg: '#2b2a3d',
      canvasWrapBg: '#111321',
      canvasWrapBorder: '#333a58',
      canvasBg: '#1a1d2f',
      canvasBorder: '#3f4769',
      moduleBlockBg: '#211f2d',
      moduleBlockBorder: '#474363',
      moduleBlockInk: '#e8def7',
      moduleMuted: '#c5b3d7',
      statusBg: '#243424',
      statusBorder: '#49714a',
      statusInk: '#c2efc4',
      inputBg: '#12131e',
    }),
    cssOverrides: '',
  }),
  Object.freeze({
    id: AURORA_THEME_ID,
    label: 'Aurora mode',
    mode: 'dark',
    useCustomStyles: true,
    tokens: Object.freeze({
      ...BASE_DARK_THEME_TOKENS,
      pageBg: '#070a10',
      foreground: '#ebf3ff',
      panel: '#121723',
      panelMuted: '#1b2434',
      border: '#32435f',
      muted: '#aac0e2',
      accent: '#4db4ff',
      accentStrong: '#7ae874',
      accentSoft: '#1f3556',
      accentGlow: 'rgba(109, 200, 255, 0.35)',
      shadow: '0 24px 54px -36px rgba(12, 25, 47, 0.92)',
      commentPanel: '#1a2230',
      commentBorder: '#405271',
      navActiveStart: '#2b2f5a',
      navActiveEnd: '#182337',
      actionBg: '#162336',
      actionBorder: '#315681',
      actionInk: '#a9d4ff',
      actionActiveBg: '#2a2c56',
      actionActiveBorder: '#5b63aa',
      actionActiveInk: '#d3d8ff',
      feedSwitchActiveStart: '#2f2b63',
      feedSwitchActiveEnd: '#16283d',
      sqwangBg: '#2a1f45',
      sqwangBorder: '#5f49a3',
      sqwangInk: '#d6c7ff',
      commentCallToActionBg: '#1b2d2a',
      commentCallToActionBorder: '#3e7568',
      commentCallToActionInk: '#bcf2e4',
      hoverBg: '#233149',
      pollCardBg: '#182235',
      pollOptionBg: '#24324a',
      pollOptionHoverBg: '#2d3d59',
      pollOptionBarBg: '#3c547b',
      donateTagBg: '#312a53',
      donateTagBorder: '#7265bc',
      donateTagInk: '#dbd3ff',
      donateSurfaceBg: '#121826',
      donateFeaturedBg: '#1e2240',
      donateFeaturedBorder: '#5b66b5',
      donateFeaturedShadow: '0 20px 36px -26px rgba(89, 129, 210, 0.52)',
      specialChipBg: '#3f3d14',
      specialChipBorder: '#87833a',
      specialChipInk: '#f5efb4',
      specialItemBg: '#191f30',
      specialItemBorder: '#4b5f88',
      specialItemHoverBg: '#202a3f',
      specialItemHoverBorder: '#6077ab',
      specialItemText: '#dce8ff',
      specialItemMuted: '#b8c7e8',
      emojiButtonBg: '#1e2940',
      emojiButtonBorder: '#48608e',
      emojiButtonInk: '#e6f2ff',
      emojiButtonHoverBg: '#263655',
      canvasWrapBg: '#121c2c',
      canvasWrapBorder: '#3c567f',
      canvasBg: '#1a2940',
      canvasBorder: '#4f6e9f',
      moduleBlockBg: '#1d2a3f',
      moduleBlockBorder: '#466696',
      moduleBlockInk: '#dcecff',
      moduleMuted: '#afc7ea',
      statusBg: '#213525',
      statusBorder: '#4d8758',
      statusInk: '#caf8d3',
      inputBg: '#0f1726',
    }),
    cssOverrides: '',
  }),
]);

const THEME_DEFINITION_BY_ID = new Map(THEMES.map((theme) => [theme.id, theme]));

/**
 * Returns theme definition by id, falling back to default theme.
 *
 * @param {string} themeId - Candidate theme id.
 * @returns {Readonly<{
 *   id: string,
 *   label: string,
 *   mode: "light" | "dark",
 *   useCustomStyles: boolean,
 *   tokens: Readonly<Record<string, string>>,
 *   cssOverrides?: string
 * }>}
 */
function getThemeDefinition(themeId) {
  if (typeof themeId === 'string' && THEME_DEFINITION_BY_ID.has(themeId)) {
    return /** @type {any} */ (THEME_DEFINITION_BY_ID.get(themeId));
  }

  return /** @type {any} */ (THEME_DEFINITION_BY_ID.get(DEFAULT_THEME_ID));
}

/**
 * Returns whether the provided value is a valid theme id.
 *
 * @param {unknown} themeId - Candidate theme id.
 * @returns {boolean}
 */
function isValidThemeId(themeId) {
  return typeof themeId === 'string' && THEME_DEFINITION_BY_ID.has(themeId);
}

/**
 * Lists user-facing theme options for combobox rendering.
 *
 * @returns {Array<{ id: string, label: string }>}
 */
function listThemeOptions() {
  return THEMES.map((theme) => ({
    id: theme.id,
    label: theme.label,
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
  listThemeOptions,
};
