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
    const docRef = await addDoc(collection(db, collectionName), data)
    console.log("Document written with ID: ", docRef.id)
  }

  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        // Todo: Alert
        return false
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data)
      // Todo: Alert
    } catch (error) {
      console.log(error, "Error adding document")
      // Todo: Alert
    }
  }
  const addToFavouriteList = async (userId, dataId, data) => {
    try {
      if (await checkIfInFavouriteList(userId, dataId)) {
        // Todo: Alert
        return false
      }
      await setDoc(doc(db, "users", userId, "favouriteList", dataId), data)
      // Todo: Alert
    } catch (error) {
      console.log(error, "Error adding document")
      // Todo: Alert
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
      // Todo: Alert
    } catch (error) {
      // Todo: Alert
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
      // Todo: Alert
    } catch (error) {
      // Todo: Alert
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
