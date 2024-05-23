import { $http } from '../../consts/http'
import { CourseType } from '../../store/course/course.interface'
import CourseStore from '../../store/course'
import { SubscribeDataRequest } from './course.interface'

export const getAllCourses = async () => {
  const response = await $http.get('services/all')

  CourseStore.setCourses = response.data
}

export const subscribe = async (data: SubscribeDataRequest) => {
  await $http.post('services/subscribe', data)
}
