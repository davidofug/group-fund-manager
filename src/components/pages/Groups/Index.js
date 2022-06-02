import React from "react";
import { Link } from "react-router-dom";
import AuthWrapper from "../../wrappers/Auth";
import EditGroup from "./Edit";
import { supabase } from "../../../helpers/supabaseClient";
import Modal from "../../shared/Modal";
const Index = () => {
	const [error, setError] = React.useState({});
	const [editing, setEditing] = React.useState(false);
	const [groupToEdit, setGroupToEdit] = React.useState({});
	const [groups, setGroups] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
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
			setGroups(mygroups);
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

	const deleteGroup = async (group) => {
		try {
			const { data: deletedGroup, error } = await supabase
				.from("groups")
				.delete()
				.match({ id: group });
			if (error) {
				setError({
					source: "supabase",
					message: error.message,
				});
				setLoading(false);
				return false;
			}
			setLoading(false);
			setGroups(groups.filter((group) => group.id !== group));
		} catch (error) {
			console.log(error);
			setLoading(false);
			return false;
		}
		return false;
	};

	React.useEffect(() => {
		getGroups();
	}, []);

	return (
		<AuthWrapper>
			{groupToEdit && (
				<Modal
					title={`You're about to edit ${groupToEdit.name}`}
					status={editing}
					setStatus={setEditing}>
					<EditGroup group={groupToEdit} setStatus={setEditing} />
				</Modal>
			)}
			<article className="bg-white border border-gray-300 rounded-md p-4">
				<h1>
					Groups{" "}
					<Link
						to="/groups/add"
						className="bg-blue-500 rounded-full px-3 py-1 text-white hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
						Add
					</Link>
				</h1>
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
											<td className="border border-slate-300 p-2 w-20">
												{group?.avatar_url && (
													<img
														src={group.avatar_url}
														className="w-16 h-16 border border-slate-300 rounded-full"
													/>
												)}
											</td>
											<td className="border border-slate-300 p-2">
												{group?.name}
											</td>
											<td className="border border-slate-300 p-2">
												{group?.purpose?.join(", ")}
											</td>
											<td className="border border-slate-300 p-2">
												{group?.members?.length}
											</td>
											<td className="border border-slate-300 p-2 max-w-min">
												<Link
													to={`${group?.id}/edit`}
													onClick={(event) => {
														event.preventDefault();
														// console.log(editing);
														editGroup(group.id);
													}}>
													Edit
												</Link>
												|
												<Link
													className="text-red-500"
													to="#"
													onClick={(event) => {
														event.preventDefault();
														deleteGroup(group?.id);
													}}>
													Delete
												</Link>
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
		</AuthWrapper>
	);
};

export default Index;
