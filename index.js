const express = require("express");
const cors = require("cors");
const { Profissao, Usuario } = require("./db");
const app = express();
const port = 3000;
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/*
    profissões
 */

app.get("/profissoes", async (req, res) => {
  items = await Profissao.findAll();
  res.send(items);
});

app.get("/profissoes/:id", async (req, res) => {
  const id = req.params["id"];

  const profissao = await Profissao.findByPk(id);
  res.send(profissao);
});

app.post("/profissoes", (req, res) => {
  if (!req.body) {
    res.send("profissão inválida");
    return;
  }

  const item = req.body;
  Profissao.create(item);

  res.send(item);
});

app.put("/profissoes/:id", async (req, res) => {
  item = req.body;

  await Profissao.upsert(item);

  res.status(204).send();
});

app.delete("/profissoes/:id", async (req, res) => {
  const id = req.params["id"];

  const count = await Usuario.count({ where: { profissaoId: id } });
  if (count > 0) {
    res.status(400).send("Existem usuarios com essa profissao");
    return;
  }

  const item = await Profissao.findByPk(id);
  await item.destroy();

  res.status(204).send();
});

/*
    usuarios
 */

app.get("/usuarios", async (req, res) => {
  items = await Usuario.findAll();
  res.send(items);
});

app.get("/usuarios/:id", async (req, res) => {
  const id = req.params["id"];

  const usuario = await Usuario.findByPk(id);
  res.send(usuarios);
});

app.post("/usuarios", (req, res) => {
  if (!req.body) {
    res.send("usuario invalido");
    return;
  }

  const item = req.body;
  Usuario.create(item);

  res.send(item);
});

app.put("/usuarios/:id", async (req, res) => {
  item = req.body;

  await Usuario.upsert(item);

  res.status(204).send();
});

app.delete("/usuarios/:id", async (req, res) => {
  const id = req.params["id"];

  const item = await Usuario.findByPk(id);
  await item.destroy();

  res.status(204).send();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
