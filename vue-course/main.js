Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true //No validation message if not passed in?
    }
  },
  template: `
  <div class="product">
      <div class="product-image">
        <img :src="image">
      </div>
    
      <div class="product-info">
        <h1>{{ title }} {{ showOnSale }}</h1>
        <p v-if="inventory >10 ">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost Out of Stock</p>
        <p v-else :class="{lineThrough: !inStock }">Out of Stock </p>
        <p>Shipping: {{ shipping }}</p>

        <product-details :details="details"></product-details>

        <div class="color-box" v-for="(variant, index) in variants" 
          :key="variant.id" 
          :style="{backgroundColor: variant.color }"
          @mouseover="updateImage(index)">
        </div>
    
        <p>Available Sizes:</p>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>
      </div>
    
      <button v-on:click="addToCart" 
        :disabled="!inStock"
        :class="{ disabledButton : !inStock }">Add to Cart</button>
      <button v-on:click="removeFromCart">Remove</button>
  
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      description: 'Warmest socks ever',
      selectedVariant: 0,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          id: 2234,
          color: 'green',
          image: './assets/vmSocks-green.png',
          quantity: 20,
          onSale: true

        },
        {
          id: 2235,
          color: 'blue',
          image: './assets/vmSocks-blue.png',
          quantity: 2,
          onSale: false
        }
      ],
      sizes: ['S', 'M', 'L', 'XL']
      }
    },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
      this.variants[this.selectedVariant].quantity -= 1

    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
      //this.variants[this.selectedVariant].quantity += 1
    },
    updateImage(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    inventory() {
      return this.variants[this.selectedVariant].quantity
    },
    inStock() {
      if (this.inventory > 0) return true
    },
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    showOnSale() {
      if (this.variants[this.selectedVariant].onSale) {
        return 'On Sale!'
      }
    },
    shipping() {
      if (this.premium) {
        return 'Free' 
      } else {
        return '$2.99'
      }
      }
    }
  })

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeFromCart() {
        //let pos = cart.findIndex(id)
        //this.cart.splice(pos, 1)
        
      }
 
    },
  }
})
