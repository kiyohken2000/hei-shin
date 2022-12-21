const noribenGenerator = ({question}) => {
  const length = question.length
  const noriben = Array(length).fill('█').join().replace(/,/g, '')
  return noriben
}

export { noribenGenerator }