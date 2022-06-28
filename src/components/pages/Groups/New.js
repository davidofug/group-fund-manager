import React from "react";
import { BsFillImageFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
// import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../../../helpers/supabaseClient";
import Loader from "../../shared/Loader";
import Alert from "../../shared/Alert";
const NewGroup = ({ setGroups, groups }) => {
	React.useEffect(() => {
		return () => {
			return false;
		};
	}, []);

	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState({});
	const [file, setFile] = React.useState(null);
	const logoElement = React.useRef(null);

	const selectLogo = () => {
		setErrorMsg({});
		logoElement.current.click();
	};

	const handleSelectedFile = (event) => {
		const MAX_FILE_SIZE = 1.5 * 1024 * 1024;
		if (event?.target?.files && event?.target?.files[0]) {
			const file = event.target.files[0];
			if (file.size > MAX_FILE_SIZE) return { error: "Big file" };
			return { file };
		}
	};

	const initialValues = {
		name: "",
		avatar: "",
		purpose: [],
	};
	const groupSchema = Yup.object().shape({
		name: Yup.string().required("Group name required!"),
		purpose: Yup.array()
			.of(Yup.string())
			.required("What is the purpose of the group?"),
	});

	const addGroup = async (values, resetForm) => {
		setLoading(true);
		setErrorMsg({});
		setSuccess(false);
		let avatarURL = "";
		if (file) {
			const { data: avatar, error: avatarError } = await supabase.storage
				.from("avatars")
				.upload(`groups/${file.name}`, file, {
					cacheControl: "3600",
					upsert: false,
				});

			if (avatar?.Key) {
				avatarURL = `https://pwnmmskaafrcxmquirhs.supabase.co/storage/v1/object/public/avatars/groups/${file.name}`;
			} else {
				console.error(avatarError);
			}
		}

		const user = supabase.auth.user();
		const { data: group, error } = await supabase
			.from("groups")
			.insert([
				{
					name: values.name,
					added_by: user.id,
					avatar_url: avatarURL,
					purpose: values.purpose,
				},
			])
			.single();
		if (group) {
			setGroups([...groups, group]);
			setLoading(false);
			setSuccess(true);
			resetForm();
		} else {
			setLoading(false);
			setErrorMsg({ msg: error.message });
			setSuccess(false);
		}
		setTimeout(() => {
			setFile(null);
			setSuccess(false);
		}, 6000);
	};

	return (
		<section className="bg-white p-3 md:border border-gray-300 md:rounded-md w-full items-center">
			{loading && <Loader type="overlay" title="Adding Group" />}
			{success && (
				<Alert
					type="success"
					float={true}
					title="Group has been added"
					message="Group added successfully!"
					setStatus={setSuccess}
					status={success}
				/>
			)}
			{errorMsg?.msg && <Alert type="error" message={errorMsg?.msg} />}

			<h1 className="font-bold text-xl text-center mb-2">Add a Group</h1>

			{file ? (
				<>
					<section className="flex items-center justify-center mb-4">
						<img
							src={URL.createObjectURL(file)}
							className="w-24 h-24 rounded-full border border-2 border-gray-500 overflow-hidden"
							alt="Group Logo"
						/>
						<TiDelete
							size="30"
							title="Delete This"
							onClick={() => setFile(null)}
							className="text-red-700 cursor-pointer"
						/>
					</section>
					{errorMsg?.fileError && (
						<p className="text-red-500">{errorMsg.fileError}</p>
					)}
				</>
			) : (
				<section className="flex flex-col items-center justify-center">
					<BsFillImageFill
						size="60"
						onClick={selectLogo}
						className="cursor-pointer"
					/>
					<span>Upload logo</span>
				</section>
			)}
			<Formik
				initialValues={initialValues}
				validationSchema={groupSchema}
				onSubmit={(values, { resetForm }) =>
					addGroup(values, resetForm)
				}>
				{({ errors, touched }) => (
					<Form>
						<input
							type="file"
							accept="image/*"
							name="avatar"
							hidden
							id="logo-element"
							ref={logoElement}
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
								name="name"
								className={`outline-none p-1 px-3 rounded-full my-3 w-full placeholder-gray-500 border ${
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
						</div>
						<div className="my-4">
							<p>What's the purpose of the group?</p>
							<div>
								<Field
									name="purpose"
									id="pledge"
									value="Collect Pledges"
									type="checkbox"
								/>
								<label htmlFor="pledge" className="ml-1">
									Collect Pledges
								</label>
							</div>
							<div>
								<Field
									name="purpose"
									id="pledge"
									value="Contributions"
									type="checkbox"
								/>
								<label htmlFor="pledge" className="ml-1">
									Contributions
								</label>
							</div>
							<div>
								<Field
									name="purpose"
									id="saving_deposit"
									value="Member Saving/Deposit"
									type="checkbox"
								/>
								<label
									htmlFor="saving_deposit"
									className="ml-1">
									Member Savings/Deposits
								</label>
							</div>
							<div>
								<Field
									name="purpose"
									id="loans"
									value="Loans"
									type="checkbox"
								/>
								<label htmlFor="loans" className="ml-1">
									Loans
								</label>
							</div>
							<div>
								<Field
									name="purpose"
									id="investments"
									value="Track Investments"
									type="checkbox"
								/>
								<label htmlFor="investments" className="ml-1">
									Track Investments
								</label>
							</div>
						</div>
						{Object.keys(errorMsg).length > 0 ? (
							<span className="bg-blue-100 rounded-full text-white py-1 px-3 my-3 w-full border font-semibold">
								Save Group
							</span>
						) : (
							<button
								className="bg-blue-500 rounded-full text-white py-1 px-3 my-3 w-full border hover:bg-white hover:border hover:border-blue-500 hover:text-blue-500 font-semibold"
								type="submit">
								Save Group
							</button>
						)}
					</Form>
				)}
			</Formik>
		</section>
	);
};

export default NewGroup;
