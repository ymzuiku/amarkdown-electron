module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./images/logo-1024",
    osxSign: {
      identity: "amarkdown", // 自签名证书的名称
      "hardened-runtime": true,
      "gatekeeper-assess": false,
      "signature-flags": "library",
    },
    // osxNotarize: {
    //   tool: "notarytool",
    //   appleId: process.env.APPLE_ID,
    //   appleIdPassword: process.env.APPLE_PASSWORD,
    //   teamId: process.env.APPLE_TEAM_ID,
    // },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32", "linux"],
    },
    {
      // Path to the icon to use for the app in the DMG window
      name: "@electron-forge/maker-dmg",
      config: {
        background: "./images/dmg.png",
        format: "ULFO",
      },
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
    },
    {
      name: "@electron-forge/maker-rpm",
    },
  ],
  plugins: [
    // {
    //   name: "@electron-forge/plugin-auto-unpack-natives",
    //   config: {},
    // },
  ],
};
