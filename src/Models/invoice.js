import { serverTimestamp } from "firebase/firestore";

class Invoice {
    constructor(id,customerID,invDetails, shippingCharges, tax, netAmount, receiverName, receiverAddress, receiverEmail, receiverPhone,createdAt, type) {
        this.customerID = customerID;
        this.id = id;
        this.invDetails = invDetails;
        this.shippingCharges = shippingCharges;
        this.tax = tax;
        this.netAmount = netAmount;
        this.receiverName = receiverName;
        this.receiverAddress = receiverAddress;
        this.receiverEmail = receiverEmail;
        this.receiverPhone = receiverPhone;
        this.isVoid = true;
        this.createdAt = createdAt ?? serverTimestamp();
        this.type = type
    }
    ToJson() {
        return {
            'invDetails': this.invDetails.map(detail => detail.ToJson()),
            'shippingCharges': this.shippingCharges,
            'customerID': this.customerID,
            'tax': this.tax,
            'netAmount': this.netAmount,
            'receiverName': this.receiverName,
            'receiverAddress': this.receiverAddress,
            'receiverEmail': this.receiverEmail,
            'receiverPhone': this.receiverPhone,
            'isVoid': this.isVoid,
            'createdAt':this.createdAt,
            'type': this.type
        };
    }    
}

export default Invoice;