const bcrypt = require("bcrypt");

function hashString(string) {
  const saltRounds = 10;
  hashString = bcrypt.hashSync(string, saltRounds);
  return hashString;
}

(async () => {
  const mypass = "1969";
  const hash = hashString(mypass);
  console.log(hash);
  const match = bcrypt.compareSync(mypass, hash);
  console.log(match);
})();
