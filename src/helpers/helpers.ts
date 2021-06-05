export function replaceSpecialCharacters(
  character: string,
  data: string
): string {
  const regExp = new RegExp(character, "g");
  return data.replace(regExp, "'");
}

export function returnFilteredArrayFromString(
  data: string,
  firstSplit: string,
  secondSplit?: string,
  length?: number
): string[] {
  let filteredArray: string[] = [];
  filteredArray = data.split(firstSplit);
  if (secondSplit) {
    let secondSplitFilteredArray = [...filteredArray];
    filteredArray = [];
    secondSplitFilteredArray.forEach((element) => {
      filteredArray.push(...element.split(secondSplit));
    });
  }
  if (length) {
    filteredArray = filteredArray.filter((element) => element.length > length);
  }
  return filteredArray;
}
