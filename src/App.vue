<template>
    <router-view v-slot="{ Component, route }">
        <transition :name="transitionClass" mode="default">
            <keep-alive :include="keepAliveComponents">
                <component :is="Component" :key="route.fullPath" class="router-view"></component>
            </keep-alive>
        </transition>
    </router-view>
</template>
<script setup lang="ts">
    import Bus from '@/utils/eventBus';
    import commonStore from '@/store/common.store';
    import { storeToRefs } from 'pinia';
    import router from './router';

    const useCommonStore = commonStore();
    const { direction, keepAliveComponents } = storeToRefs(useCommonStore);

    const transitionClass = computed(() => {
        return `slide-${direction.value}`;
    });

    // 生命周期
    onMounted(() => {
        console.log('app onMounted');
        Bus.emit('authReady'); // 触发完成事件
    });
</script>
<style lang="less">
    * {
        content: normal !important;
    }

    html,
    body {
        width: 100%;
        height: 100%;
    }

    body,
    p,
    h1,
    h2,
    h3,
    h4,
    h5 {
        padding: 0;
        margin: 0;
    }

    #app {
        position: relative;
        width: 100%;
        height: 100%;
        font-family: 'Lantinghei SC', 'Open Sans', Arial, 'Hiragino Sans GB', 'Microsoft YaHei',
            '微软雅黑, STHeiti', 'WenQuanYi Micro Hei', SimSun, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale; /* -webkit-user-select:none; */
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }

    .router-view {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        overflow-x: hidden;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        box-sizing: border-box;
    }

    .slide-out-enter-active,
    .slide-out-leave-active,
    .slide-in-enter-active,
    .slide-in-leave-active {
        position: absolute;
        width: 100vw;
        height: 100vh;
        transition: transform 0.5s ease;
        will-change: transform;
        backface-visibility: hidden;
        perspective: 1000;
    }

    .slide-out-leave-active {
        transform: translate3d(100%, 0, 0);

        /* 保持即将离开的页面在最上层 */
        z-index: 2;
    }

    .slide-in-leave-active {
        transform: translate3d(-50%, 0, 0);
    }

    .slide-out-enter-from {
        transform: translate3d(-50%, 0, 0);

        /* 防止路由切换时底部栏被抬高 */
        overflow-x: hidden;
    }

    .slide-in-enter-from {
        transform: translate3d(100%, 0, 0);
    }

    .slide-in-leave-to {
        /* 防止路由切换时底部栏被抬高 */
        overflow-x: hidden;
    }
</style>
