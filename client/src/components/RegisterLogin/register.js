import React, { Component } from 'react';
import {connect} from 'react-redux';
import { registerUser } from '../../_actions/user_actions'

export class Register extends Component {
    state = {
        lastname: "",
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: []
    };


    handelChange =  event => {
        this.setState({  [event.target.name]: event.target.value  });
    }

    displayErrors =  errors => 
    errors.map((error, i) => <p key={i}>{error}</p> ) 



    

   

    //   console.log(dataToSubmit);

    isFormvalid = () =>  {
        let errors =[];
        let error ;
            if(this.isFormEmpty(this.state)){
               
                error = {message: "Please fill in all fields"};
                this.setState(  { errors : errors.concat(error) } );

            } else if (!this.isPasswordValid(this.state)) {
                
                error = {message: "Password is invalid"};
                this.setState(  { errors : errors.concat(error) } );

            } else {

                return true;
            }
    } 


    isPasswordValid = ({password,passwordConfirmation}) => {
        if(password.lenght<6 || passwordConfirmation<6 ){
            return false;
        } else if (password !== passwordConfirmation){
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty = ({ lastname,name,email,password,passwordConfirmation}) =>{
        return(
            !lastname.length ||
            !name.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        )
    }


    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            lastname: this.state.lastname,
            name: this.state.name,
            email: this.state.email,
            passwordConfirmation: this.state.passwordConfirmation,
            password: this.state.password
        }

        //   console.log(dataToSubmit);

        if(this.isFormvalid() ) {
            this.setState( { errors: [] } )
                this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {

                    console.log(response);
                   

                    if(response.payload.success) {
                           this.props.history.push('/'); 
                    } else {
                        this.setState({
                            errors: this.state.errors.concat("Register Failed. Please check fields.")
                        });                        
                    }
                })
        } else{
            this.setState({
                errors: this.state.errors.concat("Register Failed. Please fill out form.")
            }); 

        }


    }    






    render() {
        return (
            <div>
            <div className="containter">

             <h2>Register</h2>
                 <div className="row">
                 <form className="col s12" onSubmit={event => this.submitForm(event)} > 

                 <div className="row">
                 <div className="input=field col s12">
                     <input name="lastname"
                         value={this.state.lastname}
                         onChange={e => this.handelChange(e)}
                         id ="lastname" 
                         type="text"
                         className="validate"
                     />
                 <label htmlFor="lastname">Lastname</label> 
                 <span className="helper-text"
                     data-error="wrong"
                     data-success = "right">
                 </span>
             </div>
         </div>  


       


         <div className="row">
                 <div className="input=field col s12">
                     <input name="name"
                         value={this.state.name}
                         onChange={e => this.handelChange(e)}
                         id ="name" 
                         type="text"
                         className="validate"
                     />
                 <label htmlFor="name">First Name</label> 
                 <span className="helper-text"
                     data-error="wrong"
                     data-success = "right">
                 </span>
             </div>
         </div>  



         <div className="row">
                 <div className="input=field col s12">
                     <input name="email"
                         value={this.state.email}
                         onChange={e => this.handelChange(e)}
                         id ="email" 
                         type="text"
                         className="validate"
                     />
                 <label htmlFor="email">Email</label> 
                 <span className="helper-text"
                     data-error="wrong"
                     data-success = "right">
                 </span>
             </div>
         </div>  

         <div className="row">
                 <div  className="input=field col s12">
                     <input name="password"
                         value={this.state.password}
                         onChange={e => this.handelChange(e)}
                         id ="password" 
                         type="password"
                         className="validate"
                     />
                 <label className="active" htmlFor="password">Password</label> 
                 <span className="helper-text"
                     data-error="wrong"
                     data-success = "right">
                 </span>
             </div>
         </div>  



         <div className="row">
                 <div className="input=field col s12">
                     <input name="passwordConfirmation"
                         value={this.state.passwordConfirmation}
                         onChange={e => this.handelChange(e)}
                         id ="passwordConfirmation" 
                         type="password"
                         className="validate"
                     />
                 <label  className="active" htmlFor="passwordConfirmation">Password Confirmation</label> 
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
         )}




<div className="row">
 <div className="col s12">
   <button className="btn waves-effect red loghten"
     type="submit"
     name ="action"
     onClick= {this.submitForm}
   >
         Create an Account
   </button>   
   

 </div>


 </div>

 </form>
 </div>
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


export default connect(mapStateToProps) (Register);