module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    //less基本配置
    plugins: [
        ['import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
            },
            'vant']
    ]
}
