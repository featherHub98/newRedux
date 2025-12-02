const bcrypt = require('bcryptjs');

/*const users = [
  { id: 1, email: "user.one@example.com", pwd: "pwd123!" },
  { id: 2, email: "jane.doe@example.com", pwd: "SecurePwd456#" },
  { id: 3, email: "test.account@example.net", pwd: "DummyPass789$" },
  { id: 4, email: "info@example.org", pwd: "TestPassA1B2C3" },
  { id: 5, email: "developer@example.co", pwd: "DevPwd!2025" },
  { id: 6, email: "test@test.com", pwd: "123" }
];*/

export async function hashPasswords(pwd) {
  //const hashedUsers = [];
  
 /* for (const user of users) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.pwd, salt);
    
    hashedUsers.push({
      id: user.id,
      email: user.email,
      pwd: hashedPassword
    });
  }*/
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pwd, salt);
  //console.log(JSON.stringify(hashedUsers, null, 2));
  return hashedPassword;
}
 hashPasswords();