import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
} from "class-validator";

class   CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsNotEmpty()
    @IsNumberString()
    pincode: string;
}

class UpdateAddressDto {
    @IsOptional()
    @IsString()
    line1: string;

    @IsOptional()
    @IsNumberString()
    pincode: string;
}

export { CreateAddressDto, UpdateAddressDto };
