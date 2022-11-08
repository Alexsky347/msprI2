import coworkings from "./coworking.json";

export default function coworkingHandler(server, options, next) {
  server.get("/coworking/:company", async (req, res) => {
    const { company } = req.params;
    const coworkingList = coworkings.filter(
      (place) => place["byCompany"][company]
    );

    res.status(200).send(coworkingList);
  });

  next();
}
