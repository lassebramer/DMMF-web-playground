//IMPORTS
const fastify = require("fastify")();
const path = require("path");
const fs = require("fs");
const getDMMF = require("@prisma/sdk/dist/engineCommands");

//Route to endpoint that converts .prisma to DMMF
fastify.register(require("./routes/getDMMF"), { prefix: "/getDMMF" });

//Fastify hosting stuff
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/"
});

fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});

fastify.get("/", function(req, res) {
  res.view("./templates/index.html");
});

// LISTINER
fastify.listen(3000, function(error, address) {
  if (error) {
    console.log(error);
    process.exit(1);
  } else {
    console.log("Server is running on port 3000");
  }
});
