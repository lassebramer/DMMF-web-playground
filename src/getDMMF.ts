import { getDMMF } from "@prisma/sdk";

async function routes(fastify: any, options: any) {
  fastify.post("/", async (req: any, res: any) => {
    const datamodel = req.body;
    const dmmf = await getDMMF({ datamodel });
    res.send(dmmf);
  });
}

module.exports = routes;
