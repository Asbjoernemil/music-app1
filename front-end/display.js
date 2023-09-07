"use strict"

import { showUpdateDialog } from "./dialog.js";
import { deleteArtist, getData } from "./main.js";

let originalArtists = [];


export function showArtists(artists) {
    originalArtists = [...artists]

    document.querySelector("#artistTableBody").innerHTML = "";

    const sortBy = document.querySelector("#sortBy").value;

    let artistsToDisplay = [...artists]; // Opret en kopi af de kunstnere, der skal vises

    if (sortBy === "activeSince") {
        // Sortér kunstnerne efter "Active Since" år i stigende rækkefølge
        artistsToDisplay.sort((a, b) => a.activeSince - b.activeSince);
    } else if (sortBy === "name") {
        // Sortér kunstnerne efter navn i alfabetisk rækkefølge
        artistsToDisplay.sort((a, b) => a.name.localeCompare(b.name));
    }


    for (const artist of artistsToDisplay) {
        const html = /*html*/ `
    <tr class="artist-row">
      <td>${artist.name}</td>
      <td>${artist.birthdate}</td>
      <td>${artist.gender}</td>
      <td>${artist.activeSince}</td>
      <td>${artist.genres}</td>
      <td>${artist.labels}</td>
      <td><a href="${artist.website}" target="_blank">${artist.website}</a></td>
      <td><img src="${artist.image}" alt="${artist.name}" width="100"></td>
      <td>${artist.shortDescription}</td>
      <td><button class="update-button">Update</button></td>
      <td><button class="delete-button">Delete</button></td>
    </tr>
    `
        document.querySelector("#artistTableBody").insertAdjacentHTML("beforeend", html);
        document.querySelector("#artistTableBody tr:last-child .delete-button").addEventListener("click", () => deleteArtist(artist.id, artists));
        document.querySelector("#artistTableBody tr:last-child .update-button").addEventListener("click", () => showUpdateDialog(artist.id, artists));
    }
}

export async function filterArtists() {
    const filterValue = document.querySelector("#showOnly").value;
    const data = await getData();
    let filteredArtists = []
    console.log("før", originalArtists);
    if (filterValue === "Male") {
        filteredArtists = data.filter(artist => artist.gender === "Male");
        console.log("efter", originalArtists);
    } else if (filterValue === "Female") {
        filteredArtists = data.filter(artist => artist.gender === "Female");
    } else {
        filteredArtists = data
        console.log("ALL", originalArtists)
    }

    console.log("Filter Value:", filterValue); // Udskriv filterværdien
    console.log("Filtered Artists:", filteredArtists);
    showArtists(filteredArtists); // Vis de filtrerede kunstnere
}

export async function showFavorites(artist) {
    const artists = await getData()

    document.querySelector("#favoriteArtistTableBody").innerHTML = "";

    for (const artist of artists) {
        if (artist.favorite === true) {
            const html = /*html*/ `
    <tr class="artist-row">
      <td>${artist.name}</td>
      <td>${artist.birthdate}</td>
      <td>${artist.gender}</td>
      <td>${artist.activeSince}</td>
      <td>${artist.genres}</td>
      <td>${artist.labels}</td>
      <td><a href="${artist.website}" target="_blank">${artist.website}</a></td>
      <td><img src="${artist.image}" alt="${artist.name}" width="100"></td>
      <td>${artist.shortDescription}</td>
    </tr>
    `
            document.querySelector("#favoriteArtistTableBody").insertAdjacentHTML("beforeend", html);
        }
    }
}