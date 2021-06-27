<template>
	<div class="flex flex-col">
		<div class="flex flex-col sm:flex-row sm:mr-20">
			<div class="w-full sm:w-3/5 m-auto">
				<h2 class="text-3xl sm:mt-0 sm:text-4xl text-left">
					Welcome to <span class="title">Pally.</span>
				</h2>
				<p class="text-lg font-medium mt-5 text-left leading-loose">
					Pally is an online community where you can meet
					<span class="font-bold text-purple">meet new people</span> by creating
					custom discord rooms. You don't need to go through the trouble of
					creating and maintaining complicated servers. All the inactive rooms
					are <span class="font-bold text-red">automatically purged</span> at
					the end of the day.
				</p>
				<div
					id="typed-element"
					class="underline font-semibold text-left mt-5"
				></div>
				<div id="social-links" class="mt-10 flex flex-row justify-start">
					<a
						class="icon"
						:href="github"
						target="_blank"
						rel="noopener noreferrer"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="black"
							class="bi bi-github mr-3"
							viewBox="0 0 16 16"
						>
							<path
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
							/></svg
					></a>
					<a
						class="icon"
						:href="discord"
						target="_blank"
						rel="noopener noreferrer"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="#7289da"
							class="bi bi-discord mr-3"
							viewBox="0 0 16 16"
						>
							<path
								d="M6.552 6.712c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888.008-.488-.36-.888-.816-.888zm2.92 0c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888s-.36-.888-.816-.888z"
							/>
							<path
								d="M13.36 0H2.64C1.736 0 1 .736 1 1.648v10.816c0 .912.736 1.648 1.64 1.648h9.072l-.424-1.48 1.024.952.968.896L15 16V1.648C15 .736 14.264 0 13.36 0zm-3.088 10.448s-.288-.344-.528-.648c1.048-.296 1.448-.952 1.448-.952-.328.216-.64.368-.92.472-.4.168-.784.28-1.16.344a5.604 5.604 0 0 1-2.072-.008 6.716 6.716 0 0 1-1.176-.344 4.688 4.688 0 0 1-.584-.272c-.024-.016-.048-.024-.072-.04-.016-.008-.024-.016-.032-.024-.144-.08-.224-.136-.224-.136s.384.64 1.4.944c-.24.304-.536.664-.536.664-1.768-.056-2.44-1.216-2.44-1.216 0-2.576 1.152-4.664 1.152-4.664 1.152-.864 2.248-.84 2.248-.84l.08.096c-1.44.416-2.104 1.048-2.104 1.048s.176-.096.472-.232c.856-.376 1.536-.48 1.816-.504.048-.008.088-.016.136-.016a6.521 6.521 0 0 1 4.024.752s-.632-.6-1.992-1.016l.112-.128s1.096-.024 2.248.84c0 0 1.152 2.088 1.152 4.664 0 0-.68 1.16-2.448 1.216z"
							/></svg
					></a>
				</div>
			</div>
			<div
				class="ml-2 sm:ml-10 w-4/5 h-4/5 flex justify-around sm:w-2/5 sm:h-1/2"
			>
				<img :src="images.mainImage" class="image" alt="People hanging out!" />
			</div>
		</div>
		<div class="h-px bg-grey-lighter mb-2"></div>
		<div class="flex flex-col sm:flex-row flex-wrap mb-2">
			<div
				class="sm:mb-0 sm:mr-3 m-2 border-r-0 border-b sm:border-b-0 sm:mb-0 sm:border-r-2 border-grey-lighter"
			>
				<button
					@click.prevent="routeCreate()"
					class="px-2 py-3 mr-8 mb-4 sm:mb-0 bg-purple-lightest hover:bg-purple rounded hover:text-white font-bold"
				>
					Create a room
				</button>
			</div>
			<form class="filter-form m-2 flex flex-col sm:flex-row flex-wrap">
				<div class="mb-2 sm:mb-0 mr-0 sm:mr-5">
					<label class="p-2 mr-3 font-semibold text-left" for="channel-type">
						<strong>Channel&nbsp;</strong></label
					>
					<select
						class="p-2 rounded bg-grey-lightest"
						id="channel-type"
						v-model="sort.type"
					>
						<option value="any">All Channels</option>
						<option value="voice">Voice Channel</option>
						<option value="text">Text Channel</option>
					</select>
				</div>
				<div class="ml-2 sm:ml-0 sm:mt-0">
					<label
						class="p-2 mr-3 font-semibold text-left "
						for="channel-category"
					>
						<strong>Category</strong></label
					>
					<select
						class="p-2 rounded bg-grey-lightest"
						id="channel-category"
						v-model="sort.category"
					>
						<option value="any">All Categories</option>
						<option value="entertainment">Entertainment</option>
						<option value="gaming">Gaming</option>
						<option value="reading">Reading</option>
						<option value="random">Random</option>
					</select>
				</div>
				<button
					class="ml-5 mt-5 sm:mt-0 mr-3 p-2 rounded font-bold bg-grey-lightest hover:bg-grey-darkest hover:text-white"
					@click.prevent="sortRooms()"
				>
					Sort Rooms
				</button>
			</form>
		</div>
		<div class="h-px bg-grey-lighter mb-5"></div>
		<div class="flex flex-row flex-wrap">
			<RoomCard
				class="card"
				v-for="room in sort_rooms"
				:key="room.id"
				:id="room.id"
				:title="room.title"
				:desc="room.desc"
				:type="room.type"
				:category="room.category"
				:channel_link="room.channel_link"
			>
			</RoomCard>
		</div>
	</div>
</template>

<script>
import RoomCard from '../components/RoomCard.vue';
const axios = require('axios');
import Typed from 'typed.js';

export default {
	name: 'Home',
	components: {
		RoomCard,
	},
	methods: {
		routeCreate() {
			this.$router.push('/create');
		},
		sortRooms() {
			if (this.sort.type == 'any' && this.sort.category == 'any')
				this.sort_rooms = this.rooms;
			else if (this.sort.type == 'any')
				this.sort_rooms = this.rooms.filter(
					(x) => x.category == this.sort.category
				);
			else if (this.sort.category == 'any')
				this.sort_rooms = this.rooms.filter((x) => x.type == this.sort.type);
			else
				this.sort_rooms = this.rooms.filter(
					(x) => x.type == this.sort.type && x.category == this.sort.category
				);
		},
	},
	data() {
		return {
			github: 'https://github.com/RitwikDiv/makepals',
			discord: 'https://discord.com/channels/823003994435092542',
			images: { mainImage: require('@/assets/images/home-image.svg') },
			rooms: [],
			sort_rooms: [],
			sort: {
				type: 'any',
				category: 'any',
			},
		};
	},
	async mounted() {
		let apiURL = 'api/rooms';
		axios
			.get(apiURL)
			.then((res) => {
				this.rooms = res.data;
				this.sort_rooms = this.rooms;
			})
			.catch((error) => {
				console.log(error);
			});
		var options = {
			strings: [
				'Find people to play among us!!',
				'Find people to read new books!!',
				'Find people to have a netflix streaming party!!',
				'Find people to marathon marvel movies!!',
				'Find people to marathon harry potter movies!!',
				'Find people to talk about the latest shadow and bone tv show!!',
				'Find people to play call of duty!!',
				'Find people to play stardew valley!!',
				'Find people to play minecraft!!',
				'Find people to play jackbox party games!!',
				'Find people to play gartic phone!!',
				'Find people to chat about popular twitch streamers!!',
				'Find people to chat about science!!',
				'Find people to chat about how your lives are going!!',
				'Find people to chat about the latest new trends!! ',
			],
			typeSpeed: 80,
			smartBackspace: true,
			showCursor: false,
			loop: true,
			shuffle: true,
		};

		new Typed('#typed-element', options);
	},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');

.title {
	background-image: url('../assets/images/pride-background.jpg');
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;
	-moz-text-fill-color: transparent;
	-moz-background-clip: text;
}

#typed-element {
	font-family: 'Nanum Pen Script', cursive;
	font-size: 1.6rem;
}
</style>
