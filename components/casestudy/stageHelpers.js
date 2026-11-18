export const vidFor = (src) =>
  /\.mp4$/.test(src)
    ? { video: src, webm: src.replace(/\.mp4$/, ".webm"), poster: src.replace(/\.mp4$/, "-poster.webp") }
    : { img: src };
