/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// alert("External JS file is loaded!");
function dropDownFunction() {
	document.getElementById("dropDown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
	// alert("window.onclick");
	// console.log(event.target);
	if (!event.target.matches(".dropBtn")) {
		const dropdowns = document.getElementsByClassName("dropdown-content");
		for (let i = 0; i < dropdowns.length; i++) {
			let openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
};
