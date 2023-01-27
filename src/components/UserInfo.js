export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector)
    this._about = document.querySelector(jobSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name
    this._about.textContent = about
    this._avatar.src = avatar
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar
  }
}
