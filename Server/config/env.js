const dotenv = require("dotenv");
dotenv.config();
let env = {
  dbUrl:
    "mongodb+srv://ahsanpm:ahsan75furqan@routify.d9dur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ||
    "mongodb://localhost:27017/routify" ||
    process.env.dbUrl,
  SERVER_SECRET: "1234" || process.env.SERVER_SECRET,
  POSTSECRET: process.env.POSTSECRET,
};

module.exports = env;
