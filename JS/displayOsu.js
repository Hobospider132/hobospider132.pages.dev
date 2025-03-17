async function readCache() {
  try {
    const response = await fetch("cache.json");
    if (!response.ok) throw new Error("Failed to load cache.");
    
    return await response.json();
  } catch (error) {
    console.warn("No cache found for display.", error);
    return null;
  }
}

async function displayTopPlays() {
  const cachedData = await readCache(); 

  if (!cachedData) return; 
  const container = document.getElementById("osuScores");
  if (!container) {
    console.error("Error: Element with ID 'osuScores' not found.");
    return;
  }

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
