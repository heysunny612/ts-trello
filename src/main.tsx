import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GlobalStyles } from './reset';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <GlobalStyles />
    <App />
  </RecoilRoot>
);
