<template>
    <div class="cate">
        <div class="cate-menu">
            <side-menu
                :menuData="menuData"
                @menuChange="menuChange"
            ></side-menu>
        </div>
        <div class="cate-list">
            <ul>
                <li
                    class="cate-list-item"
                    :key="item.id"
                    v-for="item in goodsData"
                >
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import SideMenu from '@components/SideMenu';
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            menuData: [],
            goodsData: [],
        };
    },
    components: { SideMenu },
    async mounted() {
        const menuData = await this.getCategory();
        if (menuData.length > 0) {
            const goodsData = await this.getGoods(menuData[0].id);

            this.menuData = menuData;
            this.goodsData = goodsData.data;
        }
    },
    methods: {
        ...mapActions(['getCategory', 'getGoods']),
        async menuChange(id) {
            const goodsData = await this.getGoods(id);
            this.goodsData = goodsData.data;
        },
    },
    watch: {
        goodsData(val) {
            console.log(val);
        },
    },
};
</script>

<style lang="less" scoped src="./index.less"></style>
