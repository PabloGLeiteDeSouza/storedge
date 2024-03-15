import dotenvExpand from "dotenv-expand";
import dotenv from "dotenv";
import path from "path";
import isDev from "electron-is-dev";


type ConfigType = {
    Email?: string,
    Password?: string,
    Host?: string,
    Port?: string,
}

function LoadConfig () {
    if (isDev) {
        if (process.resourcesPath) {
            dotenvExpand.expand(dotenv.config({ path: path.join(process.resourcesPath, ".env") }));
        }
    }
    const config: ConfigType = {
        Email: process.env.STOREDGE_API_FILEMANAGER_EMAIL_FROM,
        Password: process.env.STOREDGE_API_FILEMANAGER_EMAIL_PASSWORD,
        Host: process.env.STOREDGE_API_FILEMANAGER_EMAIL_SERVER,
        Port: process.env.STOREDGE_API_FILEMANAGER_EMAIL_PORT,
    }
    return config
}

export { LoadConfig };
export default LoadConfig;
