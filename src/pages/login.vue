<template>
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

<script setup lang="ts" name="LoginPage">
    import Bus from '@/utils/eventBus';
    import { $test } from '@/apis/modules/common.api';
    import { showDialog } from 'vant';

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
        // console.log('init', init);
        // showLoadingToast({
        //     duration: 3000, // 持续展示 toast
        //     forbidClick: true, // 禁用背景点击
        //     message: '加载中...'
        // });

        try {
            let res = await $test();
            console.log('login $test res', res);
        } catch (error) {
            console.warn(error);
        }
    };

    // 生命周期
    onMounted(() => {
        showDialog({ message: '提示' });
        console.log('login onMounted');
        Bus.on('authReady', initCheck);
    });
</script>
<style lang="less">
    .login {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100vw;
        height: 100vh;

        &__content {
            width: 690px;
            height: calc(100vh - 92px);
        }
    }
</style>
