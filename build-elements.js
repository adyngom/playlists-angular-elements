const fs = require("fs-extra");
const concat = require("concat");
(async function build() {
  const files = [
    "./dist/playlistsElement/runtime-es2015.js",
    "./dist/playlistsElement/polyfills-es2015.js",
    "./dist/playlistsElement/main-es2015.js"
  ];
  await fs.ensureDir("elements");
  await concat(files, "elements/elements.js");
  await fs.copyFile(
    "./dist/playlistsElement/styles.css",
    "elements/elements.css"
  );
  if (fs.existsSync("./dist/playlistsElements/assets/")) {
    await fs.copy("./dist/playlistsElements/assets/", "elements/assets/");
  }
})();
