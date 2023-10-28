import { DataTypes, Model, Sequelize } from "sequelize";
import { UserAttributes, UserResponse } from "../interfaces/user.interfaces";

export class User extends Model<UserAttributes> {
  public id!: number;
  public userName!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  toResponse() {
    const { password, ...response } = this.get() as UserResponse & { password: string };;
    return response;
  }

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
