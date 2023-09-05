"use strict"

import { createNew } from "./main.js";


export function createNewClicked(event) {
    event.preventDefault();

    const formInput = document.forms.artistForm;

    const newArtist = {
        name: formInput.name.value,
        gender: formInput.gender.value,
        birthdate: formInput.birthdate.value,
        activeSince: formInput.activeSince.value,
        genres: formInput.genre.value,
        labels: formInput.labels.value,
        website: formInput.website.value,
        image: formInput.image.value,
        shortDescription: formInput.shortDescription.value,
    }

    createNew(newArtist)
}