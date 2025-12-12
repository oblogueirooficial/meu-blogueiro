import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PenTool, 
  BarChart2, 
  Globe, 
  Lock, 
  LogOut, 
  Menu,
  ChevronRight,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import AIWriter from './components/AIWriter';
import PixModal from './components/PixModal';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [isPremium, setIsPremium] = useState(false);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // 1. Verifica se já era premium antes
    const savedPremium = localStorage.getItem('blogueiro_premium_v2');
    
    // 2. Verifica se voltou do Mercado Pago com pagamento aprovado
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get('status');

    if (status === 'approved') {
      setIsPremium(true);
      localStorage.setItem('blogueiro_premium_v2', 'true');
      setCurrentView(AppView.DASHBOARD);
      setShowSuccessMessage(true);
      window.history.replaceState({}, document.title, "/");
    } else if (savedPremium === 'true') {
      setIsPremium(true);
      setCurrentView(AppView.DASHBOARD);
    }
  }, []);

  const handleManualSuccess = () => {
    setIsPremium(true);
    localStorage.setItem('blogueiro_premium_v2', 'true');
    setIsPixModalOpen(false);
    setCurrentView(AppView.DASHBOARD);
  };

  const NavItem = ({ view, icon: Icon, label }: any) => (
    <button
      onClick={() => {
        setCurrentView(view);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 transition-colors ${
        currentView === view 
          ? 'bg-indigo-50 text-indigo-700 font-semibold' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span>{label}</span>
      </div>
    </button>
  );

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <PixModal 
          isOpen={isPixModalOpen} 
          onClose={() => setIsPixModalOpen(false)} 
          onSuccess={handleManualSuccess} 
        />
        <nav className="border-b border-slate-100 bg-white/90 backdrop-blur sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <Globe size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight">O BLOGUEIRO OFICIAL</span>
            </div>
            <button onClick={() => setIsPixModalOpen(true)} className="text-sm font-semibold text-slate-600 hover:text-indigo-600">
              Já tenho acesso
            </button>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-8 border border-green-100 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Vagas Limitadas - Taxa Única R$ 9,90</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
            A Ferramenta Secreta dos <br/><span className="text-indigo-600">Blogueiros de Sucesso</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Tenha acesso ilimitado à nossa Inteligência Artificial exclusiva que escreve artigos virais e analisa tendências de mercado.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button onClick={() => setIsPixModalOpen(true)} className="group relative px-8 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-slate-900/30 hover:bg-black transition-all hover:scale-105 active:scale-95 w-full md:w-auto">
              <span className="flex items-center justify-center gap-3"><Lock size={24} />QUERO ENTRAR AGORA</span>
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">R$ 9,90</div>
            </button>
            <p className="text-sm text-slate-400 font-medium">Liberação automática após o pagamento.</p>
          </div>
          <div className="mt-20 grid md:grid-cols-3 gap-6 text-left">
             {["Acesso Vitalício ao Sistema", "Gerador de Posts com IA", "Dashboard de Monetização"].map((item, i) => (
               <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                 <span className="font-semibold text-slate-700">{item}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {showSuccessMessage && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-fade-in-up flex items-center gap-3">
          <CheckCircle2 size={24} />
          <div><h4 className="font-bold">Pagamento Confirmado!</h4><p className="text-sm text-green-100">Bem-vindo ao time oficial.</p></div>
          <button onClick={() => setShowSuccessMessage(false)} className="ml-2 hover:text-green-200"><Lock size={16}/></button>
        </div>
      )}
      <aside className={`fixed md:relative z-30 w-64 h-full bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white"><Globe size={18} /></div>
            <span>O BLOGUEIRO</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-500"><ChevronRight size={24} className="rotate-180" /></button>
        </div>
        <div className="p-4 space-y-6">
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Ferramentas</p>
            <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
            <NavItem view={AppView.WRITER} icon={PenTool} label="Criador IA" />
            <NavItem view={AppView.ANALYTICS} icon={BarChart2} label="Analytics" />
            <NavItem view={AppView.COMMUNITY} icon={Globe} label="Comunidade" />
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white relative overflow-hidden shadow-lg">
             <div className="flex items-center gap-2 mb-2"><Zap size={20} className="text-yellow-300" fill="currentColor" /><h4 className="font-bold">Membro VIP</h4></div>
             <p className="text-green-50 text-xs opacity-90">Sua conta está ativa e verificada.</p>
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
          <button onClick={() => { setIsPremium(false); localStorage.removeItem('blogueiro_premium_v2'); setCurrentView(AppView.LANDING); }} className="flex items-center gap-3 text-slate-500 hover:text-red-600 px-3 py-2 w-full transition-colors">
            <LogOut size={20} /><span>Sair</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto h-full relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-slate-600"><Menu size={24} /></button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-3">
             <span className="text-sm font-medium text-slate-600 hidden sm:block">Olá, Membro Oficial</span>
             <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">MB</div>
          </div>
        </header>
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {currentView === AppView.DASHBOARD && <Dashboard isPremium={true} onUpgradeClick={() => {}} />}
          {currentView === AppView.WRITER && <AIWriter isPremium={true} onUpgradeClick={() => {}} />}
          {currentView === AppView.ANALYTICS && (<div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm"><BarChart2 size={48} className="mx-auto text-indigo-300 mb-4" /><h2 className="text-2xl font-bold text-slate-900">Analytics Pro</h2><p className="text-slate-500 mt-2">Dados de mercado em tempo real carregando...</p></div>)}
           {currentView === AppView.COMMUNITY && (<div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm"><Globe size={48} className="mx-auto text-indigo-300 mb-4" /><h2 className="text-2xl font-bold text-slate-900">Comunidade Global</h2><p className="text-slate-500 mt-2">Conectando aos servidores...</p></div>)}
        </div>
      </main>
    </div>
  );
}
export default App;