import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
} from "class-validator";

class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    line1: String;

    @IsNotEmpty()
    @IsNumberString()
    pincode: String;
}

class UpdateAddressDto {
    @IsOptional()
    @IsString()
    line1: String;

    @IsOptional()
    @IsNumberString()
    pincode: String;
}

export { CreateAddressDto, UpdateAddressDto };
