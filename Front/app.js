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

        if (!response.ok) {
          alert("Возникла ошибка при добалении данных");
          throw new Error(`HTTP error! status: ${response.status}`);
          
        }
        this.fetchData();
        alert("Данные успешно добавлены.");
        this.productName = null;
        this.productPrice = null;

      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    },
    async fetchData() {
      try {
        const response = await fetch('/nomenklature'); 
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    },
    async handleItemClick(product) {
      try {
        const response = await fetch(`/nomenklature/${product.id}`);
        const data = await response.json();
        console.log('Ответ от сервера:', data);
        this.productInfo = data;
        
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

