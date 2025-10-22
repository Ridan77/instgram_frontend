import { Fragment } from "react";
import { svg } from "./Svgs";

export function Modal({ children, onClose }) {
  return (
    <Fragment>
      <section onClick={onClose} className="modal-backdrop"></section>
      <section className="modal-content">
        <main>{children}</main>
        <button className="close-btn" onClick={onClose}>
          {svg.close}
        </button>
      </section>
    </Fragment>
  );
}
