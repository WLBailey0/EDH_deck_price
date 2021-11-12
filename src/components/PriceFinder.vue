<template>
  <div class="body">
    <h1>Price Finder</h1>
    <form v-on:submit.prevent="getCard">
      <label for="card">Name: </label>
      <input type="text" name="card" id="card" v-model="cardName">
      <input type="submit" value="submit" v-on:click.prevent="getCard()">
    </form>
    <div class="box">
    <div class="card">
      <h4>{{card.name}}</h4>
      <img id="pic">
      <input type="button" value="Add" v-on:click="addToList()">
    </div>
    </div>
    <div v-for="price in priceList" :key="price.id" class="picked">
      <p>{{price.name}} | ${{price.prices.usd}}</p>
      <button v-on:click="remove(price.name)">Remove</button>
    
      
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
 .body{
   color: #cad2c5
   ;
 }


 .card{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   
 }

 .picked{
  display: flex;
  justify-content: space-around;
  border: 1px solid black;
  width: 400px;
  height: 75px;
  margin: auto;
 }
</style>