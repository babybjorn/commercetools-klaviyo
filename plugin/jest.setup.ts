import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });
process.env.NODE_CONFIG_ENV = 'test';
