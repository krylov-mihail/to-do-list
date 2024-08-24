const applicationName = "Todo List App";

module.exports = {
  name: applicationName,
  version: process.env.MY_CUSTOM_PROJECT_VERSION || "1.0.0",
  // All values in extra will be passed to your app.
  extra: {
    variable: "value",
  },
  android: {
    firebase: process.env.GOOGLE_SERVICES_JSON,
  },
};
