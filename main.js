var app = new Vue({
  el: '#app', 
  data: {
    product: 'Socks',
    brand: 'Vue Mastery',
    description: 'Warmest socks ever',
    selectedVariant: 0,
    inventory: 0,
    onSale: true,
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        id: 2234,
        color: 'green',
        image: './assets/vmSocks-green.png'
      },
      {
        id: 2235,
        color: 'blue',
        image: './assets/vmSocks-blue.png'
      }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    cart: 0
  },
  methods: {
    addToCart () {
      this.cart++
    },
    removeFromCart() {
      this.cart += -1
    },
    updateImage(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    inStock() {
      if (this.inventory > 0) return true
    },
    title() {
      return this.brand + ' ' + this.product
    }
  }  
})
