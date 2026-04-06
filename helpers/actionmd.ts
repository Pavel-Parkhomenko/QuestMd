import fs from "fs/promises";

let beginText = "";

const ST_DET: string = "<details>";
const END_DET: string = "</details>";

async function readFile(nameFile: string) {
  try {
    const data = await fs.readFile(nameFile, "utf8");
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Ошибка: возможно файла не существует!");
  }
}

function checkBlankText(data: string, endIndex: number) {
  const blankText = data.substring(0, endIndex);
  if (blankText.length !== 0) {
    beginText = blankText;
  }
}

function parseDetails(data: string) {
  if (data.length === 0) return 0;

  const result = [];
  let startIndex = 0;

  checkBlankText(data, data.indexOf(ST_DET, startIndex));

  while (true) {
    const openIndex = data.indexOf(ST_DET, startIndex);
    if (openIndex === -1) break;

    const closeIndex = data.indexOf(END_DET, openIndex + ST_DET.length);
    if (closeIndex === -1) break;

    const block = data.substring(openIndex, closeIndex + END_DET.length);

    const matchQuestions = block.match(/<summary>(.*?)<\/summary>/);
    const questions = matchQuestions ? matchQuestions[1] : "";

    const matchQAnswer = block.match(/<p>(.*?)<\/p>/);
    const answer = matchQAnswer ? matchQAnswer[1] : "";

    result.push({
      questions,
      answer,
    });

    startIndex = closeIndex + END_DET.length;
  }

  return result;
}

async function getDataFromMd() {
  let data = await readFile("data.md");
  let res = parseDetails(data);
  return res;
}

export { getDataFromMd };
