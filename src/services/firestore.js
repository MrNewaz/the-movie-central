import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore"
import { useSnackbar } from "notistack"
import { useCallback } from "react"
import { db } from "../services/firebase"

export const useFirestore = () => {
  const { enqueueSnackbar } = useSnackbar()
  const addDocument = async (collectionName, data) => {
    // Add a new document with a generated id.
    await addDoc(collection(db, collectionName), data)
  }

  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        enqueueSnackbar("Already in watchlist", { variant: "error" })
        return false
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data)
      enqueueSnackbar("Added to watchlist", { variant: "success" })
    } catch (error) {
      console.log(error, "Error adding document")
      enqueueSnackbar("Error adding to watchlist", { variant: "error" })
    }
  }
  const addToFavouriteList = async (userId, dataId, data) => {
    try {
      if (await checkIfInFavouriteList(userId, dataId)) {
        enqueueSnackbar("Already in favourite list", { variant: "error" })
        return false
      }
      await setDoc(doc(db, "users", userId, "favouriteList", dataId), data)
      enqueueSnackbar("Added to favourite list", { variant: "success" })
    } catch (error) {
      console.log(error, "Error adding document")
      enqueueSnackbar("Error adding to favourite list", { variant: "error" })
    }
  }

  const checkIfInWatchlist = async (userId, dataId) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "watchlist",
      dataId?.toString()
    )

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return true
    } else {
      return false
    }
  }

  const checkIfInFavouriteList = async (userId, dataId) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "favouriteList",
      dataId?.toString()
    )

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return true
    } else {
      return false
    }
  }

  const removeFromWatchlist = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
      )
      enqueueSnackbar("Removed from watchlist", { variant: "success" })
    } catch (error) {
      console.log(error, "Error while deleting doc")
      enqueueSnackbar("Error removing from watchlist", { variant: "error" })
    }
  }

  const removeFromFavouriteList = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(
          db,
          "users",
          userId?.toString(),
          "favouriteList",
          dataId?.toString()
        )
      )
      enqueueSnackbar("Removed from favourite list", { variant: "success" })
    } catch (error) {
      console.log(error, "Error while deleting doc")
      enqueueSnackbar("Error removing from favourite list", {
        variant: "error",
      })
    }
  }

  const getWatchlist = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    )
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }))
    return data
  }, [])

  const getFavouriteList = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "favouriteList")
    )
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }))
    return data
  }, [])

  return {
    addDocument,
    addToWatchlist,
    checkIfInWatchlist,
    removeFromWatchlist,
    getWatchlist,
    addToFavouriteList,
    checkIfInFavouriteList,
    removeFromFavouriteList,
    getFavouriteList,
  }
}
