"use strict"

import { UpdateArtistClicked, createNewClicked } from "./submit.js";


export function showCreateDialog() {
    const createDialog = document.querySelector("#newArtistDialog");

    document.querySelector("#artistForm").addEventListener("submit", createNewClicked);

    createDialog.showModal();
}

export function showUpdateDialog(artist) {
    const updateDialog = document.querySelector("#editArtistDialog");

    // Udfyld inputfelterne i opdateringsdialogen med kunstnerens nuværende oplysninger
    document.querySelector("#editName").value = artist.name;
    document.querySelector("#editGender").value = artist.gender;
    document.querySelector("#editBirthdate").value = artist.birthdate;
    document.querySelector("#editActiveSince").value = artist.activeSince;
    document.querySelector("#editGenres").value = artist.genres;
    document.querySelector("#editLabels").value = artist.labels;
    document.querySelector("#editWebsite").value = artist.website;
    document.querySelector("#editImage").value = artist.image;
    document.querySelector("#editShortDescription").value = artist.shortDescription;

    // Tilføj en eventlistener til opdateringsformularen
    document.querySelector("#editArtistForm").addEventListener("submit", (event) => {
        event.preventDefault();
        UpdateArtistClicked(event, artist); // Send event med som det første argument
    });

    updateDialog.showModal();
}
