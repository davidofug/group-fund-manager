import React from "react";
import { Link } from "react-router-dom";
import AuthWrapper from "../../wrappers/Auth";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../../helpers/supabaseClient";
import EditProfile from "./Edit";
import ChangePassword from "./ChangePassword";
import Modal from "../../shared/Modal";

const Profile = (props) => {
	const [error, setError] = React.useState({});
	const [loading, setLoading] = React.useState(true);
	const [editing, setEditing] = React.useState(false);
	const [profileToEdit, setProfileToEdit] = React.useState({});
	const [changePassword, setChangePassword] = React.useState(false);
	const { user } = useAuth();

	React.useEffect(() => {
		user && setLoading(false);
		return () => {
			return false;
		};
	});
	const editProfile = async (profile) => {
		try {
			const { data: editProfile, error } = await supabase
				.from("profiles")
				.select()
				.eq("user_id", profile)
				.single();
			if (error) {
				setError({
					source: "supabase",
					message: error.message,
				});
			} else {
				setProfileToEdit(editProfile);
			}
		} catch (error) {
			console.log(error);
			setError({
				source: "supabase",
				message: error.message,
			});
		}
		setEditing(true);
	};

	if (loading)
		return (
			<Modal>
				<h1>Loading</h1>
			</Modal>
		);

	return (
		<AuthWrapper>
			{changePassword && (
				<Modal
					title="Change Password"
					status={editing}
					setStatus={setEditing}>
					<ChangePassword />
				</Modal>
			)}
			{profileToEdit !== null && (
				<Modal
					title={`You're about to edit ${profileToEdit?.meta?.first_name} ${profileToEdit.meta?.last_name}'s profile`}
					status={editing}
					setStatus={setEditing}>
					{/* {JSON.stringify(profileToEdit, null, 2)} */}
					<EditProfile
						profile={profileToEdit}
						setStatus={setEditing}
					/>
				</Modal>
			)}
			<div className="mb-4 flex items-center">
				<h1>My Profile</h1>
				<Link
					to="/profile/edit"
					onClick={(event) => {
						setEditing(false);
						event.preventDefault();
						setChangePassword(false);
						editProfile(user.id);
					}}
					className="text-blue-500 hover:text-blue-700 p-2">
					Edit
				</Link>
				<Link
					to="/profile/change-password"
					onClick={(event) => {
						event.preventDefault();
						setEditing(false);
						setProfileToEdit(null);
						setChangePassword(true);
						setEditing(true);
					}}
					className="text-blue-500 hover:text-blue-700 p-2">
					Change password
				</Link>
			</div>
			<section className="bg-white p-10 md:border border-gray-300 md:rounded-md w-full items-center">
				<article className="mb-4">
					<h1 className="font-bold font-md">Details</h1>
					<ul>
						<li className="border-b py-2">
							<span className="font-bold text-gray-600">
								Email:{" "}
							</span>
							{user?.email || "Missing email"}
						</li>
						<li className="border-b py-2">
							<span className="font-bold text-gray-600">
								Phone:
							</span>{" "}
							{user?.phone || "Missing phone"}
						</li>
						<li className="border-b py-2">
							<span className="font-bold text-gray-600">
								Gender:{" "}
							</span>
							{user?.user_metadata?.gender ?? "Missing gender"}
						</li>
						<li className="border-b py-2">
							<span className="font-bold text-gray-600">
								First name:{" "}
							</span>
							{user?.user_metadata?.first_name ||
								"Missing First name"}
						</li>
						<li className="border-b py-2">
							<span className="font-bold text-gray-600">
								Last name:{" "}
							</span>
							{user?.user_metadata?.last_name ||
								"Missing Last name"}
						</li>
					</ul>
					{user?.user_metadata?.groups?.length > 0 ? (
						<table className="border rounded-sm my-3 w-1/2">
							<caption className="font-bold">
								Member of
								{user?.user_metadata?.groups?.length} Groups
							</caption>
							<thead>
								<tr>
									<th className="border p-1">Logo</th>
									<th className="border p-1">Name</th>
									<th className="border p-1">Role</th>
								</tr>
							</thead>
							<tbody>
								{user?.user_metadata?.groups?.map((group) => {
									const {
										avatar_url,
										name: title,
										roles: myRoles,
									} = group;
									const roles = [
										"Member",
										"Admin",
										"Super Admin",
									];

									return (
										<tr key={group.id}>
											<td className="border p-1">
												{avatar_url && (
													<img
														src={avatar_url}
														alt={title}
													/>
												)}
											</td>
											<td className="border p-1">
												{title}
											</td>
											<td className="border p-1">
												{myRoles.map(
													(myRole) =>
														roles[Number(myRole)]
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					) : (
						<p>Not a member of any group</p>
					)}
				</article>
			</section>
		</AuthWrapper>
	);

	/* 	return (
		<>
			<h1>Profile not found</h1>
		</>
	); */
};

export default Profile;
