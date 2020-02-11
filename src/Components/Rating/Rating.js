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
        <div key={rating.id}>
          <h1>{rating.username}</h1>
          <h2>{rating.rating}</h2>
          <p>{rating.review}</p>
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
          <h1>{rating.username}</h1>
          <h2>{rating.rating}</h2>
          <p>{rating.review}</p>
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
        Ratings
        {
          this.state.mappedRatings.length
          ?
          this.state.mappedRatings
          :
          <h1>No ratings for this brewery.</h1>  
        }
        {
          !this.state.user
          ?
          <div>
            <h1>Login to add a rating.</h1>
          </div>
          :
          <div>
            <h1>Add a rating!</h1>
            <button
              onClick={this.addRatingToggle}
            >
              Add
            </button>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.addRating();
              }}
            >
              <button
                onClick={this.addRatingToggle}
              >
                Cancel
              </button>
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
                placeholder='Enter a review.'
              />
              <button
                type='submit'
              >
                Submit
              </button>
            </form>
          </div>
        }
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