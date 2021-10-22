const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.send(users).status(201);
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((a) => a.name === req.body.name);
  if (user == null) {
    res.send("user doesnt exist");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("password wrong");
    }
  } catch {
    res.send();
  }
});

app.listen(5000);
