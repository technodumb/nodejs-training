import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";
import "reflect-metadata";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";

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

class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    name: String;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: String;

    @IsOptional()
    @IsNumber()
    age: Number;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address: UpdateAddressDto;
}

export { CreateEmployeeDto, UpdateEmployeeDto };
