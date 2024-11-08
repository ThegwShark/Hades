import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ArchiveRoleCommand } from '@role/application/commands/use-cases/archive-role/archive-role.command';
import { IRoleRepositoryContract } from '@role/domain/contracts/role-repository.contract';
import { RoleModel } from '@role/domain/models/role.model';
import { ArchiveRoleDomainService } from '@role/domain/services/archive-role.domain-service';

@Injectable()
@CommandHandler(ArchiveRoleCommand)
export class ArchiveRoleUseCase implements ICommandHandler<ArchiveRoleCommand> {
  constructor(
    private readonly archiveRoleDomainService: ArchiveRoleDomainService,
    private readonly publisher: EventPublisher,
    private readonly repository: IRoleRepositoryContract,
  ) {}

  async execute(command: ArchiveRoleCommand): Promise<RoleModel> {
    const { uuid } = command;

    const roleModel = await this.archiveRoleDomainService.go(uuid);
    const role = this.publisher.mergeObjectContext(roleModel);

    await this.repository.archive(uuid);

    role.commit();

    return role;
  }
}