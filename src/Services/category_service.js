
import { collection, getDocs } from "firebase/firestore";
import Category from '../Models/category'
import CollectionHelper from '../Models/collection_helper';
import { firestore } from '../firebase';
const CategoryService = {
    getAllCategories: async () => {
        const snapshot = await getDocs(collection(firestore, CollectionHelper.Category));
        return snapshot.docs.map(doc => {
            const { name } = doc.data();
            return new Category(doc.id, name);
        });
    },
}

export default CategoryService