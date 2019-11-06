import { Resolver, Query } from "type-graphql";
import { getConnection } from "typeorm";
import { Sales } from "../../src/entity/Sales";

@Resolver()
export class HelloResolver {

	// private salesCollection: Sales[] = [];

	@Query(() => String)
	async hello() {
		let sales = await getConnection().manager.find(Sales);
		console.log(sales);
		return sales[0].name;
	}

	@Query(() => Sales)
	async hello2() {
		let sales = await getConnection().manager.find(Sales);
		console.log(sales);
		return sales[0];
	}

	// @Query(() => Sales)
	// async getSales() {
	// 	let sales = await getConnection().manager.find(Sales);
	// 	return sales;
	// }
}
