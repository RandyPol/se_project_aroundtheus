export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector)
    this._about = document.querySelector(jobSelector)
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name
    this._about.textContent = about
  }
}
