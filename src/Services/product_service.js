import { collection, getDocs, addDoc, updateDoc, doc, where, documentId, query, getDoc } from "firebase/firestore";
import Product from "../Models/product";
import CollectionHelper from '../Models/collection_helper';
import { firestore } from '../firebase';

const ProductService = {
    getProduct: async (id) => {
        const docRef = doc(firestore, CollectionHelper.Product, id);
        const docSnap = await getDoc(docRef);
        const { name, description, category, image, price } = docSnap.data();
        return new Product(docSnap.id, name, description, category, image, price);
    },

    getAllProducts: async () => {
        const snapshot = await getDocs(collection(firestore, CollectionHelper.Product));
        return snapshot.docs.map(doc => {
            const { name, description, category, image, price, qty ,date} = doc.data();
            console.log("Qty:", qty); // Log the qty value
            return new Product(doc.id, name, description, category, image, price, qty,date);
          
        });
    },

    addProduct: async (product) => {
        try {
            const productData = product.ToJson();
            await addDoc(collection(firestore, CollectionHelper.Product), productData);
        } catch (error) {
            console.error('Error adding product: ', error);
            throw error;
        }
    },

    updateProduct: async (product) => {
        try {
            const productId = product.id;
            const productRef = doc(firestore, CollectionHelper.Product, productId);
            var updateData = product.ToJson();
            await updateDoc(productRef, updateData);

            console.log('Product updated successfully:', productId);
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },



};

export default ProductService;
