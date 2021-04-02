class ReviewApi {

  static all = {}

  constructor(port) {
    this.baseUrl = `${port}/reviews`
  }

  getReviews = () => {
    fetch(this.baseUrl)
    .then(resp => resp.json())
    .then(data => {
      data.forEach(reviewData => {
        const r = new Review(reviewData);
        r.attachToDom();
      })
    })
  }

  createReview = () => {
  }
}
