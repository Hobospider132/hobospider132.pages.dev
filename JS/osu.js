const osu = require("osu-api-v1-js");
const api = new osu.API(process.env.OSU_API_KEY);

function displayTopPlays(data) {
  const container = document.getElementById("osuScores");
  container.innerHTML = "";

  data.forEach((score, index) => {
    let link = document.createElement("a");
    link.href = score.url;
    link.target = "_blank";

    let section = document.createElement("section");

    let box = document.createElement("div");
    box.className = "box";
    box.style.backgroundImage = `url(${score.coverImage})`;
    box.style.backgroundSize = "cover";
    box.style.backgroundPosition = "center";

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

let topPlaysData = [];

async function TopPlays() {
  try {
    let scores = await api.getUserBestScores(3, osu.Gamemodes.OSU, { username: "hobospider132" });

    const results = await Promise.all(scores.map(async (score) => {
      let beatmap = await api.getBeatmap({ beatmap_id: score.beatmap_id }, score.enabled_mods);
      let cover = osu.getURL.beatmapCoverImage({ beatmapset_id: score.beatmapset_id });
      let beatmap_url = osu.getURL.toOpen.beatmap({ beatmap_id: score.beatmap_id });
      let mapLength = osu.getLength(beatmap.total_length);
      let x = `${beatmap.artist} - ${beatmap.title} [${beatmap.version}]`;
      let y = `+${(score.enabled_mods || []).map((m) => osu.Mods[m] || "No Mod").join(", ")} (${beatmap.difficultyrating}*)`;

      return {
        beatmap: x,
        mods: y,
        length: mapLength,
        coverImage: cover,
        url: beatmap_url
      };
    }));

    topPlaysData = results;
    console.log("Top plays fetched:", topPlaysData);
    displayTopPlays(topPlaysData);
  } catch (error) {
    console.error("Error fetching top plays:", error);
  }
}

TopPlays();
