<!--
 * @Author: Peng zhang
 * @Date: 2021-01-11 14:45:05
 * @LastEditTime: 2021-01-12 14:25:49
 * @Description:
-->
<template>
	<div class="person-cell">
		<ok-person-cell :person="userInfo"></ok-person-cell>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

const formatImage = (img: string) => {
	return img ? img.replace(/_compressed_100$/gi, '') : ''
}
export default defineComponent({
	name: 'person-cell',
	props: {
		person: {
			type: Object,
			required: true,
			default: () => ({}),
		},
	},
	components: {},
	setup(props) {
		const userInfo = computed(() => {
			return {
				...props.person,
				headImage: formatImage(props.person.headImage),
			}
		})
		return {
			userInfo,
		}
	},
})
</script>

<style lang="less"></style>
