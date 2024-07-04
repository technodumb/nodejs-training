import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import Address from "../entity/address.entity";

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
    address: Address;
}

export default CreateEmployeeDto;
