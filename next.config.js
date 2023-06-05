const fs = require('fs');

module.exports = {
    serverRuntimeConfig: {
        secret: '!nGrU770r7@!8!',
        email_user: process.env.EMAIL_USER,
        email_password: process.env.EMAIL_PASSWORD,
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'https://1f7f-119-8-0-46.ngrok-free.app/api' // development api
            : 'https://1f7f-119-8-0-46.ngrok-free.app/api' // production api
    },
    webpack: (config, { isServer }) => { 
        return config;
    }
}
