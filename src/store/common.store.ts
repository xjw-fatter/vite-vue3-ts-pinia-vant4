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
        // 传入请求的token
        pushToken(payload: any) {
            (this.cancelTokenArr as any[]).push(payload);
        },
        clearToken() {
            this.cancelTokenArr.forEach((item: any) => {
                item('路由跳转取消请求');
            });
            this.cancelTokenArr = [];
        }
    }
});
