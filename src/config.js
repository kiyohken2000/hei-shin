import { Platform } from "react-native"

const reviewMode = true
const isReview = Platform.OS === 'ios' && reviewMode

export { isReview }