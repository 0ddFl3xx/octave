"use server";

const JAMENDO_CLIENT_ID = process.env.JAMENDO_KEY;
const BASE_URL = "https://api.jamendo.com/v3.0";

export interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  duration: number;
  image: string;
  audio: string;
  album_name: string;
}

export async function getFeaturedTracks(): Promise<JamendoTrack[]> {
  const response = await fetch(
    `${BASE_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=21&featured=1`
  );
  const data = await response.json();
  return data.results;
}

export async function searchTracks(query: string): Promise<JamendoTrack[]> {
  const response = await fetch(
    `${BASE_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&search=${query}`
  );
  const data = await response.json();
  return data.results;
}

export async function getTracksByGenre(genre: string): Promise<JamendoTrack[]> {
  const response = await fetch(
    `${BASE_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&tags=${genre}`
  );
  const data = await response.json();
  return data.results;
}
