import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Qeydiyyat' })
  @ApiResponse({ status: 201, description: 'İstifadəçi yaradıldı' })
  @ApiResponse({ status: 409, description: 'Email artıq mövcuddur' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Giriş' })
  @ApiResponse({ status: 200, description: 'JWT token qaytarılır' })
  @ApiResponse({ status: 401, description: 'Yanlış məlumatlar' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}