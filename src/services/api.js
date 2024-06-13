import axios from "axios"

const apiKey = "66f0e988bdb2c6138bb71d8ec704380c"
const baseURL = "https://api.themoviedb.org/3"

// Images
export const imagePath = "https://image.tmdb.org/t/p/original"
export const imagePosterPath = "https://image.tmdb.org/t/p/w500"

// Trending
export const fetchTrending = async (timeWindow = "week") => {
  const { data } = await axios.get(
    `${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`
  )

  return data?.results
}

// Latest
export const fetchLatest = async (type = "movie") => {
  const { data } = await axios.get(
    `${baseURL}/${type}/now_playing?api_key=${apiKey}`
  )
  return data?.results
}

// MOVIES & SERIES - Details
export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseURL}/${type}/${id}?api_key=${apiKey}`)
  return res?.data
}

// MOVIES & SERIES - Credits

export const fetchCredits = async (type, id) => {
  const res = await axios.get(
    `${baseURL}/${type}/${id}/credits?api_key=${apiKey}`
  )
  return res?.data
}

// MOVIES & SERIES - Videos

export const fetchVideos = async (type, id) => {
  const res = await axios.get(
    `${baseURL}/${type}/${id}/videos?api_key=${apiKey}`
  )
  return res?.data
}

// DISCOVER

export const fetchDiscover = async (page, type = "movie") => {
  const res = await axios.get(
    `${baseURL}/discover/${type}?api_key=${apiKey}&page=${page}`
  )
  return res?.data
}

// Movie Releases

export const fetchMovies = async (page, sortBy) => {
  const res = await axios.get(
    `${baseURL}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  )
  return res?.data
}

// SEARCH

export const searchData = async (query, page) => {
  const res = await axios.get(
    `${baseURL}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
  )
  return res?.data
}

// SIMILAR

export const fetchSimilar = async (type, id) => {
  const res = await axios.get(
    `${baseURL}/${type}/${id}/similar?api_key=${apiKey}`
  )
  return res?.data
}
