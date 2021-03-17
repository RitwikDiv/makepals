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
            closes). Have fun!
          </p>
        </div>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <form id="roomDetails">
      <div class="form-group">
        <label for="titleField" class="col-sm-2"><strong>Title</strong></label>
        <input
          class="ml-2 text-muted col-sm-3"
          id="titleField"
          type="text"
          v-model="roomDetails.title"
        />
      </div>
      <div class="form-group">
        <label class="col-sm-2" for="categorySelection">
          <strong>Category</strong></label
        >
        <select
          class="ml-2 col-sm-3"
          id="categorySelection"
          v-model="roomDetails.category"
        >
          <option value="entertainment">Entertainment</option>
          <option value="gaming">Gaming</option>
          <option value="reading">Reading</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label for="descTextArea" class="col-sm-2 align-top">
          <strong>Description</strong></label
        >
        <textarea
          type="text"
          class="ml-2 text-muted col-sm-3"
          id="descTextArea"
          rows="4"
          v-model="roomDetails.desc"
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
        <label class="ml-4 text-muted" for="categorySelection">
          <strong
            >I have read and I agree with the code of conduct</strong
          ></label
        >
      </div>
      <router-link
        to="/home"
        type="submit"
        v-bind:class="checked ? btn.activeClass : btn.errorClass"
        @click="logRoom"
      >
        <strong>Submit</strong>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "Conduct",
  methods: {
    logRoom: function () {
      console.log(this.roomDetails);
      this.submitStatus = false;
    },
  },
  data() {
    return {
      images: { createImage: require("@/assets/images/createImage.png") },
      roomDetails: {
        title: "",
        desc: "",
        type: "text",
        category: "gaming",
      },
      checked: false,
      btn: {
        activeClass: "btn btn-outline-dark mt-1 mb-4",
        errorClass: "btn btn-outline-dark mt-1 mb-4 disabled",
      },
      submitStatus: true,
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
