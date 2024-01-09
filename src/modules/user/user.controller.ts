import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { BaseResponseDto } from '../../common/dto/base-response.dto';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() request: Request) {
    return new BaseResponseDto(
      200,
      'Logged In User Retrieved Successfully',
      request.user,
    );
  }
}
