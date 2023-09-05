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
        const artists = response.json()
        showArtists(artists)
    }
}

export async function deleteArtist(id) {
    const response = await fetch(`${endpoint}/artists/data/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const updatedArtists = await response.json();
        showArtists(updatedArtists);
        console.log("Artist deleted");
    }
}

export async function updateArtist(updatedArtist) {
    const json = JSON.stringify(updatedArtist);
    const response = await fetch(`${endpoint}/artists/data/${updatedArtist.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    });

    if (response.ok) {
        console.log("Artist updated");
        const updatedArtists = await response.json();
        showArtists(updatedArtists); // Opdater listen med kunstnere på siden
    }
}
