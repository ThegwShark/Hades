import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserQuery } from '@user/application/queries/use-cases/get-user/get-user.query';
import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
import { GetUserDomainService } from '@user/domain/domain-services/get-user.domain-service';
import { UserModel } from '@user/domain/models/user/user.model';

@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserUseCase implements IQueryHandler<GetUserQuery> {
  constructor(private readonly getUserDomainService: GetUserDomainService) {}

  async execute(query: GetUserQuery): Promise<UserAggregate> {
    const { uuid } = query;

    const userAggregate = await this.getUserDomainService.go(uuid);

    return userAggregate;
  }
}
