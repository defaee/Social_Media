import app from "./app";
import connectToDB from "./utils/mongodb";

(async () => {
  await connectToDB();
  const port: number = Number(process.env.PORT) || 9000;

  app.listen(port, () => {
    console.log(`server runned on port ${port} successfully`);
  });
})();
