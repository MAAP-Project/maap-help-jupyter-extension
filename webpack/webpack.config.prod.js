const options = {
    node_env: "production",
    isProduction: true
};

//const config = require("./webpack.config.helper")(options);
import config from "./webpack.config.helper.cjs";

export default config;