import React from "react";
import Logo from "../shared/Logo";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../../helpers/supabaseClient";
import { useAuth } from "../../components/hooks/useAuth";

const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/dashboard";
	const { user, setUser } = useAuth();
	console.log(user);
	const [errorMsg, setErrorMsg] = React.useState(null);

	React.useEffect(async () => {
		document.title = "GFM - Login";
		await autoLogin();
	}, []);

	const autoLogin = async () => {
		console.log("autoLogin");
		const { data: user, error } = supabase.auth.user();
		console.log(user);

		if (user) {
			setUser(user);
			navigate("/dashboard", { replace: true });
		}
	};
	const initialValues = { email: "", password: "" };
	const loginSchema = Yup.object().shape({
		email: Yup.string().required("Email is required!"),
		password: Yup.string().required("Password is required!"),
	});

	const signInWithEmail = async (values) => {
		const { user, error } = await supabase.auth.signIn({
			email: values.email,
			password: values.password,
		});

		// console.log(user);
		if (error) {
			setErrorMsg(error.message);
			return;
		} else {
			setUser(user);
			navigate(from, { replace: true });
		}
	};

	// return user ? (
	// 	<Navigate to={from} replace />
	// ) : (
	return (
		<div className="md:h-screen flex flex-col justify-center items-center bg-gray-100">
			<div className="p-10 md:bg-gray-200 md:border border-gray-300 md:rounded-md w-full md:w-1/4 items-center">
				<Logo width="64" height="64" title="Group Fund Manager" />
				<h1 className="font-bold text-center mt-12 mb-4">Login</h1>
				{errorMsg && (
					<article className="bg-red-200 p-2 rounded-md border border-red-500">
						<p className="text-red-500 text-center">{errorMsg}</p>
					</article>
				)}
				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={(values) => signInWithEmail(values)}>
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

							<button
								className="bg-blue-700 rounded-full text-white p-2 my-3  hover:bg-gray-600 font-semibold"
								type="submit">
								Login
							</button>
						</Form>
					)}
				</Formik>
				<p className="text-center">
					<Link
						to="/forgot-password"
						className="font-semibold hover:text-blue-700 text-center">
						Forgot Password?
					</Link>
				</p>
			</div>
		</div>
	);
	/* 	); */
};

export default Login;
