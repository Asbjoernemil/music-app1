"use strict"

import { deleteArtist } from "./main.js";

export function showArtists(artists) {
    document.querySelector("#artistTableBody").innerHTML = ""

    for (const artist of artists) {
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
    }
}