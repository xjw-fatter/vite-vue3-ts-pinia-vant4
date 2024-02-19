module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recommended-less',
        'stylelint-config-standard-vue',
        'stylelint-config-prettier'
    ],
    plugins: ['stylelint-order'],
    // 不同格式的文件指定自定义语法
    overrides: [
        {
            files: ['**/*.(less|css|vue|html)'],
            customSyntax: 'postcss-less'
        },
        {
            files: ['**/*.(html|vue)'],
            customSyntax: 'postcss-html'
        }
    ],
    ignoreFiles: [
        '**/*.js',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.ts',
        '**/*.json',
        '**/*.md',
        '**/*.yaml'
    ],
    rules: {
        'font-family-no-missing-generic-family-keyword': null,
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }], // 自定义单位
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'function',
                    'if',
                    'return',
                    'include',
                    'extend',
                    'mixin',
                    'else',
                    'while',
                    'for',
                    'each'
                ]
            }
        ], // @mixin 这种写法
        'selector-class-pattern': '', // class命名规范，正则校验，空 - 不校验
        'color-function-notation': 'legacy', // 格式化不去掉逗号 例如 background: rgba(22 ,115 ,219 ,20%) 会格式化成  background: rgba(22 115 219 20%) ，到导致打包报错
        'alpha-value-notation': 'number', // 屏蔽background-color: rgba(0, 0, 0, 0.5);中0.5引起的警告,同时防止将rgba转成hex 16进制颜色格式，比如会把 box-shadow: 0 -4px 16px 0 rgba(60, 128, 209, 10%); 转成 box-shadow: 0 -4px 16px 0 #3c80d1;
        'selector-type-no-unknown': null, // 允许自定义class选择器
        'selector-pseudo-element-no-unknown': null, // 允许 ::ng-deep  这样的样式穿透写法
        'value-no-vendor-prefix': [true, { ignoreValues: ['box'] }], // 防止自动去除值前面的前缀，display：-webkit-box; => display：box;
        'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep']
            }
        ],
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['deep']
            }
        ],
        // 指定样式的排序
        'order/properties-order': [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'display',
            'justify-content',
            'align-items',
            'float',
            'clear',
            'overflow',
            'overflow-x',
            'overflow-y',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'font-size',
            'font-family',
            'text-align',
            'text-justify',
            'text-indent',
            'text-overflow',
            'text-decoration',
            'white-space',
            'color',
            'background',
            'background-position',
            'background-repeat',
            'background-size',
            'background-color',
            'background-clip',
            'border',
            'border-style',
            'border-width',
            'border-color',
            'border-top-style',
            'border-top-width',
            'border-top-color',
            'border-right-style',
            'border-right-width',
            'border-right-color',
            'border-bottom-style',
            'border-bottom-width',
            'border-bottom-color',
            'border-left-style',
            'border-left-width',
            'border-left-color',
            'border-radius',
            'opacity',
            'filter',
            'list-style',
            'outline',
            'visibility',
            'box-shadow',
            'text-shadow',
            'resize',
            'transition'
        ]
    }
};
