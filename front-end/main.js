"use strict"
import { showCreateDialog } from "./dialog.js";
import { filterArtists, showArtists } from "./display.js";

window.addEventListener("load", start);

const endpoint = 'http://localhost:3000'

export async function start() {
    const artistData = await getData();

    document.querySelector("#createNewButton").addEventListener("click", showCreateDialog)
    document.querySelector("#sortBy").addEventListener("change", () => showArtists(artistData));
    document.querySelector("#showOnly").addEventListener("change", filterArtists);

    document.querySelector("#editArtistForm").addEventListener("submit", (event) => updateArtist(event, artistData));

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

export async function updateArtist(event, artists, id) {
    console.log("Update Artist function called."); // Tilføj denne linje

    const form = event.target;

    const name = form.editName.value;
    const gender = form.editGender.value;
    const birthdate = form.editBirthdate.value;
    const activeSince = form.editActiveSince.value;
    const genres = form.editGenres.value;
    const labels = form.editLabels.value;
    const website = form.editWebsite.value;
    const image = form.editImage.value;
    const shortDescription = form.editShortDescription.value;

    const artistToUpdate = {
        name,
        gender,
        birthdate,
        activeSince,
        genres,
        labels,
        website,
        image,
        shortDescription,
    };

    const artistAsJson = JSON.stringify(artistToUpdate);

    const response = await fetch(`${endpoint}/artists/data/${id}`, {
        method: "PUT",
        body: artistAsJson,
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        // Opdater kunstnerlisten
        const updatedArtists = await getData();
        showArtists(updatedArtists);
        scrollToTop();
    }
}
