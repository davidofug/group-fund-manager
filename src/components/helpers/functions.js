import supabase from "./supabase";
const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	console.log(error);

	return error ? error : true;
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

const getBase64 = (file) => {
	return new Promise((resolve) => {
		let baseURL = "";
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			baseURL = reader.result;
			resolve(baseURL);
		};
		reader.onerror = (error) => {
			console.log("Error: ", error);
		};
	});
};

let generateRandomString = (len) => {
	let randomString = "";

	while (randomString.length < len) {
		randomString += Math.random().toString(36).substring(2);
	}

	return randomString.substring(0, len);
};

let generateUUID = () => {
	let first = generateRandomString(8);
	let second = generateRandomString(4);
	let third = generateRandomString(4);
	let forth = generateRandomString(4);
	let last = generateRandomString(12);

	return `${first}-${second}-${third}-${forth}-${last}`;
};

export { signOut, toggleDropdown, getBase64, generateUUID };
