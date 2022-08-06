import 'reflect-metadata';
import express from 'express';
import { appConfig } from './config';
import { app } from './app';
import { AppDataSource } from './db/dataSource';

function main() {
  const mainApp = express();
  mainApp.use(express.json());
  mainApp.use('/static', express.static(appConfig.staticContent));
  mainApp.use('/', express.static(appConfig.client));
  mainApp.use(app(appConfig.apiPrefix));
  AppDataSource.initialize().then(() => {
    console.log(`Running on ${appConfig.port}`);
    mainApp.listen(appConfig.port);
  });
}

main();
