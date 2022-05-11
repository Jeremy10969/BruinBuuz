import React, {Component} from 'react';//import react, try to create class base component
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class App extends Component {
    constructor(){
        super()
        this.state = {
            fullName:'',
            username:'',
            email:'',
            password:''
        }
        this.changeFullName = this.changeFullName.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeFullName(event){
        this.setState({
            fullName:event.target.value
        })
    }

    changeUsername(event){
        this.setState({
            username:event.target.value
        })
    }

    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }

    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }


    handleSubmit(event){
        event.preventDefault() //prevent the form act default: page refreshed when submit
        //instead we want to gether all values and send to backend
        const registered = {
            fullName:this.state.fullName,
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        //post second argument to first point, backend will handle it till database
        axios.post('http://localhost:4000/app/signup', registered)
        .then(response => console.log(response.data))

        this.setState({
            fullName:'',
            username:'',
            email:'',
            password:''
        })
        
    }

    render(){
        return(//first div: a sign up form
            <div>
            <div className='container'>
                <div className='form-div'>
                    <form onSubmit={this.handleSubmit}>
                        <input type = 'text'
                        placeholder='Full Name'
                        onChange={this.changeFullName}
                        value={this.state.fullName}
                        className='form-control form-group'/>

                        <input type = 'text'
                        placeholder='User Name'
                        onChange={this.changeUsername}
                        value={this.state.username}
                        className='form-control form-group'/>

                        <input type = 'text'
                        placeholder='Email'
                        onChange={this.changeEmail}
                        value={this.state.email}
                        className='form-control form-group'/>

                        <input type = 'text'
                        placeholder='Password'
                        onChange={this.changePassword}
                        value={this.state.password}
                        className='form-control form-group'/>

                        <input type='submit' 
                        className='btn btn-danger btn-block'
                        value='SUBMIT'/>
                    </form>

                </div>

            </div>
            </div>
        );
    }
}

export default App;