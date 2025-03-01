export function dec_to_binary(number:number) : string{
  var digits : string[] = [];

  while (number > 0) {
      var digit: string = String(number % 2);
      number = (number - (number % 2))/ 2;
      digits.push(digit);
  }
  return digits.reverse().join("");
}

export function binary_to_hex(number:string) : number{
  let result:number = 0;

  for (let i = 0; i < 4; i++) {
      result += Number(number[i]) * 2**(3 - i);
  }

  return result;
}
