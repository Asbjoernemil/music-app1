import express from "express"
import cors from "cors"
import fs from "fs/promises"

const app = express();

app.use(express.json());

app.use(cors());

app.get('/artists/data', async (req, res) => {
    const data = await fs.readFile(`data.json`);
    const artists = JSON.parse(data);
    res.json(artists);
});

app.get('/artists/data/:id', (req, res) => {
    const result = artists.find(artist => artist.id === Number(req.params.id));
    res.json(result);
});

app.post('/artists/data', async (req, res) => {
    const newArtist = req.body;
    const data = await fs.readFile(`data.json`);
    const artists = JSON.parse(data);
    console.log(newArtist);
    newArtist.id = new Date().getTime();
    artists.push(newArtist);
    fs.writeFile("data.json", JSON.stringify(artists))
    res.json(artists);
});

app.delete('/artists/data/:id', async (req, res) => {
    const id = Number(req.params.id);

    const data = await fs.readFile(`data.json`);
    const artists = JSON.parse(data);

    const updatedArtists = artists.filter(artist => artist.id !== id)

    fs.writeFile("data.json", JSON.stringify(updatedArtists))
    res.json(updatedArtists)
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

