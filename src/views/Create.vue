<template>
  <div class="container ml-mr-2">
    <div id="d-flex flex-row">
      <div class="d-flex flex-wrap align-items-center">
        <div class="col-sm mr-1 justify-content-left">
          <img
            :src="images.createImage"
            class="illustration"
            alt="Starting a conversation"
          />
        </div>
        <div class="col-sm mt-4">
          <h2 class="title-head text-dark">Create a Room!</h2>
          <p class="title-content mr-4">
            Create a room by filling the form below. Share the link with your
            friends to allow them to join easily. Any kinds of racism, sexism or
            homophobia will not be tolerated in the server. What you should know
            about the channels:
          </p>
          <ul class="title-content">
            <li>Inactive channels are purged automatically within 2 days</li>
            <li>Text channels are monitored for slurs and other bad words</li>
          </ul>
        </div>
      </div>
    </div>
    <br />
    <br />
    <hr />
    <br />
    <span v-html="roomMessage"></span>
    <br />
    <hr />
    <br />
    <br />
    <form id="roomDetails">
      <div class="form-group">
        <label for="titleField" class="col-sm-2 p-2" required
          ><strong>Title</strong></label
        >
        <input
          class="col-sm-6 shadow p-2 bg-body rounded border border-light"
          id="titleField"
          type="text"
          v-model="roomDetails.title"
          placeholder="Enter Room Title"
          required
        />
      </div>
      <div class="form-group">
        <label class="col-sm-2 p-2" for="categorySelection">
          <strong>Category</strong></label
        >
        <select
          class="custom-select col-sm-6 shadow bg-body rounded border border-light"
          id="categorySelection"
          v-model="roomDetails.category"
        >
          <option value="entertainment">Entertainment</option>
          <option value="gaming">Gaming</option>
          <option value="reading">Reading</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div class="form-group">
        <label for="descTextArea" class="col-sm-2 align-top p-2">
          <strong>Description</strong></label
        >
        <textarea
          class="col-sm-6 shadow p-2 bg-body rounded border border-light"
          id="descTextArea"
          rows="3"
          v-model="roomDetails.desc"
          placeholder="Describe the room (Make it fun and inclusive!)"
          required
        />
      </div>
      <div class="form-group justify-content-center">
        <label for="textOption" class="mr-2">
          <strong>Text Channel</strong></label
        >
        <input
          type="radio"
          name="textOption"
          value="text"
          class="mr-3"
          v-model="roomDetails.type"
        />
        <label for="voiceOption" class="ml-3 mr-2">
          <strong>Voice Channel</strong></label
        >
        <input
          type="radio"
          name="voiceOption"
          value="voice"
          v-model="roomDetails.type"
        />
      </div>
      <div class="form-group justify-content-center">
        <input type="checkbox" v-model="checked" />
        <label class="ml-3 text-muted" for="categorySelection">
          <strong
            >I have read and I agree with the code of conduct</strong
          ></label
        >
      </div>
      <button
        type="button"
        v-bind:class="buttonStatus ? btn.activeClass : btn.errorClass"
        @click="handleSubmitForm"
      >
        <strong>Submit</strong>
      </button>
    </form>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Conduct",
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:3000/api/rooms";
      axios
        .post(apiURL, this.roomDetails, {
          "Access-Control-Allow-Origin": "*",
          "content-type": "text/json",
        })
        .then((res) => {
          this.roomMessage = `<div class="card mx-auto w-50">
              <div class="card-header">
                <strong>Your <span class="text-warning">${res.data.category}</span> themed room is ready!</strong>
              </div>
              <div class="card-body">
                <h5 class="card-title">${res.data.title}</h5>
                <p class="card-text text-center">${res.data.desc}.</p>
                <a target="_blank" rel="noopener noreferrer" href="${res.data.channel_link}" class="btn btn-outline-dark mr-2"><strong>Join the room</strong></a>
              </div>
            </div>`;
          this.res = res.data;
          this.roomDetails = {
            title: "",
            desc: "",
            type: "text",
            category: "random",
          };
        })
        .catch(() => {
          this.roomMessage = `<h5><strong><span class="text-danger">Please fill out all the details properly!</span></strong></h5>`;
        });
    },
  },
  computed: {
    buttonStatus: function () {
      return this.checked && this.validated;
    },
  },
  data() {
    return {
      images: { createImage: require("@/assets/images/createImage.png") },
      roomDetails: {
        title: "",
        desc: "",
        type: "text",
        category: "random",
      },
      checked: false,
      validated: false,
      btn: {
        activeClass: "btn btn-outline-dark mt-1 mb-4",
        errorClass: "btn btn-outline-dark mt-1 mb-4 disabled",
      },
      roomMessage: `<h5><strong>You haven't created any rooms yet!</strong></h5>`,
    };
  },
};
</script>

<style>
.title-head {
  text-align: start;
  font-weight: 700;
}

.title-content {
  text-align: start;
  font-weight: 500;
  font-size: 1.05em;
}

.illustration {
  height: 250px;
  width: 320px;
}

hr {
  width: 25%;
}
</style>
