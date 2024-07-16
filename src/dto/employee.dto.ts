import {
    IsDate,
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";
import "reflect-metadata";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
import { CreateDepartmentDto } from "./department.dto";
import { Role } from "../utils/role.enum";

class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @IsNotEmpty()
    @IsString()
    department: string;

    @IsNotEmpty()
    @IsDateString()
    joiningDate: Date;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsNumber()
    experience: number;
}

class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address: UpdateAddressDto;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsString()
    department: string;

    @IsOptional()
    @IsDateString()
    joiningDate: Date;

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsNumber()
    experience: number;
}

class ResponseEmployeeDto {
    @IsNotEmpty()
    @IsUUID()
    emp_id: string;

    @IsNotEmpty()
    @IsString()
    emp_name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    emp_email: string;

    @IsNotEmpty()
    @IsNumber()
    emp_age: number;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    emp_addr: CreateAddressDto;

    @IsNotEmpty()
    @IsEnum(Role)
    emp_role: Role;

    @IsNotEmpty()
    @IsString()
    emp_dept: string;

    @IsNotEmpty()
    @IsDateString()
    emp_join: Date;

    @IsNotEmpty()
    @IsString()
    emp_status: string;

    @IsNotEmpty()
    @IsNumber()
    emp_exp: number;
}

export { CreateEmployeeDto, UpdateEmployeeDto, ResponseEmployeeDto };
