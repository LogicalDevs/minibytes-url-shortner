import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '754321',
    port: 5432,
    database: 'minibytes'
})

