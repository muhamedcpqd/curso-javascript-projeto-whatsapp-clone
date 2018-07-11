const path = require("path"),
    express = require("express");

const DIST_DIR = path.join(__dirname);
let port = process.env.PORT || 5000;
const app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('server started ' + port);
  }
});
