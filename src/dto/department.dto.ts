import { IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateDepartmentDto {
	@IsNotEmpty()
	@IsString()
	name: string;
}

class UpdateDepartmentDto {
	@IsOptional()
	@IsString()
	name: string;
}

export { CreateDepartmentDto, UpdateDepartmentDto };
