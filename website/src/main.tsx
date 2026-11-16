import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createAgent, registerTools } from '@ui-sdk/react/agent';
import '@fontsource-variable/geist';
import './styles.css';
import { App } from './App';

const agent = createAgent();
const unregister = registerTools(agent, { allow: (step) => !step.confirm });
Object.assign(window, { agent });
if (import.meta.hot) import.meta.hot.dispose(unregister);

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
