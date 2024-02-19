<template>
    <div class="request">
        <h2> 这里是C请求页面 </h2>
        <br />
        <router-link to="/">点击跳转至首页</router-link>
        <button @click="fanhui()">返回</button>
    </div>
</template>
<script setup lang="ts" name="RequestPage">
    import Bus from '@/utils/eventBus';
    const fanhui = () => {
        history.go(-1);
    };
    const init = ref<boolean>(false);
    const initCheck = async () => {
        if (init.value) {
            // 初始化过
            return;
        }
        init.value = true;
    };
    // 生命周期
    onMounted(() => {
        console.log('RequestPage onMounted');
        Bus.on('authReady', initCheck);
    });
</script>
<style lang="less">
    .request {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
