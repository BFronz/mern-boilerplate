import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loginUser } from '../../_actions/user_actions'
import { Link } from 'react-router-dom';




class RegisterLogin extends Component {
    state = {
        email: "",
        password: "",
        errors: []
    };

    displayErrors =  errors => 
        errors.map((error, i) => <p key={i}>{error}</p> ) 


    handelChange =  event => {
        this.setState({  [event.target.name]: event.target.value  });
    }

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        }

    //   console.log(dataToSubmit);

        if(this.isFormvalid(this.state) ) {
            this.setState( { errors: [] } )
                this.props.dispatch(loginUser(dataToSubmit))
                .then(response => {
                    // console.log(response);

                    if(response.payload.loginSuccess) {
                           this.props.history.push('/'); 
                    } else {
                        this.setState({
                            errors: this.state.errors.concat("Login Failed. Please check email and password.")
                        });                        
                    }
                })
        } else{
            this.setState({
                errors: this.state.errors.concat("Login Failed. Please fill out form.")
            }); 

        }
    }

    isFormvalid = ({email,password}) =>  email && password; 



    render() {
        return (
            <div className="containter">

                <h2>Login</h2>
                <div className="row">
                    <form className="col s12" onSubmit={event => this.submitForm(event)} > 

                    <div className="row">
                        <div className="input=field col s12">
                        <input name="email"
                            value={this.state.email}
                            onChange={e => this.handelChange(e)}
                            id ="email" 
                            type="email"
                            className="validate"
                        />
                        <label htmlFor="email">Email</label> 
                        <span className="helper-text"
                            data-error="Type corret email"
                            data-success = "right">
                        </span>
                      </div>
                </div>  




                    <div className="row">
                        <div className="input=field col s12">
                        <input name="password"
                            value={this.state.password}
                            onChange={e => this.handelChange(e)}
                            id ="password" 
                            type="password"
                            className="validate"
                        />
                        <label htmlFor="password">Password</label> 
                        <span className="helper-text"
                            data-error="wrong"
                            data-success = "right">
                        </span>
                      </div>
                    </div>  


            
                    {this.state.errors.length  > 0 && (
                           <div>
                               {this.displayErrors(this.state.errors)}
                            </div>

                    ) }        


                <div className="row">
                    <div className="col s12">
                      <button className="btn waves-effect red loghten"
                        type="submit"
                        name ="action"
                        onClick= {this.submitForm}
                      >
                            Log in
                      </button>   
                        &nbsp; &nbsp;
                      <Link to="/register">
                      <button className="btn waves-effect red loghten"
                        type="submit"
                        name ="action"
                      >
                            Sign Up
                      </button>     
                      </Link> 

                    </div>

                    




                </div>

                    

                    </form>
            </div>
          </div>  
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps) (RegisterLogin);