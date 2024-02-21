import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { IsUniqueInterface } from '../types';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    // catch options from decorator
    const { tableName, column }: IsUniqueInterface = args!.constraints[0];

    // database query check data is exists
    const dataExist = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();

    return !dataExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    // return custom field message
    const field: string = validationArguments!.property;
    return `${field} already exists`;
  }
}
