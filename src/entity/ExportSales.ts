import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ExportSales {
    @Field()
    filePath: string;

}
