import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class TotalSales {
    @Field()
    amount: number;

	@Field()
    count: number;

}
