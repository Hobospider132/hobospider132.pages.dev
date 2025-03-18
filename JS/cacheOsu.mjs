// Gonna be real here, I'm too lazy to figure out this API business and how to get it to not import the api stuff when it's on website and not workflow so I'm just gonna split the 
// reading and writing functions into two differently js files, one reading and one writing, I think that's easiest/laziest way to do it, I might try to find a more elegant 
// way of doing this once my exams are over depending on if I feel like it or not

import * as osu from "osu-api-v1-js";
const api = new osu.API(process.env.OSU_API_KEY);

import { promises as fs } from "fs";
const cacheFilePath = "cache.json";

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
      let cover = osu.getURL.beatmapCoverImage({ beatmapset_id: beatmap.beatmapset_id });
      let mapLength = osu.getLength(beatmap.total_length);
      let x = `${beatmap.artist} - ${beatmap.title} [${beatmap.version}]`;
      let y = (beatmap.difficultyrating).toFixed(1);
      let scorepp = (score.pp).toFixed(0);
      return {
        beatmap: x,
        difficulty: y,
        length: mapLength,
        url: beatmap_url,
        coverImage: cover,
        pp: scorepp
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

fetchTopPlays();
