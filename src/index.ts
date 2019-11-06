import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { HelloResolver } from "../modules/sale/getSales"
// import { Sales } from "./entity/Sales";


const main = async () => {

	/*let connection = */ await createConnection();

	const schema = await buildSchema({
		resolvers: [HelloResolver],
	})

	const apolloServer = new ApolloServer({schema});

	const app = Express();
	
	apolloServer.applyMiddleware({app});

	app.listen(4000, async () => {
		console.log('Server started on http://localhost:4000/graphql');

		// let sale1 = new Sales();
		// sale1.name = "0001";
		// sale1.amount = 12.30;
		// let sale2 = new Sales();
		// sale2.name = "0002";
		// sale2.amount = 7.51;

		// await connection.manager.save(sale1);
		// await connection.manager.save(sale2);
		// console.log("Sales has been saved");
	});
}

main();
