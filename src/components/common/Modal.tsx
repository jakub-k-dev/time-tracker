import ReactModal, { Props as ReactModalProps } from "react-modal";

import Tile from "../Tile";

type Props = {
  title?: string;
} & ReactModalProps;

export default function Modal({ title, children, ...rest }: Props) {
  return (
    <ReactModal
      style={{
        content: {
          background: "rgba(255,255,255,0)",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      {...rest}
    >
      <div className="w-1/2">
        <Tile title={title}>{children}</Tile>
      </div>
    </ReactModal>
  );
}
