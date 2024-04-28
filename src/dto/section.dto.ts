import { IsNotEmpty, Length } from "class-validator";

export class Section {
  sectionId: number;
  reportId: number;
  @IsNotEmpty()
  @Length(1, 1500)
  question: string;
  @IsNotEmpty()
  @Length(1, 5000)
  answer: string;
  @IsNotEmpty()
  position: number;
}
