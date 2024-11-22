import { IsString, IsNotEmpty, Length, IsEmail, IsOptional } from 'class-validator';

import {
  MAX_ACCOUNT_USER_NAME_LENGTH,
  MIN_ACCOUNT_USER_NAME_LENGTH,
  MAX_ACCOUNT_PASSWORD_LENGTH,
  MIN_ACCOUNT_PASSWORD_LENGTH,
} from '@user/domain/constants/general-rules';

export class AccountDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(MIN_ACCOUNT_USER_NAME_LENGTH, MAX_ACCOUNT_USER_NAME_LENGTH)
  public readonly username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(MIN_ACCOUNT_PASSWORD_LENGTH, MAX_ACCOUNT_PASSWORD_LENGTH)
  public readonly password?: string;
}