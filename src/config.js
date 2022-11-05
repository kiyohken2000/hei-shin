import { Platform } from "react-native"

const reviewMode = false
const isReview = Platform.OS === 'ios' && reviewMode

export { isReview }