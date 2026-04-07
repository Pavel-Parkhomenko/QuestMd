import { IExercise } from "@/types";

// function checkBlankText(data, endIndex) {
//   const blankText = data.substring(0, endIndex);
//   if (blankText.length !== 0) {
//     beginText = blankText;
//   }
// }

function parseDetails(htmlText: string): IExercise[] {
  const exercises: IExercise[] = [];

  // Разбиваем на блоки details
  const detailsBlocks = htmlText.split(/<details>/);

  for (let i = 1; i < detailsBlocks.length; i++) {
    const block = detailsBlocks[i];

    // Извлекаем вопрос из <summary>
    const summaryMatch = block.match(/<summary>(.*?)<\/summary>/);
    const quest = summaryMatch ? summaryMatch[1].trim() : "";

    // Извлекаем ответ из <p>
    const pMatch = block.match(/<p>([\s\S]*?)<\/p>/);
    let answer = pMatch ? pMatch[1].trim() : "";

    // Убираем "---" в конце
    answer = answer.replace(/---\s*$/, "").trim();

    if (quest && answer) {
      exercises.push({ quest, answer });
    }
  }

  return exercises;
}

async function getDataFromMd(): Promise<{ ok: boolean; data: IExercise[] }> {
  try {
    const response = await fetch("http://localhost:3000/read-file");
    if (!response.ok) throw new Error();
    const data = await response.text();
    const dataDetails = parseDetails(data);
    return { ok: true, data: dataDetails };
  } catch {
    return { ok: false, data: [] };
  }
}

export { getDataFromMd };
