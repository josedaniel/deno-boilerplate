import { DataTypes, Model, Sequelize } from "sequelize";
import { db } from "../config/database.ts";

// 🐾 Pet model definition
export class Pet extends Model {
  declare id: number;
  declare type: string;
  declare name: string;
  declare species: string;
}

// 🔄 Initialize the Pet model
Pet.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['mamifero', 'reptil']]
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Pet',
  tableName: 'pets',
  timestamps: true
});

// 📊 Sync the model with the database
export const syncPetModel = async () => {
  await Pet.sync();
  console.log("🐾 Pet model synchronized");
};