<template>
<div class="plane">
    <headerComponent></headerComponent>
    <planeComponent></planeComponent>
</div>
</template>

<script>
import headerComponent from '../../components/header'
import planeComponent from '../../components/plane'
export default {
    name: 'plane',
    components: {headerComponent,planeComponent}

}
</script>

<style lang="scss">
.plane{

}
</style>

