import { PartialType } from '@nestjs/mapped-types';
import { NewAddressDTO } from './new-address.dto';

export class UpdateAddressDTO extends PartialType(NewAddressDTO) {}
