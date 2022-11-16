import { isReview } from "../../config";

const removeAbe = ({items}) => {
  if(isReview) {
    const res = items
      .filter(v => !v.answer.includes('安倍'))
      .filter(v => !v.answer.includes('総理'))
    return res
  } else {
    return items
  }
}

export { removeAbe }