const app = Vue.createApp({
  data() {
    return {
    productName: '',
    productPrice: '',
    products: [],
    productInfo: null
    };
  },
  methods: {
    async sendRequest() {
      try {
        const response = await fetch('/nomenklature', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.productName,
            price: this.productPrice,
          }),
        });
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    },
    async fetchData() {
      try {
        const response = await fetch('http://localhost:3000/nomenklature'); // Замените на ваш URL API
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    },
    async handleItemClick(product) {
      try {
        const response = await fetch(`http://localhost:3000/nomenklature/${product.id}`);
        const data = await response.json();
        console.log('Ответ от сервера:', data);
        this.productInfo = data;
        // Здесь вы можете обработать полученные данные из API
      } catch (error) {
        console.error('Ошибка при выполнении запроса к API:', error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
});

app.component('product-info', {
  props: {
    product: Object
  },
  template: `
    <div class="product-info">
      <h2 style="color: aqua;">{{ product.name }}</h2>
      <p>Цена: {{ product.price }}</p>
      <p>Количество: {{ product.quantity }}</p>
      <p>Общая стоимость: {{ product.totalCost }}</p>
      <div style="margin-left: 40px;" v-if="product.childProducts && product.childProducts.length > 0">
        <h3 style="color:crimson;">Дочерние продукты:</h3>
        <product-info v-for="(childProduct, index) in product.childProducts" :product="childProduct" :key="index"></product-info>
      </div>
    </div>
  `
});

app.mount('#app');

