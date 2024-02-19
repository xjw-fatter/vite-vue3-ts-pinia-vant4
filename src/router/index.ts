import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import commonStore from '@/store/common.store';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'LoginPage',
        meta: {
            title: '登录'
        },
        component: () => import('@/pages/login.vue')
    },
    {
        path: '/',
        name: 'IndexPage',
        meta: {
            title: '首页'
        },
        component: () => import('@/pages/index.vue')
    },
    {
        path: '/vueUse',
        name: 'VueUse',
        meta: {
            title: 'vueUse demo'
        },
        component: () => import('@/pages/vueUse.vue')
    },
    {
        path: '/request',
        name: 'RequestPage',
        meta: {
            title: 'request demo'
        },
        component: () => import('@/pages/request.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 页面过渡动画
const storage = window.sessionStorage;
storage.clear();

let historyCount = storage.getItem('count') || 0; // 历史页面数量
storage.setItem('/', '0');
router.beforeEach((to, from, next) => {
    const toIndex = storage.getItem(to.fullPath);
    const fromIndex = storage.getItem(from.fullPath);
    const historyCountAll = Number(storage.getItem('countAll')) || 0;
    const useCommonStore = commonStore();

    if (to.meta && to.meta.keepAlive) {
        useCommonStore.keepAlive(to.name);
    }
    // console.log('to', to);
    // console.log('from', from);
    // console.log('to.fullPath', to.fullPath);
    // console.log('from.fullPath', from.fullPath);
    // console.log('toIndex', toIndex, typeof toIndex);
    // console.log('fromIndex', fromIndex, typeof fromIndex);
    // console.log('historyCountAll', historyCountAll);
    // console.log('useCommonStore direction1', useCommonStore.direction);
    // console.log('historyCount', historyCount);

    if (toIndex) {
        // if (fromIndex === null) {
        //     console.log('入口页不过渡');
        //     useCommonStore.updateDirection('');
        // } else
        if (Number(toIndex) < Number(fromIndex)) {
            // 考虑replace跳转的情况
            const backCount = Number(fromIndex) - Number(toIndex);
            console.log('backCount', backCount);
            useCommonStore.updateDirection('out');
            storage.setItem('countAll', String(historyCountAll - backCount));
        } else {
            useCommonStore.updateDirection('in');
            storage.setItem('countAll', String(historyCountAll + 1));
        }
    } else {
        historyCount = Number(historyCount) + 1;
        storage.setItem('count', String(historyCount));
        to.fullPath !== '/' && storage.setItem(to.fullPath, String(historyCount));

        // if (!from.name) {
        //     console.log('入口页不过渡');
        //     useCommonStore.updateDirection('');
        //     storage.setItem('countAll', String(historyCountAll + 1));
        // } else {
        useCommonStore.updateDirection('in');
        storage.setItem('countAll', String(historyCountAll + 1));
        // }
    }
    useCommonStore.clearToken(); // 取消请求
    next();
});

router.afterEach((to) => {
    setTimeout(() => {
        to.meta && to.meta.title && (document.title = to.meta.title as string);
        // ios native title 设置不生效的 hack
        if (/iP(ad|hone|od)/.test(window.navigator.userAgent)) {
            const iframe = document.createElement('iframe');
            iframe.style.visibility = 'hidden';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.onload = function () {
                setTimeout(function () {
                    document.body.removeChild(iframe);
                }, 0);
            };
            document.body.appendChild(iframe);
        }
    }, 0);
});

export default router;
