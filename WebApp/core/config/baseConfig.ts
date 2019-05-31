import { Common } from "./../helpers/common"

export default class BaseConfig {

    private static configProperties = require("./configuration.json");

    static get port() {
        return `${Common.normalizePort(process.env.PORT || BaseConfig.configProperties.common.port)}`;
    }

    static get host() {
        return `${BaseConfig.configProperties.common.domain}:${BaseConfig.port}`;
    }

    static get apiUrl() {
        return `http://${BaseConfig.host}/api`;
    }

    static get dbConnectionString() {
        return BaseConfig.configProperties.db.connectionString;
    }

    static get emailUsername() {
        return BaseConfig.configProperties.email.username;
    }

    static get emailPassword() {
        return BaseConfig.configProperties.email.password;
    }

    static get securityPrivateKey() {
        return BaseConfig.configProperties.security.privateKey;
    }

    static get securityTokenExpiry() {
        return BaseConfig.configProperties.security.tokenExpiry;
    }
}

Object.seal(BaseConfig);