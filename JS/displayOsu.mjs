import { promises as fs } from "fs";
const cacheFilePath = "cache.json";

async function readCache() {
  try {
    const data = await fs.readFile(cacheFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.warn("No cache found for display.");
    return null;
  }
}

async function displayTopPlays() {
  const cachedData = await readCache();
  if (!cachedData) return; // No need for additional error logging.

  const container = document.getElementById("osuScores");
  if (!container) return console.error("Error: Element with ID 'osuScores' not found.");

  container.innerHTML = "";

  cachedData.forEach((score) => {
    if (!score.url) return; 

    const link = document.createElement("a");
    link.href = score.url;
    link.target = "_blank";

    const section = document.createElement("section");
    const box = document.createElement("div");
    box.className = "box";

    const title = document.createElement("h3");
    title.textContent = score.beatmap; 

    const mods = document.createElement("p");
    mods.textContent = score.mods;

    box.append(title, mods);
    section.appendChild(box);
    link.appendChild(section);
    container.appendChild(link);
  });
}

displayTopPlays();
