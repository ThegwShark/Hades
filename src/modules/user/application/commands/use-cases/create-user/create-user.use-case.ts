import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '@user/application/commands/use-cases/create-user/create-user.command';
import { USER_REPOSITORY } from '@user/domain/constants/injection-tokens';
import { IUserRepositoryContract } from '@user/domain/contracts/user-repository.contract';
import { UserModel } from '@user/domain/models/user.model';
import { CreateUserDomainService } from '@user/domain/domain-service/create-user.domain-service';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly createUserDomainService: CreateUserDomainService,
    private readonly publisher: EventPublisher,
    @Inject(USER_REPOSITORY)
    private readonly repository: IUserRepositoryContract,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserModel> {
    const { account, profile } = command;

    const userModel = await this.createUserDomainService.go(account, profile);
    const user = this.publisher.mergeObjectContext(userModel);

    await this.repository.persist(userModel);

    user.commit();

    return user;
  }
}
