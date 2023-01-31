import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleExclamation,
  faInfo,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default () =>
  library.add(faPencil, faTrash, faCircleExclamation, faInfo);
