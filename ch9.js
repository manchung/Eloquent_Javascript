// car and cat
let reg = /ca[rt]/;

// console.log(reg.exec('car'));
// console.log(reg.exec('cat'));
// console.log(reg.exec('ca'));

// pop and prop
reg = /pr?op/;

// console.log(reg.exec('pop'));
// console.log(reg.exec('prop'));
// console.log(reg.exec('prrop'));

// ferret, ferry and ferrari
reg = /ferr(et|y|ari)/;

// console.log(reg.exec('ferret'));
// console.log(reg.exec('ferry'));
// console.log(reg.exec('ferrari'));
// console.log(reg.exec('ferr'));

// Any word ending in ious
reg = /\b\w*ious\b/;

// console.log(reg.exec('pious'));
// console.log(reg.exec('piousa'));
// console.log(reg.exec('%ious'));

// A white space character, followed by a period, comma, colon or semicolon
reg = / [\.,:;]/;
// console.log(reg.exec(' '));
// console.log(reg.exec(' .'));
// console.log(reg.exec('  '));
// console.log(reg.exec(' ;'));

// A word longer than 6 letters
reg = /\w{7,}/;
// console.log(reg.exec('manch'));
// console.log(reg.exec('123456'));
// console.log(reg.exec('      '));
// console.log(reg.exec('123abcd'));

// A word without the letter e or E
reg = /\b[^eE\s]+\b/;
// console.log(reg.exec('manch'));
// console.log(reg.exec('mEnch'));
// console.log(reg.exec('mememe i'));
// console.log(reg.exec(''));

// Change single quotes in a dialog to double quotes, without changing words like aren't
reg = /'([^a-z])/gi;
string = "jon said: 'i don't give a damn.'\nmary said: 'but i do'\n'Too bad!' jon said."
new_string = string.replace(/([^a-z])'/gi, '$1"').replace(/'([^a-z])/gi, '"$1');
console.log(new_string)

