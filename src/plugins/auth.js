import Cookies from 'js-cookie';
const Token = 'Admin-Token';
const nickName ='nickname';
const userAvatar ='useravatar';
const expirationTime ='expirationtime';
const getDays ='day';
const isActive ='isactive';//是否激活，false=试用账户  true=非试用账户
const Permission = 'permission'
const Roles ='roles'
const Email ='email'

// 用户
export function getDay() {
    return Cookies.get(getDays)
}
export function setDay(getday) {
    return Cookies.set(getDays, getday)
}
export function removeDay() {
    return Cookies.remove(getDays)
}
export function getEmail() {
    return Cookies.get(Email)
}
export function setEmail(email) {
    return Cookies.set(Email, email)
}
export function removeEmail() {
    return Cookies.remove(Email)
}

export function getToken() {
    return Cookies.get(Token)
}
export function setToken(token) {
    return Cookies.set(Token, token)
}
export function removeToken() {
    return Cookies.remove(Token)
}

export function getNickName() {
    return Cookies.get(nickName)
}
export function setNickName(nickname) {
    return Cookies.set(nickName, nickname)
}
export function removeNickName() {
    return Cookies.remove(nickName)
}

export function getUserAvatar() {
    return Cookies.get(userAvatar)
}
export function setUserAvatar(useravatar) {
    return Cookies.set(userAvatar, useravatar)
}
export function removeUserAvatar() {
    return Cookies.remove(userAvatar)
}

export function getExpirationTime() {
    return Cookies.get(expirationTime)
}
export function setExpirationTime(expirationtime) {
    return Cookies.set(expirationTime, expirationtime)
}
export function removeExpirationTime() {
    return Cookies.remove(expirationTime)
}
export function getIsActive() {
    return Cookies.get(isActive)
}
export function setIsActive(isactive) {
    return Cookies.set(isActive, isactive)
}
export function removeIsActive() {
    return Cookies.remove(isActive)
}
// 权限
export function getPermission() {
    return JSON.parse(localStorage.getItem(Permission));
}
export function setPermission(ary) {
    return localStorage.setItem(Permission, JSON.stringify(ary))
}
export function removePermission() {
    return localStorage.removeItem(Permission)
}
export function getRoles() {
    return JSON.parse(localStorage.getItem(Roles));
}
export function setRoles(ary) {
    return localStorage.setItem(Roles, JSON.stringify(ary))
}
export function removeRoles() {
    return localStorage.removeItem(Roles)
}

