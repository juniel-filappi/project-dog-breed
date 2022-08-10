import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const timeoutErrors = ["ECONNABORTED", "TIMEDOUT"];

const showMessage = (title: string, html?: string) =>
  MySwal.fire({ title, icon: "error", timer: 5000, html });

export const handleError = (err: unknown, alternativeMessage: string) => {
  if (axios.isAxiosError(err)) {
    if (err.code && timeoutErrors.includes(err.code)) {
      showMessage("Conexão ruim ou inexistente", "Tente novamente mais tarde");
      return;
    }

    if (err.message === "Network Error") {
      showMessage("Erro!", "Verifique a conexão de internet");
      return;
    }

    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.error;

    showMessage("Erro!", errorMessage || alternativeMessage);
    return;
  }

  showMessage(alternativeMessage);
};
