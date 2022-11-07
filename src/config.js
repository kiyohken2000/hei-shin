import { Platform } from "react-native"

const reviewMode = true
const isReview = Platform.OS === 'ios' && reviewMode

const tempUser = {
  id: 'user-1234567',
  userName: 'abcdef'
}

export { isReview, tempUser }