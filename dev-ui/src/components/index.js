import React, { PureComponent } from 'react';

import data from './data';
import imgLogo from '../imgs/logo.png';
import imgSmile from '../imgs/smile.jpg';

class DashBoard extends PureComponent {
    render() {
        const ListBox =
            data.length > 0 &&
            data.map(item => {
                return (
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={item.id}>
                        <div className="each-box">
                            <div className="top">
                                <h3>
                                    box: <strong>{item.id}</strong>
                                </h3>

                                {item.nameBranch && <span className="">Release</span>}
                            </div>
                            <div className="content">
                                <label className="branchName">
                                    <span>Branch:</span>
                                    {item.nameBranch ? <input type="text" disabled value={item.nameBranch} /> : <input type="text" />}
                                </label>
                                {!item.nameBranch && (
                                    <p>
                                        <button className="btnBlue">Pull</button>
                                    </p>
                                )}
                                {item.createDate && (
                                    <p className="dateCreated">
                                        Date created: <span>{item.createDate}</span>
                                    </p>
                                )}
                            </div>
                            <div className="botFoot">
                                {item.nameBranch ? (
                                    <p>
                                        <label>Link:</label> <a href={item.link}>{item.link}</a>
                                    </p>
                                ) : (
                                    <p>
                                        <img src={imgSmile} alt="smile" width="20" />
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            });

        return (
            <div id="wrapper">
                <header id="header">
                    <div className="container-fluid">
                        <a href="/" className="logo">
                            <img src={imgLogo} alt="logo" />
                        </a>
                        <h1 className="env">dev Env</h1>
                    </div>
                </header>

                <section id="mainContent">
                    <div className="container-fluid">
                        <div className="row">{ListBox}</div>
                    </div>
                </section>
            </div>
        );
    }
}

export default DashBoard;
