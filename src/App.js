import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, Consumer } from './MyContext';

const Nav = () => <Login />;

class Login extends Component {
    state = {};
    render() {
        return (
            <Consumer>
                {(value) => {
                    const { viewer } = value.state;
                    const { logIn, logOut } = value.actions;
                    return viewer ? (
                        <React.Fragment>
                            <h3>Logged in as: {viewer}</h3>
                            <button onClick={logOut}>Log Out</button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <input placeholder="Log in please" ref={(r) => (this.inputRef = r)} />
                            <button
                                type="submit"
                                onClick={() => {
                                    logIn(this.inputRef.value);
                                }}
                            >
                                Log In
                            </button>
                        </React.Fragment>
                    );
                }}
            </Consumer>
        );
    }
}

class App extends Component {
    render() {
        return (
            <Provider>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <Consumer>
                            {({ state: { viewer } }) => {
                                return <h1 className="App-title">{viewer ? `Welcome ${viewer}` : 'Login'}</h1>;
                            }}
                        </Consumer>
                    </header>
                    <div className="App-intro">
                        <Nav />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
