// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// CSS
import './Rating.css';

// Define Component as a class.
class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      review: "",
      mappedRatings: [],
      user: null,
      viewAdd: false
    };
  }

  async componentDidMount() {
    const user = await axios.get('/api/auth/userSession');
    if (user.data !== null) {
      this.setState({
        user: user.data.id
      });
    }
    const { currentBrewery } = this.props;
    const ratings = await axios.get(`/api/rating/${currentBrewery.locId}`).catch(e => console.log(e));
    if (!ratings) {
      return;
    }
    const mappedRatings = ratings.data.map((rating) => {
      return (
        <div className="rating-container" key={rating.id}>
          <div>
            <p>User: {rating.username}</p>
            <p>Rating: {rating.rating}</p>
            <p>Comments: {rating.review}</p>
          </div>
        </div>
      );
    });
    this.setState({
      mappedRatings: mappedRatings
    })
  }

  changeHandler = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  addRatingToggle = () => {
    if (this.state.viewAdd === false) {
      this.setState({
        viewAdd: true
      });
    } else {
      this.setState({
        viewAdd: false
      });
    }
  }

  addRating = async () => {
    const {rating, review, user} = this.state;
    const user_id = user;
    const {locId} = this.props.currentBrewery;
    const ratings = await axios.post(`/api/rating/${locId}`, {rating, review, user_id})
    const mappedRatings = ratings.data.map((rating) => {
      return (
        <div key={rating.id}>
          <p>User: {rating.username}</p>
          <p>Rating: {rating.rating}</p>
          <p>Comments: {rating.review}</p>
        </div>
      );
    });
    this.setState({
      mappedRatings: mappedRatings
    })
  }
  
  render() {
    return (
      <div>
        <br />
        <hr />
        <br />
        <h2 id="ratings-h2">
          Ratings
        </h2>
        {
          this.state.mappedRatings.length
          ?
          this.state.mappedRatings
          :
          <div id="no-ratings">
            There are currently no ratings for this brewery. Be the first to add one!
          </div>
        }
        {
          !this.state.user
          ?
          <div  className="add-rating-container">
            Login to add a rating.
          </div>
          :
          <div className="add-rating-container">
            <div>
              <h2>Add a rating!</h2>
              {/* <button
                onClick={this.addRatingToggle}
              >
                Add
              </button> */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.addRating();
                }}
              >
                {/* <button
                  onClick={this.addRatingToggle}
                >
                  Cancel
                </button> */}
                <h1>Rating:</h1>
                <select
                  type='number'
                  required
                  name='rating'
                  value={this.state.rating}
                  onChange={e => this.changeHandler(e.target.name, e.target.value)}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <input
                  type='text'
                  required
                  name='review'
                  value={this.state.review}
                  onChange={e => this.changeHandler(e.target.name, e.target.value)}
                  placeholder='Enter a review'
                />
                <button
                  type='submit'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        }
        <br />
        <hr />
      </div>
    );
  }
}

// Map state to props
function mapReduxStateToProps(reduxState) {
  return reduxState;
}

// Connect component to redux.
export default connect(mapReduxStateToProps)(Rating);