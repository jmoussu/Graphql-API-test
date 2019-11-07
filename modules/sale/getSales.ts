import { Resolver, Query, Mutation } from "type-graphql";
import db from "../../DbConnection";
import { Sales } from "../../src/entity/Sales";
import { TotalSales } from "../../src/entity/TotalSales";
import * as fs from 'fs';
import xlsx from 'node-xlsx';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';


@Resolver()
export class HelloResolver {

	private salesCollection = async () => {
		const sales = await db.query('select * from sales');
		return sales.rows;
	}

	// private s2ab = (s: any) => {
	// 	var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
	// 	var view = new Uint8Array(buf);  //create uint8array as viewer
	// 	for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
	// 	return buf;
	// }

	@Mutation(() => String)
	async exportSales() {


		const data =
			[
				["col_heading1", "col_heading2", "col_heading3"],
				["row1_val1", "row1_val2", "row1_val3"],
				["row2_val1", "row2_val2", "row2_val3"],
				["row3_val1", "row3_val2", "row3_val3"]
			]
		const buffer = xlsx.build([{ name: "sales.xlsx", data: data }])
		fs.writeFile('demo.xlsx', buffer, (err) => {
			if (err) throw err
		})
		return "hello world";
	}

	@Query(() => [Sales])
	async sales() {
		const sales = await this.salesCollection();

		console.log(typeof (sales));
		console.log(sales);

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
		console.log(amount);
		console.log(count);

		return { amount: amount, count: count };
	}


}
