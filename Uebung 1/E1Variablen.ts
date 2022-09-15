let wertAusLibrary: any = 5;
wertAusLibrary += 1;
console.log(wertAusLibrary);

let number2: number = <number><any>wertAusLibrary;
console.log(++number2);

wertAusLibrary = <number>wertAusLibrary;
wertAusLibrary += 1;
console.log(wertAusLibrary);

var str = '1';
var str2: number = <number><any>str;   //str2 is now of type number
console.log(typeof (str2));
