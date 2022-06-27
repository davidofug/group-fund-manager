import React from "react";
import { Helmet } from "react-helmet";
import { IoAddCircle } from "react-icons/io5";
import { BsFillImageFill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import AuthWrapper from "../../wrappers/Auth";
import EditGroup from "./Edit";
import { supabase } from "../../../helpers/supabaseClient";
import Modal from "../../shared/Modal";
import NewGroup from "./New";
import { MovingBalls } from "../../shared/Preloaders/Loaders";
import Confirm from "../../shared/Confirm";
const Index = () => {
	const [error, setError] = React.useState({});
	const [editing, setEditing] = React.useState(false);
	const [groupToEdit, setGroupToEdit] = React.useState({});
	const [groups, setGroups] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [deleting, setDeleting] = React.useState(0);
	const [confirm, setConfirm] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const [groupID, setGroupID] = React.useState(null);

	const getGroups = async () => {
		const user = supabase?.auth?.user();
		const {
			id: user_id,
			user_metadata: { groups },
		} = user;
		// const groupIds =
		try {
			const { data: mygroups, error } = await supabase
				.from("groups")
				.select()
				.or(`added_by.eq.${user_id},owner.eq.${user_id}`);
			const { data: groupsIbelong } = await supabase
				.from("groups")
				.select()
				.in("id", new Set([...groups.map((group) => group.id)]));

			const groupsFound = [...mygroups, ...groupsIbelong];
			const uniqueGroups = groupsFound.filter(
				(group, index, self) =>
					index === self.findIndex((t) => t.id === group.id)
			);

			if (error) {
				setError({
					source: "supabase",
					message: error.message,
				});
				setLoading(false);
				return false;
			}
			setLoading(false);
			setGroups(uniqueGroups);
		} catch (error) {
			console.log(error);
			setLoading(false);
			return false;
		}
		return false;
	};
	const editGroup = async (group) => {
		try {
			const { data: editGroup, error } = await supabase
				.from("groups")
				.select()
				.eq("id", group)
				.single();
			if (error) {
				setError({
					source: "supabase",
					message: error.message,
				});
			} else {
				setGroupToEdit(editGroup);
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

	const handleDeleteOnClick = (groupName, groupId) => {
		setMessage(`Are you sure you want to delete the group ${groupName}?`);
		setConfirm(true);
		setGroupID(groupId);
		return true;
	};
	const deleteGroup = async (group) => {
		setDeleting(0);
		try {
			setDeleting(1);
			const { data: deletedGroup, error } = await supabase
				.from("groups")
				.delete()
				.match({ id: group });
			if (error) {
				setError({
					source: "supabase",
					message: error.message,
				});
				setDeleting(0);
				return false;
			} else {
				setDeleting(2);
				getGroups();
			}
			setTimeout(() => setDeleting(0), 2000);
		} catch (error) {
			console.log(error);
			setDeleting(0);
			return false;
		}
		return false;
	};

	React.useEffect(() => {
		getGroups();
	}, []);

	return (
		<AuthWrapper>
			<Helmet>
				<title>GFM - Groups</title>
			</Helmet>
			{groupToEdit && (
				<Modal
					title={`You're about to edit ${groupToEdit.name}`}
					status={editing}
					setStatus={setEditing}>
					<EditGroup group={groupToEdit} setStatus={setEditing} />
				</Modal>
			)}
			<main className="grid gap-2 grid-cols-12">
				<aside className="col-span-3">
					<NewGroup setGroups={setGroups} groups={groups} />
				</aside>
				<article className="col-span-9 bg-white border border-gray-300 rounded-md p-3">
					{confirm && (
						<Confirm
							status={confirm}
							setStatus={setConfirm}
							executeProcess={deleteGroup}
							id={groupID}
							message={message}
						/>
					)}
					{deleting === 1 && (
						<div className="bg-blue-500 text-white rounded-md p-2">
							<p className="flex items-center">
								Deleting <MovingBalls />
							</p>
						</div>
					)}

					{deleting === 2 && (
						<div className="bg-green-600 text-white rounded-md p-2">
							<p>Group deleted</p>
						</div>
					)}
					<h1 className="text-xl font-bold">Groups</h1>
					{loading ? (
						<div className="min-h-full w-full flex flex-col justify-center items-center">
							Loading
							<br />
							Please wait
						</div>
					) : (
						<>
							{groups.length > 0 ? (
								<table className="border-collapse border border-slate-300 w-full mt-3">
									<thead>
										<tr>
											<th className="border border-slate-300 p-2"></th>
											<th className="border border-slate-300  p-2"></th>
											<th className="border border-slate-300 p-2">
												Name
											</th>
											<th className="border border-slate-300 p-2">
												Purpose
											</th>
											<th className="border border-slate-300 p-2">
												Members
											</th>
											<th className="border border-slate-300 p-2 max-w-min">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{groups?.map((group) => (
											<tr key={group.id}>
												<td className="border border-slate-300 w-6 text-center">
													<input
														type="checkbox"
														name="group"
														id="group"
														value={group.id}
													/>
												</td>
												<td className="border border-slate-300 p-2 w-20 text-center">
													{group?.avatar_url ? (
														<img
															src={
																group.avatar_url
															}
															className="w-16 h-16 border border-slate-300 rounded-full"
														/>
													) : (
														<BsFillImageFill title="Logo not uploaded" />
													)}
												</td>
												<td className="relative border border-slate-300 p-2">
													{group?.name}{" "}
													{/* 													<IoAddCircle
														title="Add Bank Account"
														className="md:absolute md:z-2 md:top-1/3 md:-right-2 cursor-pointer text-green-600 hover:text-green-800"
													/> */}
												</td>
												<td className="border border-slate-300 p-2">
													{group?.purpose?.join(", ")}
												</td>
												<td className="border border-slate-300 p-2">
													{group?.members?.length ||
														0}
												</td>
												<td className="border border-slate-300 max-w-min">
													<div className="flex p-2 gap-5 justify-center">
														<Link
															to={`${group?.id}/edit`}
															onClick={(
																event
															) => {
																event.preventDefault();
																editGroup(
																	group.id
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
																handleDeleteOnClick(
																	group?.name,
																	group?.id
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
												Purpose
											</th>
											<th className="border border-slate-300 p-2">
												Members
											</th>
											<th className="border border-slate-300 p-2">
												Actions
											</th>
										</tr>
									</tfoot>
								</table>
							) : (
								<h1>Groups Not Found</h1>
							)}
						</>
					)}
				</article>
			</main>
		</AuthWrapper>
	);
};

export default Index;
