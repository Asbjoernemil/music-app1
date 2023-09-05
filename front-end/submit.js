"use strict"

import { createNew, updateArtist } from "./main.js";


export function createNewClicked(event) {
    event.preventDefault();

    const formInput = document.forms.artistForm;

    const newArtist = {
        name: formInput.name.value,
        gender: formInput.gender.value,
        birthdate: formInput.birthdate.value,
        activeSince: formInput.activeSince.value,
        genres: formInput.genres.value,
        labels: formInput.labels.value,
        website: formInput.website.value,
        image: formInput.image.value,
        shortDescription: formInput.shortDescription.value,
    }

    createNew(newArtist)
}

export function UpdateArtistClicked(event, artist) {
    event.preventDefault();

    const formInput = document.forms.updateArtistForm;

    const updatedArtist = {
        id: artist.id,
        name: formInput.editName.value,
        gender: formInput.editGender.value,
        birthdate: formInput.editBirthdate.value,
        activeSince: formInput.editActiveSince.value,
        genres: formInput.editGenres.value.split(",").map((genre) => genre.trim()),
        labels: formInput.editLabels.value.split(",").map((label) => label.trim()),
        website: formInput.editWebsite.value,
        image: formInput.editImage.value,
        shortDescription: formInput.editShortDescription.value,
    };

    // Kald opdateringsfunktionen i main.js
    updateArtist(updatedArtist);

    // Luk opdateringsdialogen
    const updateDialog = document.querySelector("#updateArtistDialog");
    updateDialog.close();
}