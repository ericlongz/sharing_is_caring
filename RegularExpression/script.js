const fs = require('fs');

const regularExpression = (_fileName, _pattern) => {
	const dataFile = String.raw`/Users/ericwu/Documents/sharing_is_caring/RegularExpression/ExerciseInputFiles/`;
	const fileName = _fileName;
	const myRe = new RegExp(_pattern);

	const data = fs
		.readFileSync(dataFile + fileName, 'utf-8')
		.trim()
		.split('\r\n');
	console.log(data);

	// for (let i in data) {
	// 	console.log(myRe.test(data[i]));
	// }

	const result = data.filter((value) => myRe.test(value));
	console.log(result);
};

// 'string' + '*' untuk ngambil word yang mengandung string (contoh string 'a') baik jumlahnya 0 atau lebih dari 0 di tengah 'foo' dan 'bar'
// regularExpression('regex01.txt', 'fooa*bar');

// '.' untuk mengambil word yang mengandung string apapun ditengah 'foo' dan 'bar'
// regularExpression('regex02.txt', 'foo.bar');

// '.' + '*' untuk mengambil word yang mengandung string apapun ditengah 'foo' dan 'bar' baik jumlahnya 0 atau lebih dari 0
// regularExpression('regex03.txt', 'foo.*bar');

// '\s' untuk mengambil whitespace di tengah 'foo' dan 'bar'
// regularExpression('regex04.txt', String.raw`foo\s*bar`);

// ['string''string'] untuk mencari word yang memuat string spesific
// regularExpression('regex05.txt', '[fcl]oo');
// regularExpression('regex06.txt', '[fcdplb]oo');

// [^'string''string'] untuk exclude string tertentu dalam pattern
// regularExpression('regex07.txt', '[^mh]oo');

// '['string'-'string']' untuk set range character misalnya a-c artinya cari word yang mengandung huruf a sampai c
// regularExpression('regex08.txt', '[j-m]oo');
// regularExpression('regex09.txt', '[j-mz]oo');
// regularExpression('regex10.txt', '[j-mJ-Mz]oo');

// '\' escape character untuk skip character tersebut agar tidak dibaca sebagai fungsi tertentu namun murni sebagai character
// regularExpression('regex11.txt', String.raw`x*\.y*`);

// kalau di dalam kurung siku '.' ditreat sebagai character literal sehingga tidak perlu escape char. Namun untuk string ^ tetap perlu diescape karena memiliki arti tersendiri di dalam kurung siku
// regularExpression('regex12.txt', 'x[#:.]y');
// regularExpression('regex13.txt', String.raw`x[#:\^]y`);
// regularExpression('regex14.txt', String.raw`x[#\\\^]y`);

// anchor tag atau caret symbol ^ untuk mengambil kata2 yang dimulai dengan huruf atau beberapa huruf tertentu, sedangkan $ kebalikannya ^
// regularExpression('regex15.txt', '^foo.*');
// regularExpression('regex16.txt', '.*bar$');
// regularExpression('regex17.txt', '^foo$');

// {} untuk nunjukin berapa jumlah repetisi dari suatu pattern
// regularExpression('regex18.txt', '^[0-9]{3}$');
// regularExpression('regex19.txt', '^[a-z]{4,6}$');

// () untuk grouping beberapa character sebagai 1 kesatuan untuk {} apabila kita menuliskan 1 digit angka diikuti dengan , maka itu menunjukkan repetisi itu sebanyak digit angka yang kita tulis hingga seterusnya
// regularExpression('regex20.txt', '(ha){4,}');
// regularExpression('regex21.txt', '^(ha){0,2}$');

// + untuk memastikan occurrence dari suatu string itu lebih dari 1 dalam suatu kata
// regularExpression('regex22.txt', 'fooa+bar');

// ? untuk memastikan string muncul 0 atau 1 kali dalam kata
// regularExpression('regex23.txt', 'https?://website');

// | sebagai or pilih a atau b a|b
// regularExpression('regex24.txt', '(ply|log|red)wood');

const regexRepl = (_fileName, _pattern1, _pattern2) => {
	const dataFile = String.raw`/Users/ericwu/Documents/sharing_is_caring/RegularExpression/ExerciseInputFiles/`;
	const fileName = _fileName;
	const pattern1 = new RegExp(_pattern1);
	// console.log(pattern1);

	const data = fs
		.readFileSync(dataFile + fileName, 'utf-8')
		.trim()
		.split('\r\n');
	console.log(data);

	const result = [];
	for (let value in data) {
		result.push(data[value].replace(pattern1, _pattern2));
	}

	console.log(result);
};

// find and replace in regex javascript use $1 ext untuk nunjukin group 1 dst
// regexRepl('regex25.txt', '([0-9]+)x([0-9]+)', '$1 pix by $2 pix');
// regexRepl('regex26.txt', String.raw`([a-zA-Z]+)\s([a-zA-Z]+)`, '$2,$1');
// regexRepl('regex27.txt', '([0-9]{1,2}):([0-9]{2})', '$2 mins past $1');
// regexRepl('regex28.txt', String.raw`[0-9]+\.[0-9]+\.([0-9]+)`, 'xxx.xxx.$1');
// regexRepl(
// 	'regex29.txt',
// 	String.raw`([a-zA-Z]{3})\s([0-9]{1,2})[a-z]{2}\s[0-9]{2}([0-9]{2})`,
// 	'$2-$1-$3'
// );
// regexRepl('regex30.txt', String.raw`\(([0-9]{3})\)(.+)`, '$1$2');

// Challenge
regularExpression('challenge.txt', String.raw`^[^\s]+@[a-z]+\.[a-z]+`);
