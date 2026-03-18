import { useNavigate } from "react-router";
import { AuthorizationPage } from "./AuthorizationPopup";

export function AuthorizationPopupDemo() {
  const navigate = useNavigate();

  return (
    <AuthorizationPage
      onCancel={() => navigate(-1)}
      onAuthorize={() => navigate("/home")}
    />
  );
}
