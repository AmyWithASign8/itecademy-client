import { $http } from '../../consts/http'
import CourseStore from '../../store/course'
import {
  CreateCourseRequest,
  SubscribeDataRequest,
  UpdateCourseRequest
} from './course.interface'

export const getAllCourses = async () => {
  const response = await $http.get('services/all')

  CourseStore.setCourses = response.data
}

export const subscribe = async (data: SubscribeDataRequest) => {
  await $http.post('services/subscribe', data)
}

export const createCourse = async (data: CreateCourseRequest) => {
  await $http.post('services/create', data)
}

export const updateCourse = async (data: UpdateCourseRequest) => {
  await $http.post('services/update', data)
}

export const deleteCourse = async (id: number) => {
  await $http.delete(`services/delete:${id}`)
}
