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
    user ? res.status(200).json( user ) : res.status(404).json({message:"User Not found"});
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

// Posts endpoints
//Get all posts
app.get("/posts", async(_req,res) => {
    try{
        const posts = await client.post.findMany({
            where: {
                isDeleted: false,
            }
        })
        res.status(200).json(posts)
    } catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong, please try again later."})
    }
})

//Get 1 post
app.get("/posts/:id", async(req,res) => {
    try{
        console.log(req.params)
        const {id} = req.params

        const post = await client.post.findFirst({
            where:{
                id
            }
        })
        post ? res.status(200).json(post) : res.status(404).json({message:"Post unavailable"})
    } catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong, please try again later."})
    }
})

//Create a post
app.post("/posts",async(req,res) => {
    try{
        console.log(req.body);
        const { title,content,authorId } = req.body
        const newPost = await client.post.create({
            data:{
                title,content,
                author:{
                    connect:{id:authorId},
                }
            }
        })
        res.status(200).json("Post created successfully")
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong, please try again later."})
    }
})

//Update a post
app.put("/posts/:id",async(req,res) => {
    try{
        console.log(req.body);
        const { title, content } = req.body
        const {id} = req.params

        const updatedPost = await client.post.update({
            where : {
                id
            },
            data:{
                title,content
            }
        })
        res.status(200).json(updatedPost)
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong, please try again later."})
    }
})

//Delete a post
app.delete("/posts/:id",async(req,res) =>)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
