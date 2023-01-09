import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 id',
  })
  @Prop({ type: Types.ObjectId, required: true, ref: 'cats' })
  @IsEmail()
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '콘텐츠',
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '따봉 수',
  })
  @Prop({ default: 0, required: true })
  @IsPositive()
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    description: '작성대상 고양이 id',
  })
  @Prop({ type: Types.ObjectId, required: true, ref: 'cats' })
  @IsEmail()
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
