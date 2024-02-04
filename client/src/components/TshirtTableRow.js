import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class TshirtTableRow extends Component
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.tshirt.style}</td>
                <td>{this.props.tshirt.color}</td>
                <td>{this.props.tshirt.brand}</td>
                <td>{this.props.tshirt.price}</td>
                <td>
                    {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditTshirt/" + this.props.tshirt._id}>Edit</Link> : null}
                    
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteTshirt/" + this.props.tshirt._id}>Delete</Link> : null}
                </td>
            </tr>
        )
    }
}