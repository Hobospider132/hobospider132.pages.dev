function displayAnilistData(data) {

  const user = data.User;
  const accountContainer = document.getElementById("anilist-account");
  
  accountContainer.innerHTML = "";
  accountContainer.style.backgroundImage = `url(${user.bannerImage})`;
  accountContainer.style.backgroundSize = "cover";
  accountContainer.classList.add("profile-img-container");
  
  accountContainer.innerHTML = `
    <img src="${user.avatar.medium}" alt="Avatar">
    <h4>${user.name}</h4>
    <p>${user.about || "No bio available"}</p>
  `;
  
  const accountLink = document.createElement("a");
  accountLink.href = `https://anilist.co/user/${user.name}`;
  accountLink.target = "_blank";
  accountLink.classList.add("profile-link");

  const parentDiv = accountContainer.parentElement;
  
  accountLink.appendChild(accountContainer);
  parentDiv.appendChild(accountLink);
  
  const activityDiv = document.getElementById('ani-activity');
  activityDiv.innerHTML = ''; 
  activityDiv.style.backgroundImage = `url(${data.User.bannerImage})`;
  activityDiv.style.backgroundSize = "cover";

  function truncateTitle(title, maxLength = 18) {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
  }


  data.Page.activities.forEach(activity => {
    const activityCard = document.createElement('div');
    activityCard.classList.add("activity-card");

    activityCard.innerHTML = `
      <img src="${activity.media.coverImage.medium}" alt="Cover Image">
      <h5>${truncateTitle(activity.media.title.english || activity.media.title.romaji)}</h5>
      <p>${activity.status} ${activity.progress || ""}</p>
    `;

    const link = document.createElement("a");
    link.href = activity.media.siteUrl;
    link.target = "_blank";
    link.appendChild(activityCard);
    activityDiv.appendChild(link);
  });
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
