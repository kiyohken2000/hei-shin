const noribenGenerater = ({question}) => {
  const length = question.length
  const noriben = Array(length).fill('█').join().replace(/,/g, '')
  return noriben
}

export { noribenGenerater }