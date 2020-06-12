import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import likeReviewMutation from "../queries/likeReview";
import likeReview from "../queries/likeReview";

class ReviewList extends Component {
  render() {
    return (
      <div>
        <ul className="collection">
          {this.props.reviews && this.renderReviewList()}
        </ul>
      </div>
    );
  }

  renderReviewList() {
    return this.props.reviews.map((review) => {
      return (
        <li key={review.id} className="collection-item">
          {review.content}
          <div className="secondary-content delete_button">
            <i
              className="material-icons"
              onClick={() => this.likeReview(review.id, review.likes)}
            >
              thumb_up
            </i>
            {review.likes}
          </div>
        </li>
      );
    });
  }

  likeReview(id, oldlikes) {
    this.props.likeReviewMutation({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeReview: {
          id: id,
          __typename: "ReviewType",
          likes: oldlikes + 1,
        },
      },
    });
  }
}

export default compose(
  graphql(likeReviewMutation, {
    name: "likeReviewMutation",
  })
)(ReviewList);
