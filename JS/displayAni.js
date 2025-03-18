const query = `
  query {
    Page(page: 1, perPage: 4) {
      activities(userId: 6252093, sort: ID_DESC) {
        ... on ListActivity {
          type
          progress
          status
          createdAt
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

function displayAnilistData(data) {
  const user = data.User;
  const accountDiv = document.getElementById('anilist-account');
  accountDiv.innerHTML = `
    <img src="${user.avatar.medium}" alt="Avatar" style="width: 50px; border-radius: 50%;">
    <h4>${user.name}</h4>
    <p>${user.about || "No bio available"}</p>
  `;

  const activityDiv = document.getElementById('ani-activity');
  activityDiv.innerHTML = ''; 

  data.Page.activities.forEach(activity => {
    const activityCard = document.createElement('div');
    activityCard.style = "border: 1px solid #ccc; padding: 10px; margin: 5px; width: 200px; text-align: center;";

    activityCard.innerHTML = `
      <img src="${activity.media.coverImage.medium}" alt="Cover Image" style="width: 100%;">
      <h5>${activity.media.title.english || activity.media.title.romaji}</h5>
      <p>Progress: ${activity.progress || "N/A"}</p>
      <p>Status: ${activity.status || "Unknown"}</p>
      <a href="${activity.media.siteUrl}" target="_blank">View</a>
    `;

    activityDiv.appendChild(activityCard);
  });
}
