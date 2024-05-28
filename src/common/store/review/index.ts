import { makeAutoObservable } from 'mobx'
import { ReviewType } from './review.interface'

class ReviewStore {
  private reviews: ReviewType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  public get getReviews() {
    return this.reviews
  }

  public set setReviews(reviews: ReviewType[]) {
    this.reviews = reviews
  }
}

export default new ReviewStore()
