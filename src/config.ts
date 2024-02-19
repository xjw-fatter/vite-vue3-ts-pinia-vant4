interface Config {
    apiSeviceUrl: string;
    pubImgUrl: string;
}
const importMetaEnv = import.meta.env;
console.log(importMetaEnv.VITE_MODE_NAME);
const isProd = importMetaEnv.VITE_MODE_NAME === 'production';
let config: Config;
if (isProd) {
    // 生产环境
    config = {
        apiSeviceUrl: importMetaEnv.VITE_APP_APISERVER as string,
        pubImgUrl: importMetaEnv.VITE_APP_PUBIMGURL as string
    };
} else {
    // 测试环境
    config = {
        apiSeviceUrl: importMetaEnv.VITE_APP_APISERVER as string,
        pubImgUrl: importMetaEnv.VITE_APP_PUBIMGURL as string
    };
}
export default config;
