"use strict"

import { showUpdateDialog } from "./dialog.js";
import { deleteArtist } from "./main.js";

let originalArtists = [];


export function showArtists(artists) {
    originalArtists = artists;
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

export function filterArtists() {
    const filterValue = document.querySelector("#showOnly").value;
    let filteredArtists;

    if (filterValue === "Male") {
        filteredArtists = originalArtists.filter(artist => artist.gender === "Male");
    } else if (filterValue === "Female") {
        filteredArtists = originalArtists.filter(artist => artist.gender === "Female");
    } else {
        // Hvis filterværdien er "All" eller en ukendt værdi, vis alle kunstnere
        filteredArtists = [...originalArtists];
    }

    console.log("Filter Value:", filterValue); // Udskriv filterværdien
    console.log("Filtered Artists:", filteredArtists);
    showArtists(filteredArtists); // Vis de filtrerede kunstnere
}
