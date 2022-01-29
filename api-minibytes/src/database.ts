import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '754321',
    database: 'minibytes',
    port: 5432
})