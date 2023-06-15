import express, { Application, json, urlencoded } from 'express';
import {config} from 'dotenv';
import { IRoutes } from './interfaces/routes';

config();

class App {
    public app: Application;
    public env: string;
    public port: string | number;
    constructor(routes: IRoutes[]) {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = process.env.port || 4000;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeDB();
        this.initializeErrorHandling();
    }

    public listen(): void {
        const server = this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        })
    }

    public getServer() {
        return this.app;
    }

    
    public initializeMiddlewares(): void {
        //all middlewares will be initialized here
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));

    }

    private initializeRoutes(routes: IRoutes[]): void {
        routes.forEach(route => {
            this.app.use('zira/api/v1', route.router);
        });
    }

    private initializeDB(): void {
        // DB connection method
    }

    private initializeErrorHandling() {
        // Error handling
    }
}


export default App;