export const isExpoEnvironment = () => {
  try {
    const Constants = require('expo-constants').default;
    return Constants && Constants.manifest !== undefined;
  } catch (e) {
    return false;
  }
};
