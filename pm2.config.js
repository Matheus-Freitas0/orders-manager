module.exports = {
    apps: [
        {
            name: 'orders-manager-pm2',
            script: 'dist/src/main.js',
            watch: true,
            instances: 1,
            exec_mode: 'cluster',
            autorestart: true,
            env: {
                APP_ENV: 'dev'
            },
        }
    ]
}