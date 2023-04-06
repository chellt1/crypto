 
const crypto = require('crypto');
const fs = require('fs');
// task 1
function hashPassword() {
    // введення паролю в термінал
  const password = process.argv[2]; 
  if (!password) {
    console.error('Помилка введення');
    return;
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  const data = `${salt}:${hash}`;
  fs.writeFileSync('file.txt', data);
  console.log(`Пароль "${password}" успішний"`);
}

hashPassword(); 



// task 2
function comparePasswords() {
    // введення паролю в термінал
  const password = process.argv[2]; 
  if (!password) {
    console.error('Помилка введення');
    return;
  }

  const data = fs.readFileSync('file.txt', 'utf-8');
  const [salt, hash] = data.split(':');
  const inputHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  const isPasswordCorrect = inputHash === hash;
  if (isPasswordCorrect) {
    console.log(`Пароль "${password}" вірний`);
  } else {
    console.log(`Пароль "${password}" невірний`);
  }
}

comparePasswords(); 