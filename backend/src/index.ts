import "dotenv/config";
import app from "./app.js";

const PORT = 3000;
const HOST_NAME = "0.0.0.0";

app.listen(PORT, HOST_NAME, () => {
  console.log(`Server is running on port ${PORT} and host ${HOST_NAME}`);
});
