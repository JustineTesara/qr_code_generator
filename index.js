import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Enter url to generate a QR code:",
    },
  ])
  .then((answers) => {
    const url = answers.url;
    const qrImage = qr.image(url, { type: "png" });
    qrImage.pipe(fs.createWriteStream("qr.png"));
    fs.writeFile("my_file.txt", url, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("File written successfully!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong");
    }
  });
