import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore"
import { useCallback } from "react"
import { db } from "../services/firebase"

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    // Add a new document with a generated id.
    await addDoc(collection(db, collectionName), data)
  }

  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        return false
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data)
    } catch (error) {
      console.log(error, "Error adding document")
    }
  }
  const addToFavouriteList = async (userId, dataId, data) => {
    try {
      if (await checkIfInFavouriteList(userId, dataId)) {
        return false
      }
      await setDoc(doc(db, "users", userId, "favouriteList", dataId), data)
    } catch (error) {
      console.log(error, "Error adding document")
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
    } catch (error) {
      console.log(error, "Error while deleting doc")
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
    } catch (error) {
      console.log(error, "Error while deleting doc")
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
