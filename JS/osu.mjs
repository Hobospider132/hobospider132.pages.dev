import * as osu from "osu-api-v1-js";
import cacheData from "./cache.json";

const api = new osu.API(process.env.OSU_API_KEY);
const CACHE_TTL = 60 * 60 * 1000;

export function displayTopPlays(data) {
  const container = document.getElementById("osuScores");
  if (!container) {
    console.error("Element with ID 'osuScores' not found.");
    return;
  }

  container.innerHTML = "";
  data.forEach((score) => {
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
    mods.textContent = `${score.mods} | Length: ${score.length}`;

    box.appendChild(title);
    box.appendChild(mods);
    section.appendChild(box);
    link.appendChild(section);
    container.appendChild(link);
  });
}

export async function TopPlays() {
  try {
    if (cacheData.data && Date.now() - cacheData.timestamp < CACHE_TTL) {
      console.log("Using cached data...");
      displayTopPlays(cacheData.data);
      return cacheData.data;
    }

    let scores = await api.getUserBestScores(3, osu.Gamemodes.OSU, { username: "hobospider132" });

    const results = await Promise.all(scores.map(async (score) => {
      let beatmap = await api.getBeatmap({ beatmap_id: score.beatmap_id }, score.enabled_mods);
      let beatmap_url = osu.getURL.toOpen.beatmap({ beatmap_id: score.beatmap_id }).replace('osu://', 'osu.ppy.sh/');
      
      let mapLength = `${Math.floor(beatmap.total_length / 60)}:${(beatmap.total_length % 60).toString().padStart(2, "0")}`;
      let x = `${beatmap.artist} - ${beatmap.title} [${beatmap.version}]`;
      let y = `+${(score.enabled_mods || []).map((m) => osu.Mods[m] || "No Mod").join(", ")} (${beatmap.difficultyrating}*)`;

      return {
        beatmap: x,
        mods: y,
        length: mapLength,
        url: beatmap_url
      };
    }));

    cacheData.data = results;
    cacheData.timestamp = Date.now();

    const fs = require('fs');
    fs.writeFileSync('./JS/cache.json', JSON.stringify(cacheData, null, 2), 'utf-8');

    console.log("Top plays fetched:", results);
    displayTopPlays(results);
    return results; 
  } catch (error) {
    console.error("Error fetching top plays:", error);
  }
}

TopPlays();
