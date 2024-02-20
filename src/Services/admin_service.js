import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../firebase';

const AdminService = {
    // Other methods...

    getMonthlyDataForCurrentYear: async () => {
        try {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const currentYear = new Date().getFullYear();

            const monthlyData = [];

            for (let i = 0; i < 12; i++) {
                const currentMonth = i + 1;
                const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
                const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
                
                const customerQuerySnapshot = await getDocs(query(collection(firestore, 'customers'), where('createdAt', '>=', firstDayOfMonth), where('createdAt', '<=', lastDayOfMonth)));
                const customerCount = customerQuerySnapshot.size;

                const supplierQuerySnapshot = await getDocs(query(collection(firestore, 'suppliers'), where('createdAt', '>=', firstDayOfMonth), where('createdAt', '<=', lastDayOfMonth)));
                const supplierCount = supplierQuerySnapshot.size;

                monthlyData.push({
                    name: monthNames[i],
                    Customer: customerCount,
                    Supplier: supplierCount
                });
            }

            return monthlyData;
        } catch (error) {
            console.error('Error fetching monthly data for current year: ', error);
            throw error;
        }
    }
};

export default AdminService;
