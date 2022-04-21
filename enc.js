const fs = require("fs");
const ps = require('prompt-sync')

class String {
	constructor(_string) {
		this.string = _string;
		this.key = this.calculateKey();
		this.encrypted = this.encrypt();
	}
	calculateKey() {
		let key = "";
		let phrase =
			"ABCDEFGHIJKLMNOPQRSTVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
		for (let i = 0; i < this.string.length; i++) {
			let random = Math.floor(Math.random() * phrase.length);
			key += phrase[random];
		}
		return key;
	}
	encrypt() {
		let enc = "";
		let split = this.string.split("");
		for (let i = 0; i < split.length; i++) {
			enc += split[i] + this.key;
		}
		return enc;
	}
	write() {
		let data = `${this.encrypted}\n\nKey : ${this.key}\n\nDo not lose this encryption key`
		fs.writeFileSync("enc.txt", data)
		console.log("Written to enc.txt");
	}
}

(function () {
	console.clear();
	console.log("");
	let prompt = ps()
	let input = prompt("text ? ")
	const message = new String(input);
	console.log(`Encrypted : ${message.encrypted}\n`);
	console.log(`Decryption Key : ${message.key}\n\nDo not lose this key`);
	console.log("");
	let choice = prompt("save output (y or n) ? ");
	switch (choice) {
		case 'y':
			message.write()
			break;
		case 'n':
			process.exit()
	}
})();
