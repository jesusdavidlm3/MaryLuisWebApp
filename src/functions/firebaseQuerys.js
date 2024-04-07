import { setDoc, addDoc, getDoc, collection } from "firebase/firestore";
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

    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        response = [...response, doc.data]
    });
    return response
}