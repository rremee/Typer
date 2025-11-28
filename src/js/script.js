"use strict";

import "/src/sass/style.scss";

document.addEventListener("DOMContentLoaded", () => {
	const keys = [
		["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
		["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
		["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
	];

	const keyboard = document.querySelector(".game__keyboard");

	keys.forEach((row) => {
		const rowElement = document.createElement("div");
		rowElement.classList.add("keyboard__row");

		row.forEach((key) => {
			const keyElement = document.createElement("div");
			keyElement.classList.add("keyboard__key");
			keyElement.textContent = key;
			keyElement.dataset.key = key;

			rowElement.appendChild(keyElement);
		});

		keyboard.appendChild(rowElement);
	});

    document.addEventListener("keydown", (e) => {
        const letter = e.key.toUpperCase();
        const btn = document.querySelector(`[data-key="${letter}"]`);

        if (btn) {
            btn.classList.add("keyboard__key--active");
        }
    })

    document.addEventListener("keyup", (e) => {
        const letter = e.key.toUpperCase();
        const btn = document.querySelector(`[data-key="${letter}"]`);

        if (btn) {
            btn.classList.remove("keyboard__key--active");
        }
    })
});
