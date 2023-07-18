/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		container: {
			// you can configure the container to be centered
			center: true,

			// or have default horizontal padding
			padding: '1rem',

			// default breakpoints but with 40px removed
			screens: {
				sm: '600px',
				md: '728px',
				lg: '984px',
				xl: '1240px',
				'2xl': '1496px',
			},
		},
		colors: {
			'blue': '#1fb6ff',
			'purple': '#7e5bef',
			'red': '#e65454',
			'pink': '#ff49db',
			'orange': '#ff7849',
			'green': '#13ce66',
			'yellow': '#ffc82c',
			'gray-dark': '#273444',
			'gray': '#8492a6',
			'gray-light': '#d3dce6',
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		fontSize: {
			"sm": "0.8rem",
			"md": "1rem",
			"lg": "1.1rem",
			"1xl": "1.25rem",
			"2xl": "2rem",
			"3xl": "3.5rem"
		},
		extend: {
			spacing: {
				'8xl': '96rem',
				'9xl': '128rem',
			},
			borderRadius: {
				'4xl': '2rem',
			}
		}
	},
	plugins: [
		require('flowbite/plugin')
	],
}
