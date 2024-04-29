import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import { connect } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Form, Button, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        // Initializing state for form data
        this.state = {
            details: {
                rating: '',
                review: ''
            }
        };
    }

    componentDidMount() {
        const { dispatch, selectedMovie, movieId } = this.props;
        if (!selectedMovie) {
            dispatch(fetchMovie(movieId));
        }
    }

    updateDetails = (event) => {
        // Handling form inputs dynamically based on the name attribute of form controls
        this.setState({
            details: {
                ...this.state.details,
                [event.target.name]: event.target.value
            }
        });
    };

    submitReview = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const { details } = this.state;
        console.log('Submitting Review:', details); // For now, just logging the data
        // Here, you would dispatch an action or call an API to submit the review
        this.setState({ details: { rating: '', review: '' } }); // Clear form after submission
    };

    render() {
        const { selectedMovie } = this.props;
        if (!selectedMovie) {
            return <div>Loading...</div>;
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
                    <ListGroupItem><h4><BsStarFill /> {selectedMovie.avgRating.toFixed(1)}</h4></ListGroupItem>
                </ListGroup>

                <Card.Body>
                    {selectedMovie.reviews.map((review, i) =>
                        <p key={i}>
                            <b>{review.username}</b> {review.review}
                            &nbsp; <BsStarFill /> {review.rating}
                        </p>
                    )}
                </Card.Body>
                
                <Card.Body>
                    <Form onSubmit={this.submitReview}>
                        <Form.Group controlId="formRating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="rating"
                                value={this.state.details.rating}
                                onChange={this.updateDetails}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formReview">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="review"
                                value={this.state.details.review}
                                onChange={this.updateDetails}
                                required
                            />
                        </Form.Group>
                        <Button type="submit">Submit Review</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedMovie: state.movie.selectedMovie,
    movieId: state.movie.movieId // Ensure movieId is being correctly managed in your Redux store
});

export default connect(mapStateToProps)(MovieDetail);


/*

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
                    
                </Card.Body>
                <Card.Body>
                    <Form >
                       <Form.Group controlId = 'testId'>
                           <Form.Label>Rating</Form.Label>
                           <Form.Control type="number" name="rating" value={this.state.details.rating} onChange={this.updateDetails} />
                       </Form.Group>
                       <Form.Group controlId = 'testId2'>
                           <Form.Label>Review</Form.Label>
                           <Form.Control as="textarea" name="review" value={this.state.details.review} onChange={this.updateDetails} />
                       </Form.Group>
                       <Button onClick={this.submitReview}>Submit Review</Button>
                   </Form>
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