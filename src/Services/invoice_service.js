import { collection, getDoc, addDoc, where, getDocs, doc, query } from "firebase/firestore";
import CollectionHelper from '../Models/collection_helper';
import Invoice from '../Models/invoice';
import InvoiceDetails from '../Models/invoice_details';
import { firestore } from '../firebase';
import ProductService from "./product_service";
const InvoiceService = {
    createInvoice: async (invoice) => {
        try {
            const invoiceData = invoice.ToJson();
            await addDoc(collection(firestore, CollectionHelper.Invoice), invoiceData);
        } catch (error) {
            console.error('Error adding invoice data: ', error);
            throw error;
        }
    },
    getInvoice: async (invoiceId) => {
        try {
            const invoiceDoc = doc(firestore, `${CollectionHelper.Invoice}/${invoiceId}`);

            const invoiceSnapshot = await getDoc(invoiceDoc);
            if (invoiceSnapshot.exists()) {
                const invoiceData = invoiceSnapshot.data();
                const invoiceDetails = invoiceData.invDetails.map(detail => {
                    return new InvoiceDetails(
                        detail.productID,
                        detail.productName,
                        detail.unitPrice,
                        detail.unitQty,
                        detail.lineAmount
                    );
                });
                const invoice = new Invoice(
                    invoiceSnapshot.id,
                    invoiceData.customerID,
                    invoiceDetails,
                    invoiceData.shippingCharges,
                    invoiceData.tax,
                    invoiceData.netAmount,
                    invoiceData.receiverName,
                    invoiceData.receiverAddress,
                    invoiceData.receiverEmail,
                    invoiceData.receiverPhone,
                    invoiceData.createdAt,
                    invoiceData.type
                );
                return invoice;
            } else {
                console.error('Invoice document not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching invoice: ', error);
            throw error;
        }
    },
    getSalesReport: async (startDate, endDate) => {
        try {
            // Query invoices within the specified date range
            const querySnapshot = await getDocs(query(collection(firestore, CollectionHelper.Invoice), where('createdAt', '>=', startDate), where('createdAt', '<=', endDate)));

            // Initialize variables to store sales data
            let totalSales = 0;
            const productSales = {};
            let i = 0;

            // Iterate over each invoice
            for (const doc of querySnapshot.docs) {
                const invoiceData = doc.data();

                // Calculate total sales
                // totalSales += invoiceData.netAmount;


                // Iterate over invoice details to track product sales
                for (const detail of invoiceData.invDetails) {
                    // invoiceData.invDetails.forEach((detail) => {
                    // console.log(detail)
                    const productId = detail.productID;
                    const productName = detail.productName; // Assuming productName is accessible
                    const productSalesAmount = detail.unitPrice * detail.unitQty;

                    // Increment product sales or initialize if not present
                    if (!productSales[productId]) {
                        const product = await ProductService.getProduct(productId);
                        productSales[productId] = { productId, productName, productcategory: product.category, productdescription: product.description, salesAmount: 0 };
                    }
                    productSales[productId].salesAmount += productSalesAmount;
                    totalSales += productSalesAmount;

                    i++;
                };
            };
            return { totalSales, productSales };
        } catch (error) {
            console.error('Error fetching sales report: ', error);
            throw error;
        }
    }
}

export default InvoiceService;