import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';


const rottElem = document.getElementById('root');
if(rottElem){
  const root = ReactDOM.createRoot(rottElem);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        {/* <React.StrictMode> */}
       <App />
       {/* </React.StrictMode> */}
     </Provider>
    </BrowserRouter>,
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
