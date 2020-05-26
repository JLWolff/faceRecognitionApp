import React from 'react';

class Register extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			nameFilled: false,
			emailFilled: false,
			passwordFilled: false
		}
	}

	onNameChange = (event) =>{
		this.setState({name: event.target.value})
		this.setState({nameFilled: true})
		if(event.target.value === '') {
			this.setState({nameFilled: false})
		}
	}
	onEmailChange = (event) =>{
		this.setState({email: event.target.value})
		this.setState({emailFilled: true})
		if(event.target.value === '') {
			this.setState({emailFilled: false})
		}
	}

	onPasswordChange = (event) =>{
		this.setState({password: event.target.value})
		this.setState({passwordFilled: true})
		if(event.target.value === '') {
			this.setState({passwordFilled: false})
		}
	}

	onSubmitSignIn = () => {
		fetch('https://git.heroku.com/serene-shore-29568.git:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name,
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}else{
					alert('This account is already beeing used');
				}
			})
	}
	render(){
		const { nameFilled, passwordFilled, emailFilled } = this.state;
		return(
			<article className="br3 center mw5 ba b--black-10 mv5 mw6 shadow-5">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw9 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
				        onChange={this.onNameChange}
				        className={`pa2 input-reset ba bg-${nameFilled? 'black' : 'transparent'} hover-bg-black white w-100`}
				         type="text"
				         name="name"
				         id="name" />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6"htmlFor="email-address">Email</label>
				        <input 
				        onChange={this.onEmailChange}
				        className={`pa2 input-reset ba bg-${emailFilled? 'black' : 'transparent'} hover-bg-black white w-100`}
				         type="email"
				         name="email-address" 
				         id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        onChange={this.onPasswordChange}
				        className={`pa2 input-reset ba bg-${passwordFilled? 'black' : 'transparent'} hover-bg-black white w-100`}
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
				        value="Register"
				         />
				    </div>
				  </div>
				</main>
			</article>
		);
	}	
}

export default Register;
