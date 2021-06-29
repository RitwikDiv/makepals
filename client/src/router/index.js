import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Create from '../views/Create.vue';

const routes = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
	},
	{
		path: '/create',
		name: 'Create',
		component: Create,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
