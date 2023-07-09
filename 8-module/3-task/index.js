export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  cartItem = {};

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product || typeof product !== 'object' || !product.hasOwnProperty('id')) {
      return false;
    }

    if (this.cartItems.find(item => item.product.id === product.id)) {
      this.updateProductCount(product.id, 1);
    } else {
      this.cartItem = {
        product: Object.assign({}, product),
        count: 1
      };

      this.cartItems.push(this.cartItem);
    }

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex(item => item.product.id === productId);
    this.cartItem = this.cartItems[index];

    this.cartItem.count = amount === 1 ? ++this.cartItem.count : --this.cartItem.count;

    if (!this.cartItems[index].count) {
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(this.cartItem);
  }

  getTotalCount() {
    if (!this.cartItems.length) {
      return this.cartItems.length;
    }

    return this.cartItems.reduce((accumulator, item, index) => {
      return index === 0 ? item.count : accumulator + item.count;
    }, this.cartItems[0].count);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalPrice() {
    if (!this.cartItems.length) {
      return this.cartItems.length;
    }

    return this.cartItems.reduce((accumulator, item, index) => {
      return index === 0 ? item.product.price * item.count : accumulator + (item.product.price * item.count);
    }, this.cartItems[0]);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

