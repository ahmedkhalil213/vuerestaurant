<template>
    <div>
      <h1>Restaurants</h1>
      <button @click="showModal = true">Add Restaurant</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="restaurant in restaurants" :key="restaurant.id">
            <td>{{ restaurant.id }}</td>
            <td>{{ restaurant.name }}</td>
            <td>{{ restaurant.contact }}</td>
            <td>{{ restaurant.address }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showModal = false">&times;</span>
          <h2>Add Restaurant</h2>
          <form @submit.prevent="addRestaurant">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" v-model="newRestaurant.name" required>
            </div>
            <div class="form-group">
              <label for="contact">Contact:</label>
              <input type="text" v-model="newRestaurant.contact" required>
            </div>
            <div class="form-group">
              <label for="address">Address:</label>
              <input type="text" v-model="newRestaurant.address" required>
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        restaurants: [],
        showModal: false,
        newRestaurant: {
          name: '',
          contact: '',
          address: ''
        }
      };
    },
    async mounted() {
      let res = await axios.get('http://localhost:3000/restaurant');
      this.restaurants = res.data;
    },
    methods: {
      async addRestaurant() {
        // Generate a new ID for the new restaurant (simple increment based on length for this example)
        const newId = this.restaurants.length ? this.restaurants[this.restaurants.length - 1].id + 1 : 1;
        const newRestaurant = { ...this.newRestaurant, id: newId };
  
        // Post the new restaurant to the server
        await axios.post('http://localhost:3000/restaurant', newRestaurant);
  
        // Add the new restaurant to the local list
        this.restaurants.push(newRestaurant);
  
        // Reset the form
        this.newRestaurant.name = '';
        this.newRestaurant.contact = '';
        this.newRestaurant.address = '';
  
        // Hide the modal
        this.showModal = false;
      }
    }
  };
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  button {
    margin-bottom: 10px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    position: relative;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .form-group button {
    display: inline-block;
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-group button:hover {
    background-color: #45a049;
  }
  </style>