import { makeAutoObservable } from 'mobx'
import { User } from './user.interface'

export class UserStore {
  private user: User | undefined = undefined
  constructor() {
    makeAutoObservable(this)
  }

  public get getUser() {
    return this.user
  }

  public set setUser(user: User | undefined) {
    this.user = user
  }
}
