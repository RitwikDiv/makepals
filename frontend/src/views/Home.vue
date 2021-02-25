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
            Create a room and just wait for the people to pour in. The rooms
            will self-destruct if they are empty for longer than a few minutes.
          </p>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div class="card-deck card-columns">
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
            <p class="card-text">{{ room.desc }}</p>
            <a
              :href="room.channelLink"
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

export default {
  name: "Home",
  components: {
    TextChannel,
    VoiceChannel,
    ReadingLogo,
    EntertainmentLogo,
    GamingLogo,
  },
  data() {
    return {
      images: { mainImage: require("@/assets/images/mainImage.png") },
      rooms: [
        {
          id: 1,
          title: "Among us Party",
          desc:
            "Tired of playing among us alone with random people on the internet? Join this chat and meet new people while playing the game!",
          type: "voice",
          category: "gaming",
          channelLink:
            "https://discord.com/channels/812457952052903937/812524975356903495",
        },
        {
          id: 2,
          title: "Obama's Promised Land",
          desc:
            "Join the chat and talk about Barack Obama's views and observations conveyed in the book Promised land!",
          type: "text",
          category: "reading",
          channelLink: "",
        },
        {
          id: 3,
          title: "WandaVision Discussion",
          desc:
            "Meet some wonderful marvel nerds and theorize about the latest episode of WandaVision!",
          type: "voice",
          category: "entertainment",
          channelLink: "",
        },
      ],
    };
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
