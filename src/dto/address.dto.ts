import { IsNotEmpty, IsString } from "class-validator";

class CreateAddressData {
    @IsNotEmpty()
    @IsString()
    line1: String;

    @IsNotEmpty()
    @IsString()
    pincode: String;
}

export default CreateAddressData;
