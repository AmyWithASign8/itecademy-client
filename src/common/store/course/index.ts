import { makeAutoObservable } from 'mobx'
import { CourseType } from './course.interface'
class CourseStore {
  private courses: CourseType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  public get getCourses() {
    return this.courses
  }

  public set setCourses(courses: CourseType[]) {
    this.courses = courses
  }
}

export default new CourseStore()
