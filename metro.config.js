const { getDefaultConfig } = require("@expo/metro-config"); // eslint-disable-line

const defaultConfig = getDefaultConfig(__dirname); // eslint-disable-line

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig; // eslint-disable-line