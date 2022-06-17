import { BrowserRouter } from "react-router-dom";
import './Global.css'
import { AppRoutes } from "./routes";

export const App = () => {
  	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	)
}

