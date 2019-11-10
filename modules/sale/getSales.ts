import { Resolver, Query, Mutation, Arg } from "type-graphql";
import db from "../../DbConnection";
import { Sales } from "../../src/entity/Sales";
import { TotalSales } from "../../src/entity/TotalSales";
import { ExportSales } from "../../src/entity/ExportSales";
import * as fs from 'fs';
import xlsx from 'node-xlsx';

@Resolver()
export class SalesResolver {

	private salesCollection = async () => {
		const sales = await db.query('select * from sales');
		return sales.rows;
	}

	@Mutation(() => ExportSales)
	async exportSales() {

		const sales = await this.salesCollection();
		sales.map((x) => {
			return x.amount = parseFloat(x.amount);
		})
		const aoaSales = sales.map(function (obj) {
			return Object.keys(obj).map(function (key) {
				return obj[key];
			});
		});

		let data: any[] =
			[
				["ID", "Name", "Amount"]
			]

		data = data.concat(aoaSales);

		const value = data.length;
		const dataFooter = [['', 'Total', { f: `=SUM(C2:C${value})` }]]

		data = data.concat(dataFooter);

		const buffer = xlsx.build([{ name: "sales.xlsx", data: data }])

		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads');
		}
		if (!fs.existsSync('uploads/sales')) {
			fs.mkdirSync('uploads/sales');
		}

		try {
			fs.writeFileSync('uploads/sales/sales.xlsx', buffer)
		}
		catch (error) {
			return "Error: can't create file maybe he is allready open"
		}
		return { "filePath": 'uploads/sales/sales.xlsx' };
	}

	@Query(() => [Sales])
	async sales(@Arg("page", { nullable: true }) page?: number) {
		const sales = await this.salesCollection();
		if (page)
			return sales;
		else
			return sales;
	}

	@Query(() => TotalSales)
	async getSalesTotal() {
		const sales = await this.salesCollection();
		let amount: number = 0;
		let count: number = 0;
		sales.map(x => {
			amount = parseFloat(amount.toFixed(2)) + parseFloat(x.amount);
			count = count + 1;
		})
		amount = parseFloat(amount.toFixed(2));
		return { amount: amount, count: count };
	}


}
