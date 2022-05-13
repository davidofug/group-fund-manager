import React from "react";
import Logo from "../shared/Logo";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../../helpers/supabaseClient";

const ForgotPassword = () => {
	React.useEffect(() => {
		document.title = "GFM - Forgot Password";
	}, []);

	const initialValues = { email: "" };
	const forgotPasswordSchema = Yup.object().shape({
		email: Yup.string().required("Email is required!"),
	});

	const signInWithEmail = async (values) => {
		const { user, error } = await supabase.auth.signIn({
			email: values.email,
		});

		console.log(user);
	};

	return (
		<div className="md:h-screen flex flex-col justify-center items-center bg-gray-100">
			<div className="p-10 md:bg-gray-200 md:border border-gray-300 md:rounded-md w-full md:w-1/4 items-center">
				<Logo width="64" height="64" title="Group Fund Manager" />
				<p className="pt-8 pb-2">
					Enter the E-mail address associated with the account then
					Reset Password
				</p>
				<Formik
					initialValues={initialValues}
					validationSchema={forgotPasswordSchema}
					onSubmit={signInWithEmail}>
					{({ errors, touched }) => (
						<Form className="flex flex-col">
							<Field
								type="email"
								name="email"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.email && touched.email
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Email/Phone"
							/>
							{errors.email && touched.email ? (
								<p className="px-4 text-red-500">
									{errors.email}
								</p>
							) : null}
							<button
								className="bg-blue-700 rounded-full text-white p-2 my-3  hover:bg-gray-600 font-semibold"
								type="submit">
								Reset Password
							</button>
						</Form>
					)}
				</Formik>
				<p className="text-center font-semibold">
					Remember Password?{" "}
					<Link to="/" className="text-center hover:text-blue-700 ">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ForgotPassword;
