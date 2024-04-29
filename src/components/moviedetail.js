



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
                    <Form className='form-horizontal'>
                        <Form.Group controlId="name">
                             <Form.Label>Name</Form.Label>
                              <Form.Control onChange={this.updateDetails} value={this.state.details.name} type="text" placeholder="Name" />
                        </Form.Group>

                        <Form.Group controlId="username">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.password}  type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={this.register}>Register</Button>
                        </Form>
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

