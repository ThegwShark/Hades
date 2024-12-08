import { ListUserModel } from '@user/domain/models/user-list.model';

import { Criteria } from '@common/domain/criteria/criteria';
import { UserModel } from '@user/domain/models/user.model';

export interface IUserRepositoryContract {
  persist(user: UserModel): Promise<UserModel>;
  getOneBy(UUID: string): Promise<UserModel>;
  destroy(UUID: string): Promise<boolean>;
  archive(UUID: string): Promise<boolean>;
  matching(criteria: Criteria): Promise<ListUserModel>;
}
