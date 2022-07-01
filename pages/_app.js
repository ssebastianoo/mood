import "../styles/style.scss";
import { store } from "../app/store";
import { Provider } from "react-redux";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Header />
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
