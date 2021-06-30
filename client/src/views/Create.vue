<template>
	<div class="flex flex-col justify-around md:flex-row">
		<div class="w-full mx-auto mb-10 md:w-1/2 conduct sm:mb-0">
			<button
				class="flex content-start p-2 mt-10 mb-10 text-lg font-bold rounded md:mt-0 bg-grey-lightest hover:bg-grey-darkest hover:text-white"
				@click.prevent="routeHome()"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="currentColor"
					class="mr-4 bi bi-arrow-left-circle-fill"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
					/>
				</svg>
				Go Back
			</button>
			<p class="mb-5 text-3xl font-extrabold text-left sm:mt-0">
				Create a <span class="title">room.</span>
			</p>
			<img
				:src="images.createImage"
				v-if="room === null"
				class="w-full mb-5 sm:w-3/5 h-1/2"
				alt="People hanging out!"
			/>
			<p
				class="font-medium leading-loose text-left text-justify text-md"
				v-if="room != null"
			>
				Your room has been created successfully! Click on the box below to join.
				Share the invite code from the browser with your friends.
			</p>
			<RoomCard
				v-if="room != null"
				class="m-auto mt-2 mb-5"
				:key="room.id"
				:id="room.id"
				:title="room.title"
				:desc="room.desc"
				:type="room.type"
				:category="room.category"
				:channel_link="room.channel_link"
			>
			</RoomCard>
			<div class="m-auto rounded shadow bg-blue-lightest">
				<p
					class="p-3 font-medium leading-loose text-left text-justify text-md hover:underline text-grey-darkest"
				>
					<span class="mr-3 text-red-dark">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-suit-heart-fill"
							viewBox="0 0 16 16"
						>
							<path
								d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"
							/>
						</svg>
					</span>
					We want this to be a fun, pleasant, and harassment-free experience for
					everyone, regardless of gender, gender identity and expression, sexual
					orientation, disability, physical appearance, body size, race, or
					religion. We do not tolerate harassment of participants in any form.
				</p>
			</div>
		</div>
		<div class="flex flex-col w-full m-auto mb-10 ml-0 sm:w-1/2">
			<form id="roomDetails" class="mb-10">
				<div class="flex flex-row mb-5">
					<label for="titleField" class="w-1/4 p-2 mr-10 font-bold text-right"
						>Room Title</label
					>
					<input
						id="titleField"
						class="w-3/5 p-2 rounded bg-grey-lightest"
						type="text"
						v-model="roomDetails.title"
						placeholder="Give your room a fun title!"
						required
					/>
				</div>
				<div class="flex flex-row mb-5">
					<label
						class="w-1/4 p-2 mr-10 font-bold text-right"
						for="categorySelection"
					>
						Category</label
					>
					<select
						class="w-3/5 p-2 rounded bg-grey-lightest"
						id="categorySelection"
						v-model="roomDetails.category"
					>
						<option value="entertainment">Entertainment</option>
						<option value="gaming">Gaming</option>
						<option value="reading">Reading</option>
						<option value="random">Random</option>
					</select>
				</div>
				<div class="flex flex-row mb-5">
					<label for="descTextArea" class="w-1/4 p-2 mr-10 font-bold text-right"
						>Description</label
					>
					<textarea
						class="w-3/5 p-2 rounded bg-grey-lightest"
						id="descTextArea"
						rows="4"
						v-model="roomDetails.desc"
						placeholder="Describe the room in 100 characters or less!"
						required
					/>
				</div>
				<div class="flex flex-row mb-5">
					<label for="roomOptions" class="w-1/4 p-2 mr-10 font-bold text-right">
						Room Type</label
					>
					<div class="w-3/5 p-2 rounded">
						<label for="textOption" class="p-2 mr-2">Text Room</label>
						<input
							type="radio"
							name="textOption"
							value="text"
							class="mr-5"
							v-model="roomDetails.type"
						/>
						<label for="voiceOption" class="p-2 mr-2">Voice Room</label>
						<input
							type="radio"
							name="voiceOption"
							value="voice"
							v-model="roomDetails.type"
						/>
					</div>
				</div>
				<button
					type="button"
					class="px-3 py-2 rounded bg-purple-lightest hover:bg-purple hover:text-white"
					@click.prevent="handleSubmitForm()"
				>
					<strong>Submit</strong>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
const axios = require('axios');
import RoomCard from '../components/RoomCard.vue';

export default {
	name: 'Conduct',
	components: {
		RoomCard,
	},
	data() {
		return {
			images: { createImage: require('@/assets/images/home-image.svg') },
			roomDetails: {
				title: '',
				desc: '',
				type: 'text',
				category: 'random',
			},
			room: null,
			validated: false,
		};
	},
	methods: {
		routeHome() {
			this.$router.push('/home');
		},
		handleSubmitForm() {
			let apiURL = 'api/rooms';
			axios
				.post(apiURL, this.roomDetails, {
					'Access-Control-Allow-Origin': '*',
					'content-type': 'text/json',
				})
				.then((res) => {
					this.roomMessage = `<div class="mx-auto card w-50">
              <div class="card-header">
                <strong>Your <span class="text-warning">${res.data.category}</span> themed room is ready!</strong>
              </div>
              <div class="card-body">
                <h5 class="card-title">${res.data.title}</h5>
                <p class="text-center card-text">${res.data.desc}.</p>
                <a target="_blank" rel="noopener noreferrer" href="${res.data.channel_link}" class="mr-2 btn btn-outline-dark"><strong>Join the room</strong></a>
              </div>
            </div>`;
					this.room = res.data;
					this.roomDetails = {
						title: '',
						desc: '',
						type: 'text',
						category: 'random',
					};
				})
				.catch(() => {
					this.roomMessage = `<h5><strong><span class="text-danger">Please fill out all the details properly!</span></strong></h5>`;
				});
		},
	},
	computed: {
		buttonStatus: function() {
			return this.checked && this.validated;
		},
	},
};
</script>

<style>
.title {
	background-image: url('../assets/images/pride-background.jpg');
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;
	-moz-text-fill-color: transparent;
	-moz-background-clip: text;
}

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
