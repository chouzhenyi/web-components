function scoreVerify(score) {
  let numScore = +score
  if(!isNaN(numScore)){
    if(numScore > 100) {
      numScore = 100
    }
    if(numScore < 0) {
      numScore = 0
    }
    return +numScore.toFixed(1)
  }
  return false
}
export { scoreVerify }