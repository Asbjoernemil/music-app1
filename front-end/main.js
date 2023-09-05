"use strict"
import { showArtists } from "./display.js";

window.addEventListener("load", start);

const endpoint = 'http://localhost:3000'

export async function start() {
    const artistData = await getData();

    showArtists(artistData)
}

export async function getData() {
    const response = await fetch(`${endpoint}/artists/data`);
    const data = await response.json();

    return data;
}