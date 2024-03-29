import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength, IsNumber } from 'class-validator';
import { IStock } from 'modules/database/interfaces/stock';

export class SaveValidator implements IStock {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public name: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: true, type: 'float', minimum: 0 })
  public quantity: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: true, type: 'float', minimum: 0 })
  public price: number;
}
