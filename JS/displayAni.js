function displayAnilistData(data) {
  const activityDiv = document.getElementById('ani-activity');
  activityDiv.innerHTML = ''; 
  activityDiv.style.backgroundImage = `url(${data.User.bannerImage})`;
  activityDiv.style.backgroundSize = "contain";

  data.Page.activities.forEach(activity => {
    const activityCard = document.createElement('div');
    activityCard.style = "margin: 5px; width: 50%; text-align: center; justify-self: center;";
    activityCard.innerHTML = `
      <img src="${activity.media.coverImage.medium}" alt="Cover Image" style="width: 50%; height: 50%;">
      <h5>${activity.media.title.english || activity.media.title.romaji}</h5>
      <p>Progress: ${activity.progress || "N/A"}</p>
      <p>Status: ${activity.status || "Unknown"}</p>
    `;

    const link = document.createElement("a");
    link.href = activity.media.siteUrl;
    link.target = "_blank";
    link.appendChild(activityCard);
    activityDiv.appendChild(link);
  });

  const user = data.User;
  const accountDiv = document.getElementById('anilist-account');
  accountDiv.style.justifySelf = "center";
  accountDiv.innerHTML = `
    <img src="${user.avatar.medium}" alt="Avatar" class="profile-img-ani">
    <h4 style="padding: 0;">${user.name}</h4>
    <p>${user.about || "No bio available"}</p>
  `;
}

const query = `
  query {
    Page(page: 1, perPage: 4) {
      activities(userId: 6252093, sort: ID_DESC) {
        ... on ListActivity {
          progress
          status
          media {
            coverImage {
              medium
            }
            title {
              english
              romaji
            }
            siteUrl
          }
        }
      }
    }
    User(id: 6252093) {
      name
      bannerImage
      avatar {
        medium
      }
      about
    }
  }
`;

const destination = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ query })
};

fetch('https://graphql.anilist.co', destination)
  .then(response => response.json())
  .then(data => {
    console.log('GraphQL response:', data);
    displayAnilistData(data.data);
  })
  .catch(error => console.error('GraphQL error:', error));
