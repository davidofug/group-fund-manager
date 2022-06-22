import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../../../helpers/supabaseClient";

const New = ({ setTransactions, transactions }) => {
	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState({});
	const initialValues = {
		category: "",
		group: "",
		cause: "",
		member: "",
		amount: "",
		charges: "",
		notes: "",
		date: "",
		loan_applicatin: "",
	};

	const transactionSchema = Yup.object().shape({
		category: Yup.string().required("Choose category"),
		group: Yup.string().required("Choose group"),
		cause: Yup.string().required("Choose cause"),
		member: Yup.string().required("Choose member"),
		amount: Yup.string().required("Amount required!"),
		charges: Yup.string().required("Amount required!"),
		notes: Yup.string().required("Notes required!"),
		date: Yup.string().required("Date required!"),
		loan_applicatin: Yup.string().required("Loan application required!"),
	});

	const createTransaction = async (values, resetForm) => {
		setLoading(true);
		setErrorMsg({});
		setSuccess(false);
		const user = supabase.auth.user();
		const { data: transaction, error } = supabase
			.from("transactions")
			.insert([
				{
					name: values.name,
					added_by: user.id,
					purpose: values.purpose,
				},
			])
			.single();

		if (transaction) {
			setTransactions([transaction, ...transactions]);
			setLoading(false);
			setSuccess(true);
			resetForm();
		} else {
			setLoading(false);
			setErrorMsg({ msg: error.message });
			setSuccess(false);
		}
		setTimeout(() => {
			setSuccess(false);
		}, 6000);
	};

	return (
		<section className="bg-white p-5 md:border border-gray-300 md:rounded-md w-full items-center">
			<h1 className="font-bold text-xl text-center mb-2">
				Add a Transaction
			</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={transactionSchema}
				onSubmit={createTransaction}>
				{({ errors, touched }) => (
					<Form>
						<div>
							<Field
								type="text"
								name="amount"
								className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
									errors.amount && touched.amount
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Amount"
							/>
							{errors.amount && touched.amount ? (
								<p className="px-4 text-red-500">
									{errors.amount}
								</p>
							) : null}
						</div>
						<div>
							<Field
								type="text"
								name="date"
								className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
									errors.date && touched.date
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Date"
							/>
							{errors.date && touched.date ? (
								<p className="px-4 text-red-500">
									{errors.date}
								</p>
							) : null}
						</div>
						<div>
							<Field
								as="select"
								name="category"
								className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
									errors.category && touched.category
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold w-50`}>
								<option value="">Choose category</option>
								<option value="pledge">Pledge</option>
								<option value="deposit">Deposit</option>
								<option value="withdrawal">Withdrawal</option>
								<option value="disbursment">
									Loan Disbursement
								</option>
							</Field>
							{errors.category && touched.category ? (
								<p className="px-4 text-red-500">
									{errors.category}
								</p>
							) : null}
						</div>
						<div>
							<Field
								as="select"
								name="group"
								className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
									errors.group && touched.group
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}>
								<option value="">- Choose group -</option>
								<option value="Ablestate Providence">
									Ablestate Providence
								</option>
								<option value="Brotherhood Finance">
									Brotherhood Finance
								</option>
								<option value="RPM Wealthy Ladies">
									RPM Wealthy Ladies
								</option>
							</Field>
							{errors.group && touched.group ? (
								<p className="px-4 text-red-500">
									{errors.group}
								</p>
							) : null}
						</div>
						<div>
							<Field
								as="select"
								name="cause"
								className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
									errors.cause && touched.cause
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}>
								<option value="">- Choose Cause -</option>
								<option value="Church land">Church land</option>
							</Field>
							{errors.cause && touched.cause ? (
								<p className="px-4 text-red-500">
									{errors.cause}
								</p>
							) : null}
						</div>
						<div>
							<Field
								as="select"
								name="member"
								className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
									errors.member && touched.member
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}>
								<option value="">Member</option>
								<option value="david">David</option>
								<option value="kato">Kato</option>
								<option value="withdrawal">Withdrawal</option>
								<option value="disbursment">
									Loan Disbursement
								</option>
							</Field>
							{errors.member && touched.member ? (
								<p className="px-4 text-red-500">
									{errors.member}
								</p>
							) : null}
						</div>
						<div>
							<Field
								as="select"
								name="loan_application"
								className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
									errors.loan_application &&
									touched.loan_application
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}>
								<option value="">Loan Application</option>
							</Field>
							{errors.loan_applicatin &&
							touched.loan_application ? (
								<p className="px-4 text-red-500">
									{errors.loan_applicatin}
								</p>
							) : null}
						</div>
						<button
							className="bg-blue-700 rounded-full w-full text-white py-2 px-4 my-3  hover:bg-gray-600 font-semibold"
							type="submit">
							Save
						</button>
					</Form>
				)}
			</Formik>
		</section>
	);
};

export default New;
