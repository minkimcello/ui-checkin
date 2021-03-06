import {
  clickable,
  interactor,
  isPresent,
} from '@bigtest/interactor';

@interactor class ConfrmModal {
  present = isPresent('[data-test-confirmation-modal-confirm-button]');
  clickConfirm = clickable('[data-test-confirmation-modal-confirm-button]');
}

export default ConfrmModal;
