const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu_button");
const open = document.querySelector(".open_button");

const dates = document.querySelectorAll("#date");
const year = new Date().getFullYear();

function copyright() {
	dates.forEach((date) => {
		date.textContent = year;
	});
}

function menuToggle() {
	if (open) {
		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				const isActive = body.classList.toggle("menu_active");
				if (isActive) {
					open.setAttribute("aria-expanded", "true");
				} else {
					open.setAttribute("aria-expanded", "false");
				}
			});
		});
	}
}

function escapeToggle() {
	if (open) {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && body.classList.contains("menu_active")) {
				body.classList.remove("menu_active");
				open.setAttribute("aria-expanded", "false");
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	menuToggle();
	escapeToggle();
	copyright();
});
