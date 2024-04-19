import { setDoc, addDoc, getDocs, collection, doc, getDoc } from "firebase/firestore";
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

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        response = [...response, {id: doc.id, data: doc.data()}]
    });
    // console.log(response)
    return response
}
