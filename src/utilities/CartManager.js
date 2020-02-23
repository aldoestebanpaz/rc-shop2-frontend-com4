class CartManager {

    static key = "cartItems"

    //Add one or more items to local storage
    static addProduct(prodID, quantity=1) {
        let products = [];
        if (this.getItem(this.key)) {
            products = this.getItem(this.key);
            if (this.isItInCart(prodID)) {
                let prevQty = null;
                products.forEach(p => {
                    if (p.productID === prodID) { prevQty = p.quantity }
                });
                quantity += prevQty;
            }
        };
        this.pushProductToArray({ 'productID': prodID, quantity }, products);
        this.setItem(products);
    }

    static setProductQuantity = (prodID, quantity) => {
        const products = this.getItem();
        this.pushProductToArray({ 'productID': prodID, quantity }, products);
        this.setItem(products);
    }

    static getQuantityById = (id) => {
        const items = this.getItem();
        const found = items.find(item => item.productID === id);
        console.log(id);
        return found.quantity
    };

    //checks if item is already in cart
    static isItInCart(prodID) {
        let flag = false;
        const products = this.getItem(this.key);
        products.forEach(p => {
            if (p.productID === prodID) { flag = true }
        });
        return flag;
    }

    //verify if a product is in cart and pushes it if it isn't
    static pushProductToArray(obj, arr) {
        const index = arr.findIndex((item) => item.productID === obj.productID);

        if (index === -1) {
            arr.push(obj);
        } else {
            arr[index] = obj;
        }
    }

    //remove a specific item from local storage
    static removeProduct(prodID) {
        let storageProducts = this.getItem(this.key);
        let products = storageProducts.filter(p => p.productID !== prodID);
        this.setItem(products);
    }

    //get local storage items
    static getItem() {
        let item = JSON.parse(localStorage.getItem(this.key));
        return item;
    }

    //set local storage items
    static setItem(value) {
        let item = JSON.stringify(value);
        localStorage.setItem(this.key, item);
    }

    //clears local storage
    static clearCart() {
        localStorage.removeItem(this.key);
    }

}

export default this;