import React from "react";
import Logo from "./shared/Logo";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../helpers/supabaseClient";

const AddSuperAdmin = () => {
	React.useEffect(() => {
		document.title = "GFM - Login";
	}, []);

	const initialValues = { email: "", password: "", confirmPassword: "" };
	const addSuperAdminSchema = Yup.object().shape({
		email: Yup.string().required("Email is required!"),
		password: Yup.string().required("Password is required!"),
		confirmPassword: Yup.string().required("Confirm Password is required!"),
	});

	const createSuperAdmin = async (values) => {
		const { user, error } = await supabase.auth.signIn({
			email: values.email,
			password: values.password,
            user_meta: {
                is_super_admin: true
            }
		});

        console.log(user);
	};

	return (
		<div className="md:h-screen flex flex-col justify-center items-center bg-gray-100">
			<div className="p-10 md:bg-gray-200 md:border border-gray-300 md:rounded-md w-full md:w-1/4 items-center">
				<Logo width="64" height="64" title="Group Fund Manager" />
				<h1 className="font-bold text-center mt-12 mb-4">Add Super Admin</h1>
				<Formik
					initialValues={initialValues}
					validationSchema={addSuperAdminSchema}
                    onSubmit={createSuperAdmin}>
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
							<Field
								type="password"
								name="password"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.password && touched.password
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Password"
							/>
							{errors.password && touched.password ? (
								<p className="px-4 text-red-500">
									{errors.password}
								</p>
							) : null}
							<Field
								type="password"
								name="confirmPassword"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.confirmPassword && touched.confirmPassword
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Confirm Password"
							/>
							{errors.confirmPassword && touched.confirmPassword ? (
								<p className="px-4 text-red-500">
									{errors.confirmPassword}
								</p>
							) : null}

							<button
								className="bg-blue-700 rounded-full text-white p-2 my-3  hover:bg-gray-600 font-semibold"
								type="submit">
								Save
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AddSuperAdmin;
