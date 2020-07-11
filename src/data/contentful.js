import * as contentful from "contentful";

const client = contentful.createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export const getSpotData = () => {
  client.getEntries().then((response) => response.items);
};
