import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import FormBox from './form/form';

import { boxRequest, boxRelease, boxUpdate, boxRefresh } from './actions';

import imgLogo from '../imgs/logo.png';
import imgSmile from '../imgs/smile.jpg';

class DashBoard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        const { boxRequest } = this.props;

        boxRequest();
    }

    hanleBranch(e, id) {
        let getVal = e.target.value;
        const { data } = this.state;

        if (getVal.length > 5) {
            delete data[id].nameBranchErr;
        }

        !data[id] && (data[id] = {});
        let newVal = (data[id].nameBranch = getVal);

        this.setState({
            ...data,
            ...newVal
        });
    }

    hanleDescription(e, id) {
        let getVal = e.target.value;
        const { data } = this.state;

        !data[id] && (data[id] = {});
        let newVal = (data[id].des = getVal);
        this.setState({
            ...data,
            ...newVal
        });
    }

    handleFrmSubmit(e, id) {
        e.preventDefault();
        const { data } = this.state;

        let dataSend = data[id];
        if (dataSend) {
            if (dataSend.nameBranch && dataSend.nameBranch.length < 5) {
                dataSend.err = true;
                dataSend.nameBranchErr = 'At least 5 characters';
                this.setState({
                    ...data,
                    ...dataSend
                });
            } else if (dataSend.des && dataSend.des.length < 10) {
                dataSend.err = true;
                dataSend.desErr = 'At least 10 characters';
                this.setState({
                    ...data,
                    ...dataSend
                });
            } else {
                dataSend.err = false;
            }

            if (dataSend.nameBranch && dataSend.nameBranch.length >= 5) {
                delete dataSend.nameBranchErr;
            }

            if (dataSend.des && dataSend.des.length >= 10) {
                delete dataSend.desErr;
            }
        }

        console.log('dataSend: ', dataSend);
    }

    render() {
        const { listBoxs } = this.props;
        const { data } = this.state;

        const ListBox =
            listBoxs.length > 0 &&
            listBoxs.map(item => {
                return (
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={item.id}>
                        <div className="each-box">
                            <div className="top">
                                <h3>
                                    box: <strong>{item.id}</strong>
                                </h3>

                                {item.nameBranch && <span className="act-branch">Refresh</span>}

                                {item.nameBranch && <span className="act-branch">Release</span>}
                            </div>
                            <div className="content">
                                {/* {<FormBox branchName={item.nameBranch} description={item.des} keyFrm={item.id} />} */}
                                <form name={`frm${item.id}`} onSubmit={e => this.handleFrmSubmit(e, item.id)}>
                                    <label className="eachRow branchName">
                                        <span>Branch:</span>
                                        <div className="boxVal">
                                            {item.nameBranch ? (
                                                <input name="branch" type="text" disabled value={item.nameBranch} />
                                            ) : (
                                                <input
                                                    type="text"
                                                    placeholder="At least 5 characters"
                                                    onChange={e => this.hanleBranch(e, item.id)}
                                                />
                                            )}
                                            {data[item.id] &&
                                                data[item.id].nameBranchErr && <p className="err">{data[item.id].nameBranchErr}</p>}
                                        </div>
                                    </label>
                                    <label className="eachRow branchDes">
                                        <span>Des: </span>
                                        <div className="boxVal">
                                            {item.des ? (
                                                <textarea type="textarea" name="description" disabled value={item.des} />
                                            ) : (
                                                <textarea
                                                    type="textarea"
                                                    placeholder="At least 10 characters"
                                                    onChange={e => this.hanleDescription(e, item.id)}
                                                />
                                            )}
                                            {data[item.id] && data[item.id].desErr && <p className="err">{data[item.id].desErr}</p>}
                                        </div>
                                    </label>
                                    {!item.nameBranch && (
                                        <p>
                                            <button className="btnBlue">Pull</button>
                                        </p>
                                    )}
                                </form>
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

DashBoard.propTypes = {
    boxRequest: PropTypes.func.isRequired,
    boxRelease: PropTypes.func.isRequired,
    boxUpdate: PropTypes.func.isRequired,
    boxRefresh: PropTypes.func.isRequired,
    listBoxs: PropTypes.any
};

const mapStateToProps = state => {
    return {
        listBoxs: state.reducerHome.get('listBoxs')
    };
};

const mapDispatchToProps = {
    boxRequest,
    boxRelease,
    boxUpdate,
    boxRefresh
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);
