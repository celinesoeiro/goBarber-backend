import User from "../infra/typeorm/entities/Users";
import UserToken from "../infra/typeorm/entities/UserToken"

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
