const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

let dirMap = {};

function getDirMap(filepath, depth = 0) {
  let result = {};

  result.path = filepath;
  result.name = path.basename(filepath);
  result.depth = depth;

  const stats = fs.statSync(filepath);

  if (stats.isFile()) {
    result.type = "file";
    return result;
  }

  result.type = "directory";

  const dirs = fs.readdirSync(filepath);

  result.children = dirs.map(dir => {
    if (path.basename(dir) === "_book" || path.basename(dir) === "SUMMARY.md") {
      return false;
    }
    return getDirMap(path.join(filepath, dir), depth + 1);
  });

  return result;
}

// dirMap = getDirMap(path.resolve(__dirname, "../doc"));
try {
  dirMap = getDirMap("doc");
  console.log(chalk.green("generate directory map succeed!"));
} catch (error) {
  console.log(chalk.red("Error:", error));
}

// console.log(JSON.stringify(dirMap));

/**
 * * Node
 *   * [fs](./Node/fs.md)
 */

(function (dirMap) {
  let summaryFileContent = [];

  function writeSummary(maps) {
    if (maps) {
      summaryFileContent.push(writeItem(maps));
    }

    if (maps.type === "directory" && maps.children) {
      for (const item of maps.children) {
        writeSummary(item);
      }
    }

    // console.log(JSON.stringify(summaryFileContent));
  }

  function writeItem(item) {
    if (!item || !item.depth) {
      return "";
    }
    const { name, path, depth, type } = item;
    let result = "";
    try {
      if (type === "directory") {
        result = `${"  ".repeat(+(depth - 1))}* ${name}`;
      } else if (type === "file") {
        result = `${"  ".repeat(+(depth - 1))}* [${name}](./${path
          .split("doc/")
          .join("")})`;
      }
    } catch (error) {
      console.log(chalk.redBright("Error: "), error);
    }

    // console.log(JSON.stringify(item));
    return result;
  }

  writeSummary(dirMap);

  const content = summaryFileContent.join("\n");
  fs.writeFile(
    path.resolve(__dirname, "../doc/SUMMARY.md"),
    content,
    { encoding: "utf8" },
    function (err) {
      if (!err) {
        console.log("write summary.md file " + chalk.green("success!"));
        console.log("work done!");
      } else {
        console.log(err);
      }
    }
  );
})(dirMap);


