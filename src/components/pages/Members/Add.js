import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../../../helpers/supabaseClient";

const AddMember = () => {
	React.useEffect(() => {
		document.title = "GFM - Add Member";
	}, []);

	const initialValues = {
		email: "",
		password: "",
		confirm_password: "",
		first_name: "",
		last_name: "",
		gender: "",
		role: "",
		groups: [],
		avatar: "",
	};
	const userSchema = Yup.object().shape({
		email: Yup.string().required("Email is required!"),
		password: Yup.string().required("Password is required!"),
	});

	const createUser = () => {
		supabase.setSite("gfm");
		supabase.setTable("users");
		supabase.create({
			email: "",
			password: "",
			first_name: "",
			last_name: "",
		});
	};

	return (
		<div className="bg-gray-100">
			<div className="p-10 md:bg-gray-200 md:border border-gray-300 md:rounded-md w-full items-center">
				<Formik
					initialValues={initialValues}
					validationSchema={userSchema}
					onSubmit={createUser}>
					{({ errors, touched }) => (
						<Form>
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
								type="text"
								name="first_name"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.first_name && touched.first_name
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="First name"
							/>
							{errors.first_name && touched.first_name ? (
								<p className="px-4 text-red-500">
									{errors.first_name}
								</p>
							) : null}
							<Field
								type="text"
								name="last_name"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.last_name && touched.last_name
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Last name"
							/>
							{errors.last_name && touched.last_name ? (
								<p className="px-4 text-red-500">
									{errors.last_name}
								</p>
							) : null}
							<label>Gender</label>
							<label>
								<Field
									type="radio"
									name="gender"
									value="Female"
									id="female"
								/>{" "}
								Female{" "}
							</label>
							<label>
								<Field
									type="radio"
									name="gender"
									value="Male"
									id="male"
								/>{" "}
								Male{" "}
							</label>
							{errors.gender && touched.gender ? (
								<p className="px-4 text-red-500">
									{errors.gender}
								</p>
							) : null}
							<label>Groups</label>
							<label>
								<Field
									type="checkbox"
									name="groups"
									value="Ablestate Providence"
								/>{" "}
								Ablestate Providence
							</label>
							<label>
								<Field
									type="checkbox"
									name="groups"
									value="RPM Wealthy Ladies"
								/>{" "}
								RPM Wealthy Ladies{" "}
							</label>
							{errors.groups && touched.groups ? (
								<p className="px-4 text-red-500">
									{errors.groups}
								</p>
							) : null}
							<label>
								<Field
									type="checkbox"
									name="groups"
									value="Brotherhood finance"
								/>{" "}
								Brotherhood finance{" "}
							</label>

							{errors.groups && touched.groups ? (
								<p className="px-4 text-red-500">
									{errors.groups}
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
								name="confirm_password"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.password && touched.password
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Confirm Password"
							/>
							{errors.confirm_password &&
							touched.confirm_password ? (
								<p className="px-4 text-red-500">
									{errors.confirm_password}
								</p>
							) : null}
							<label htmlFor="role">Role</label>
							<Field
								as="select"
								name="role"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.role && touched.role
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}>
								<option value="-">- Select Role -</option>
								<option value="1">Member</option>
								<option value="2">Admin</option>
								<option value="3">Super Admin</option>
								<option value="3">Auditor</option>
							</Field>
							{errors.role && touched.role ? (
								<p className="px-4 text-red-500">
									{errors.role}
								</p>
							) : null}
							<label>
								Avatar/Photo
								<Field type="file" name="avatar" />
							</label>
							<button
								className="bg-blue-700 rounded-full text-white p-2 my-3  hover:bg-gray-600 font-semibold"
								type="submit">
								Add
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AddMember;
