import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const MyContext = React.createContext();
class Provider extends Component {
    state = {
        viewer: null
    };
    logIn = (name) => {
        this.setState({ viewer: name });
    };
    logOut = () => {
        this.setState({ viewer: null });
    };
    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    actions: {
                        logIn: this.logIn,
                        logOut: this.logOut
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

const Nav = () => <Login />;

class Login extends Component {
    state = {};
    render() {
        return (
            <MyContext.Consumer>
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
            </MyContext.Consumer>
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
