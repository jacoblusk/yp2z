(function() {
	'use strict';
	const FORM_WIDTH = 625;

	let zip_out = false;
	let form = document.getElementById("playlist-form");
	let loadingBar = document.getElementById("playlist-loading-color-bar");
	let zip = document.getElementById("zip");
	let playlistInput = document.getElementById("playlist-input");
	form.onsubmit = function(ev) {
		playlistInput.disabled = true;
		ev.preventDefault();
		(zip_out ? function() {
			loadingBar.style.opacity = "1";
			zip.style.transform = "translateY(0px)";
			zip.style.opacity = "0";
			zip_out = false;
			return wait(1000).then(function() {
				form.classList.add("shake-side");
				return wait(1000);
			});
		} : function() {
			return wait(0);
		})().then(function() {
			form.classList.remove("shake-side");
			form.classList.add("loading");
			for(let i = 0; i < 5; i++) {
				wait(i * 1000).then(function(){
					loadingBar.style.width = FORM_WIDTH / (5 - i) + "px";
				});
			}
			return wait(5000);
		}).then(function() {
			form.classList.remove("loading");
			form.classList.add("shake-up");
			return wait(1000);
		}).then(function() {
			form.classList.remove("shake-up");
			loadingBar.style.width = "0px";
			loadingBar.style.opacity = "0";
			zip.style.transform = "translateY(80px)";
			zip.style.opacity = "1";
			zip_out = true;
			console.log("spit out a zip");
			playlistInput.disabled = false;
		});
	}

	function wait(duration) {
		return new Promise(function(resolve) {
			setTimeout(resolve, duration);
		});
	}
}());
