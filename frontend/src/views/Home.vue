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
        <div class="card">
          <div class="card-header">
            <strong>Voice Channel </strong>
            <VoiceChannelLogo />
          </div>
          <div class="card-body">
            <h5 class="card-title">WandaVision Discussion</h5>
            <p class="card-meta text-muted">
              <strong>Entertainment </strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="maroon"
                class="bi bi-camera-reels-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                <path
                  d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z"
                />
              </svg>
            </p>
            <p class="card-text">
              Meet some wonderful marvel nerds and theorize about the latest
              episode of WandaVision!
            </p>
            <a href="" class="btn btn-outline-dark btn-sm"
              ><strong>Join</strong></a
            >
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <strong>Text Channel </strong>
            <TextChannelLogo />
          </div>
          <div class="card-body">
            <h5 class="card-title">Among Us Gaming Party</h5>
            <p class="card-meta text-muted">
              <strong>Gaming </strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="green"
                class="bi bi-joystick"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"
                />
                <path
                  d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"
                />
              </svg>
            </p>
            <p class="card-text">
              Tired of playing among us alone with random people on the
              internet? Join this chat and meet new people while playing the
              game!
            </p>
            <a
              href="https://discord.com/channels/812457952052903937/812524975356903495"
              class="btn btn-outline-dark btn-sm"
              target="_blank"
              rel="noopener noreferrer"
              ><strong>Join</strong></a
            >
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <strong>Text Channel </strong>
            <TextChannelLogo />
          </div>
          <div class="card-body">
            <h5 class="card-title">Obama's Promised Land</h5>
            <p class="card-meta text-muted">
              <strong>Reading </strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="orange"
                class="bi bi-bookmark-star-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                />
              </svg>
            </p>
            <p class="card-text">
              Join the chat and talk about Barack Obama's views and observations
              conveyed in the book Promised land!
            </p>
            <a href="" class="btn btn-outline-dark btn-sm"
              ><strong>Join</strong></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextChannelLogo from "../assets/svgs/TextChannelLogo.vue";
import VoiceChannelLogo from "../assets/svgs/VoiceChannelLogo.vue";

export default {
  name: "Home",
  components: {
    TextChannelLogo,
    VoiceChannelLogo,
  },
  data() {
    return {
      images: { mainImage: require("@/assets/images/mainImage.png") },
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
