<template>
    <div class="index">
        <img alt="Vue logo" src="./../assets/logo.png" />
        <br />
        <router-link to="/login">A</router-link>
        <br /><br />
        <router-link to="/vueUse">B</router-link>
        <br /><br />
        <router-link to="/request">C</router-link>
    </div>
</template>

<script setup lang="ts" name="IndexPage">
    onMounted(() => {
        console.log('index onMounted');
    });
</script>

<style lang="less">
    .index {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
