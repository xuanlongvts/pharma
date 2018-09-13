import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import FormBox from './form/form';
import Modal from './modal';

import { boxRequest, boxRelease, boxUpdateDes, boxRefresh, boxCreateNew } from './actions';

import imgLogo from '../imgs/logo.png';
import imgSmile from '../imgs/smile.jpg';

class DashBoard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isModalOpen: false,
            idBox: null
        };

        this.minNameBranch = 5;
        this.minDes = 10;

        this.handleModalConfirm = this.handleModalConfirm.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
    }

    componentDidMount() {
        const { boxRequest } = this.props;

        boxRequest();
    }

    hanleBranch(e, id) {
        let getVal = e.target.value;
        const { data } = this.state;

        if (getVal.length >= this.minNameBranch && data[id] && data[id].nameBranchErr) {
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

        if (getVal.length >= this.minDes) {
            delete data[id].desErr;
        }

        !data[id] && (data[id] = {});
        let newVal = (data[id].des = getVal);
        this.setState({
            ...data,
            ...newVal
        });
    }

    handleReleaseBox(id) {
        this.setState({
            isModalOpen: true,
            idBox: id
        });
    }

    handleRefreshBox(id, nameBranch) {
        const { boxRefresh } = this.props;

        boxRefresh(id, nameBranch);
    }

    handleModalConfirm() {
        const { boxRelease } = this.props;
        const { idBox } = this.state;

        idBox && boxRelease(idBox);

        this.setState({
            isModalOpen: false
        });
    }

    handleModalCancel() {
        this.setState({
            isModalOpen: false
        });
    }

    handleFrmSubmit(e, id) {
        e.preventDefault();
        const { data } = this.state;
        const { boxCreateNew } = this.props;

        let dataSend = data[id];
        if (dataSend) {
            if (!dataSend.nameBranch || (dataSend.nameBranch && dataSend.nameBranch.length < this.minNameBranch)) {
                dataSend.err = true;
                dataSend.nameBranchErr = 'At least 5 characters';
                this.setState({
                    ...data,
                    ...dataSend
                });
            } else if (!dataSend.des || (dataSend.des && dataSend.des.length < this.minDes)) {
                dataSend.err = true;
                dataSend.desErr = 'At least 10 characters';
                this.setState({
                    ...data,
                    ...dataSend
                });
            } else {
                dataSend.err = false;
            }

            if (dataSend.nameBranch && dataSend.nameBranch.length >= this.minNameBranch) {
                delete dataSend.nameBranchErr;
            }

            if (dataSend.des && dataSend.des.length >= this.minDes) {
                delete dataSend.desErr;
            }
        }
        if (dataSend === undefined || dataSend.err) {
            return;
        }

        !dataSend.err && boxCreateNew(id, dataSend.nameBranch, dataSend.des);
    }

    render() {
        const { listBoxs } = this.props;
        const { data, isModalOpen, idBox } = this.state;

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

                                {item.nameBranch && (
                                    <span className="act-branch" onClick={() => this.handleRefreshBox(item.id, item.nameBranch)}>
                                        Refresh
                                    </span>
                                )}

                                {item.nameBranch && (
                                    <span className="act-branch" onClick={() => this.handleReleaseBox(item.id)}>
                                        Release
                                    </span>
                                )}
                            </div>
                            <div className="content">
                                {/* {<FormBox branchName={item.nameBranch} description={item.des} keyFrm={item.id} />} */}
                                <form name={`frm${item.id}`} onSubmit={e => this.handleFrmSubmit(e, item.id)}>
                                    <label className="eachRow branchName">
                                        <span>Branch:</span>
                                        <div className="boxVal">
                                            {item.nameBranch ? (
                                                // <input name="branch" type="text" disabled value={item.nameBranch} />
                                                <p className="nameBranchShow">{item.nameBranch}</p>
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
                                                // <textarea type="textarea" name="description" disabled value={item.des} />
                                                <p className="desBranchShow">{item.des}</p>
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
                                        <p className="actForm">
                                            <button type="submit" className="btnBlue">
                                                Pull
                                            </button>
                                            <button type="reset" className="btnGrey">
                                                Reset
                                            </button>
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

                <Modal
                    handleModalConfirm={this.handleModalConfirm}
                    handleModalCancel={this.handleModalCancel}
                    isModalOpen={isModalOpen}
                    idBox={idBox}
                />
            </div>
        );
    }
}

DashBoard.propTypes = {
    boxRequest: PropTypes.func.isRequired,
    boxRelease: PropTypes.func.isRequired,
    boxUpdateDes: PropTypes.func.isRequired,
    boxRefresh: PropTypes.func.isRequired,
    boxCreateNew: PropTypes.func.isRequired,
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
    boxUpdateDes,
    boxRefresh,
    boxCreateNew
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);
