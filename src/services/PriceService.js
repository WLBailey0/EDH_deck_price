import axios from "axios";

export default {
    getCard(name){
        return axios.get(`https://api.scryfall.com/cards/named?fuzzy=${name}`)
    }
}