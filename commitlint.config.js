module.exports = {
    extends: ['@commitlint/config-conventional', 'cz'],
    // 第一位为level，可选0,1,2，0为disable，1为warning，2为error，第二位为应用与否，可选always|never，第三位该rule的值。
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'day', // 日常提交
                'feature', // 新功能（feature）
                'perf', // 功能优化（performance）
                'fix', // bug修复
                'ui', // ui修改
                'config', // 配置修改，策略调整
                'merge' // 合并分支
            ]
        ],
        // <type> 格式 小写
        'type-case': [2, 'always', 'lower-case'],
        // <type> 不能为空
        'type-empty': [2, 'always'],
        // <subject> 主要 message 不能为空
        'subject-empty': [2, 'always'],
        // <subject> 以什么为结束标志，禁用
        'subject-full-stop': [0, 'never'],
        // <subject> 格式，禁用
        'subject-case': [0, 'never'],
        'body-leading-blank': [0],
        'footer-leading-blank': [0]
    }
};
