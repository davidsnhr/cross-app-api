import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/users';
import db from '../db/connection';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : String(error);
      throw new Error(errorMessage);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    // read body
    this.app.use(express.json());
    // public carpet
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ' + this.port);
    });
  }
}

export default Server;
