<template>
    <div class="home">
        <div class="home-carosel">
            <mt-swipe :auto="4000">
                <mt-swipe-item style="background-color: green;"
                    >1</mt-swipe-item
                >
                <mt-swipe-item style="background-color: yellow;"
                    >2</mt-swipe-item
                >
                <mt-swipe-item style="background-color: red;">3</mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="home-category">
            <div
                class="home-category-item"
                :key="item.id"
                v-for="item in cateData"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="home-recommend">
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
            <div class="home-recommend-item"></div>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            cateData: [],
        };
    },
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
    },
    async created() {
        const category = await this.getCategory();
        this.cateData = category;
    },
    methods: {
        ...mapActions(['getCategory']),
    },
};
</script>

<style lang="less" scoped src="./index.less"></style>
