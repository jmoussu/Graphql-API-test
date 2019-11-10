import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";

import { SalesResolver } from "../modules/sale/getSales"

const main = async () => {


	const schema = await buildSchema({
		resolvers: [SalesResolver],
	});
	const apolloServer = new ApolloServer({ schema });

	const app = Express();

	apolloServer.applyMiddleware({ app });

	app.listen(4000, async () => {
		console.log('Server started on http://localhost:4000/graphql');
	});
}

main();
