import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id?: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes> {
  public id!: number;
  public userName!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    User.init(
      {
        userName: {
          type: new DataTypes.STRING(),
          allowNull: false,
        },
        firstName: {
          type: new DataTypes.STRING(),
          allowNull: false,
        },
        lastName: {
          type: new DataTypes.STRING(),
          allowNull: false,
        },
        email: {
          type: new DataTypes.STRING(),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: new DataTypes.STRING(),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
      }
    );
  }
}
