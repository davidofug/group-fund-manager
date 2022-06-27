import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../../../helpers/supabaseClient";
import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";

const New = ({ setProfiles, profiles }) => {
	const [error, setError] = React.useState({});
	const [groups, setGroups] = React.useState([]);
	const [success, setSuccess] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState({});
	const [file, setFile] = React.useState(null);
	const avatarElement = React.useRef(null);

	const getGroups = async () => {
		try {
			const { data: mygroups, error } = await supabase
				.from("groups")
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
			const [role, userGroups] = currentUser();
			if (![3, 4].includes(Number(role))) {
				setGroups(userGroups);
			} else {
				setGroups(mygroups);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			return false;
		}
		return false;
	};

	const selectAvatar = () => {
		setErrorMsg({});
		avatarElement.current.click();
	};

	const handleSelectedFile = (event) => {
		const MAX_FILE_SIZE = 1.5 * 1024 * 1024;
		if (event?.target?.files && event?.target?.files[0]) {
			const file = event.target.files[0];
			if (file.size > MAX_FILE_SIZE) return { error: "Big file" };
			return { file };
		} else {
			return null;
		}
	};

	const initialValues = {
		email: "",
		password: "",
		confirm_password: "",
		first_name: "",
		last_name: "",
		gender: "",
		role: "",
		group: "",
		avatar: "",
	};
	const userSchema = Yup.object().shape({
		email: Yup.string().required("Email/Phone is required!"),
		password: Yup.string().required("Password is required!"),
		confirm_password: Yup.string().required(
			"Confirm Password is required!"
		),
		first_name: Yup.string().required("First name is required!"),
		last_name: Yup.string().required("Last name is required!"),
		role: Yup.string().required("Role is required!"),
		group: Yup.string().required("Group is required!"),
	});

	const createUser = async (values, resetForm) => {
		setLoading(true);
		setErrorMsg(null);
		setSuccess(false);
		const MyDate = new Date();
		let timeStamp = MyDate.getTime();

		let avatarURL = "";
		if (file) {
			let filename = `${file?.name
				.replace(" ", "-")
				.toLowerCase()}-avatar-${timeStamp}`;
			const { data: avatar, error: avatarError } = await supabase.storage
				.from("avatars")
				.upload(`members/${filename}`, file, {
					cacheControl: "3600",
					upsert: false,
				});

			if (avatar?.Key) {
				avatarURL = `https://pwnmmskaafrcxmquirhs.supabase.co/storage/v1/object/public/avatars/members/${filename}`;
			} else {
				console.error(avatarError);
			}
		}
		const user = supabase.auth.user();
		const [initialGroup] = groups.filter(
			(group) => group.id == values.group
		);

		// console.log(values);
		let response = await fetch("/api/users", {
			method: "POST",
			body: JSON.stringify({
				...values,
				group: {
					id: initialGroup.id,
					name: initialGroup.name,
					avatar_url: initialGroup.avatar_url,
				},
				avatar_url: avatarURL,
				created_by: user.id,
			}),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		const results = await response.json();
		if (results.result === "success") {
			// console.log(results.user);
			// console.log(response.result);
			// setProfiles([profile, ...profiles]);
			setLoading(false);
			setSuccess(true);
			resetForm();
			setErrorMsg(null);
			setFile(null);
			setError(null);
			return true;
		} else {
			setLoading(false);
			// console.log(results.result);
			setErrorMsg({
				source: "server",
				msg: results?.error?.message,
			});
			return false;
		}
	};

	React.useEffect(() => {
		getGroups();
	}, []);
	const currentUser = () => {
		const user = supabase.auth.user();
		const {
			user_metadata: { role, groups },
		} = user;

		return [role, groups];
	};

	return (
		<>
			<section className="bg-white p-4 md:border border-gray-300 md:rounded-md w-full items-center">
				{loading && (
					<Loader
						type="overlay"
						title="Adding Member"
						body="Please wait..."
					/>
				)}
				{success && (
					<Alert
						type="success"
						float={true}
						title="Process completed"
						message="Member added successfully!"
						setStatus={setSuccess}
						status={success}
					/>
				)}
				{errorMsg?.msg && (
					<Alert
						type="error"
						float={true}
						title="Process Failed"
						message={errorMsg?.msg}
						setStatus={setSuccess}
						status={success}
					/>
				)}
				<h1 className="font-bold text-center text-xl mb-2">
					Add a Member
				</h1>
				{file ? (
					<section className="flex items-center justify-center">
						<img
							src={URL.createObjectURL(file)}
							className="w-24 h-24 rounded-full border border-2 border-gray-500  overflow-hidden"
							alt="Member Photo"
						/>
						<TiDelete
							size="30"
							title="Delete This"
							onClick={() => setFile(null)}
							className="text-red-700 cursor-pointer"
						/>
					</section>
				) : (
					<div className="flex flex-col items-center justify-center">
						<FaRegUserCircle
							size="80"
							className="cursor-pointer text-gray-700 hover:text-gray-800"
							onClick={selectAvatar}
						/>
						<span>Upload Photo</span>
					</div>
				)}
				<Formik
					initialValues={initialValues}
					validationSchema={userSchema}
					onSubmit={(values, { resetForm }) =>
						createUser(values, resetForm)
					}>
					{({ errors, touched }) => (
						<Form>
							{errorMsg?.fileError && (
								<p className="text-red-500">
									{errorMsg.fileError}
								</p>
							)}
							<input
								type="file"
								accept="image/*"
								name="avatar"
								hidden
								ref={avatarElement}
								onChange={(event) => {
									const { file, error } =
										handleSelectedFile(event);

									if (error) {
										setErrorMsg({
											...errorMsg,
											fileError:
												"File size must be less than 1.5MB",
										});
										return false;
									}

									let reader = new FileReader();
									reader.readAsDataURL(file);
									reader.onload = () => {
										const image = new Image();
										image.src = reader.result;
										image.onload = () => {
											if (
												image?.naturalWidth > 512 ||
												image?.naturalHeight > 512
											) {
												setErrorMsg({
													...errorMsg,
													fileError:
														"Logo width and height must be less than 300px",
												});
												return;
											}
											setFile(file);
										};
									};
								}}
							/>
							<div className="my-4">
								<Field
									type="text"
									name="email"
									className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
										errors.email && touched.email
											? "border-red-500"
											: "border-gray-500"
									} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}
									placeholder="Phone number"
								/>
								{errors.email && touched.email ? (
									<p className="px-4 text-red-500">
										{errors.email}
									</p>
								) : null}
							</div>
							<div className="my-4">
								<Field
									type="text"
									name="first_name"
									className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
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
							</div>
							<div className="my-4">
								<Field
									type="text"
									name="last_name"
									className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
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
							</div>
							<div className="my-4">
								<p>Gender</p>
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
							</div>
							<div className="my-4">
								{loading ? (
									<div>Loading groups...</div>
								) : (
									<>
										{groups.length > 0 ? (
											<Field
												as="select"
												id="group"
												name="group"
												className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
													errors.group &&
													touched.group
														? "border-red-500"
														: "border-gray-500"
												} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}>
												<option value="">
													Select a Group
												</option>
												{groups?.map((group) => (
													<option
														key={group.id}
														value={group?.id}>
														{group?.name}
													</option>
												))}
											</Field>
										) : (
											<h1>Groups Not Found</h1>
										)}
									</>
								)}
								{errors.group && touched.group ? (
									<p className="px-4 text-red-500">
										{errors.group}
									</p>
								) : null}
							</div>
							<div className="my-4">
								<Field
									type="password"
									name="password"
									className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
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
							</div>
							<div className="my-4">
								<Field
									type="password"
									name="confirm_password"
									className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
										errors.confirm_password &&
										touched.confirm_password
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
							</div>
							<div className="my-4">
								<Field
									as="select"
									name="role"
									className={`outline-none py-2 px-5 w-full rounded-full my-3 placeholder-gray-500 border ${
										errors.role && touched.role
											? "border-red-500"
											: "border-gray-500"
									} bg-gray-300 focus:bg-white focus:text-blue-700 font-semibold`}>
									<option value="-">- Select Role -</option>
									<option value="1">Member</option>
									<option value="2">Admin</option>
									{Number(currentUser()[0]) === 3 && (
										<>
											<option value="3">
												Super Admin
											</option>
											<option value="3">Auditor</option>
										</>
									)}
								</Field>
								{errors.role && touched.role ? (
									<p className="px-4 text-red-500">
										{errors.role}
									</p>
								) : null}
							</div>
							<button
								className="bg-blue-500 rounded-full w-full block text-white text-xl py-1 px-3 my-3 border hover:bg-white hover:border hover:border-blue-500 hover:text-blue-500 font-semibold"
								type="submit">
								Save Member
							</button>
						</Form>
					)}
				</Formik>
			</section>
		</>
	);
};

export default New;
