export default class UserInfo {
    constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userInfoElement = document.querySelector(userInfoSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        const userData = {};
        userData.name = this._userNameElement.textContent;
        userData.about = this._userInfoElement.textContent;
        return userData;
    }

    setUserInfo(userInfo) {
        this._userNameElement.textContent = userInfo.name;
        this._userInfoElement.textContent = userInfo.about;
        this._userAvatarElement.src = userInfo.avatar;
    }
}