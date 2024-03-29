import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Sales {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    amount: number;

}
