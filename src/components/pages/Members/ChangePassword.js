import React from "react";
import Camera from "../../../assets/images/camera.png";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../../../helpers/supabaseClient";
const ChangePassword = () => {
	const [errorMsg, setErrorMsg] = React.useState({});
	const [isSuccess, setIsSuccess] = React.useState(false);

	const initialValues = {
		old_password: "",
		new_password: "",
		new_confirm_password: "",
	};
	const changePasswordSchema = Yup.object().shape({
		old_password: Yup.string().required("Old Password is required!"),
		new_password: Yup.string().required("New Password is required!"),
		new_confirm_password: Yup.string().required(
			"New Confirm Password required!"
		),
	});

	const savePassword = async (values) => {
		const user = supabase.auth.user();
		// setIsSuccess(updated ? true : false);
	};

	// console.log(success);
	if (isSuccess) return <p className="text-green-700">Group updated!</p>;

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={changePasswordSchema}
				onSubmit={savePassword}>
				{({ errors, touched }) => (
					<Form>
						<div className="my-4">
							<Field
								type="password"
								name="Old password"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.old_password && touched.old_password
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Confirm Password"
							/>
							{errors.old_password && touched.old_password ? (
								<p className="px-4 text-red-500">
									{errors.old_password}
								</p>
							) : null}
						</div>
						<div className="my-4">
							<Field
								type="password"
								name="New Password"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.new_password && touched.new_password
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="New Password"
							/>
							{errors.new_password && touched.new_password ? (
								<p className="px-4 text-red-500">
									{errors.new_password}
								</p>
							) : null}
						</div>
						<div className="my-4">
							<Field
								type="password"
								name="new_confirm_password"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.new_confirm_password &&
									touched.new_confirm_password
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Confirm New Password"
							/>
							{errors.new_confirm_password &&
							touched.new_confirm_password ? (
								<p className="px-4 text-red-500">
									{errors.new_confirm_password}
								</p>
							) : null}
						</div>

						<button
							className="bg-blue-500 rounded-full text-white py-1 px-3 my-3 border hover:bg-white hover:border hover:border-blue-500 hover:text-blue-500 font-semibold"
							type="submit">
							Save Password
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ChangePassword;
