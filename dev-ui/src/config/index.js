const env = process.env.REACT_APP_ENV;
const listConfigs = {
    dev: {
        API_SERVER: 'http://localhost:3000'
    },
    uat: {
        API_SERVER: 'http://localhost:3000'
    },
    production: {
        API_SERVER: 'http://localhost:3000'
    }
};

export const Config = listConfigs[env];
export default env;
