import { useTranslation } from 'react-i18next';
import './App.css'
import Layout from './components/layout/Layout';
import Button from './components/common/Button';

function App() {
 const { t } = useTranslation();
  return (
    <Layout>
      {t('home.title')}
     
    </Layout>
  )
}

export default App
