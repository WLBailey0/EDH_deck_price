<template>
  <div>
    <h1>Price Finder</h1>
    <form v-on:submit.prevent="getCard">
      <label for="card">Name: </label>
      <input type="text" name="card" id="card" v-model="cardName">
      <input type="submit" value="submit" v-on:click.prevent="getCard()">
    </form>
    <div>
      <h4>{{card.name}}</h4>
      <img id="pic" alt="No Picture Found">
      <input type="button" value="Add" v-on:click="addToList()">
    </div>
    <div v-for="price in priceList" :key="price.id">
      <p>{{price.name}} | ${{price.prices.usd}}</p>
      <button v-on:click="remove(price.name)">Remove</button>
      <!-- <img src= card.image_uris.small alt="None Available"> -->
      
    </div>
    <div>
      <p>Total price ${{this.total}}</p>
    </div>
  </div>
</template>

<script>
import priceService from '../services/PriceService';
export default {
  data(){
    return{
      cardName: "",
      card: {},
      priceList: [],
      correct: false,
      total: 0,
    }
  },
  methods: {
    getCard(){
      priceService.getCard(this.cardName).then(results => {
        this.card = results.data;
        const image = document.getElementById("pic");
        image.setAttribute('src', this.card.image_uris.small);
             
      })
    },
    totalPrice(){
      this.total = 0;
      for(let i = 0; i < this.priceList.length; i++){
        this.total += parseFloat(this.priceList[i].prices.usd);
      }
      return this.total.toFixed(2);
    },
    addToList(){
      this.priceList.push(this.card);
      this.totalPrice();
    },
    remove(cardName){
      let arr = [];
      for(let i = 0; i < this.priceList.length; i++){
        if(this.priceList[i].name !== cardName){
          arr.push(this.priceList[i])
        }
      }
      this.priceList = arr;
      this.totalPrice();
    }
  }
}
</script>

<style>

</style>