const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
	process.env.REACT_APP_SUPABASE_URL,
	process.env.SUPABASE_SERVICE_TOKEN
);

module.exports = async (req, res) => {
	// We need to get the user who is making this request.
	const { method, body } = req;
	if (method === "POST") {
		const {
			email,
			password,
			first_name,
			last_name,
			gender,
			role,
			created_by,
			group,
			avatar_url,
		} = body;
		const signWith =
			email?.indexOf("@") >= 0 && email?.indexOf(".") >= 0
				? { email: email, email_confirm: true }
				: { phone: email, phone_confirm: true };
		const { data: user, error } = await supabase.auth.api.createUser({
			...signWith,
			password,
			user_metadata: {
				role,
				created_by,
				groups: [
					{
						...group,
						roles: [role],
						joinned: new Date().toLocaleTimeString(),
					},
				],
				first_name,
				last_name,
				gender,
				avatar_url,
			},
		});

		if (error) {
			res.send({ result: "failure", error });
		} else {
			res.send({ result: "success", user });
		}
	} else if (method === "DELETE") {
		const {
			query: { uid },
		} = req;

		const { data: profile, error } = await supabase
			.from("profiles")
			.delete()
			.match({ id: uid });
		if (profile) {
			const { data: user, error } = await supabase.auth.api.deleteUser(
				uid
			);
			if (error) {
				res.send({ result: "failure", error });
			} else {
				res.send({ result: "success" });
			}
		} else {
			res.send({ result: "failure", error });
		}
	}

	if (method === "PATCH") {
		return;
	}
};
