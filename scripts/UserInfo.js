export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector)
    this._aboutMe = document.querySelector(jobSelector)
  }

  getUserInfo() {
    return { name: this._name.textContent, aboutMe: this._aboutMe.textContent }
  }

  setUserInfo({ name, aboutMe }) {
    this._name.textContent = name
    this._aboutMe.textContent = aboutMe
  }
}
