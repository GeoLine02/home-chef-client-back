import { createParamDecorator } from '@nestjs/common';

export const TransactionParam: () => ParameterDecorator = () => {
  return createParamDecorator((_data, req) => {
    console.log(req);
    return req.transaction;
  });
};
