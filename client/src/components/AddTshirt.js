import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class AddTshirt extends Component {
    constructor(props) {
        super(props)
        this.errorMessageRef = React.createRef()
        this.state = {
            style: "",
            color: "",
            size: [],
            materials: [],
            country_of_manufacture: "",
            brand: "",
            rating: "",
            price: "",
            quantity: "",
            selectedFiles: null,
            errorMessage: "",
            redirectToDisplayAllTshirts: localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
            wasSubmittedAtLeastOnce: false
        }
    }


    componentDidMount() {
        this.inputToFocus.focus()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.errorMessage && this.state.errorMessage !== prevState.errorMessage) {
            this.errorMessageRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }


    handleChange = (e) => {
        if (e.target.name === "size" || e.target.name === "materials") {
            this.setState({[e.target.name]: e.target.value.split(',')})
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    }

    handleFileChange = (e) => {
        this.setState({selectedFiles: e.target.files})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("style", this.state.style)
        formData.append("color", this.state.color)
        this.state.size.forEach((size, index) => {
            formData.append(`size[${index}]`, size.trim())
        })
        this.state.materials.forEach((material, index) => {
            formData.append(`materials[${index}]`, material.trim())
        })
        formData.append("country_of_manufacture", this.state.country_of_manufacture)
        formData.append("brand", this.state.brand)
        formData.append("rating", this.state.rating)
        formData.append("price", this.state.price)
        formData.append("quantity", this.state.quantity)

        if (this.state.selectedFiles) {
            for (let i = 0; i < this.state.selectedFiles.length; i++) {
                formData.append("tshirtPhotos", this.state.selectedFiles[i])
            }
        }

        axios.post(`${SERVER_HOST}/tshirts`, formData, {
            headers: {"authorization": localStorage.token, "Content-Type": "multipart/form-data"}
        })
            .then(res => {
                if (res.data.errorMessage) {
                    this.setState({errorMessage: res.data.errorMessage, wasSubmittedAtLeastOnce: true})
                } else {
                    this.setState({redirectToDisplayAllTshirts: true})
                }
            }).catch(err => {
            const errorMessage = err.response && err.response.data.errorMessage
                ? err.response.data.errorMessage : "An unexpected error occurred."
            this.setState({errorMessage: errorMessage, wasSubmittedAtLeastOnce: true})
        })
    }


    render() {
        let errorMessage = ""
        if (this.state.wasSubmittedAtLeastOnce) {
            errorMessage = <>{this.state.errorMessage}</>
        }

        return (
            <div className="form-container">
                {this.state.redirectToDisplayAllTshirts ? <Redirect to="/DisplayAllTshirts"/> : null}

                {errorMessage &&
                    <div className="error-message"
                         style={{
                             margin: "10px 0px 30px 0px",
                             borderRadius: "10px",
                             padding: "10px 80px",
                             fontSize: "26px",
                             fontWeight: "bold",
                             color: "#c9302c"
                         }}
                         ref={this.errorMessageRef}>
                        {errorMessage}
                    </div>
                }
                <Form>
                    <Form.Group controlId="style">
                        <Form.Label>Style</Form.Label>
                        <Form.Control ref={(input) => {
                            this.inputToFocus = input
                        }} type="text" name="style" value={this.state.style} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="color">
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" name="color" value={this.state.color} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" name="size" value={this.state.size.join(',')}
                                      onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="materials">
                        <Form.Label>Materials</Form.Label>
                        <Form.Control type="text" name="materials" value={this.state.materials.join(',')}
                                      onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="country-of-manufacture">
                        <Form.Label>Country of manufacture</Form.Label>
                        <Form.Control type="text" name="country_of_manufacture"
                                      value={this.state.country_of_manufacture} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" name="rating" value={this.state.rating} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" name="quantity" value={this.state.quantity}
                                      onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="photos">
                        <Form.Label>Photos</Form.Label>
                        <Form.Control type="file" name="tshirtPhotos" multiple onChange={this.handleFileChange}/>
                    </Form.Group> <br/><br/>


                    <LinkInClass value="Add" className="blue-button" onClick={this.handleSubmit}/>

                    <Link className="red-button" to={"/DisplayAllTshirts"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}