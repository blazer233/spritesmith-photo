const Spritesmith = require("spritesmith");
const fs = require("fs");
const path = require("path");
/**
 *
 * @param {.img1 {background: url(./images/1.png?__sprite)...} source
 */
module.exports = async source => {
  const imgs = source.match(/url\((\S*)\?__sprite/g);
  const matchImgs = [];
  imgs.forEach(i =>
    matchImgs.push(path.join(__dirname, i.match(/url\((\S*)\?__sprite/)[1]))
  );
  Spritesmith.run(
    {
      src: matchImgs,
    },
    (err, result) => {
      if (err) return err;
      // console.log(result, "<Buffer>化");
      fs.writeFileSync(
        path.join(process.cwd(), "dist/sprite.png"),
        result.image
      );
      source = source.replace(/url\((\S*)\?__sprite/g, match => {
        return `url("dist/sprite.png"`;
      });
    }
  );
};
