import { $http } from '../../consts/http'
import { CreateReview } from './review.interface'
import ReviewStore from '../../store/review'

export const createReview = async (data: CreateReview) => {
  await $http.post('/review/create', data)
}

export const getAllReviews = async () => {
  const response = await $http.get('/review/get-all')

  ReviewStore.setReviews = response.data
}

export const deleteReview = async (id: number) => {
  await $http.delete(`/review/delete:${id}`)
}
