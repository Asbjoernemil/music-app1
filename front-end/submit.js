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

export function updateArtistClicked(event, selectedArtist) {
    event.preventDefault();

    const formInput = document.forms.editArtistForm;

    const updatedArtist = {
        id: selectedArtist.id,
        name: formInput.editName.value,
        gender: formInput.editGender.value,
        birthdate: formInput.editBirthdate.value,
        activeSince: formInput.editActiveSince.value,
        genres: formInput.editGenres.value,
        labels: formInput.editLabels.value,
        website: formInput.editWebsite.value,
        image: formInput.editImage.value,
        shortDescription: formInput.editShortDescription.value,
    };

    updateArtist(updatedArtist);

    // Her kan du tilføje kode til at lukke dialogen eller foretage andre handlinger efter opdatering
}