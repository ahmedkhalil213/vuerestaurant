<template>
    <div>
      <h1>Restaurants</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="restaurant in restaurants" :key="restaurant.id">
            <td>{{ restaurant.id }}</td>
            <td>{{ restaurant.name }}</td>
            <td>{{ restaurant.contact }}</td>
            <td>{{ restaurant.address }}</td>
            <td>
              <button @click="editRestaurant(restaurant)">Edit</button>
              <button class="btndel" @click="deleteRestaurant(restaurant.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showModal = false">&times;</span>
          <h2>Edit Restaurant</h2>
          <form @submit.prevent="updateRestaurant">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" v-model="editedRestaurant.name" required>
            </div>
            <div class="form-group">
              <label for="contact">Contact:</label>
              <input type="text" v-model="editedRestaurant.contact" required>
            </div>
            <div class="form-group">
              <label for="address">Address:</label>
              <input type="text" v-model="editedRestaurant.address" required>
            </div>
            <button type="submit">Update</button>
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
        editedRestaurant: {
          id: null,
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
      async updateRestaurant() {
        try {
          await axios.put(`http://localhost:3000/restaurant/${this.editedRestaurant.id}`, this.editedRestaurant);
          alert('Restaurant updated successfully!');
          this.showModal = false;
          // You might want to refresh the restaurant list here
        } catch (error) {
          console.error('Error updating restaurant:', error);
        }
      },
      editRestaurant(restaurant) {
        // Set the edited restaurant details and show the modal
        this.editedRestaurant = { ...restaurant };
        this.showModal = true;
      },
      async deleteRestaurant(id) {
        try {
          await axios.delete(`http://localhost:3000/restaurant/${id}`);
          alert('Restaurant deleted successfully!');
          // Refresh the restaurant list
          let res = await axios.get('http://localhost:3000/restaurant');
          this.restaurants = res.data;
        } catch (error) {
          console.error('Error deleting restaurant:', error);
        }
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
    .btndel{
        margin-bottom: 10px;
      padding: 10px 20px;
      background-color: #c02d22;
      color: white;
      border: none;
      cursor: pointer; 
    }
    .btndel:hover{
        background-color: #f14510;
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