import { $api, $axios } from '@/apis/interceptor';

export const $test = () => $axios.get('https://xxx.xxx.xxx/xxxx', { showLoading: true });

export const $test2 = (params: any) => $api.get('xxx/xxx', { params: params });
