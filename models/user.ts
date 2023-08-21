import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'users',
  }
);

export default User;
