import { defineStore } from 'pinia';

export default defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            name: '张三'
        };
    },
    actions: {
        updateName(name: string) {
            this.name = name;
        }
    }
});
