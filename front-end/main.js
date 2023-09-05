"use strict"
import { showCreateDialog } from "./dialog.js";
import { showArtists } from "./display.js";

window.addEventListener("load", start);

const endpoint = 'http://localhost:3000'

export async function start() {
    const artistData = await getData();

    document.querySelector("#createNewButton").addEventListener("click", showCreateDialog)

    showArtists(artistData)
}

export async function getData() {
    const response = await fetch(`${endpoint}/artists/data`);
    const data = await response.json();

    return data;
}

export async function createNew(newArtist) {
    newArtist.id = new Date().getTime();

    const json = JSON.stringify(newArtist);
    const response = await fetch(`${endpoint}/artists/data`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
    if (response.ok) {
        console.log("Created");
    }
}