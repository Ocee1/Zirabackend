import express, { Application, json, urlencoded } from 'express';
import { config } from 'dotenv'
config();
import {PORT, SECRET_KEY } from './constants';

import { IRoutes } from './interfaces/routes';
import connectDB from './config/db';



class App {
    public app: Application;
    public env: string;
    public port: string | undefined;
    constructor(routes: IRoutes[]) {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = PORT;

        this.initializeMiddlewares();
        this.initializeErrorHandling();
        this.initializeRoutes(routes);
        this.initializeDB();
        
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
            this.app.use('/zira/api/v1', route.router);
        });
    }

    private initializeDB(): void {
        // DB connection method
        connectDB().then(result => {
            
            console.log('Successfully connected to DB');
        })
        .catch(err => {
            console.log(err)
        });
    }

    private initializeErrorHandling() {
        // Error handling
    }
}


export default App;