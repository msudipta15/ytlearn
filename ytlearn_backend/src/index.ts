import express from "express";

const app = express();

async function main() {
  app.listen(3000);
  console.log("Listening to port: 3000");
}

main();
