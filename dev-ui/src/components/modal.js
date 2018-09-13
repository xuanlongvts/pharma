import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalBox extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleModalConfirm, handleModalCancel, idBox } = this.props;
        const { isModalOpen } = this.props;

        return (
            <Modal isOpen={isModalOpen} toggle={handleModalCancel}>
                <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
                <ModalBody>
                    Do you want to delete this box <strong>({idBox})</strong> ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleModalConfirm}>
                        Yes
                    </Button>{' '}
                    <Button color="secondary" onClick={handleModalCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ModalBox.propTypes = {
    handleModalConfirm: PropTypes.func.isRequired,
    handleModalCancel: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    idBox: PropTypes.number
};

export default ModalBox;
