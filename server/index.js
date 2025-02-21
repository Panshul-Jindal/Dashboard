import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";


const app = express();
const port = 3001;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Dashboard",
    password: "***********",
    port: 5432,
  });
db.connect();

// let notes = [{title :"1" ,content :"xyz"},{title :"2" ,content :"xyzd"},{title :"3" ,content :"xyzd"}]; // Temporary in-memory storage
let notes;

async function fetchNotes(){
    const result = await db.query("SELECT * FROM NOTES");
    console.log(result.rows)
    notes = result.rows
}




app.use(cors())
app.use(express.json())



app.get('/api/notes', async (req, res) => {
    await fetchNotes();
    res.json(notes);
})


app.post('/api/notes', async(req, res) => {
    const newNote = { 
      ...req.body,
    };
    console.log(newNote)

    try {
        const result = await db.query(
          "INSERT INTO NOTES (title,content) VALUES ($1,$2)",
          [newNote.title,newNote.content]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while creating the note" });
      }
  });

app.delete('/api/notes' ,async (req,res)=>{
  const title = req.body.title;
  const content = req.body.content;

  try {
    const result = await db.query(
      "DELETE FROM NOTES WHERE title = $1 AND content = $2",
      [title,content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while deleting the note" });
  }

});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
