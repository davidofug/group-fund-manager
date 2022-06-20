import React, { useEffect } from "react";
import AuthWrapper from "../../wrappers/Auth";
import { Helmet } from "react-helmet";
import { BsFillImageFill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Fill } from "react-icons/ri";
import NewProfile from "./New";

import { Link } from "react-router-dom";
import { supabase } from "../../../helpers/supabaseClient";
import Loader from "../../shared/Loader";
import { Ellipsis } from "../../shared/Preloaders/Loaders";
const Index = () => {
	const [members, setMembers] = React.useState([]);
	const [error, setError] = React.useState({});
	const [editing, setEditing] = React.useState(false);
	const [profileToEdit, setProfileToEdit] = React.useState({});
	const [profiles, setProfiles] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const getProfiles = async () => {
		try {
			const { data: profiles, error } = await supabase
				.from("profiles")
				.select();
			if (!error) {
				setLoading(false);
				setMembers(profiles);
				return true;
			}
			setLoading(false);
			return false;
		} catch (error) {
			console.error(error);
			setLoading(false);
			return false;
		}
	};
	const editProfile = async (profile) => {
		try {
			const { data: editProfile, error } = await supabase
				.from("profiles")
				.select()
				.eq("id", profile)
				.single();
			if (error) {
				setError({
					source: "supabase",
					message: error.message,
				});
			} else {
				setProfileToEdit(editProfile);
				// console.log(editGroup);
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

	const deleteProfile = async (profile) => {
		try {
			const { data: deletedGroup, error } = await supabase
				.from("profiles")
				.delete()
				.match({ id: profile });
			if (error) {
				setError({
					source: "supabase",
					message: error.message,
				});
				setLoading(false);
				return false;
			}
			setLoading(false);
			setProfiles(profiles.filter((profile) => profile.id !== profile));
		} catch (error) {
			console.log(error);
			setLoading(false);
			return false;
		}
		return false;
	};

	React.useEffect(() => {
		getProfiles();
		console.log(members);
	}, []);
	return (
		<AuthWrapper>
			<Helmet>
				<title>GFM - Members</title>
			</Helmet>
			<main className="grid gap-2 grid-cols-12">
				<aside className="col-span-3">
					<NewProfile setProfiles={setProfiles} profiles={profiles} />
				</aside>
				<article className="col-span-9 bg-white border border-gray-300 rounded-md p-4">
					<h1 className="font-bold text-xl">Members</h1>
					{loading ? (
						<Ellipsis />
					) : (
						<>
							{members.length > 0 ? (
								<table className="border-collapse border border-slate-300 w-full mt-3">
									<thead>
										<tr>
											<th className="border border-slate-300 p-2"></th>
											<th className="border border-slate-300  p-2"></th>
											<th className="border border-slate-300 p-2">
												Name
											</th>
											<th className="border border-slate-300 p-2">
												Gender
											</th>
											<th className="border border-slate-300 p-2">
												Groups
											</th>
											<th className="border border-slate-300 p-2 max-w-min">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{members?.map((member) => (
											<tr key={member.user_id}>
												<td className="border border-slate-300 w-6 text-center">
													<input
														type="checkbox"
														name="profile"
														id="profile"
														value={member.user_id}
													/>
												</td>
												<td className="border border-slate-300 p-2 w-20 text-center">
													{member?.meta
														?.avatar_url ? (
														<img
															src={
																member?.meta
																	?.avatar_url
															}
															className="w-16 h-16 border border-slate-300 rounded-full"
														/>
													) : (
														<BsFillImageFill title="Logo not uploaded" />
													)}
												</td>
												<td className="relative border border-slate-300 p-2">
													{member?.meta?.first_name}{" "}
													{member?.meta?.last_name}
												</td>
												<td className="border border-slate-300 p-2">
													{member?.meta?.gender}
												</td>
												<td className="border border-slate-300 p-2">
													{member?.meta?.groups
														?.length || 0}
												</td>
												<td className="border border-slate-300 max-w-min">
													<div className="flex p-2 gap-5 justify-center">
														<Link
															to={`${member?.user_id}/edit`}
															onClick={(
																event
															) => {
																event.preventDefault();
																// console.log(editing);
																editProfile(
																	member.user_id
																);
															}}>
															<TiEdit
																title="Edit Group"
																className="text-blue-600 hover:text-blue-800"
															/>
														</Link>

														<Link
															className="text-red-500"
															to="#"
															onClick={(
																event
															) => {
																event.preventDefault();
																deleteProfile(
																	member?.user_id
																);
															}}>
															<RiDeleteBin2Fill
																title="Delete Group"
																className="text-red-600 hover:text-red-800"
															/>
														</Link>
													</div>
												</td>
											</tr>
										))}
									</tbody>
									<tfoot>
										<tr>
											<th className="border border-slate-300 p-2"></th>
											<th className="border border-slate-300 p-2"></th>
											<th className="border border-slate-300 p-2">
												Name
											</th>
											<th className="border border-slate-300 p-2">
												Gender
											</th>
											<th className="border border-slate-300 p-2">
												Groups
											</th>
											<th className="border border-slate-300 p-2">
												Actions
											</th>
										</tr>
									</tfoot>
								</table>
							) : (
								<h1>Members Not Found</h1>
							)}
						</>
					)}
				</article>
			</main>
		</AuthWrapper>
	);
};

export default Index;
