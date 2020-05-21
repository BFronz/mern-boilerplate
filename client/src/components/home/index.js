import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            
            <div>
            <div className="containter">
            
            <div>
                <h5 class="center-align">MERN Boilerplate</h5>
                <h6 class="center-align">Home Page</h6>
            </div>


            <div class="card-panel hoverable center-align">

            <div className="row">
                <div className="col s12">
    
                <Link to="/register">
                <button className="btn waves-effect red loghten"
                type="link"
                name ="action"
                >
                Sign Up
                </button>     
             </Link> 

            &nbsp;&nbsp;&nbsp;
             <Link to="/about">
            <button className="btn waves-effect red loghten"
                type="submit"
                 name ="action"
                 >
                About
                </button>     
                </Link> 
                 &nbsp;&nbsp;&nbsp;
                <Link to="/login">
                <button className="btn waves-effect red loghten"
                type="link"
                 name ="action"
                >
                Login
             </button>      
            </Link> 

            &nbsp;&nbsp;&nbsp;
             <Link to="/">
            <button className="btn waves-effect red loghten"
                type="link"
                 name ="action"
                 >
                Home
                </button>     
                </Link> 
               



    </div>
</div>


</div>

</div>

        </div>
        );
    }
}
