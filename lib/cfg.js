const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const configPath = path.resolve(process.cwd(), "application.yml");

try {
  process.cfg = yaml.safeLoad(fs.readFileSync(configPath, "utf8"));
} catch (e) {
  console.log(e);
}
