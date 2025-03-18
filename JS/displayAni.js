const payload = `query stats {
  Page(page: 1, perPage: 4) {
    activities(userId: 6252093, sort: ID_DESC) {
      ... on ListActivity {
        type
        progress
        status
        siteUrl
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
}`;

const destination = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
		"Accept": "application/json"
  },
  body: JSON.stringify({ payload })
};

fetch('https://graphql.anilist.co', destination)
  .then(response => response.json())
  .then(data => {
    console.log('GraphQL response:', data);
  })
  .catch(error => console.error('GraphQL error:', error));
