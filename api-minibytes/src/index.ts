import express from 'express';
const app = express();
import { pool } from './database';
import indexRoutes from './routes/index';

pool.query("CREATE TABLE IF NOT EXISTS users (id_user SERIAL PRIMARY KEY, name_user varchar(50) NOT NULL, username varchar(50) NOT NULL, password TEXT NOT NULL, acc_type TEXT NOT NULL, constraint check_acc_type check (acc_type in ('Admin', 'Tester', 'User')))");
pool.query("CREATE TABLE IF NOT EXISTS urls (id_url SERIAL PRIMARY KEY, id_user INT NOT NULL, name_url varchar(100) NOT NULL, created_in TEXT NOT NULL, main_url TEXT NOT NULL, short_url TEXT NOT NULL, tags varchar(12) NOT NULL, qr_code varchar(300) NOT NULL, constraint check_tags check (tags in ('Blog', 'Business', 'Educational', 'E-Commerce', 'Entertainment', 'Forum', 'Other')))");
pool.query("CREATE TABLE IF NOT EXISTS reports (id_report SERIAL PRIMARY KEY, url TEXT NOT NULL, created_in TEXT NOT NULL, reason varchar(50) NOT NULL, description varchar(50) NOT NULL, report_state TEXT NOT NULL, constraint check_report_state check (report_state in ('A', 'U', 'F')))");


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(indexRoutes)

app.listen(3000)
console.log("Server on port", 3000);