import { makeAutoObservable } from 'mobx'
import { User } from './user.interface'

class UserStore {
  private user: User | undefined = undefined
  private isAuth: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  public get getUser() {
    return this.user
  }

  public set setUser(user: User | undefined) {
    this.user = user
  }

  public get getIsAuth() {
    return this.isAuth
  }

  public set setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  public reset() {
    this.user = undefined
    this.isAuth = false
  }
}

export default new UserStore()

