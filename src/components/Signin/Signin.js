import React from 'react';


class Signin extends React.Component {

	constructor(){
		super();
		this.state = {
			signInEmail: '',
			signInPassword: '',
			signinEmailFilled: false,
			signinPasswordFilled: false
		}
	}

	onEmailChange = (event) =>{
		this.setState({signInEmail: event.target.value})
		this.setState({signinEmailFilled: true})
		if(event.target.value === '') {
			this.setState({signinEmailFilled: false})
		}
	}

	onPasswordChange = (event) =>{
		this.setState({signInPassword: event.target.value})
		this.setState({signinPasswordFilled: true})
		if(event.target.value === '') {
			this.setState({signinPasswordFilled: false})
		}
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}else{
					alert('wrong email and/or password');
				}
			})
	}
	render() {
		const { onRouteChange } = this.props;
		const {signinEmailFilled, signinPasswordFilled} = this.state;
		return(
			<article className="br3 center mw5 ba b--black-10 mv5 mw6 shadow-5">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw9 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={this.onEmailChange} 
				        className={`pa2 input-reset ba bg-${signinEmailFilled? 'black' : 'transparent'} hover-bg-black white w-100`}
				        type="email" 
				        name="email-address"  
				        id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange}  
				        className={`pa2 input-reset ba bg-${signinPasswordFilled? 'black' : 'transparent'} hover-bg-black white w-100`}
				        type="password" 
				        name="password"  
				        id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick={this.onSubmitSignIn}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-bg-black hover-white"
				        type="submit"
				        value="Sign in"
				         />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Signin;
