<template>
    <div class="vueuse">
        <h1> B </h1>
        <h3>Mouse: {{ x }} x {{ y }}</h3>
        <router-link to="/request">C</router-link>
        <button @click="requestRes()">返回</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useMouse } from '@vueuse/core';

    export default defineComponent({
        name: 'VueUse',
        setup() {
            const { x, y } = useMouse();
            const requestRes = async () => {
                // let result = await request({
                //     url: '/api/xxx',
                //     method: 'get'
                // });

                // console.log(result);
                history.go(-1);
            };
            return {
                x,
                y,
                requestRes
            };
        }
    });
</script>
<style lang="less">
    .vueuse {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
