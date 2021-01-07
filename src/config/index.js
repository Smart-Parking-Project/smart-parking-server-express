import { config } from 'dotenv';

const { parsed } = config();

export const { DB_CONNECT, PORT, MODE, IN_PROD = MODE !== 'prod' } = parsed;
