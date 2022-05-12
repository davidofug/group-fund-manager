import supabase from "./supabase";

const signOut = (setUser, navigation) => {
	if (supabase.auth.signOut()) {
		setUser(null);
		navigation.navigate("/", { replace: true });
	}
};

const toggleDropdown = (event) => {
	console.log(event.target.id);
	const { id } = event?.target;
	let dropdown = document.getElementById("dropdown");
	if (id === "dropdown-toggle") {
		dropdown.classList.toggle("hidden");
	} else {
		dropdown.classList.add("hidden");
	}
};

export { signOut, toggleDropdown };
