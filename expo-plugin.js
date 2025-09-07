const {withAndroidManifest, withInfoPlist} = require('@expo/config-plugins');

const withMyStoragePackage = config => {
  config = withAndroidManifest(config, config => {
    return config;
  });

  config = withInfoPlist(config, config => {
    return config;
  });

  return config;
};

module.exports = withMyStoragePackage;
