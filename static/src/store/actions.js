import { getCategory, getGoods } from '../http/apis';

export default {

	getCategory({ state, commit }) {
		if (state.category.length > 0) {
			return state.category;
		} else {
			return getCategory().then(res => {
				commit('updateCategory', res);
				return res;
			});
		}
	},
	getGoods({ state, commit }, id) {
		if (state.goods[id]) {
			return state.goods[id];
		} else {
			return getGoods({ category: id }).then(res => {
				commit('updateGoods', {
					key: id,
					value: res
				});
				return res;
			});
		}
	}
};
