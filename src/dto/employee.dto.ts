import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./address.dto";
import "reflect-metadata";

class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: String;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: String;

    @IsNotEmpty()
    @IsNumber()
    age: Number;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;
}

export default CreateEmployeeDto;
