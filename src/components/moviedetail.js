import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie, addReview } from "../actions/movieActions";
import { Card, ListGroup, ListGroupItem, Form, Button, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

class MovieDetail extends Component {
    state = {
        username: '',
        rating: '',
        review: ''
    };

    componentDidMount() {
        if (!this.props.selectedMovie) {
            this.props.dispatch(fetchMovie(this.props.movieId));
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitReview = (event) => {
        event.preventDefault();
        const { username, rating, review } = this.state;
        const { dispatch, selectedMovie } = this.props;
        dispatch(addReview(selectedMovie._id, { username, rating, review }));
        this.setState({ username: '', rating: '', review: '' }); // Clear form
    };

    renderDetailInfo = () => {
        const { selectedMovie } = this.props;
        if (!selectedMovie) {
            return <div>Loading....</div>;
        }

        return (
            <Card>
                <Card.Header>Movie Detail</Card.Header>
                <Card.Body>
                    <Image className="image" src={selectedMovie.imageUrl} thumbnail />
                </Card.Body>
                <ListGroup>
                    <ListGroupItem>{selectedMovie.title}</ListGroupItem>
                    <ListGroupItem>
                        {selectedMovie.actors.map((actor, i) =>
                            <p key={i}>
                                <b>{actor.actorName}</b> as {actor.characterName}
                            </p>
                        )}
                    </ListGroupItem>
                    <ListGroupItem><h4><BsStarFill/> {selectedMovie.avgRating.toFixed(1)}</h4></ListGroupItem>
                </ListGroup>
                <Card.Body>
                    {selectedMovie.reviews.map((review, i) =>
                        <p key={i}>
                            <b>{review.username}</b> {review.review}
                            &nbsp; <BsStarFill /> {review.rating}
                        </p>
                    )}
                    <Form onSubmit={this.submitReview}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" name="rating" value={this.state.rating} onChange={this.handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Review</Form.Label>
                            <Form.Control as="textarea" name="review" value={this.state.review} onChange={this.handleInputChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit Review</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    };

    render() {
        return (
            <div>
                {this.renderDetailInfo()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedMovie: state.movie.selectedMovie
});

export default connect(mapStateToProps)(MovieDetail);




/*
// Assuming we're using Mongoose with a Movie model
Movie.aggregate([
  { $match: { _id: movieId } },
  { $unwind: "$reviews" },
  { $group: {
    _id: "$_id",
    avgRating: { $avg: "$reviews.rating" },
    reviews: { $push: "$reviews" },
    actors: { $first: "$actors" },
    title: { $first: "$title" },
    imageUrl: { $first: "$imageUrl" }
  }}
]).then(movie => {
    // Dispatch an action with the movie data
});





import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {


    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const DetailInfo = () => {
            
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.review}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>
                </Card>
            )
        }


        return (
            <DetailInfo />
        )
    }

    
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

*/