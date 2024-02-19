/**
 * vite无法使用require引入图片
 * @param path 图片路径
 * @returns string
 */
export function requireLocalImg(path: string) {
    return new URL(path, import.meta.url).href;
}
