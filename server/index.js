const express = require("express");
const fs = require('fs')
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/songs',(req,res)=>{

    const songs = []
    const songList = fs.readdirSync('../audio');

     for(const song of songList){
        console.log(song)
        const audio = `audio/${song}`;
        const title = song;
        songs.push({audio,title});
     }
     
     res.json(songs);
   
})



app.listen(3000,()=>console.log("http://localhost:3000"));