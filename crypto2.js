// main
require("pidcrypt/seedrandom");
var pidCrypt = require("pidcrypt");

require("pidcrypt/aes_cbc");
var aes = new pidCrypt.AES.CBC();

const fs = require("fs");

// task 1
function encryptFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return console.error(err);

    const encryptedText = aes.encryptText(data);

    const newFilePath = filePath.replace(/\.txt$/, ".enc");

    fs.writeFile(newFilePath, encryptedText, (err) => {
      if (err) return console.error(err);

      console.log(`The text in the file "${filePath}" was successfully encrypted and saved to the file "${newFilePath}".`);

      fs.unlink(filePath, (err) => {
        if (err) return console.error(err);

        console.log(`The file "${filePath}" was successfully deleted.`);
      });
    });
  });
}

encryptFile("text.txt");


// task 2 
const decryptFile = (filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return console.error(err);

      const decryptedText = aes.decryptText(data);

      const newFilePath = filePath.replace(/\.enc$/, ".txt");

      fs.writeFile(newFilePath, decryptedText, (err) => {
          if (err) return console.error(err);

          console.log(`The text in file "${filePath}" was successfully decrypted and saved to file "${newFilePath}".`);

          fs.unlink(filePath, (err) => {
              if (err) return console.error(err);
              
              console.log(`The file "${filePath}" was successfully deleted.`);
          });
      });
  });
};

decryptFile("text.enc");