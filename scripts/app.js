'use strict';

// Written by Catucod, Renato Jr. <3

// App.js -- main javascript for all webpages

function numchar(evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
	return true;
}

var popup_error = (err) => {
	const error_div = document.createElement('div');
	error_div.id = 'errors';
	error_div.innerHTML += `
		<div
			id="errors-group"
			style="
				position: absolute;
				display: flex;
				justify-content: center;
				color: white;
				background: #FF8080;
				border: solid #FF0000 0.07vw;
				border-radius: 0.5vw;
				z-index: 10;
				padding: 1.5vw;
				font-size: 1.5vw;
				top: 0.7vw;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 0.7vw;
			"
		>
			<h4
				style="
					color: white;
					background: none;
				"
			>`+ err +`</h4>
		</div>
	`;
	return error_div;
}

var popup_message = (msg) => {
	const message_div = document.createElement('div');
	message_div.id = 'message';
	message_div.innerHTML += `
		<div
			id="message-group"
			style="
				position: absolute;
				display: flex;
				justify-content: center;
				color: black;
				background: #80FF80;
				border: solid #00FF00 0.07vw;
				border-radius: 0.5vw;
				z-index: 10;
				padding: 1.5vw;
				font-size: 1.5vw;
				top: 0.7vw;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 0.7vw;
			"
		>
			<h4
				style="
					color: black;
					background: none;
				"
			>` + msg + `</h4>
		</div>
	`;
	return message_div;
};

var popup_info = (info) => {
	const info_div = document.createElement('div');
	info_div.id = 'infos';
	info_div.innerHTML += `
		<div
			id="infos-group"
			style="
				position: absolute;
				display: flex;
				justify-content: center;
				color: white;
				background: #8080FF;
				border: solid #0000FF 0.07vw;
				border-radius: 0.5vw;
				z-index: 10;
				padding: 1.5vw;
				font-size: 1.5vw;
				top: 0.7vw;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 0.7vw;
			"
		>
			<h4
				style="
					color: white;
					background: none;
				"
			>` + info + `</h4>
		</div>
	`;
	return info_div;
};

function showError(errorname,time) {
	var t = (time > 0) ? time : 5000;
	document.body.appendChild(errorname);
	setTimeout(() => { document.querySelector('#errors').remove(); }, t);
}

function showMessage(msgname,time) {
	var t = (time > 0) ? time : 5000;
	document.body.appendChild(msgname);
	setTimeout(() => { document.querySelector('#message').remove(); }, t);
}

function showInfo(infoname,time) {
	var t = (time > 0) ? time : 5000;
	document.body.appendChild(infoname);
	setTimeout(() => { document.querySelector('#infos').remove(); }, t);
}

// This is the function that generates a random token for users
function generateToken(len) {
	let token = '';
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charsLength = chars.length;
	const randVals = new Uint32Array(len);
	window.crypto.getRandomValues(randVals);
	randVals.forEach((value) => { token += chars.charAt(value % charsLength); });
	return token;
}

var endpoints = {
	userdata: 'https://api.sheetson.com/v2/sheets/Sheet1',
	eventdata: 'https://api.sheetson.com/v2/sheets/Sheet2',
	requestdata: 'https://api.sheetson.com/v2/sheets/Sheet3',
	faqdata: 'https://api.sheetson.com/v2/sheets/Sheet4',
	imagedata: 'https://api.cloudinary.com/v1_1/dgywsyqwq/image/upload',
	emailapi: 'https://api.emailjs.com/api/v1.0/email/send'
};

var keys = {
	image: 'imge_IMmP_265f94563be064a13123b722d85f84b5086edfee1a31e0eeefbc8cea0a801e747198aac1a6c475bf35a863d35bf46ac1441ae405ac93bf7161819bd05827553a',
	sheetson: 'EV3gPQm_cMRKPWluFroHqUR8kGOKiu0UM9jL-BtdPw-Mvt1QSUejLgdUKVU',
	gsheet: '1JGEGIcsrSO21VcwVTsEOqfdTUz-bjcBAfL2mSmnmfns',
	email: {
		serviceId: 'service_j7tj278',
		templateId: {
			forgotPass: 'template_64wh34l',
			resetPass: 'template_ul6t4c8'
		},
		userId: 'mqLZz5yk9OVkjm1d6',
	}
};

// Prevents unnecessary actions
function lock() {
	if (window.localStorage.getItem('user_username') === null) {
		if (window.location.href.indexOf('services') === -1) window.location.href = 'redirect/dontbypass.html';
		else window.location.href = '../redirect/dontbypass.html';
	}
}

window.addEventListener('DOMContentLoaded',() => {
	const dashboardBody = document.querySelector('#dhbdy');
	const profileBody = document.querySelector('#pfbdy');
	const eventBody = document.querySelector('#evtbdy');
	const indexBody = document.querySelector('#idxbdy');
	if (dashboardBody !== null) {
		dashboardBody.onload = () => {
			lock();
			const srole = window.localStorage.getItem('user_role');
			const sprofile = window.localStorage.getItem('user_profile');
			const baloon = document.querySelector('#baloon');
			const profile = document.querySelector('#userprofile');
			const profile2 = document.querySelector('#userprofile2');
			const username = document.querySelector('#username');
			const username2 = document.querySelector('#username2');
			if (srole === 'Admin' || srole === 'Org. Officer') {
				baloon.style.visibility = 'visible';
				baloon.style.position = 'fixed';
			}
			username.innerHTML = window.localStorage.getItem('user_username');
			username2.innerHTML = username.innerHTML + ' ( ' + window.localStorage.getItem('user_role') + ' ) ';
			if (sprofile !== null) {
				profile.src = sprofile;
				profile2.src = profile.src;
			}
		};
	}
	if (profileBody !== null) {
		profileBody.onload = () => {
			lock();
			// load all resources
			const name = document.querySelector('#input1');
			const age = document.querySelector('#input2');
			const male = document.querySelector('#input3');
			const female = document.querySelector('#input4');
			const status = document.querySelector('#select1');
			const email = document.querySelector('#input5');
			const contact = document.querySelector('#input6');
			const idNum = document.querySelector('#input7');
			const dept = document.querySelector('#select2');
			const role = document.querySelector('#select3');
			const password = document.querySelector('#passinput');
			const token = document.querySelector('#acctoken');
			const userprofile = document.querySelector('#userprofile');
			//
			name.value = window.localStorage.getItem('user_name');
			age.value = window.localStorage.getItem('user_age');
			male.checked = (window.localStorage.getItem('user_gender') == 'M') ? true : false;
			female.checked = (window.localStorage.getItem('user_gender') == 'F') ? true : false;
			status.value = window.localStorage.getItem('user_status');
			email.value = window.localStorage.getItem('user_email');
			contact.value = window.localStorage.getItem('user_contact');
			idNum.value = window.localStorage.getItem('user_idNumber');
			dept.value = window.localStorage.getItem('user_dept');
			role.value = window.localStorage.getItem('user_role');
			password.value = window.localStorage.getItem('user_password');
			token.value = window.localStorage.getItem('user_acctoken');
			userprofile.src = window.localStorage.getItem('user_profile');
			//
			document.querySelector('#btn1').click();
		};
	}
	if (eventBody !== null) {
		eventBody.onload = () => {
			lock();
			const message = document.querySelector('#message');
			const main = document.querySelector('#main1');
			const div = document.querySelector('#div2');
			const loadingImage = document.querySelector('#imageloading');
			const url_params = {
				cache_bust: Date.now(),
				apiKey: keys.sheetson,
				spreadsheetId: keys.gsheet
			};
			const url = new URL(endpoints.eventdata);
			Object.keys(url_params).forEach((k) => url.searchParams.append(k,encodeURIComponent(url_params[k])));
			fetch(url)
			.then(res => res.json())
			.then(data => {
				div.style.height = 'auto';
				loadingImage.style.visibility = 'hidden';
				loadingImage.style.position = 'absolute';
				if (data.results.length == 0) { message.style.visibility = 'visible'; message.style.position = 'relative'; }
				else {
					message.style.visibility = 'hidden';
					message.style.position = 'absolute';
					div.style.justifyContent = 'flex-start';
					div.style.marginTop = '11vw';
					div.style.paddingBottom = '10vw';
					for (var i = 0; i < data.results.length; ++i) {
						if (data.results[i].Name === null) continue;
						const gen_event_info = () => {
							const div = document.createElement('div');
							div.className = 'div2_2';
							div.innerHTML += `
								<img style="margin-bottom: 2vw;" alt="event photo" src="`+data.results[i].Banner+`">
								<p style="margin-bottom: 0.5vw; font-size: 1.5vw">`+data.results[i].Date+`</h3>
								<h1 style="margin-bottom: 1.5vw; font-size: 2vw;">`+data.results[i].Name+`</h1>
								<p style="margin-bottom: 0.5vw; font-size: 1.5vw">+ Catered To `+data.results[i].CateredTo+` Students</h4>
								<p style="margin-bottom: 2vw; font-size: 1.5vw">+ `+data.results[i].Purpose+`</h4>
								<hr>
								<div style="display: flex; justify-content: flex-start; width: 100%; margin-top: 1.5vw;">
									<a 	id="regbutton" type="button" style="background: #0000EE; color: white; padding: 1vw; padding-left: 2vw; padding-right: 2vw; font-size: 1.5vw; border-radius: 0.7vw; text-decoration: none;"
										onmouseover=" document.getElementById('regbutton').style.background = '#4040FF';"
										onmouseleave="document.getElementById('regbutton').style.background = '#0000EE';"
										href="`+data.results[i].Link+`">Register</a>
								</div>
							`;
							return div;
						};
						document.querySelector('#div2').appendChild(gen_event_info());
					}
				}
			})
			.catch((e) => {
				showError(popup_error('No internet connection.<br>Click refresh button to reload.'));
				console.log(e);
			});
		};
	}
	if (indexBody !== null) {
		indexBody.onload = () => {
			console.log('Website loaded!');
		};
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LOGIN SCRIPT

function login_showpassword() { // show password
	var inpsw = document.getElementById('inputpassword');
	inpsw.type = (inpsw.type == 'password') ? 'text' : 'password';
}

function login_backbutton() { // back button
	var backbutton = document.querySelector('#backbutton');
	var inusr = document.querySelector('#inputusername');
	var inpsw = document.querySelector('#inputpassword');
	window.location.href = '../index.html';
}

function login_loginbutton() { // log in
	var in1 = document.querySelector('#inputusername'),
		in2 = document.querySelector('#inputpassword');
	if (in1.value.length === 0 || in2.value.length === 0) {
		showError(popup_error('Please fill out the form.'));
	} else {
		showMessage(popup_message('Logging in...'),25000);
		// read data
		const url_params = {
			cache_bust: Date.now(),
			apiKey: keys.sheetson,
			spreadsheetId: keys.gsheet
		};
		const url = new URL(endpoints.userdata);
		Object.keys(url_params).forEach((k) => url.searchParams.append(k,encodeURIComponent(url_params[k])));
		fetch(url,{
			method: 'GET',
			headers: { 'Authorization': 'Bearer ' + keys.sheetson, }
		})
		.then((res) => res.json())
		.then((data) => {
			var pass_error = document.querySelector('#passworderror'),
				user_error = document.querySelector('#usererror');
			var success = false, id = 0;
			for (var i = 0; i < data.results.length; ++i) {
				if (data.results[i].Username === in1.value || data.results[i].Email === in1.value) {
					success = true;
					id = i;
					break;
				}
			}
			// view error
			if (!success) {
				user_error.style.visibility = 'visible';
				user_error.style.position = 'relative';
			} else {
				user_error.style.visibility = 'hidden';
				user_error.style.position = 'absolute';
				// check for password input
				if (data.results[id].Password === in2.value) { // compare
					pass_error.style.visibility = 'hidden';
					pass_error.style.position = 'absolute';
					// flag user to be logged in
					const loc = id + 2;
					const url_new = endpoints.userdata + '/' + loc.toString();
					fetch(url_new,{
						method: 'PUT',
						headers: {
							'Authorization': 'Bearer ' + keys.sheetson,
							'X-Spreadsheet-Id': keys.gsheet,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							'Flag': 'Logged in'
						})
					})
					.then((res) => {
						if (res.status !== 200) return;
						// save data to local storage
						const user_datas = {
							'user_id': id+2,
							'user_username': data.results[id].Username,
							'user_password': data.results[id].Password,
							'user_name': data.results[id].Name,
							'user_email': data.results[id].Email,
							'user_contact': data.results[id].Contact,
							'user_gender': data.results[id].Gender,
							'user_role': data.results[id].Role,
							'user_dept': data.results[id].Department,
							'user_idNumber': data.results[id].IdNumber,
							'user_profile': data.results[id].Profile,
							'user_age': data.results[id].Age,
							'user_status': data.results[id].Status,
							'user_acctoken': data.results[id].AccountToken
						};
						Object.keys(user_datas).forEach((k) => window.localStorage.setItem(k,user_datas[k]));
						//
						window.location.href = 'dashboard.html'; // proceed to dashboard
					})
					.catch((e) => {
						showError(popup_error('Sorry for inconvenience, the server is down for a while.'));
						console.log(e);
					});
				} else {
					pass_error.style.visibility = 'visible';
					pass_error.style.position = 'relative';
				}
			}
		})
		.catch((e) => {
			showError(popup_error('No internet connection.'));
			console.log(e);
		});
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SIGN UP SCRIPT

var signupvars = {
	number: 1,
	over: 3,
	passcheck: false,
};

function signup_showpassword() {
	var p = document.querySelector('#passwordinput');
	var p2 = document.querySelector('#password2input');
	p.type = (p.type === 'text') ? 'password' : 'text';
	p2.type = (p2.type === 'text') ? 'password' : 'text';
}

function signup_backbutton() { // back button
	var err1 = document.querySelector('#err1');
	var err2 = document.querySelector('#err2');
	var err3 = document.querySelector('#err3');
	//
	err1.style.visibility = 'hidden'; err1.style.position = 'absolute';
	err2.style.visibility = 'hidden'; err2.style.position = 'absolute';
	err3.style.visibility = 'hidden'; err3.style.position = 'absolute';
	//
	var nxtc = document.querySelector('#counter');
	var nextbtn = document.querySelector('#nextbutton'),
		in1 = document.querySelector('#inputarea'),
		in2 = document.querySelector('#inputarea2'),
		in3 = document.querySelector('#inputarea3');
	if (signupvars.number === 1) window.location.href = '../index.html';
	switch (signupvars.number) {
		case 3: {
			document.getElementById('nextbutton').innerHTML = 'Next >';
			in3.style.visibility = 'hidden';
			in3.style.position = 'absolute';
			in2.style.visibility = 'visible';
			in2.style.position = 'relative';
			break;
		}
		case 2: {
			in2.style.visibility = 'hidden';
			in2.style.position = 'absolute';
			in1.style.visibility = 'visible';
			in1.style.position = 'relative';
			break;
		}
	}
	if (signupvars.number > 1) signupvars.number -= 1;
	nxtc.innerHTML = signupvars.number + '/' + signupvars.over;
}

function signup_nextbutton() { // next button
	var gopt = document.getElementsByName('genderopt');
	var nxtc = document.querySelector('#counter');
	var input1 = document.querySelector('#fullnameinput'),
		input2 = document.querySelector('#usernameinput'),
		input3 = document.querySelector('#emailinput'),
		input4 = document.querySelector('#passwordinput'),
		input5 = document.querySelector('#password2input'),
		input6 = document.querySelector('#dept'),
		input7 = document.querySelector('#scid'),
		input8 = document.querySelector('#role');
	var nextbutton = document.querySelector('#nextbutton');
	var ia1 = document.getElementById('inputarea'),
		ia2 = document.getElementById('inputarea2'),
		ia3 = document.getElementById('inputarea3');
	//
	var err1 = document.querySelector('#err1'),
		err2 = document.querySelector('#err2'),
		err3 = document.querySelector('#err3');
	//
	function nextpage() {
		if (signupvars.number < signupvars.over) signupvars.number += 1;
		nxtc.innerHTML = signupvars.number + '/' + signupvars.over;
		switch (signupvars.number) {
			case 2: {
				ia1.style.visibility = 'hidden'; ia1.style.position = 'absolute';
				ia2.style.visibility = 'visible'; ia2.style.position = 'relative';
				break;
			}
			case 3: {
				nextbutton.innerHTML = 'Submit';
				ia2.style.visibility = 'hidden'; ia2.style.position = 'absolute';
				ia3.style.visibility = 'visible'; ia3.style.position = 'relative';
				break;
			}
		}
	}
	if (nextbutton.innerHTML === 'Submit') { // form submition
		if (input6.options[input6.selectedIndex].value === '' || input7.value.length === 0 || input8.options[input8.selectedIndex].value === '') {
			showError(popup_error('Please fill out the form.'));
		} else {
			if (input7.value.length < input7.maxLength || input7.value.length > input7.maxLength) {
				err3.style.visibility = 'visible';
				err3.style.position = 'relative';
			} else {
				if (input6.options[input6.selectedIndex].value === null ||
					input8.options[input8.selectedIndex].value === null) {
					showError(popup_error('Please fill out the form.'));
				} else {
					err3.style.visibility = 'hidden'; err3.style.position = 'absolute';
					// checks if account already registered...
					const url = new URL(endpoints.userdata);
					const url_params = {
						cache_bust: Date.now(),
						apiKey: keys.sheetson,
						spreadsheetId: keys.gsheet
					};
					Object.keys(url_params).forEach((k) => url.searchParams.append(k,encodeURIComponent(url_params[k])));
					fetch(url,{ headers: { 'Authorization': 'Bearer ' + keys.sheetson } })
					.then((res) => res.json()) // convert to JSON
					.then(data => {
						// console.log(data);
						var alreadyRegistered = false;
						for (var i = 0; i < data.results.length; ++i) {
							if (input3.value == data.results[i].Email) { alreadyRegistered = true; break; }
						}
						if (alreadyRegistered) showError(popup_error('The email "' + input3.value + '" has already been taken.'));
						else {
							// add new data to the database
							const token = generateToken(20); // generates 20 character token
							const gender = (document.querySelector('#male').checked) ? document.querySelector('#male').value : document.querySelector('#female').value;
							const data = {
								Username: input2.value,
								Password: input5.value,
								Name: input1.value,
								Email: input3.value,
								Contact: document.querySelector('#contactinput').value,
								Gender: gender,
								Role: input8.options[input8.selectedIndex].value,
								Department: input6.options[input6.selectedIndex].value,
								IdNumber: input7.value,
								AccountToken: token,
								Profile: '../images/userprofiles/uprofile.png',
								Age: '-',
								Status: 'Single',
								Flag: 'Logged out'
							};
							const new_url = endpoints.userdata;
							fetch(new_url,{
								method: 'POST',
								headers: {
									'Authorization': 'Bearer ' + keys.sheetson,
									'X-Spreadsheet-Id': keys.gsheet,
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(data)
							})
							.then((res) => {
								if (res.ok) {
									showMessage(popup_message('Account created successfuly. <br>Redirecting to the login page'));
									window.location.href = 'login.html';
								}
							})
							.catch((e) => {
								showError(popup_error('Sorry for inconvenience, the server is down for a while.'));
								console.log(e);
							});
						}
					})
					.catch((e) => {
						showError(popup_error('No internet connection.'));
						console.log(e);
					});
				}
			}
		}
	} else {
		if (input1.value.length != 0 &&
			input2.value.length != 0 &&
			input3.value.length != 0) {
			if (signupvars.number == 2 && (input4.value.length == 0 || input5.value.length == 0)) {
				showError(popup_error('Please fill out the form.'));
			} else {
				if (signupvars.number == 2) {
					var password1 = input4.value, password2 = input5.value;
					if (password1.length >= 8) {
						// check captial letter
						var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', c = false;
						var schars = '!@#$%^&*()-=+{}/><:[]~`', s = false;
						for (var i = 0; i < password1.length; ++i) {
							for (var j = 0; j < chars.length; ++j) {
								if (password1.indexOf(chars[j]) !== -1) { c = true; break; }
							}
						}
						if (c) {
							// check special chars
							for (var i = 0; i < password1.length; ++i) {
								for (var j = 0; j < schars.length; ++j) {
									if (password1.indexOf(schars[j]) !== -1) { s = true; break; }
								}
							}
							if (s) {
								// compare passwords
								if (password2 == password1) {
									err1.style.visibility	= 'hidden'; err1.style.position 	= 'absolute';
									err2.style.visibility	= 'hidden'; err2.style.position 	= 'absolute';
									nextpage();
								} else {
									err1.style.visibility	= 'hidden'; err1.style.position 	= 'absolute'; // hide first error
									err2.style.visibility	= 'visible'; err2.style.position 	= 'relative'; // show second password
								}
							} else { err1.style.visibility	= 'visible'; err1.style.position 	= 'relative'; }
						} else { err1.style.visibility	= 'visible'; err1.style.position 	= 'relative'; }
					} else { err1.style.visibility	= 'visible'; err1.style.position 	= 'relative'; }
				} else nextpage();
			}
		} else showError(popup_error('Please fill out the form'));
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PROFILE SCRIPT

function profile_home() { // home
	window.location.href = 'dashboard.html';
}

function profile_savebutton() { // save changes
	// window.location.href = window.location.href;
	const	name = document.getElementById('input1'),
			age = document.getElementById('input2'),
			male = document.getElementById('input3'),
			female = document.getElementById('input4'),
			status = document.getElementById('select1'),
			email = document.getElementById('input5'),
			contact = document.getElementById('input6'),
			department = document.getElementById('select2');
	const gender_val = (male.checked) ? 'M' : 'F';
	const status_val = status.options[status.selectedIndex].value;
	const department_val = department.options[department.selectedIndex].value;
	const id = window.localStorage.getItem('user_id');
	const url = endpoints.userdata + '/' + id.toString();
	// update local storage
	window.localStorage.setItem('user_name',name.value);
	window.localStorage.setItem('user_age',age.value);
	window.localStorage.setItem('user_gender',gender_val);
	window.localStorage.setItem('user_status',status_val);
	window.localStorage.setItem('user_email',email.value);
	window.localStorage.setItem('user_contact',contact.value);
	window.localStorage.setItem('user_dept',department_val);
	//
	fetch(url,{
		method: 'PUT',
		headers: {
			'Authorization': 'Bearer ' + keys.sheetson,
			'X-Spreadsheet-Id': keys.gsheet,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			Name: name.value,
			Age: age.value,
			Gender: gender_val,
			Status: status_val,
			Email: email.value,
			Contact: contact.value,
			Department: department_val
		})
	})
	.then((res) => {
		if (res.ok) showMessage(popup_message('Changes saved.'));
		else showError(popup_error('Unable to save changes.'));
	})
	.catch((e) => {
		showError(popup_error('Unable to save changes.<br>No internet connection.'));
		console.log(e);
	});
}

function profile_imagebutton() { // profile pic
	if (window.localStorage.getItem('user_username') === null) return;
	//
	const input = document.createElement('input');
	const userprofile = document.querySelector('#userprofile');
	input.type = 'file';
	input.accept = 'image/*';
	input.addEventListener('change',(event) => {
		// upload image to server
		const form = new FormData();
		form.append('file',event.target.files[0]);
		form.append('upload_preset','oz_unsigned_preset');
		const url = endpoints.imagedata;
		//
		fetch(url,{
			method: 'POST',
			body: form
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			window.localStorage.setItem('user_profile_id',data.public_id);
			window.localStorage.setItem('user_profile',data.url);
			userprofile.src = window.localStorage.getItem('user_profile');
			// save to database
			const id = window.localStorage.getItem('user_id');
			const new_url = endpoints.userdata + '/' + id.toString();
			fetch(new_url,{
				method: 'PUT',
				headers: {
					'Authorization': 'Bearer ' + keys.sheetson,
					'X-Spreadsheet-Id': keys.gsheet,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					Profile: data.url
				})
			})
			.then(res => {
				if (res.ok) showInfo(popup_info('Profile picture updated.'));
			})
			.catch((e) => {
				showError(popup_error('Sorry for inconvenience, the server is down for a while.'));
				console.log(e);
			});
		})
		.catch((e) => {
			showError(popup_error('Unable to update profile picture, <br>please try again.'));
			console.log(e);
		});
	});
	input.click();
}

function profile_generalbutton() { // general
	const d1 = document.getElementById('div4');
	const d2 = document.getElementById('div5');
	const d3 = document.getElementById('div6');
	const d4 = document.getElementById('div7');
	d1.style.visibility = 'visible';
	d2.style.visibility = 'hidden';
	d3.style.visibility = 'hidden';
	d4.style.visibility = 'hidden';
	d1.style.position = 'relative';
	d2.style.position = 'absolute';
	d3.style.position = 'absolute';
	d4.style.position = 'absolute';
	document.querySelector('#btn1').style.border = 'solid white 2px';
	document.querySelector('#btn2').style.border = 'none';
	document.querySelector('#btn3').style.border = 'none';
	document.querySelector('#btn4').style.border = 'none';
	document.querySelector('#btn1').style.color = 'lightgreen';
	document.querySelector('#btn2').style.color = 'white';
	document.querySelector('#btn3').style.color = 'white';
	document.querySelector('#btn4').style.color = 'white';
}

function profile_requestsbutton() { // requests
	const d1 = document.getElementById('div4');
	const d2 = document.getElementById('div5');
	const d3 = document.getElementById('div6');
	const d4 = document.getElementById('div7');
	d1.style.visibility = 'hidden';
	d2.style.visibility = 'visible';
	d3.style.visibility = 'hidden';
	d4.style.visibility = 'hidden';
	d1.style.position = 'absolute';
	d2.style.position = 'relative';
	d3.style.position = 'absolute';
	d4.style.position = 'absolute';
	document.querySelector('#btn1').style.border = 'none';
	document.querySelector('#btn2').style.border = 'solid white 2px';
	document.querySelector('#btn3').style.border = 'none';
	document.querySelector('#btn4').style.border = 'none';
	document.querySelector('#btn1').style.color = 'white';
	document.querySelector('#btn2').style.color = 'lightgreen';
	document.querySelector('#btn3').style.color = 'white';
	document.querySelector('#btn4').style.color = 'white';
	// get requests data
}

function profile_eventjoinedbutton() { // event joined
	const d1 = document.getElementById('div4');
	const d2 = document.getElementById('div5');
	const d3 = document.getElementById('div6');
	const d4 = document.getElementById('div7');
	d1.style.visibility = 'hidden';
	d2.style.visibility = 'hidden';
	d3.style.visibility = 'visible';
	d4.style.visibility = 'hidden';
	d1.style.position = 'absolute';
	d2.style.position = 'absolute';
	d3.style.position = 'relative';
	d4.style.position = 'absolute';
	document.querySelector('#btn1').style.border = 'none';
	document.querySelector('#btn2').style.border = 'none';
	document.querySelector('#btn3').style.border = 'solid white 2px';
	document.querySelector('#btn4').style.border = 'none';
	document.querySelector('#btn1').style.color = 'white';
	document.querySelector('#btn2').style.color = 'white';
	document.querySelector('#btn3').style.color = 'lightgreen';
	document.querySelector('#btn4').style.color = 'white';
}

function profile_securitybutton() { // security
	const d1 = document.getElementById('div4');
	const d2 = document.getElementById('div5');
	const d3 = document.getElementById('div6');
	const d4 = document.getElementById('div7');
	d1.style.visibility = 'hidden';
	d2.style.visibility = 'hidden';
	d3.style.visibility = 'hidden';
	d4.style.visibility = 'visible';
	d1.style.position = 'absolute';
	d2.style.position = 'absolute';
	d3.style.position = 'absolute';
	d4.style.position = 'relative';
	document.querySelector('#btn1').style.border = 'none';
	document.querySelector('#btn2').style.border = 'none';
	document.querySelector('#btn3').style.border = 'none';
	document.querySelector('#btn4').style.border = 'solid white 2px';
	document.querySelector('#btn1').style.color = 'white';
	document.querySelector('#btn2').style.color = 'white';
	document.querySelector('#btn3').style.color = 'white';
	document.querySelector('#btn4').style.color = 'lightgreen';
}

function profile_changepasswordbutton() {
	window.location.href = 'redirect/reset.html';
}

function profile_showpassword() {
	const password = document.querySelector('#passinput');
	password.type = (password.type === 'password') ? 'text' : 'password';
}

function profile_deletebutton() {
	var confirmation = () => {
		const div = document.createElement('div');
		div.id = 'delete-account-div';
		div.style.display = 'flex';
		div.style.position = 'absolute';
		div.style.justifyContent = 'center';
		div.style.alignItems = 'center';
		div.style.background = 'none';
		div.style.width = '100%';
		div.style.height = '100%';
		div.style.zIndex = '10';
		div.style.top = '0';
		div.style.left = '0';
		div.style.right = '0';
		div.style.bottom = '0';
		div.style.backdropFilter = 'blur(5px)';
		div.innerHTML += `
			<div style="
					position: absolute; 
					display: flex; 
					flex-direction: column;
					top: 50%; 
					left: 50%;
					transform: translate(-50%,-50%);
					width: 35%;
					height: 20%;
					z-index: 10;
					background: #1F1F29;
					border: solid white 0.07vw;
					border-radius: 0.7vw;
					padding: 1.5vw;
					backdrop-filter: blur(5px);
				"
			>
				<h3 style="background: none;">Are you sure you want to delete your account?</h3>
				<div 
					style="
						margin-top: 2vw;
						display: flex;
						justify-content: space-between;
						gap: 0.7vw;
					"
				>
					<button 
						class="delete-div-button"
						type="button" 
						onclick="profile_confirm_deletebutton()"
						style="
							/* background: #DD0000; */ 
							border: none; 
							border-radius: 0.7vw; 
							padding: 1vw; 
							padding-left: 2vw; 
							padding-right: 2vw;
							font-size: 1.5vw;
						"
					>Yes</button>
					<button 
						class="no-div-button"
						type="button" 
						onclick="document.querySelector('#delete-account-div').remove()" 
						style="
							/* background: #63E973; */
							border: none; 
							border-radius: 0.7vw; 
							padding: 1vw; 
							padding-left: 2vw; 
							padding-right: 2vw;
							font-size: 1.5vw;
							color: black;
						"
					>No</button>
				</div>
			</div>
		`;
		return div;
	};
	document.body.appendChild(confirmation());
}

function profile_confirm_deletebutton() {
	if (window.localStorage.getItem('user_username') === null) return;
	const id = window.localStorage.getItem('user_id');
	const url = endpoints.userdata + '/' + id;
	fetch(url,{
		method: 'DELETE',
		headers: {
			'Authorization': 'Bearer ' + keys.sheetson,
			'X-Spreadsheet-Id': keys.gsheet
		}
	})
	.then(res => {
		if (!res.ok) showError(popup_error('Unable to delete account.'));
		window.localStorage.clear();
		window.location.href = '../index.html';
	})
	.catch((e) => {
		showError(popup_error('No internet connection.'));
		console.log(e);
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DASHBOARD SCRIPT

function dashboard_menubutton() { // showmenu
	var menuc = document.querySelector('#menucontainer');
	var menu = document.querySelector('#menu');
	menuc.style.visibility = (menuc.style.visibility === 'hidden') ? 'visible' : 'hidden';
	if (menuc.style.visibility === 'visible') {
		menu.style.transform = 'translateX(1vw)';
		menu.style.transition = 'all 300ms ease-in-out';
	} else {
		menu.style.transition = 'all 300ms ease-in-out';
		menu.style.transform = 'translateX(100vw)';
	}
}

function dashboard_logoutbutton() { // log out
	if (window.localStorage.getItem('user_username') === null) return;
	showMessage(popup_message('Logging out'));
	// flag as log out
	const id = window.localStorage.getItem('user_id');
	const url = endpoints.userdata + '/' + id.toString();
	fetch(url,{
		method: 'PUT',
		headers: {
			'Authorization': 'Bearer ' + keys.sheetson,
			'X-Spreadsheet-Id': keys.gsheet,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'Flag': 'Logged out'
		})
	})
	.then((res) => {
		window.localStorage.clear();
		window.location.href = '../index.html';
	});
}

function dashboard_faqbutton() { // faq
	const fc = document.querySelector('#faqcontainer');
	const fs = document.querySelector('#faqsection');
	const loadingimg = document.querySelector('#loadingimg');
	if (fc.style.visibility === 'hidden') {
		fc.style.visibility = 'visible';
		// show loading screen
		loadingimg.style.visibility = 'visible';
		loadingimg.style.position = 'relative';
		// fetch datas
		const url_params = {
			cache_bust: Date.now(),
			apiKey: keys.sheetson,
			spreadsheetId: keys.gsheet
		};
		const url = new URL(endpoints.faqdata);
		Object.keys(url_params).forEach((k) => url.searchParams.append(k,encodeURIComponent(url_params[k])));
		fetch(url)
		.then((r) => r.json())
		.then((data) => {
			// hide loading screen
			loadingimg.style.visibility = 'hidden';
			loadingimg.style.position = 'absolute';
			if (data.results.length == 0) {
				document.querySelector('#faqmessage').style.visibility = 'visible';
				document.querySelector('#faqmessage').style.positive = 'relative';
			} else {
				document.querySelector('#faqsection').style.justifyContent = 'flex-start';
				document.querySelector('#faqsection').style.flexDirection = 'column';
				document.querySelector('#faqsection').style.paddingBottom = '7vw';
				document.querySelector('#faqsection').style.overflow = 'scroll';
				for (var i = 0; i < data.results.length; ++i) {
					if (data.results[i].Question !== null) {
						// show formatted datas
						const number = i + 1;
						document.querySelector('#faqsection').innerHTML += ` \
							<div class="faqbox" id="faqbox" style="margin-top: 4vw; width: 100%">
								<h1>Q`+number.toString()+`: `+data.results[i].Question+`<br><br></h1>
								<p style="font-size: 1.7vw; color: lightgreen;">Answer: `+data.results[i].Answer+`<br><br><br></p>
								<hr>
							</div>
						`;
					}
				}
			}
		})
		.catch((e) => {
			showError(popup_error('No internet connection.'));
			fs.innerHTML = '<h2 style="color: red;">Failed to load FAQs<br>Reason: No internet</h2>';
			console.log(e);
		});
	} else {
		fc.style.visibility = 'hidden';
		loadingimg.style.visibility = 'hidden';
		loadingimg.style.position = 'absolute';
	}
}

function dashboard_eventbutton() { // event
	window.location.href = 'services/event.html';
}

function dashboard_requestbutton() { // request
	window.location.href = 'services/request.html';
}

function dashboard_calendarbutton() { // calendar
	
}

function dashboard_mapbutton() { // map
	
}

function dashboard_toolsbutton() { // tools
	const a1 = document.querySelector('#items');
	a1.style.visibility = (a1.style.visibility === 'visible') ? a1.style.visibility = 'hidden' : a1.style.visibility = 'visible';
	// admin button
	if (window.localStorage.getItem('user_role') === 'Admin' && a1.style.visibility == 'visible') {
		a1.innerHTML += `
			<button id="faq-button" type="button" onclick="">Generate FAQ's</button>
		`;
	} else document.querySelector('#faq-button').remove();
}

function dashboard_posteventbutton() { // post event
	const div = document.getElementById('post-event-main-div');
	div.style.visibility = (div.style.visibility == 'hidden') ? 'visible' : 'hidden';
}

function dashboard_show_post_event_menu() {
	document.querySelector('#post-event-main-div').style.visibility = 'hidden';
}

function dashboard_managerequestsbutton() { // manage requests
	
}

function dashboard_showdescription1() {
	const a = document.querySelector('#desc1');
	a.style.visibility = (a.style.visibility === 'hidden') ? a.style.visibility = 'visible' : a.style.visibility = 'hidden';
	a.style.position = (a.style.position === 'absolute') ? a.style.position = 'relative' : a.style.position = 'absolute';
}

function dashboard_showdescription2() {
	const a = document.querySelector('#desc2');
	a.style.visibility = (a.style.visibility === 'hidden') ? a.style.visibility = 'visible' : a.style.visibility = 'hidden';
	a.style.position = (a.style.position === 'absolute') ? a.style.position = 'relative' : a.style.position = 'absolute';
}

function dashboard_showdescription3() {
	const a = document.querySelector('#desc3');
	a.style.visibility = (a.style.visibility === 'hidden') ? a.style.visibility = 'visible' : a.style.visibility = 'hidden';
	a.style.position = (a.style.position === 'absolute') ? a.style.position = 'relative' : a.style.position = 'absolute';
}

function dashboard_showdescription4() {
	const a = document.querySelector('#desc4');
	a.style.visibility = (a.style.visibility === 'hidden') ? a.style.visibility = 'visible' : a.style.visibility = 'hidden';
	a.style.position = (a.style.position === 'absolute') ? a.style.position = 'relative' : a.style.position = 'absolute';
}

function dashboard_submiteventpost() {
	// prepare all data
	const 	title = document.getElementById('event-name').value,
			date_and_time = document.getElementById('event-date').value + '_' + document.getElementById('event-time').value,
			catered_to = document.getElementById('event-cat').value,
			banner_image = document.getElementById('event-banner').files[0],
			desc = document.getElementById('event-desc').innerHTML;
	// ready to fetch to event data
	
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FORGOT SCRIPT

function forgot_submitbutton() {
	// get data of the user first
	const email_input = document.getElementById('emailinput');
	const url_params = {
		cache_bust: Date.now(),
		apiKey: keys.sheetson,
		spreadsheetId: keys.gsheet
	};
	const url = new URL(endpoints.userdata);
	Object.keys(url_params).forEach((k) => url.searchParams.append(k,encodeURIComponent(url_params[k])));
	fetch(url)
	.then((res) => res.json())
	.then((data) => {
		// console.log(data);
		//get id
		var id = 0, user_password = null, found_it = false;
		for (var i = 0; i < data.results.length; ++i) {
			if (email_input.value === data.results[i].Email) {
				id = i;
				user_password = data.results[i].Password;
				found_it = true;
				break;
			}
		}
		if (found_it) {
			// send an email
			const 	usrname = data.results[id].Name,
					usrusername = data.results[id].Username,
					usrpassword = data.results[id].Password;
			var email_data = {
				service_id: keys.email.serviceId,
				template_id: keys.email.templateId.forgotPass,
				user_id: keys.email.userId,
				template_params: {
					'email': email_input.value,
					'name': usrname,
					'username': usrusername,
					'password': usrpassword
				}
			};
			fetch(endpoints.emailapi,{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(email_data)
			})
			.then((res) => {
				res.text();
				if (res.ok) {
					showInfo(popup_info('Email sent.'));
					window.location.href = '../login.html';
				}
			})
			.catch((e) => {
				showError(popup_error('Could not send the email, <br>please make sure the email address is available.'));
				console.error(e);
			});
		} else {
			showError(popup_error('There is no account registered in this email account.'));
		}
	})
	.catch((e) => {
		showError(popup_error('No internet connection.'));
		console.error(e);
	});
}
