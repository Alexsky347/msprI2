import users from "./users.json";
export default function userHandler(server, options, next) {
  server.post("/login", async (req, res) => {
    const { body } = req;
    const user = users.find(
      (user) => user.email === body.email && user.password === body.password
    );
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(500).send({ msg: "No user found" });
    }
  });

  next();
}
