import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ArchiveUserCommand } from '@user/application/commands/use-cases/archive-user/archive-user.command';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { ArchiveUserDomainService } from '@user/domain/domain-service/archive-user.domain-service';
import { UserModel } from '@user/domain/models/user.model';

@Injectable()
@CommandHandler(ArchiveUserCommand)
export class ArchiveUserUseCase implements ICommandHandler<ArchiveUserCommand> {
  constructor(
    private readonly archiveUserDomainService: ArchiveUserDomainService,
    private readonly publisher: EventPublisher,
    private readonly repository: IUserRepositoryContract,
  ) {}

  async execute(command: ArchiveUserCommand): Promise<UserModel> {
    const { uuid } = command;

    const userModel = await this.archiveUserDomainService.go(uuid);
    const user = this.publisher.mergeObjectContext(userModel);

    await this.repository.archive(uuid);

    user.commit();

    return user;
  }
}
