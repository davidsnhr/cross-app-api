import { Sequelize } from 'sequelize';

const db = new Sequelize('cross_magik', 'davidsanchez', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  // logging: false
});

export default db;
