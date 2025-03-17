// try {
import * as osu from "osu-api-v1-js";
const api = new osu.API(process.env.OSU_API_KEY);
// } catch {
//   console.warn("Are you displaying to the user or attempting to update? Please check for errors");
// }

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

async function writeCache(data) {
  try {
    await fs.writeFile(cacheFilePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("Cache updated.");
  } catch (error) {
    console.error("Failed to write cache:", error);
  }
}

async function fetchTopPlays() {
  try {
    let scores = await api.getUserBestScores(3, osu.Gamemodes.OSU, { username: "hobospider132" });

    const results = await Promise.all(scores.map(async (score) => {
      let beatmap = await api.getBeatmap({ beatmap_id: score.beatmap_id }, score.enabled_mods);
      let beatmap_url = osu.getURL.toOpen.beatmap({ beatmap_id: score.beatmap_id }).replace("osu://", "https://osu.ppy.sh/");
      let mapLength = osu.getLength(beatmap.total_length);
      let x = `${beatmap.artist} - ${beatmap.title} [${beatmap.version}]`;
      let y = `+${(score.enabled_mods || []).map((m) => osu.Mods[m] || "No Mod").join(", ")} (${beatmap.difficultyrating}*)`;

      return {
        beatmap: x,
        mods: y,
        length: mapLength,
        url: beatmap_url
      };
    }));
    // console.log is more for the github workflow logs on my end so I can check that it's working before I see cache.json
    // user end won't really see the results of this unless they check cache.json themselves
    console.log(results);
    await writeCache(results);
    
  } catch (error) {
    console.error("Error fetching top plays:", error);
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

fetchTopPlays();
