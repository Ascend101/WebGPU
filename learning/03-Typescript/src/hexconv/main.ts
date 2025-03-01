import {hex_lookup} from "./lib/const/lookups";
import {binary_to_hex, dec_to_binary} from "./lib/conv";
import {group_binary} from "./lib/format";

const decimal_input: HTMLInputElement = <HTMLInputElement>document.getElementById("decimalInput");
const conversion_button: HTMLElement = <HTMLElement>document.getElementById("convert-button");
const binary_step: HTMLElement = <HTMLElement>document.getElementById("binary-raw");
const grouped_binary_step: HTMLElement = <HTMLElement>document.getElementById("binary-grouped");
const grouped_hex_step: HTMLElement = <HTMLElement>document.getElementById("hexadecimal-grouped");
const hex_output: HTMLElement = <HTMLElement>document.getElementById("hexadecimal");

const click:()=>void = () => {
  let binary: string = dec_to_binary(Number(decimal_input.value));
  binary_step.innerText = "binary: " + binary;
  
  let tempStr : string = "grouped: ";
  const grouped_binary = group_binary(binary);
  for (let i = 0; i < grouped_binary.length; i++) {
      tempStr += grouped_binary[i] + " ";
  }
  grouped_binary_step.innerText = tempStr;

  tempStr = "hex (grouped): ";
  for (let i = 0; i < grouped_binary.length; i++) {
      tempStr += String(binary_to_hex(grouped_binary[i])) + " ";
  }
  grouped_hex_step.innerText = tempStr;

  tempStr = "final: 0x";
  for (let i = 0; i < grouped_binary.length; i++) {
      tempStr += String(hex_lookup[binary_to_hex(grouped_binary[i])]);
  }
  hex_output.innerText = tempStr;
}

conversion_button.addEventListener("click", click);