const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
	process.env.REACT_APP_SUPABASE_URL,
	process.env.REACT_APP_SUPABASE_SERVICE_TOKEN
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
			addedBy,
			company,
			company_name,
		} = req.body;
		const { data: user, error } = await supabase.auth.api.createUser({
			email,
			email_confirm: true,
			password,
			user_metadata: {
				role,
				addedBy: { id: addedBy.id, email: addedBy.email },
				company: { id: company, name: company_name },
				name: {
					first_name,
					last_name,
				},
				gender,
			},
		});

		if (error) {
			res.send({ result: "failure", error });
		} else {
			res.send({ result: "success" });
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
