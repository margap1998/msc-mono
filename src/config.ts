import { config } from 'dotenv'; 
import { PostgresConnectionOptions } from
  'typeorm/driver/postgres/PostgresConnectionOptions';

config();

export const appConfig = {
  port: process.env.MSC_PUT_APP_PORT || 3000,
  staticContent: process.env.MSC_PUT_APP_STATIC || 'dist/static',
  client: process.env.MSC_PUT_APP_CLIENT || 'dist/client',
  secret: process.env.MSC_PUT_APP_SECRET || 'secret',
  apiPrefix: process.env.MSC_PUT_APP_API_PREFIX || '/api'
};

export const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_NAME || 'test',
  entities: ['dist/db/model/*.js'],
  cache: (process.env.DB_CACHE_REDIS && {
    type: 'redis',
    options: {
      host:process.env. DB_REDIS_HOST,
      port: parseInt(process.env.DB_REDIS_PORT),
      
    },
    duration: 10000, //10 seconds
    ignoreErrors: true,
  }) || !!process.env.DB_CACHE_TABLE,
  logging: !!process.env.DB_LOGGING,
  synchronize: !!process.env.DB_HOST_SYNCHRONIZE,
  applicationName: 'test-app-monolith',
  dropSchema: !!process.env.DB_DROP_SCHEMA,
  schema: process.env.DB_SCHEMA
};