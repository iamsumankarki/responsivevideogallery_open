const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu_button");
const open = document.querySelector(".open_button");

const dates = document.querySelectorAll("#date");
const year = new Date().getFullYear();

const dialog = document.querySelector(".dialog_modal");
const closeModal = document.querySelector(".close_dialog");
const backdrop = document.querySelector(".dialog_modal::backdrop");

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

function showDialog() {
	if (dialog) {
		dialog.showModal();
		body.classList.add("dialog");
	}
}

function hideDialog() {
	if (dialog) {
		closeModal.addEventListener("click", () => {
			dialog.close();
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	menuToggle();
	escapeToggle();
	copyright();
	showDialog();
	hideDialog();
});
