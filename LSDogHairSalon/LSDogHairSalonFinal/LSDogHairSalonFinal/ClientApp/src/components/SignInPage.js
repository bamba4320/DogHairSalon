import React, { Component } from 'react';
import { serverAddress } from '../Constants';
class SignInPage extends Component{
    state = {
        userName : "",
        password : ""

    };

    

    render() {
        return (
            <div>
                <form>
                    <div className="form__control">
                        <label htmlFor="name">Username:</label>
                        <input name="name" type="text"
                            onChange={f => this.setState({ userName: f.target.value })} />
                    </div>
                    <div className="form__control">
                        <label htmlFor="password">Passeord:</label>
                        <input name="password" type="password"
                            onChange={f => this.setState({ password: f.target.value })} />
                    </div>
                    <div className="submit__btn">
                        <button type="button" onClick={this.btnOnClick}>
                            submit
                        </button>
                    </div>
                </form>

            </div>);
    }

    btnOnClick = () => {
        const body = JSON.stringify(this.state);
        fetch(serverAddress, {
            method: "POST", body: body
        }).catch();
    };
}
export default SignInPage;