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
  if (!cachedData) {
    console.error("No cached data available for display.");
    return;
  }

  const container = document.getElementById("osuScores");
  if (!container) {
    console.error("Error: Element with ID 'osuScores' not found.");
    return;
  }

  container.innerHTML = "";

  cachedData.forEach((score) => {
    let link = document.createElement("a");
    link.href = score.url;
    link.target = "_blank";

    let section = document.createElement("section");

    let box = document.createElement("div");
    box.className = "box";
    box.style.backgroundColor = "aquamarine";

    let title = document.createElement("h3");
    title.innerHTML = `<strong>${score.beatmap}</strong>`;

    let mods = document.createElement("p");
    mods.innerText = score.mods;

    box.appendChild(title);
    box.appendChild(mods);
    section.appendChild(box);
    link.appendChild(section);
    container.appendChild(link);
  });
}

displayTopPlays();
