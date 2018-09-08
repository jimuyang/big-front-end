<template>
    <el-container id="main-container">
        <el-aside width="200px">
            <aside-menu></aside-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div>
                <bread-crumb></bread-crumb>
                </div>
            </el-header>
            <el-main>
                <card></card>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Card from '../../components/card/card.vue';
import AsideMenu from '../../components/aside-menu/menu.vue';
import BreadCrumb  from '../../components/bread-crumb/bread-crumb.vue';

export default {
    data: function() {
        return {

        };
    },
    components: {
        'card': Card,
        'aside-menu': AsideMenu,
        'bread-crumb': BreadCrumb
    }
};
</script>

<style lang="scss" scoped>
#main-container {
    height: 500px
}
.el-header{
    background: white;
    div {
        margin-top: 20px;
    }
}


</style>