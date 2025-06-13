import express from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<h1>Blogging API Homepage</h1>");
});

// Users endpoints
//get users
app.get("/users", async (req, res) => {
  try {
    const users = await client.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong please try again later",
    });
  }
});

//get 1 user
app.get("/users/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const user = await client.user.findFirst({
      where: {
        id,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong, please try again",
    });
  }
});

//get multiple users
app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, emailAddress, username } = req.body;

    const newUser = await client.user.create({
      data: { firstName, lastName, emailAddress, username },
    });
    res.status(200).json("User created successfully", newUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating new user, please try again later" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
