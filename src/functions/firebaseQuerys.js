import { deleteDoc, addDoc, getDocs, collection, doc, updateDoc, query, orderBy, setDoc, getDoc } from "firebase/firestore";
import { capitalize } from "./normalizeInfo";
import { db } from "../../firebase";

export async function addProduct(data){
    const docRef = await addDoc(collection(db, 'products'), {
        name: data.name,
        qtty: Number(data.qtty),
        fPrice: Number(data.fPrice),
        gain: Number(data.gain),
    })
}

export async function getAllProducts(){

    let response = []

    const q = query(collection(db, "products"), orderBy('name'))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        response = [...response, {id: doc.id, data: doc.data()}]
    });
    return response
}

export async function updateProduct(productId, data){
    const docRef = doc(db, 'products', productId)
    await updateDoc(docRef, {
        fPrice: data.newFprice,
        qtty: data.newQtty,
        gain: data.newGain
    })
}

export async function deleteProduct(productId){
    await deleteDoc(doc(db, 'products', productId))
}

export async function updatePassword(){

}

export async function updateDollarPrice(dollarPrice){
    console.log(dollarPrice)
    await setDoc(doc(db, 'config', 'dollar'), {
        value: dollarPrice,
    })
}

export async function getDollarPrice(){
    const docRef = doc(db, "config", "dollar")
    const docSnap = await getDoc(docRef)
    let result = docSnap.data()

    return result.value
}