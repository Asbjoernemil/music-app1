"use strict"
import { showCreateDialog, showFavoriteDialog } from "./dialog.js";
import { filterArtists, showArtists, showFavorites } from "./display.js";

window.addEventListener("load", start);

const endpoint = 'http://localhost:3000'

export async function start() {
    const artistData = await getData();

    document.querySelector("#createNewButton").addEventListener("click", showCreateDialog)
    document.querySelector("#sortBy").addEventListener("change", () => showArtists(artistData));
    document.querySelector("#showOnly").addEventListener("change", filterArtists);
    document.querySelector("#show-favorites-button").addEventListener("click", showFavoriteDialog);
    document.querySelector("#show-favorites-button").addEventListener("click", showFavorites);

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

export async function updateArtist(artist) {

    const artistAsJson = JSON.stringify(artist, null, 2);
    console.log(artist);

    const response = await fetch(`${endpoint}/artists/data/${artist.id}`, {
        method: "PUT",
        body: artistAsJson,
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const updatedArtists = await response.json();
        showArtists(updatedArtists);
    }
}
