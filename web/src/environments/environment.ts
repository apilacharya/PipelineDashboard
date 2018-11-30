import { Config } from './config.model';

export const environment: Config = {
    production: false,
    web: 'http://localhost:4200',
    api: 'http://localhost:4200',
    version: 'x.x.x',

    firebase: {
        apiKey: 'AIzaSyC6MQqAi7rT_DGPwltaIZJUdlvy-vh73YY',
        authDomain: 'pipelinedashboard-test.firebaseapp.com',
        databaseURL: 'https://pipelinedashboard-test.firebaseio.com',
        projectId: 'pipelinedashboard-test',
        storageBucket: 'pipelinedashboard-test.appspot.com',
        messagingSenderId: '352932205551',
    }
};
