<template>
  <div class="container ml-mr-2">
    <div id="d-flex flex-row">
      <div class="d-flex flex-wrap align-items-center">
        <div class="col-sm mr-1 justify-content-left">
          <img
            :src="images.mainImage"
            class="illustration"
            alt="Illustration of me working"
          />
        </div>
        <div class="col-sm mt-4">
          <h2 class="title-head text-dark">Welcome!</h2>
          <p class="title-content mr-4">
            MakePals is an online community where you can create rooms to meet
            people and talk about things you love. Its truly as simple as that!
            Create a room and just wait for the people to pour in.
          </p>
        </div>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <div class="card-columns justify-content-center">
        <div class="card">
          <div class="card-body text-align-center">
            <h5 class="card-title">Create Room</h5>
            <p class="card-text">
              Create a room and meet people who share your passion and
              interests!
            </p>
            <router-link to="/create">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline-dark btn-sm"
                ><strong>Create</strong></a
              >
            </router-link>
          </div>
        </div>
        <div class="card" v-for="room in rooms" :key="room.id">
          <div v-if="room.type == 'text'"><TextChannel /></div>
          <div v-if="room.type == 'voice'"><VoiceChannel /></div>
          <div class="card-body">
            <h5 class="card-title">{{ room.title }}</h5>
            <div v-if="room.category == 'gaming'"><GamingLogo /></div>
            <div v-if="room.category == 'entertainment'">
              <EntertainmentLogo />
            </div>
            <div v-if="room.category == 'reading'"><ReadingLogo /></div>
            <div v-if="room.category == 'random'"><RandomLogo /></div>
            <p class="card-text">{{ room.desc }}</p>
            <a
              :href="room.channel_link"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline-dark btn-sm"
              ><strong>Join</strong></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextChannel from "../assets/svgs/channel/TextChannel.vue";
import VoiceChannel from "../assets/svgs/channel/VoiceChannel.vue";
import ReadingLogo from "../assets/svgs/category/ReadingLogo.vue";
import EntertainmentLogo from "../assets/svgs/category/EntertainmentLogo.vue";
import GamingLogo from "../assets/svgs/category/GamingLogo.vue";
import RandomLogo from "../assets/svgs/category/RandomLogo.vue";
const axios = require("axios");

export default {
  name: "Home",
  components: {
    TextChannel,
    VoiceChannel,
    ReadingLogo,
    EntertainmentLogo,
    GamingLogo,
    RandomLogo,
  },
  data() {
    return {
      images: { mainImage: require("@/assets/images/mainImage.png") },
      rooms: [],
    };
  },
  async mounted() {
    let apiURL = "api/rooms";
    axios
      .get(apiURL)
      .then((res) => {
        this.rooms = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
.card-title {
  font-weight: 600;
}

.card-text {
  text-align: left;
  font-size: 1em;
  font-weight: 500;
}

.illustration {
  height: 250px;
  width: 320px;
}

.title-head {
  text-align: start;
  font-weight: 700;
}

.title-content {
  text-align: start;
  font-weight: 500;
}
</style>
