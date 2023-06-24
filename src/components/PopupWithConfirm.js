import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirm extends PopupWithForm {
  constructor(selector, handleSubmit) {
    super(selector, handleSubmit);
  }

  setObjToDel(obj) {
    this._objToDel = obj;
  }

  setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit',
      (evt) => {
        const btnSubmit = evt.target.querySelector('button[type="submit"]');
        const btnSubmitText = btnSubmit.textContent;
        this._renderLoading(btnSubmit);
        this._handleSubmit(
          evt,
          this._getInputValues(),
          () => {
            btnSubmit.textContent = btnSubmitText;
            this.close();
          },
          this._objToDel,
        );
      }
    );
  }
}
