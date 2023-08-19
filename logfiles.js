const fs = require("fs");
const targetDir = "./out/make";
const path = require("path");

function deepTraverseDir(directory) {
  // 读取目录内容
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    // 遍历目录下的所有文件和子目录
    files.forEach((file) => {
      const filePath = path.join(directory, file);

      // 检查文件/目录的状态
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        if (stats.isDirectory()) {
          // 如果是目录，则递归调用深度遍历函数
          deepTraverseDir(filePath);
        } else {
          // 如果是文件，则进行相关操作（在这里可以对文件进行处理）
          console.log(filePath);
        }
      });
    });
  });
}

deepTraverseDir(targetDir);
