import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.ORDER_DB_TYPE || 'mysql',
  host: process.env.ORDER_DB_HOST || 'localhost',
  port: parseInt(process.env.ORDER_DB_PORT, 10) || 3306,
  username: process.env.ORDER_DB_USER || 'root',
  password: process.env.ORDER_DB_PASS || '',
  database: process.env.ORDER_DB_NAME || 'order_db',
  synchronize: true,
}));