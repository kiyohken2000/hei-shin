const noribenGenerater = ({question}) => {
  const length = question.length
  const array = Array(length).fill('■').join().replace(/,/g, '')
  return array
}

export { noribenGenerater }