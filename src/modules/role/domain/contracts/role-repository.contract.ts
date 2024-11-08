import { RoleModel } from '@role/domain/models/role.model';

export interface IRoleRepositoryContract {
  isNameAvailable(name: string): Promise<boolean>;
  persist(role: RoleModel): Promise<RoleModel>;
  getOneBy(UUID: string): Promise<RoleModel>;
  destroy(UUID: string): Promise<boolean>;
  archive(UUID: string): Promise<boolean>;
}
