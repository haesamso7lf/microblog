import React from 'react';

var isLoggedIn = false;	

const Navbar = () => (
<nav className="navbar fixed-top navbar-expand-lg navbar-dark indigo">
    <a className="navbar-brand" href="/">MySpace</a>
	
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="basicExampleNav">

        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
            </li>
			<li className="nav-item">
                <a className="nav-link" href="/upload">Upload</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/category">Categories</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/user">Users</a>
            </li>
			<li className="nav-item">
                <a className="nav-link" href="/chat">Chat</a>
            </li>
			<li className="nav-item">
                <a className="nav-link" href="/stats">Stats</a>
            </li>
        </ul>	
		{isLoggedIn ? (
        <form action="/signin" method="POST" className="form-inline">
            <div className="md-form mt-0">
				<input className="form-control mr-sm-2" type="text" name="username" placeholder="Username" />
			</div>
			<div className="md-form mt-0">
                <input className="form-control mr-sm-2" type="password" name="password" placeholder="Password" />
            </div>
			<button className="btn btn-outline-warning btn-sm" type="submit">Sign In</button> 
			<span className="white-text"> or </span>
			<a  className="btn btn-outline-danger btn-sm" href="/signup">Sign Up</a>
        </form> ) : (
		<ul className="navbar-nav ml-auto nav-flex-icons">
			<li className="nav-item">
				<a className="nav-link ">1
					<i className="fa fa-envelope"></i>
				</a>
			</li>
			<li className="nav-item avatar dropdown">
				<a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					<img src="/uploads/avatar/" className="rounded-circle z-depth-0" alt="avatar" height="30" width="30" />
				</a>
				<div className="dropdown-menu dropdown-menu-right dropdown-secondary" aria-labelledby="navbarDropdownMenuLink-5">
					<a className="dropdown-item" href="/profile/">Profile | </a>
					<a className="dropdown-item" href="/profile/">Setting</a>
					<a className="dropdown-item" href="/logout">Log Out</a>
				</div>
			</li>
		</ul>
		)}
    </div>

	
</nav>

)
export default Navbar;