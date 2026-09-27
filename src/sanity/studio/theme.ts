import { buildLegacyTheme } from "sanity";

/**
 * تخصيص هوية الاستوديو بألوان مِزارو (أخضر زمردي داكن) بدل الألوان
 * الافتراضية لـSanity، بدون أي تغيير في الوظائف أو البيانات.
 */
export const mizaroStudioTheme = buildLegacyTheme({
  "--black": "#0a0908",
  "--white": "#ffffff",
  "--gray-base": "#8b8d8c",
  "--gray": "#5f625e",

  "--brand-primary": "#1c6650",

  "--component-bg": "#ffffff",
  "--component-text-color": "#101513",

  "--default-button-color": "#1c6650",
  "--default-button-primary-color": "#1c6650",
  "--default-button-success-color": "#2c7f60",
  "--default-button-warning-color": "#b45309",
  "--default-button-danger-color": "#b91c1c",

  "--focus-color": "#2c7f60",

  "--main-navigation-color": "#071e18",
  "--main-navigation-color--inverted": "#ffffff",

  "--state-info-color": "#2c7f60",
  "--state-success-color": "#2c7f60",
  "--state-warning-color": "#b45309",
  "--state-danger-color": "#b91c1c",
});
