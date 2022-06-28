import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../../../helpers/supabaseClient";
import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";
import { useAuth } from "../../hooks/useAuth";
const New = ({ getTransactions }) => {
	const { user, setUser } = useAuth();
	const [groupMembers, setGroupMembers] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState({});

	React.useEffect(() => {
		return () => {
			return false;
		};
	}, []);
	const initialValues = {
		category: "",
		group: 0,
		cause: "",
		member: "",
		amount: "",
		charges: 0,
		comments: "",
		date: "",
		loan_application: null,
	};

	const transactionSchema = Yup.object().shape({
		category: Yup.string().required("Choose category"),
		group: Yup.string().required("Choose group"),
		member: Yup.string().required("Choose member"),
		amount: Yup.number("Amount must be a number!").required(
			"Amount required!"
		),
		charges: Yup.number("Charges has to be a number!"),
	});

	const submitTransaction = async (values, resetForm) => {
		setLoading(true);
		setErrorMsg(null);
		setSuccess(false);
		const user = supabase.auth.user();
		const { data: transaction, error } = await supabase
			.from("transactions")
			.insert([
				{
					creator_id: user.id,
					member_id: "17da6c3c-30d3-4cdb-a84f-b8c9b2599ca2",
					group_id: 39,
					type: values.category,
					amount: values.amount,
					purpose: "" ?? values.cause,
					meta: {
						date: values.date,
						loan_application: values.loan_application,
						charges: "" ?? values.charges,
						comments: "" ?? values.notes,
					},
				},
			])
			.single();
		if (transaction) {
			getTransactions();
			setLoading(false);
			setSuccess(true);
			resetForm();
		} else {
			setLoading(false);
			console.log(error);
			setErrorMsg({ msg: error.message });
			setSuccess(false);
		}
		setTimeout(() => {
			setSuccess(false);
		}, 6000);
	};

	const getGroupMembers = async (groupId) => {
		try {
			const { data: members, error } = await supabase
				.from("profiles")
				.select();

			const filteredMembers = members
				.map((member) =>
					member?.meta?.groups.filter((group) => group.id == groupId)
						?.length > 0
						? member
						: null
				)
				.filter((member) => {
					if (member != null)
						return {
							user_id: member.user_id,
							first_name: member.meta.first_name,
							last_name: member.meta.last_name,
						};
				});
			return filteredMembers;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="bg-white p-5 md:border border-gray-300 md:rounded-md w-full items-center">
			{loading && <Loader type="overlay" title="Saving Transaction" />}
			{success && (
				<Alert
					type="success"
					float={true}
					title="Process completed!"
					message="Transaction added successfully!"
					setStatus={setSuccess}
					status={success}
				/>
			)}
			{errorMsg?.msg && (
				<Alert type="error" float={true} message={errorMsg?.msg} />
			)}
			<h1 className="font-bold text-xl text-center mb-2">
				Add a Transaction
			</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={transactionSchema}
				onSubmit={(values, { resetForm }) => {
					submitTransaction(values, resetForm);
				}}>
				{({ errors, touched }) => (
					<Form>
						{/* {errors && JSON.stringify(errors, null, 2)} */}
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
								onChange={async (event) => {
									setGroupMembers([]);
									const groupMembers = await getGroupMembers(
										event.target.value
									);
									console.log(groupMembers);
									setGroupMembers(groupMembers);
								}}
								as="select"
								name="group"
								className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
									errors.group && touched.group
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}>
								<option value="">- Choose group -</option>
								{user?.user_metadata?.groups?.map((group) => (
									<option key={group.id} value={group.id}>
										{group.name}
									</option>
								))}
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
						{groupMembers.length > 0 ? (
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
									{groupMembers.map((member) => (
										<option
											key={member.user_id}
											value={
												member.user_id
											}>{`${member.first_name} ${member.last_name}`}</option>
									))}
								</Field>
								{errors.member && touched.member ? (
									<p className="px-4 text-red-500">
										{errors.member}
									</p>
								) : null}
							</div>
						) : null}
						<button
							className="bg-blue-700 rounded-full w-full text-white py-2 px-4 my-3 hover:bg-gray-600 font-semibold"
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
