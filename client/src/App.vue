<template>
	<div class="h-screen flex">
		<div class="ml-5 sm:ml-10 mr-5 sm:mr-5 flex flex-col w-full m-auto">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {
	name: 'App',
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-bottom: 25px;
}
</style>
