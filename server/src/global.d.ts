interface UserInfo {
    city: string;
    country: string,
    headimgurl: string,
    latitude: number | null,
    longitude: number | null,
    nickName: string,
    openid: string,
    province: string,
    sex: number,
    unionid: string,
    userId: number,
    cart: Array<{
        id: number, // 商品id
        name: string,   // 商品名称
        prise: number,  // 商品单价
        unit: string,   // 商品单位
        number: number, // 购买数量
        images: string[],      // 商品图片
        restNum: number,        // 剩余库存
        totalNum: number,       // 总库存
        totalPrise: number, // 商品总价
    }>;
    addr: Array<{
        id: number,
        orderName: string,
        orderPhone: number,
        orderAddr: string
    }> | Array<null>
}
