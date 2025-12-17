"use strict";

import "/src/sass/style.scss";

document.addEventListener("DOMContentLoaded", () => {
	const keys = [
		["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
		["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
		["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
		[" "],
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

			if (keyElement.textContent === " ") keyElement.classList.add("keyboard__key--space");

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
	});

	document.addEventListener("keyup", (e) => {
		const letter = e.key.toUpperCase();
		const btn = document.querySelector(`[data-key="${letter}"]`);

		if (btn) {
			btn.classList.remove("keyboard__key--active");
		}
	});

	const timer = document.querySelector("#timer");
	let time = 15;

	// timer.textContent = time;

	const timerInterval = setInterval(() => {
		if (time > 0) {
			time -= 0.01;
			timer.textContent = time.toFixed(2) + " s";
		} else {
			timer.textContent = "00.00 s";
			clearInterval(timerInterval);
		}
	}, 10);

	let words = [];
	let currentWord = "";

	const mainWord = document.querySelector("#word");
	const wordInput = document.querySelector("#word-input");

	function getRandomWord() {
		return words[Math.round(Math.random() * words.length)];
	}

	function showNewWord() {
		currentWord = getRandomWord();
		mainWord.textContent = currentWord;
		wordInput.value = "";
		wordInput.focus();
	}

	fetch("/src/data/words.json")
		.then((res) => res.json())
		.then((data) => {
			words = data.words;
			showNewWord();
		});

	wordInput.addEventListener("input", () => {
		if (mainWord.textContent.toLowerCase() === wordInput.value.trim().toLowerCase()) {
			showNewWord();
		}
	});
});
