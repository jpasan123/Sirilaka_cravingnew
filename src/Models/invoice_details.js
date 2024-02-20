class InvoiceDetail {
    constructor(productID, productName, unitPrice, unitQty, lineAmount) {
        this.productID = productID;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.unitQty = unitQty;
        this.lineAmount = lineAmount;
    }
    ToJson() {
        return {
            'productID': this.productID,
            'productName': this.productName,
            'unitPrice': this.unitPrice,
            'unitQty': this.unitQty,
            'lineAmount': this.lineAmount
        };
    }
}
export default InvoiceDetail;