import { useTranslation } from 'react-i18next';
import './App.css'

function App() {
 const { t } = useTranslation();
  return (
    <div>
      {t('home.title')}
    </div>
  )
}

export default App
