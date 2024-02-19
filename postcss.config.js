const autoprefixer = require('autoprefixer');
const px2viewport = require('postcss-px-to-viewport-8-plugin');

const basePx2viewport = {
    unitToConvert: 'px', // 需要转换的单位，默认为 px
    // viewportWidth: 750, // 设计稿的视口宽度
    // viewportHeight: 1334, //
    unitPrecision: 3, // 单位转换后保留的精度（很多时候无法整除）
    propList: ['*'], // 能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换
    viewportUnit: 'vw', // 指定需要转换成的视口单位，建议使用 vw
    fontViewportUnit: 'vw', // 字体使用的视口单位
    // 指定不转换为视口单位的类，可以自定义，可以无限添加，建议定义一至两个通用的类名 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
    selectorBlackList: ['.ignore', 'keep-px'], // 类名中含有'keep-px'以及'ignore'类都不会被转换
    minPixelValue: 1, // 设置最小的转换数值，这里小于或等于 1px 不转换为视口单位
    mediaQuery: false // 媒体查询里的单位是否需要转换单位
};

module.exports = {
    plugins: [
        autoprefixer(),
        // vant
        px2viewport({
            ...basePx2viewport,
            viewportWidth: 375,
            viewportHeight: 667,
            exclude: [/^(?!.*node_modules\/vant)/]
            // include: [/node_modules\/vant/]
        }),
        // 非vant
        px2viewport({
            ...basePx2viewport,
            viewportWidth: 750,
            viewportHeight: 1334,
            exclude: [/node_modules\/vant/] // 忽略
        })
    ]
};
