import { BuildOptions, Model } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserModel extends Model<UserAttribute>, UserAttributes {}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
}

export { UserAttributes, UserModel, UserStatic };
