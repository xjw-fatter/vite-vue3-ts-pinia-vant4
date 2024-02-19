# Vite + Vue3 + Typescript + Pinia + Vueuse + axios + vant4

-   使用 Vite 搭建项目
-   集成 `typescript`
-   在 Vite 中集成 `vue-router4` 和 `pinia`
-   使用 vue3 的伴侣 `vueuse`
-   在项目中集成 `eslint` 和 `prettier` 保证代码质量
-   `Less`
-   `Axios` 请求拦截器
-   UI 组件库 vant4
-   移动端适配 vw 方案
-   环境变量配置 待完善
-   提高开发效率的 vue3 插件
-   EventBus 替代方案
-   vite.config 配置 打包配置 待完善
-   stylelint 待完善

# 环境依赖版本

-   [node](https://github.com/nodejs/node)：v14.18.1
-   [vite](https://github.com/vitejs/vite)：^3.1.0
-   [vue](https://github.com/vuejs/vue)：^3.2.37
-   [typescript](https://github.com/microsoft/TypeScript)：^4.6.4
-   [pinia](https://github.com/vuejs/pinia)：^2.0.22
-   [vue-router](https://github.com/vuejs/router)：^4.1.5
-   [vueuse](https://github.com/vueuse/vueuse)：^8.2.0
-   [eslint](https://github.com/eslint/eslint)：^8.23.1
-   [prettier](https://github.com/prettier/prettier)：^2.7.1
-   [commitizen](https://github.com/commitizen/cz-cli)：^4.2.5
-   [husky](https://github.com/typicode/husky)：^8.0.1

# 1. 初始化项目

## 按步骤提示初始化

### 1. 使用 vite-cli 命令

```bash
# pnpm
npm create vite

# npm
npm init vite@latest

# yarn
yarn create vite
```

### 2. 输入项目名：

```bash
? Project name:  vite-vue3-ts-pinia-vant4
```

### 3. 选择一个框架（vue）

```bash
? Select a framework: » - Use arrow-keys. Return to submit.
     vanilla // 原生js
 >   vue     // vue3 默认
     react   // react
     preact  // 轻量化react框架
     lit     // 轻量级web组件
     svelte  // svelte框架
```

### 4. 使用 typescript

```
? Select a variant: › - Use arrow-keys. Return to submit.
     vue
 ❯   vue-ts
```

### 5. 启动项目

```bash
cd vite-vue3-ts-pinia-vant4 && npm install && npm run dev
```

## 快速初始化（建议使用）：

```
# pnpm
pnpm create vite project-name -- --template vue-ts

# npm 6.x
npm init vite@latest project-name --template vue-ts
 
# npm 7+, 需要额外的双横线：
npm init vite@latest project-name -- --template vue-ts
 
# yarn
yarn create vite project-name --template vue-ts
```

## 集成配置

### 1. 为保证 node 的使用

```bash
npm i @types/node --save-dev
```

### 2. 修改 `tsconfig.json`

```json
{
    "compilerOptions": {
        "typeRoots": [
            "node_modules/@types", // 默认值
            "src/types"
        ],
        "target": "esnext",
        "useDefineForClassFields": true,
        "module": "esnext",
        "moduleResolution": "node",
        "strict": true,
        "jsx": "preserve",
        "sourceMap": true,
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "lib": ["esnext", "dom"],
        "baseUrl": "./",
        "paths": {
            "@": ["src"],
            "@/*": ["src/*"]
        },
        "skipLibCheck": true
    },
    "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### 3. 修改 `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [vue()],
    server: {
        port: 8080, //启动端口
        hmr: {
            host: '127.0.0.1',
            port: 8080
        },
        // 设置 https 代理
        proxy: {
            '/api': {
                target: 'your https address',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
});
```

# 2. 代码质量风格的统一

## 集成 `eslint`

### 1. 安装

```bash
npm i eslint eslint-plugin-vue --save-dev
```

由于 ESLint 默认使用  [Espree](https://github.com/eslint/espree)  进行语法解析，无法识别 TypeScript 的一些语法，故我们需要安装  [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser) 替代掉默认的解析器

```bash
npm install @typescript-eslint/parser --save-dev
```

安装对应的插件  [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)  它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。

```bash
npm install @typescript-eslint/eslint-plugin --save-dev
```

### 2. 创建配置文件： `.eslintrc.js`  或  `.eslintrc.json`

```javascript
module.exports = {
    parser: 'vue-eslint-parser',

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },

    extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'],

    rules: {
        // override/add rules settings here, such as:
    }
};
```

### 3. 创建忽略文件：`.eslintignore`

```
node_modules/
dist/
index.html
```

### 4. 命令行式运行：修改 `package.json`

```json
{
    // ...
    "scripts": {
        // ...
        "eslint:comment": "使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .js 和 .vue 的文件",
        "eslint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src"
    }
    // ...
}
```

## 集成 `prettier`

### 1. 安装

```bash
npm i prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

### 2. 创建配置文件： `prettier.config.js` 或 `.prettierrc.js`

```javascript
module.exports = {
    // 一行最多 80 字符
    printWidth: 80,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用 tab 缩进，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号代替双引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾使用逗号
    trailingComma: 'all',
    // 大括号内的首尾需要空格 { foo: bar }
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'auto'
};
```

### 3. 修改 `.eslintrc.js` 配置

```javascript
module.exports = {
    // ...

    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ]

    // ...
};
```

### 4. 命令行式运行：修改 `package.json`

```json
{
    // ...
    "scripts": {
        // ...
        "prettier:comment": "自动格式化当前目录下的所有文件",
        "prettier": "prettier --write"
    }
    // ...
}
```

# 3. 集成 `pinia`

`Pinia` 读音：['piːnə]，是 Vue 官方团队推荐代替`Vuex`的一款轻量级状态管理库。 **Pinia 有如下特点：**

-   完整的 typescript 的支持；
-   足够轻量，压缩后的体积只有 1.6kb;
-   去除 mutations，只有 state，getters，actions；
-   actions 支持同步和异步；
-   没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割；
-   无需手动添加 store，store 一旦创建便会自动添加；

## 安装

```
npm i pinia --save
```

## 使用

### 1. 新建 src/store 目录并在其下面创建 index.ts，导出 pinia

```typescript
import { createPinia } from 'pinia';

const pinia = createPinia();

export default pinia;
```

### 2. 在 main.ts 中引入并使用

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
const app = createApp(App); // 创建vue实例
app.use(pinia); //挂载pinia
app.mount('#app');
```

### 3. **定义 State：** 在 src/store 下面创建一个 common.store.ts

```typescript
import { defineStore } from 'pinia';

export const commonStore = defineStore({
    id: 'commonStore', // id必填，且需要唯一
    state: () => {
        return {
            keepAliveComponents: [],
            cancelTokenArr: [],
            direction: ''
        };
    },
    actions: {
        // ...
    }
});
```

或

```typescript
import { defineStore } from 'pinia';

export default defineStore('commonStore', {
    state: () => {
        return {
            keepAliveComponents: [],
            cancelTokenArr: [],
            direction: ''
        };
    },
    actions: {
        // 更新页面切换动画
        updateDirection(direction: string) {
            this.direction = direction;
        },
        // 需要缓存
        keepAlive(component: any) {
            // 注：防止重复添加（当然也可以使用Set）
            !(this.keepAliveComponents as any[]).includes(component) &&
                (this.keepAliveComponents as any[]).push(component);
        },
        // 不需要缓存
        noKeepAlive(component: any) {
            const index = (this.keepAliveComponents as any[]).indexOf(component);
            index !== -1 && this.keepAliveComponents.splice(index, 1);
        },
        // 请求的token 用于取消请求
        pushToken(payload: any) {
            (this.cancelTokenArr as any[]).push(payload);
        },
        // 路由跳转取消请求
        clearToken() {
            this.cancelTokenArr.forEach((item: any) => {
                item('路由跳转取消请求');
            });
            this.cancelTokenArr = [];
        }
    }
});
```

### 4. **获取 State：** 在 func 中使用

```typescript
import commonStore from '@/store/common.store';

() => {
    const useCommonStore = commonStore();
    // useCommonStore.direction = '' 直接修改 state （不建议）
    useCommonStore.updateDirection(''); // 通过 actions修改 State
};
```

### 5. **获取 State：** 在 .vue 中使用

```typescript
<template>
    <router-view v-slot="{ Component, route }">
        <transition :name="transitionClass" mode="default">
            <keep-alive :include="keepAliveComponents">
                <component :is="Component" :key="route.fullPath" class="router-view"></component>
            </keep-alive>
        </transition>
    </router-view>
</template>

<script lang="ts" setup>
    import commonStore from '@/store/common.store';
    import { storeToRefs } from 'pinia';

    const useCommonStore = commonStore();
	// storeToRefs  保持响应式 直接解构不会动态改变 参考ref toRefs storeToRefs区别
    const { direction, keepAliveComponents } = storeToRefs(useCommonStore);

	// 生命周期
    onMounted(() => {
 		useCommonStore.updateFlag(true);
    });
	// 计算属性
    const transitionClass = computed(() => {
        return `slide-${direction.value}`;
    });
 </script>
```

### 6. **数据持久化：**

```
npm i pinia-plugin-persist --save
```

```bash
1.在src/store/index.ts 引入并使用，代码如下：
	import { createPinia } from 'pinia'
	import piniaPluginPersist from 'pinia-plugin-persist'

	const pinia = createPinia()
	pinia.use(piniaPluginPersist)

	export default pinia

2.在对应的store里开启持久化存储
	import { defineStore } from 'pinia'
	import { userStore } from './user'

	export const commonStore = defineStore('commonStore', {
		state: () => {
			return {
				msg: 'hello',
				count: 1
			}
		},

		// 开启数据缓存
		persist: {
			enabled: true
		}
	})
```

> 参考 Vue 新一代状态管理工具——Pinia：[链接 来源：稀土掘金 吴同学丫](https://juejin.cn/post/7119832691339444255) pinia 官方文档：[链接](https://pinia.vuejs.org/introduction.html)

# 4. 集成 `vue-router4`

## 安装

```bash
npm i vue-router --save
```

## 使用

### 1. 新建 src/router 目录并在其下面创建 index.ts，导出 router

```typescript
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            keepAlive: true
        },
        component: () => import('@/pages/login.vue')
    },
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '首页',
            keepAlive: true
        },
        component: () => import('@/pages/index.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(), // createWebHashHistory （哈希模式） createWebHistory（History模式）
    routes
});
export default router;
```

### 2. 在 main.ts 中引入并使用

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

const app = createApp(App);

app.use(router); // 挂载实例

app.mount('#app');
```

# 5. 集成 `vueuse`

`VueUse` 是一个基于  `Composition API` 的实用函数集合。

## 安装

```
npm i @vueuse/core
```

## 使用

1.  创建一个新的 .vue 页面来做一个简单的 demo

```typescript
<template>
	<div>
		<h1> 测试 vueUse 的鼠标坐标 </h1>
		<h3>Mouse: {{x}} x {{y}}</h3>
	<div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMouse } from '@vueuse/core'
export default defineComponent({
	name: 'VueUse',
		setup() {
			const { x, y } = useMouse()
			return {
				x, y
			}
		}
	});
</script>
```

useMouse 只是 vueuse 的一个最基本的函数库，还有许多，总会有一个适合你；[官方文档](https://vueuse.org/)

# 6. CSS 的集成

## 方案一：原生 css variable 新特性：

原生支持，不需要第三方插件，具体使用文档可 [查看](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var)

### 1. 新建文件 src/styles/index.css

```css
:root {
    --main-bg-color: pink;
}
body {
    background-color: var(--main-bg-color);
}
```

注：还可以增加 PostCSS 配置，(任何受  [postcss-load-config](https://github.com/postcss/postcss-load-config) 支持的格式  `postcss.config.js` )，它将会自动应用于所有已导入的 CSS。

## 方案二：scss 或 less：

### 1. 安装

```bash
 # .scss and .sass
npm add -D sass

 # .less
npm add -D less
```

### 2. 使用在 .vue 文件模板中

```typescript
// .scss
<template>
	<div class="root">
		<h3>欢迎使用 scss</h3>
	</div>
</template>
<style lang="scss">
	.root {}
</style>

// .less
<template>
	<div class="root">
		<h3>欢迎使用 less</h3>
	</div>
</template>
<style lang="less">
	.root {}
</style>
```

# 7. 集成 `axios`

`axios` 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

## 安装

```bash
npm i axios
```

## 使用：

### 1. 新建 src/apis/interceptor.ts

```typescript
import axios, { AxiosInstance } from 'axios';
import serverConfig from '@/config'; // 环境变量中获取的请求地址配置
import commonStore from '@/store/common.store';
// import { requireLocalImg } from '@/utils/func';
import { showLoadingToast, showFailToast } from 'vant'; // vant4 toast组件

declare module 'axios' {
    // 声明额外字段
    interface AxiosRequestConfig {
        showLoading?: boolean;
        loadingText?: string;
        needCheck?: boolean;
    }
}

axios.defaults.timeout = 15000; // 设置超时时间
axios.defaults.showLoading = true; // 设置请求是否loading
axios.defaults.needCheck = false; // 默认请求不携带auth_token
let toast: any;

const { apiSeviceUrl } = serverConfig;
// const loadingGif = requireLocalImg('../assets/loading.gif');
import loadingGif from '../assets/loading.gif'; // vite使用import引入图片 不能使用require
function createInterceptor(instance: AxiosInstance): void {
    instance.interceptors.request.use(
        function (config) {
            const useCommonStore = commonStore();
            const token = useCommonStore.info.auth_token;
            // 请求头token
            if (config.needCheck && token) {
                config.headers = Object.assign({}, config.headers);
                config.headers.auth_token = token;
            }
            // axios cancelToken
            config.cancelToken = new axios.CancelToken((cancel) => {
                useCommonStore.pushToken(cancel);
            });
            // Do something before request is sent
            if (config.showLoading && !toast) {
                toast = showLoadingToast({
                    duration: 0, // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    icon: loadingGif,
                    message: config.loadingText || '加载中...'
                });
            }
            return config;
        },
        function (error) {
            // Do something with request error
            if (toast && error.showLoading) {
                toast.close();
                toast = null;
            }
            showFailToast('网络错误');
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        function (response) {
            // Do something with response data
            if (toast || (response.config && response.config.showLoading)) {
                toast && toast.close();
                toast = null;
            }
            return response;
        },
        function (error) {
            // Do something with response error
            if (toast || (error.config && error.config.showLoading)) {
                toast && toast.close();
                toast = null;
            }
            return Promise.reject(error);
        }
    );
}

// 初始化实例
const axiosInstance = axios.create();
const apiInstance = axios.create({
    baseURL: apiSeviceUrl
});

createInterceptor(axiosInstance);
createInterceptor(apiInstance);

export const $axios = axiosInstance;
export const $api = apiInstance;
```

### 2. src/apis/modules/common.api.ts 使用

```typescript
import { $api, $axios } from '@/apis/interceptor';

export const $test = (parmas: Parmas) =>
    $axios.post('https://xxxxxx/xxxx/xx/xxxx', parmas, {
        loadingText: '识别中...'
    });
export const $test2 = (params: Parmas) => $api.post('xx/xxx/xxx/xxxxx', params, {});
export const $test3 = () => $api.get('xxxxx/xxxx/xxxx', { showLoading: false });
```

```typescript
import { $test } from '@/apis/modules/common.api';

try {
    let res = await $test();
    console.log('test--res', res);
} catch (error) {
    console.warn(error);
}
```

# 8. css 的 UI 样式库

> 可选很多，根据自己项目的需求去进行选择即可 **注意：UI 库一般需要按需引入（下面以 `vant4` 为例）**

## vant

### 1. 安装 `vant`

```bash
# Vue 2 项目，安装 Vant 2
npm i vant@latest-v2

# Vue 3 项目，安装最新版 Vant
npm i vant

# Vue 3 项目，安装最新版 Vant4 vant4还未正式发布 具体版本查看vant官网
npm i vant@4.0.0-rc.4
```

vant 官网：[链接](https://vant-ui.github.io/vant/v4/#/zh-CN/changelog)

### 2.使用 vant

vant 官网 快速上手：[链接](https://vant-ui.github.io/vant/v4/#/zh-CN/quickstart)

### 3.按需引入组件样式

安装插件 unplugin-vue-components 会解析模板并自动注册对应的组件

```
# 通过 npm 安装
npm i unplugin-vue-components -D

# 通过 yarn 安装
yarn add unplugin-vue-components -D

# 通过 pnpm 安装
pnpm add unplugin-vue-components -D

```

vite.config.js 配置插件

```
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
	plugins: [
		vue(),
		Components({
		resolvers: [VantResolver()],
		}),
	],
};
```

使用组件

```
<template>
	<van-button type="primary" />
</template>
```

### 4.函数组件

Vant 中有个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件。在使用函数组件时，unplugin-vue-components 无法自动引入对应的样式，因此需要手动引入样式。

```
// Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';

main.ts 引入样式文件 toast dialog
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

src/apis/interceptor.ts使用
vant4还有问题 会报vant中无showLoadingToast, showFailToast导出 需使用v4.0.0-beta.0及之后版本
import { showLoadingToast, showFailToast } from 'vant';
toast = showLoadingToast({
	duration: 0, // 持续展示 toast
	forbidClick: true, // 禁用背景点击
	icon: loadingGif,
	message: config.loadingText || '加载中...'
});
toast.close();

```

从 Vant 4.0 版本开始 移除 babel-plugin-import 将不再支持 babel-plugin-import，请移除项目中依赖的 babel-plugin-import 插件。

## element-plus

**注意：UI 库一般需要按需引入（下面以 `element-plus` 为例）**

### 1. 安装 `vite-plugin-style-import`

```bash
npm i vite-plugin-style-import --save-dev
```

### 2. 修改 `vite.config.ts`

```typescript
...
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
    ...
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    resolveStyle: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`;
                    },
                    ensureStyleFile: true // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
                }
            ]
        })
    ],
    ...
})

```

## **移动端适配**

### 1. 添加 meta 标签

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=auto"/>
```

### 2.PostCSS

不管哪种方案，都免不了 PostCSS 的支持，由于 vite 已经内置 PostCSS ，所以只需要在根目录创建一个 postcss.config.js 配置文件即可。

### 3.vw 方案 vw 方案使用 postcss-px-to-viewport 插件将 px 单位转化为 vw/vh 单位

```vw方案
npm i postcss-px-to-viewport -D

// postcss.config.js

module.exports = {
	plugins: {
		'postcss-px-to-viewport': {
			viewportWidth: 375,
		},
	},
};

postcss-px-to-viewport v1.1.1 不支持 include 配置项，v1.2.0 开始加入include，但是并没有发布到npm仓库,并且由于 postcss-px-to-viewport 不支持 postcss 8.x ，而vite内置postcss 8.x，
所以使用postcss-px-to-viewport会抛出警告🤦‍♂️改用 postcss-px-to-viewport-8-plugin 替代，既支持 include 配置项，也支持postcss 8.x

npm i autoprefixer -D
npm i postcss-px-to-viewport-8-plugin -D

const autoprefixer = require('autoprefixer');
const px2viewport = require('postcss-px-to-viewport-8-plugin');

const basePx2viewport = {
	unitToConvert: 'px', // 需要转换的单位，默认为 px
	// viewportWidth: 750, // 设计稿的视口宽度
	// viewportHeight: 1334, //
	unitPrecision: 3, // 单位转换后保留的精度（很多时候无法整除）
	propList: ['*'], // 能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换
	viewportUnit: 'vw', // 指定需要转换成的视口单位，建议使用 vw
	fontViewportUnit: 'vw', // 字体使用的视口单位
	// 指定不转换为视口单位的类，可以自定义，可以无限添加，建议定义一至两个通用的类名 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
	selectorBlackList: ['.ignore', 'keep-px'], // 类名中含有'keep-px'以及'ignore'类都不会被转换
	minPixelValue: 1, // 设置最小的转换数值，这里小于或等于 1px 不转换为视口单位
	mediaQuery: false // 媒体查询里的单位是否需要转换单位
};

module.exports = {
	plugins: [
		autoprefixer(),
		// vant
		px2viewport({
			...basePx2viewport,
			viewportWidth: 375,
			viewportHeight: 667,
			exclude: [/^(?!.*node_modules\/vant)/]
			// include: [/node_modules\/vant/]
		}),
		// 非vant
		px2viewport({
			...basePx2viewport,
			viewportWidth: 750,
			viewportHeight: 1334,
			exclude: [/node_modules\/vant/] // 忽略
		})
	]
};
```

### 4.rem 方案

rem 方案使用 postcss-pxtorem 插件将 px 单位转化为 rem 单位，并且用 lib-flexible 设置 rem 基准值

```vw方案
npm i autoprefixer -D
npm i amfe-flexible
npm i postcss-pxtorem -D

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue({ file }) {
        return file.indexOf('node_modules/vant') !== -1 ? 37.5 : 75;
      },
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['.ignore', 'keep-px'],
      minPixelValue: 1,
      mediaQuery: false,
    }),
  ],
};
需注意 如果用vant官网示例 file.indexOf('vant') 来匹配文件，请确保你的项目名或文件名没有包含'vant'，建议改为 file.indexOf('node_modules/vant')
```

# 9. 使用 [commitizen](https://github.com/commitizen/cz-cli) 规范 git 提交

为了使团队多人协作更加的规范，所以需要每次在 git 提交的时候，做一次硬性规范提交，规范 git 的提交信息

## 安装 `commitizen` (交互式提交 + 自定义提示文案 + Commit 规范)

### 1. 安装

```bash
npm install -D commitizen cz-conventional-changelog @commitlint/config-conventional @commitlint/cli commitlint-config-cz cz-customizable

全局安装commitizen，注意，这里是全局安装，否则无法执行插件的命令
npm install commitizen -g
```

### 2. 配置 `package.json`

```json
{
    //   ...
    "scripts": {
        "commit:comment": "引导设置规范化的提交信息",
        "commit": "git cz"
    },

    "config": {
        "commitizen": {
            "path": "node_modules/cz-customizable"
        }
    }
    //   ...
}
```

提交是 git commit 替换为 npm run commit

```
git status
git add
npm run commit
git push
```

### 3. 新增配置 `commitlint.config.js`

```javascript
module.exports = {
    extends: ['@commitlint/config-conventional', 'cz'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feature', // 新功能（feature）
                'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
                'fix', // 修补bug
                'ui', // 更新 ui
                'docs', // 文档（documentation）
                'style', // 格式（不影响代码运行的变动）
                'perf', // 性能优化
                'release', // 发布
                'deploy', // 部署
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
                'merge', // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
                'build' // 打包
            ]
        ],
        // <type> 格式 小写
        'type-case': [2, 'always', 'lower-case'],
        // <type> 不能为空
        'type-empty': [2, 'never'],
        // <scope> 范围不能为空
        'scope-empty': [2, 'never'],
        // <scope> 范围格式
        'scope-case': [0],
        // <subject> 主要 message 不能为空
        'subject-empty': [2, 'never'],
        // <subject> 以什么为结束标志，禁用
        'subject-full-stop': [0, 'never'],
        // <subject> 格式，禁用
        'subject-case': [0, 'never'],
        // <body> 以空行开头
        'body-leading-blank': [1, 'always'],
        'header-max-length': [0, 'always', 72]
    }
};
```

### 4. 自定义提示则添加 `.cz-config.js`

```javascript
module.exports = {
    types: [
        { value: 'feature', name: 'feature:  增加新功能' },
        { value: 'bug', name: 'bug:      测试反馈bug列表中的bug号' },
        { value: 'fix', name: 'fix:      修复bug' },
        { value: 'ui', name: 'ui:       更新UI' },
        { value: 'docs', name: 'docs:     文档变更' },
        { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
        { value: 'perf', name: 'perf:     性能优化' },
        { value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)' },
        { value: 'release', name: 'release:  发布' },
        { value: 'deploy', name: 'deploy:   部署' },
        { value: 'test', name: 'test:     增加测试' },
        { value: 'chore', name: 'chore:    构建过程或辅助工具的变动(更改配置文件)' },
        { value: 'revert', name: 'revert:   回退' },
        { value: 'build', name: 'build:    打包' }
    ],
    // override the messages, defaults are as follows
    messages: {
        type: '请选择提交类型:',
        customScope: '请输入您修改的范围(可选):',
        subject: '请简要描述提交 message (必填):',
        body: '请输入详细描述(可选，待优化去除，跳过即可):',
        footer: '请输入要关闭的issue(待优化去除，跳过即可):',
        confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
    },
    allowCustomScopes: true,
    skipQuestions: ['body', 'footer'],
    subjectLimit: 72
};
```

customScope 自定义输入未生效，暂未解决

### 5. 交互界面测试

[参考](https://juejin.cn/post/7041768022284976165#heading-7)

![carbon.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2be96b13d3c427e919b11e5bc5404e4~tplv-k3u1fbpfcp-watermark.image?)

## 安装 husky 提交前代码的检查

### 1. 安装

```bash
# 1.安装
npm i husky lint-staged -D

# 2.生成 .husky 的文件夹
npx husky install

# 3.添加 hooks，会在 .husky 目录下生成一个 pre-commit 脚本文件
npx husky add .husky/pre-commit "npx --no-install lint-staged"

# 4.添加 commit-msg
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

# 5. 使用 `git commit -m "message"` 就会看到 hook 生效了。
```

### 2. 添加配置 `package.json`

```json
{
    //   ...
    "lint-staged": {
        "*.{js,ts}": ["npm run eslint", "npm run prettier"]
    }
    //   ... 可增加git add  校验修复之后 执行git add
}
```

## 提交日志（可选）

-   [standard-version](https://github.com/conventional-changelog/standard-version) 或者 [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)

参考文章：[手把手教你用 vite + vue3 + ts + pinia + vueuse 打造企业级前端项目](https://juejin.cn/post/7079785777692934174)

# 10. 配置环境变量 env 还未完善 待补充

## 在项目根目录新建 .env.development、.env.production、.env.devtest、.env.uat

```
VITE_MODE_NAME=development
VITE_APP_APISERVER=http://xx.xx.xx/xxx/
VITE_APP_PUBIMGURL=http://xxxxxxxx/lib/
...

VITE_MODE_NAME=devtest
VITE_APP_APISERVER=http://xx.xx.xx/xxx/
VITE_APP_PUBIMGURL=http://xxxxxxxx/lib/
...

VITE_MODE_NAME=uat
VITE_APP_APISERVER=http://xx.xx.xx/xxx/
VITE_APP_PUBIMGURL=http://xxxxxxxx/lib/
...

VITE_MODE_NAME=production
VITE_APP_APISERVER=http://xx.xx.xx/xxx/
VITE_APP_PUBIMGURL=http://xxxxxxxx/lib/
...
```

## 创建代码提示 env.d.ts

```
// src/types/env.d.ts
interface ImportMetaEnv {
	VITE_MODE_NAME: string; // 环境
	VITE_APP_APISERVER: string; // api请求地址
	VITE_APP_PUBIMGURL: string; // public/lib
}
```

## 使用

```
import.meta.env.VITE_MODE_NAME
import.meta.env.VITE_APP_APISERVER
import.meta.env.VITE_APP_PUBIMGURL

vite.config.ts中使用
import { defineConfig, loadEnv } from 'vite'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
	plugins[],
	base: env.VITE_APP_APISERVER
  }
})

package.json中配置打包命令
"scripts": {
	"dev": "vite --host",
	"build": "vue-tsc --noEmit && vite build",
	"test": "vite build --mode devtest",
	"serve": "vite preview",
}

```

# 11. 可以提高开发效率的小知识

## setup name 增强

使用 setup 语法带来的第一个问题就是无法自定义 name，而我们使用 keep-alive 往往是需要 name 的，解决这个问题通常是通过写两个 script 标签来解决，一个使用 setup，一个不使用，但这样必然是不够优雅的

```
<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'indexPage'
})
</script>

<script lang="ts" setup>
	onMounted(() => {
		console.log('mounted')
	})
</script>
```

使用插件 vite-plugin-vue-setup-extend 直接在 script 标签上定义 name

### 安装 vite-plugin-vue-setup-extend

```
npm i vite-plugin-vue-setup-extend -D
```

### 配置 vite.config.ts

```
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [
    VueSetupExtend()
  ]
})
```

### 使用

```
<script lang="ts" setup name="indexPage">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('mounted===')
})
</script>
```

## API 自动导入

对于一些常用的 VueAPI，比如 ref、computed、watch 等，还是每次都需要我们在页面上手动进行 import，可以通过 unplugin-auto-import 实现自动导入。

### 安装

```
npm i unplugin-auto-import -D
```

### 配置 vite.config.ts

```
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
       // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
      dts: 'src/auto-imports.d.ts',
      imports: ['vue']
    })
  ]
})
上面我们在vite.config.ts的配置里只导入了vue，imports: ['vue']，除了vue的也可以根据文档导入其他的如vue-router、vue-use等,建议只对一些比较熟悉的API做自动导入。

在没有import的情况下使用会导致eslint提示报错，通过如下步骤解决：

AutoImport({
    dts: 'types/auto-imports.d.ts',
    imports: ['vue'],
    // 解决eslint报错问题
    eslintrc: {
      enabled: true
    }
})
这时会自动生成.eslintrc-auto-import.json文件，将其导入eslintrc.js即可

// eslintrc.js
module.exports = {
  extends: [
    './.eslintrc-auto-import.json'
  ]
}
```

## .value

```
let count = ref(1)
<!-- ref要求我们访问变量时需要加上.value -->
const addCount = () => {
  count.value += 1
}

或者
ref: count = 1
const addCount = () => {
  count += 1
}

官方后来出的一种方案，在ref前加上$ 该功能默认关闭，需要手动开启 暂不建议使用
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      refTransform: true // 开启ref转换
    })
  ]
})

let count = $ref(1)
const addCount = () => {
  count++
}
```

# 12. 页面过渡动画的问题 （index 过度页面动画还未去掉）

## vue2

```
<template>
    <transition :name="transitionClass">
      <keep-alive :include="keepAliveComponents">
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
```

vue3 这样写会报警告

```
<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

## vue3

vue-router 不再使用原来的写法，用 slot 插槽代替，修改为

```
<router-view v-slot="{ Component, route }">
	<transition :name="transitionClass" mode="default">
		<keep-alive :include="keepAliveComponents">
			<component :is="Component" :key="route.fullPath" class="router-view"></component>
		</keep-alive>
	</transition>
</router-view>

<template>
	<!-- 注意需要将页面包裹到一个div，vue3后template支持多个根节点 transition只能包含一个根元素才能有过滤动画效果 -->
    <div class="login">
        <div class="login__content">
            <h2> 这里是A页面 </h2>
            <br />
            <router-link to="/vueUse">B</router-link>
            <br />
            <van-button type="primary" @click="fanhui">返回首页</van-button>

            <van-cell-group>
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" label="描述信息" />
            </van-cell-group>
        </div>
    </div>
</template>
```

## 注意

vue3 的 transition 过渡的类名有变更（-from 标签） 需注意

[vue2 的 transition](https://v2.cn.vuejs.org/v2/guide/transitions.html)

[vue3 的 transition](https://cn.vuejs.org/guide/built-ins/transition.html#css-based-transitions)

# 13. Event Bus 替代方案

官方推荐使用 mitt 和 tiny-emitter,这里使用了 mitt。

参考文章[vue2 升级 vue3： Event Bus 替代方案](https://juejin.cn/post/7111668933135974407#heading-5)

## 安装

```
npm install mitt
```

## 使用 创建 eventBus.ts

```
<!-- src/utils/eventBus.ts -->
import mitt from 'mitt';
type Events = {
    authReady?: DragEvent;
};
const Bus = mitt<Events>();
export default Bus;
```

```
import Bus from '@/utils/eventBus';
Bus.emit('authReady'); // 触发authReady事件
其他页面
Bus.on('authReady', ()=>{});
```

# 14. vite.config.ts 常用配置

暂未完善

# 15. stylelint

参考[stylelint 配置指南](https://juejin.cn/post/7118294114734440455#heading-22)

```
npm add stylelint postcss postcss-less postcss-html stylelint-config-prettier stylelint-config-recommended-less stylelint-config-standard stylelint-config-standard-vue stylelint-less stylelint-order -D
```

-   stylelint: css 样式 lint 工具
-   postcss: 转换 css 代码工具
-   postcss-less: 识别 less 语法
-   postcss-html: 识别 html/vue 中的<style></style>标签中的样式
-   stylelint-config-standard: Stylelint 的标准可共享配置规则，详细可查看官方文档
-   stylelint-config-prettier: 关闭所有不必要或可能与 Prettier 冲突的规则
-   stylelint-config-recommended-less: less 的推荐可共享配置规则，详细可查看官方文档
-   stylelint-config-standard-vue: lint.vue 文件的样式配置
-   stylelint-less: stylelint-config-recommended-less 的依赖，less 的 stylelint 规则集合
-   stylelint-order: 指定样式书写的顺序，在.stylelintrc.js 中 order/properties-order 指定顺序

增加.stylelintrc.js 配置文件

```
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recommended-less',
    'stylelint-config-standard-vue'
  ],
  plugins: ['stylelint-order'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(less|css|vue|html)'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml'
  ],
  rules: {
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      }
    ],
    // 指定样式的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
}
```

package.json 增加命令

```
"lint:style": "stylelint \"./**/*.{css,less,vue,html}\" --fix"
```

安装 vscode 的 Stylelint 插件 在.vscode/settings.json 中添加一下规则

```
  // 开启自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true,
+   "source.fixAll.stylelint": true
  },
  // 保存的时候自动格式化
  "editor.formatOnSave": true,
  // 默认格式化工具选择prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 配置该项，新建文件时默认就是space：2
  "editor.tabSize": 2,
  // stylelint校验的文件格式
+ "stylelint.validate": ["css", "less", "vue", "html"]
```
