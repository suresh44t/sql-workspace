import { FC } from 'react'; 
import { Workspace, Toasts } from '@/components/features'; 
import { Provider as StoreProvider } from 'react-redux'; 
import { store } from '@/store'; 
import './styles/index.scss'; 

// Root application component with store provider
const App: FC = () => { 
  return ( 
    <StoreProvider store={store}> 
      <div className="app"> 
        <Workspace /> 
        <Toasts /> 
      </div>
    </StoreProvider>
  ); 
}; 

export default App;
