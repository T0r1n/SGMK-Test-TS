import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response): void {
    const filePath = path.join(__dirname, '..', 'Front', 'index.html');
    res.sendFile(filePath);
  }

  @Get("/new")
  findAll(): string {
    return 'This is a new route!';
  }
}
