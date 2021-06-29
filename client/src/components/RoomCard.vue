<template>
	<button
		class="w-full h-auto m-2 rounded-lg shadow hover:shadow-lg hover:bg-purple-lightest md:w-80"
		@click.prevent="channelRedirect()"
		:key="id"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			v-if="type == 'text'"
			class="m-1 mt-2"
			fill="orange"
			viewBox="0 0 16 16"
		>
			<path
				d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"
			/>
		</svg>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			v-if="type == 'voice'"
			class="m-1 mt-2"
			fill="purple"
			viewBox="0 0 16 16"
		>
			<path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
			<path
				fill-rule="evenodd"
				d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"
			/>
		</svg>
		<div class="mt-2 mb-3">
			<h3 class="mb-1 text-lg font-bold text-center">
				{{ title }}
			</h3>
			<p
				class="ml-5 mr-5 font-medium leading-loose text-center break-words text-md"
			>
				{{ desc }}
			</p>
		</div>
		<div class="mb-3">
			<div
				v-if="category == 'gaming'"
				class="text-sm font-extrabold tracking-wide uppercase text-purple"
			>
				Gaming
			</div>
			<div
				v-if="category == 'entertainment'"
				class="text-sm font-extrabold tracking-wide uppercase text-orange"
			>
				Entertainment
			</div>
			<div
				v-if="category == 'reading'"
				class="text-sm font-extrabold tracking-wide uppercase text-green"
			>
				Reading
			</div>
			<div
				v-if="category == 'random'"
				class="text-sm font-extrabold tracking-wide uppercase text-red"
			>
				Random
			</div>
		</div>
	</button>
</template>

<script>
export default {
	name: 'RoomCard',
	props: ['id', 'title', 'desc', 'channel_link', 'type', 'category'],
	data() {
		return {
			link: this.channel_link,
		};
	},
	methods: {
		channelRedirect() {
			window.open(this.link);
		},
	},
};
</script>

<style scoped></style>
