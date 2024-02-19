'use strict';

module.exports = {
    types: [
        { value: 'day', name: 'day:       日常提交' },
        { value: 'feature', name: 'feature:   新功能' },
        { value: 'perf', name: 'perf:      功能优化' },
        { value: 'fix', name: 'fix:       bug修复' },
        { value: 'ui', name: 'ui:        ui修改' },
        { value: 'config', name: 'config:    配置修改，策略调整' },
        { value: 'merge', name: 'merge:     合并分支' }
    ],
    scopes: [
        { name: '日常提交' },
        { name: '新功能' },
        { name: '功能优化' },
        { name: 'bug修复' },
        { name: 'ui修改' },
        { name: '配置修改' },
        { name: '策略调整' },
        { name: '合并分支' }
    ],
    messages: {
        type: '请选择提交类型:',
        scope: '选择一个scope (可选):',
        customScope: '请输入修改的范围(可选):',
        subject: '请简要描述提交 message (必填):',
        body: '请输入详细描述(必填):',
        footer: '请输入要关闭的issue(待优化去除，跳过即可):',
        confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
    },
    allowCustomScopes: true,
    skipQuestions: ['footer'], // 跳过
    subjectLimit: 200,
    typePrefix: '[',
    typeSuffix: ']'
};
