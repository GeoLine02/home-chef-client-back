import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/')
  async search(@Body() body: any, @Res() res: Response) {
    const result = await this.searchService.getSearchValue(body.searchText);
    console.log(result)
    res.status(200).send(result || {});
  }
}
