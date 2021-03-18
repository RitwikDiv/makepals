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
            Create a room and start talking about things you love. Feel free to
            share the link and room's name with your friends to let them join.
            Be kind to people and feel free to add them to your friend's list
            with their consent (It may be hard to find them once your room
            closes). What you should know about the channels:
          </p>
          <ul class="title-content">
            <li>Voice Channels are purged within 10 minutes of inactivity</li>
            <li>Text Channels are purged within a day of inactivity</li>
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
          class="col-sm-6 shadow p-2 bg-body rounded border border-light"
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
          type="text"
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
        type="submit"
        v-bind:class="buttonStatus ? btn.activeClass : btn.errorClass"
        @click="validateRoom"
      >
        <strong>Submit</strong>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Conduct",
  methods: {
    validateRoom: function () {
      if (
        this.roomDetails.title.length != 0 &&
        this.roomDetails.desc.length != 0
      ) {
        this.validated = true;
      }
      if (this.validated == true) {
        this.roomMessage = `<h5><strong>Your <span class="text-danger">${this.roomDetails.category}</span> themed <span class="text-warning">${this.roomDetails.title}</span> room is ready! Join 
        <a target="_blank" rel="noopener noreferrer" href="${this.roomDetails.link}"> here </a></strong></h5>`;
      }
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
        link: "",
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
}

.illustration {
  height: 250px;
  width: 320px;
}

hr {
  width: 25%;
}
</style>
