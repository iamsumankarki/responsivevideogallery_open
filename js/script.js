import videos from "../videos.json" with { type: "json" };

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

function toggleDark() {
  const toggle = document.querySelector(".dark_mode-container");
  toggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    if (isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
}

function renderGrid(videos) {
  const gallerySection = document.querySelector(".gallery_section");
  if (!gallerySection) return;

  const grid = document.createElement("div");
  grid.className = "wrap grid";

  const fragment = document.createDocumentFragment();

  videos.forEach(({ id, type, title, image }) => {
    const article = document.createElement("article");
    article.className = "article";

    article.innerHTML = `
      <figure class="figure">
        <img src="${image}" alt="${title}">
        <button class="play_video" data-id="${id}" data-type="${type}" aria-label="Play Video">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z"/>
          </svg>
        </button>
      </figure>
      <h3 class="video_title">${title}</h3>
    `;
    
    fragment.appendChild(article);
  });

  grid.appendChild(fragment);
  gallerySection.appendChild(grid);
}

function initGalleryListeners() {
  const grid = document.querySelector(".grid");
  if (!grid) return;

  let dialog = null;
  let iframe = null;

  grid.addEventListener("click", (e) => {
    const button = e.target.closest(".play_video");
    if (!button) return;

    if (!dialog) {
      dialog = createDialogNode();
      iframe = dialog.querySelector("iframe");
      document.body.appendChild(dialog);
      
      dialog.addEventListener("click", (evt) => {
        if (evt.target === dialog || evt.target.closest(".close_dialog")) {
            closeModal(dialog, iframe);
        }
      });
    }

    const { id, type } = button.dataset;
    const title = button.closest(".article").querySelector(".video_title").textContent;

    iframe.title = title;
    iframe.src = getVideoSrc(type.toLowerCase(), id);

	if (type.toLowerCase() === "youtube") {
		iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
	} else if (type.toLowerCase() === "vimeo") {
		iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share");
	}

	console.log(iframe.src);

    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
}

function createDialogNode() {
  const dialog = document.createElement("dialog");
  dialog.className = "dialog_modal";
  
  dialog.innerHTML = `
    <button class="close_dialog" aria-label="Close Video">
		<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>
    </button>
    <div class="dialog_frame">
    	<iframe frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  `;
  return dialog;
}

function closeModal(dialog, iframe) {
    dialog.close();
    iframe.src = "";
    document.body.classList.remove("dialog-open");
}

function getVideoSrc(type, id) {
  if (type.toLowerCase() === "youtube") {
    return `https://www.youtube.com/embed/${id}`;
  } 
  if (type.toLowerCase() === "vimeo") {
    return `https://player.vimeo.com/video/${id}`;
  }
  return "";
}

document.addEventListener("DOMContentLoaded", () => {
	menuToggle();
	escapeToggle();
	copyright();
	renderGrid(videos);
	initGalleryListeners();
	toggleDark();
});
