import * as osu from "osu-api-v1-js";

const api = new osu.API(process.env.OSU_API_KEY);
let cache = { data: null, timestamp: 0 };
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
    if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
      console.log("Using cached data...");
      return cache.data;
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

    cache = { data: results, timestamp: Date.now() };

    console.log("Top plays fetched:", results);
    return results; 
  } catch (error) {
    console.error("Error fetching top plays:", error);
  }
}

TopPlays();
