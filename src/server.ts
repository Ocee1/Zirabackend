import App from './app';
import UserRouter from './routes/user';


const app = new App([
    //add all routing here
    new UserRouter(),
]);

app.listen();