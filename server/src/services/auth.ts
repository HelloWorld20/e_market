/*
 * @Author: jianghong.wei
 * @Date: 2019-11-13 11:15:19
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-22 10:48:53
 * 授权相关，登陆、
 */

import * as config from '../modules/config';
import { ServiceError } from '../modules';
import * as db_auth_admin from '../db/user-admin';
import { Request } from 'express';

const sha1 = require('sha1');

const WECHAT_VALID_TOCKEN = config.get('wechat.valid_tocken');
/**
 * 接入微信公众平台接口
 * @param signature
 * @param timestamp
 * @param nonce
 */
export async function wechatServerValid(
    signature: string,
    timestamp: string,
    nonce: string
) {
    const tmpArr = [nonce, timestamp, WECHAT_VALID_TOCKEN];
    const tmpStr = sha1(tmpArr.join(''));
    return tmpStr === signature;
}

export async function register(username: string, password: string) {
    if (username.trim().length <= 0 || password.trim().length <= 0) {
        throw new ServiceError('400', '请输入用户名或密码');
    }
    const encryptPw = sha1(password);
    const users = await db_auth_admin.find({ username });
    if (users.length >= 1) {
        throw new ServiceError('400', '用户名已使用');
    }

    return await db_auth_admin.insert({ username, password: encryptPw });
}

export async function login(req: Request, username: string, password: string) {
    if (username.trim().length <= 0 || password.trim().length <= 0) {
        throw new ServiceError('400', '请输入用户名或密码');
    }
    const encryptPw = sha1(password);
    const users = await db_auth_admin.find({ username, password: encryptPw });
    if (users.length <= 0) {
        throw new ServiceError('400', '账号或密码错误');
    } else {
        if (req.session) {
            req.session.username = username;
        }
        return '登陆成功';
    }
}

export async function logout(req: Request) {
    if (req.session) {
        delete req.session.username;
    }
    return '退出成功';
}

// H5端的获取微信用户信息
export async function getUserInfo(req: Request) {
    const userInfo = {
        city: '深圳',
        country: '中国',
        headimgurl:
            'http://thirdwx.qlogo.cn/mmopen/18nEVVwnTDeOp7Lgj0HfkON0Cvgmo8gNOPVlEnYkR03X8uh3LnT1B9pOlXzqV6dKx6zGjiapWLsNegKE0pCrxNN2MVOqW15K6/132',
        latitude: null,
        longitude: null,
        nickName: 'Leon.W',
        openid: 'oe_r7wtyjnUtiwiIJWji-5KOkAeM',
        province: '广东',
        sex: 1,
        unionid: '',
        userId: 4,
    };
    if (req.session) {
        req.session.openid = userInfo.openid;
        return userInfo;
    }

    throw new ServiceError('403', '获取用户信息失败');
}
