import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from '../actions/movieActions';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import './MovieDetail.css';  // Assume a CSS file for styling

class MovieDetail extends Component {

    componentDidMount() {
        const { dispatch, movieId } = this.props;
        if (!this.props.selectedMovie) {
            dispatch(fetchMovie(movieId));
        }
    }

    render() {
        const { selectedMovie } = this.props;
        if (!selectedMovie) {
            return <div className="loading">Loading...</div>;
        }

        return (
            <div className="movie-detail">
                <Card>
                    <Card.Header>{selectedMovie.title}</Card.Header>
                    <Card.Body>
                        <Image src={selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        {selectedMovie.actors.map((actor, i) => (
                            <ListGroupItem key={i}>
                                <b>{actor.actorName}</b> as {actor.characterName}
                            </ListGroupItem>
                        ))}
                        <ListGroupItem>
                            <h4><BsStarFill /> {selectedMovie.avgRating.toFixed(1)}</h4>
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {selectedMovie.reviews.map((review, i) => (
                            <Card key={i} className="review-card">
                                <Card.Body>
                                    <Card.Title>{review.username} - <BsStarFill /> {review.rating}</Card.Title>
                                    <Card.Text>{review.review}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedMovie: state.movie.selectedMovie
});

export default connect(mapStateToProps)(MovieDetail);




/*import React, { Component } from 'react';
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