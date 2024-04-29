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
/*
    render() {
        const DetailInfo = () => {
            return <div>Test</div>
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
    }*/

    render() {
        return <div>this.props.selectedMovie.movieId</div>;
        const DetailInfo = () => {
            // First, check if the selected movie data is available
            if (!this.props.selectedMovie) {
                return <div>Loading...</div>;
            }
            
            // If selectedMovie is available, render the detailed card
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
                                </p>
                            )}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4><BsStarFill /> {this.props.selectedMovie.avgRating}</h4>
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b> {review.review} &nbsp; <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>
                </Card>
            );
        }
    
        return (
            <div>
                <DetailInfo />
            </div>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

