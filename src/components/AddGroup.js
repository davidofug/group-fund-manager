import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../helpers/supabaseClient";

const AddGroup = () => {
	React.useEffect(() => {
		document.title = "GFM - Add Group";
	}, []);

	const initialValues = {
		name: "",
		avatar: "",
	};
	const groupSchema = Yup.object().shape({
		name: Yup.string().required("Group name required!"),
	});

	const addGroup = () => {
		supabase.setSite("gfm");
		supabase.setTable("users");
		supabase.create({
			name: "",
            avatar:"",
		});
	};

	return (
		<div className="bg-gray-100">
			<div className="p-10 md:bg-gray-200 md:border border-gray-300 md:rounded-md w-full items-center">
				<Formik
					initialValues={initialValues}
					validationSchema={groupSchema}
					onSubmit={addGroup}>
					{({ errors, touched }) => (
						<Form>
							<Field
								type="text"
								name="name"
								className={`outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ${
									errors.name && touched.name
										? "border-red-500"
										: "border-gray-500"
								} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
								placeholder="Group name"
							/>
							{errors.name && touched.name ? (
								<p className="px-4 text-red-500">
									{errors.name}
								</p>
							) : null}
                            <label>
                                Group Avatar
                                <Field
								type="file"
								name="avatar"

							/>
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

export default AddGroup;
