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
      console.log(path.resolve("./"), __dirname, process.cwd());
      //process.cwd() 方法会返回 Node.js 进程的当前工作目录。
      fs.writeFileSync(
        path.resolve("./") + "/dist/sprite.png",
        result.image,
        err => (err ? console.log(err) : console.log("success"))
      );
      source = source.replace(/url\((\S*)\?__sprite/g, match => {
        return `url("dist/sprite.png"`;
      });
    }
  );
};
