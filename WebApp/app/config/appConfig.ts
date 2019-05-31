export default class AppConfig {

    static get apiUrl() {
        return "http://localhost:1200/api";
    }
}

Object.seal(AppConfig);