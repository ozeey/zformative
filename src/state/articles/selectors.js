import { getParseJsonString } from "lib/helpers/Helpers";

export const parseExcerpt = json => {
  const jsonObj = getParseJsonString(json);

  if (jsonObj) {
    return jsonObj.blocks[0].text;
  }

  return null;
};

export const parseExcerptImage = json => {
  const jsonObj = getParseJsonString(json);
  console.log(jsonObj);
  if (jsonObj) {
    const image = jsonObj.blocks.find(x => x.type === "atomic:image");

    if (image && image.data && image.data.src) return image.data.src;
  }
};
