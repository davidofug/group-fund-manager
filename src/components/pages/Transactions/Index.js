import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AuthWrapper from "../../wrappers/Auth";
import { supabase } from "../../../helpers/supabaseClient";
import NewTransaction from "./New";
const Index = () => {
	const [error, setError] = React.useState({});
	const [transactions, setTransactions] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const getTransactions = async () => {
		try {
			const { data: myTransactions, error } = await supabase
				.from("transactions")
				.select();
			if (error) {
				setError({
					source: "supabase",
					message: error.message,
				});
				setLoading(false);
				return false;
			}
			setLoading(false);
			setTransactions(myTransactions);
		} catch (error) {
			console.log(error);
			setLoading(false);
			return false;
		}
		return false;
	};

	React.useEffect(() => {
		getTransactions();
	}, []);
	return (
		<AuthWrapper>
			<Helmet>
				<title>GFM - Transactions</title>
			</Helmet>
			<main className="grid gap-2 grid-cols-12">
				<aside className="col-span-3">
					<NewTransaction
						setTransactions={setTransactions}
						transactions={transactions}
					/>
				</aside>
				<article className="col-span-9 bg-white border border-gray-300 rounded-md p-4">
					<h1 className="text-xl font-bold">Transactions</h1>
					{loading ? (
						<div className="min-h-full w-full flex flex-col justify-center items-center">
							Loading
							<br />
							Please wait
						</div>
					) : (
						<>
							{transactions.length > 0 ? (
								<table className="border-collapse border border-slate-300 w-full mt-3">
									<thead>
										<tr>
											<th className="border border-slate-300 p-2"></th>
											<th className="border border-slate-300  p-2"></th>
											<th className="border border-slate-300 p-2">
												Name
											</th>
											<th className="border border-slate-300 p-2">
												Members
											</th>
											<th className="border border-slate-300 p-2 max-w-min">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{transactions?.map((transaction) => (
											<tr key={transaction.id}>
												<td className="border border-slate-300 w-6 text-center">
													<input
														type="checkbox"
														name="group"
														id="group"
														value={transaction.id}
													/>
												</td>
												<td className="border border-slate-300 p-2 w-20"></td>
												<td className="border border-slate-300 p-2"></td>
												<td className="border border-slate-300 p-2"></td>
												<td className="border border-slate-300 p-2 max-w-min">
													Edit | Delete
												</td>
											</tr>
										))}
									</tbody>
									<tfoot>
										<tr>
											<th className="border border-slate-300 p-2"></th>
											<th className="border border-slate-300 p-2"></th>
											<th className="border border-slate-300 p-2">
												Name
											</th>
											<th className="border border-slate-300 p-2">
												Members
											</th>
											<th className="border border-slate-300 p-2">
												Actions
											</th>
										</tr>
									</tfoot>
								</table>
							) : (
								<h1>Transactions Not Found</h1>
							)}
						</>
					)}
				</article>
			</main>
		</AuthWrapper>
	);
};

export default Index;
