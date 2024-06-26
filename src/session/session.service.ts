import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  addMeal(meal: any, session: Record<string, any>) {
    if (!session.order) {
      session.order = [];
    }

    const isMealAlreadyExists = session.order.some(
      (el: any) => el.id === meal.id,
    );

    if (isMealAlreadyExists) {
      throw new BadRequestException('meal already exists in the list');
    }

    if (session.order.length === 50) {
      throw new BadRequestException('Max length of the order are achieved');
    }

    session.order.push(meal);
  }
}
