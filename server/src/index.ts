import app from "./app";
import config from "./modules/config";

const host = config.get("host");
const port = config.get("port");

app.create().listen(port, () => {
  console.log(`http://${host} listening on ${port}`);
});
