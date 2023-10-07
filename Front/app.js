const app = Vue.createApp({
  data() {
    return {
    productName: '',
    productPrice: '',
    products: []
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

app.mount('#app');

