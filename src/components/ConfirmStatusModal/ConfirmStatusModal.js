import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import ReactToPrint from 'react-to-print';
import HtmlToReact, { Parser } from 'html-to-react';
import Barcode from 'react-barcode';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import {
  Modal,
  Button,
  Checkbox,
  Row,
  Col
} from '@folio/stripes/components';
import mfCss from '@folio/stripes-components/lib/ModalFooter/ModalFooter.css';

import { template } from '../../util';
import css from './ConfirmStatusModal.css';

class ConfirmStatusModal extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    onConfirm: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    request: PropTypes.object,
    holdSlipTemplate: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.printContentRef = React.createRef();
    this.state = {};

    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    this.rules = [
      {
        replaceChildren: true,
        shouldProcessNode: node => node.name === 'barcode',
        processNode: (node, children) => (<Barcode value={children[0] ? children[0].trim() : ' '} />),
      },
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
    ];

    this.parser = new Parser();
  }

  render() {
    const { intl: { formatMessage, formatDate }, request,
      onConfirm, open, holdSlipTemplate } = this.props;
    const { printSlip } = this.state;
    const testId = uniqueId('confirm-status-');
    const confirmLabel = formatMessage({ id: 'ui-checkin.statusModal.confirm' });
    const heading = formatMessage({ id: 'ui-checkin.statusModal.hold.heading' });
    const printHoldSlipLabel = formatMessage({ id: 'ui-checkin.statusModal.printHoldSlip' });

    const data = {
      'Item title': request.item.title,
      'Item barcode': `<Barcode>${request.item.barcode}</Barcode>`,
      'Transaction Id': request.id,
      'Requester last name': request.requester.lastName,
      'Requester first name': request.requester.firstName,
      'Hold expiration':  formatDate(request.requestDate, { timeZone: 'UTC' }),
      'Item call number': request.itemId,
    };

    const tmpl = template(holdSlipTemplate || '');
    const componentStr = tmpl(data);
    const contentComponent = this.parser.parseWithInstructions(componentStr, () => true, this.rules);
    const footer = (
      <div className={mfCss.modalFooterButtons}>
        {printSlip ?
          <ReactToPrint
            onBeforePrint={onConfirm}
            trigger={() => <Button buttonStyle="primary" buttonClass={mfCss.modalFooterButton}>{confirmLabel}</Button>}
            content={() => this.printContentRef.current}
          /> :
          <Button
            label={confirmLabel}
            onClick={onConfirm}
            id={`clickable-${testId}-confirm`}
            buttonStyle="primary"
            buttonClass={mfCss.modalFooterButton}
          >
            {confirmLabel}
          </Button>
        }
      </div>
    );

    return (
      <Modal
        open={open}
        id={testId}
        label={heading}
        scope="module"
        size="small"
        footer={footer}
      >
        <p>
          <SafeHTMLMessage
            id="ui-checkin.statusModal.hold.message"
            values={{ title: request.item.title, barcode: request.item.barcode }}
          />
        </p>
        <Row>
          <Col xs>
            <Checkbox
              name="printSlip"
              label={printHoldSlipLabel}
              onChange={() => this.setState(prevState => ({ printSlip: !prevState.printSlip }))}
              value={this.state.printSlip}
            />
          </Col>
        </Row>

        <div className={css.hiddenContent}>
          <div className="ql-editor" ref={this.printContentRef}>
            {contentComponent}
          </div>
        </div>
      </Modal>
    );
  }
}

export default injectIntl(ConfirmStatusModal);
