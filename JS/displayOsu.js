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
    let box = document.createElement("div");
    box.className = "box";
    box.style.backgroundImage = `url(${score.coverImage})`;
    box.style.backgroundSize = "contain";
    box.style.backgroundPosition = "center";
    box.style.height = "130 px";
    box.style.width = "250 px";

    const title = document.createElement("h3");
    title.textContent = score.beatmap;

    const mods = document.createElement("p");
    mods.textContent = score.mods;

    const length = document.createElement("p");
    length.textContent = "Length: " + score.length;

    const PP = document.createElement("p");
    length.textContent = "pp: " + score.pp
    
    box.append(title, mods, length, PP);
    section.appendChild(box);
    link.appendChild(section);
    container.appendChild(link);
  });
}

displayTopPlays();
