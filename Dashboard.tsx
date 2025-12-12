import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

interface DashboardProps {
  isPremium: boolean;
  onUpgradeClick: () => void;
}

const data = [
  { name: 'Seg', views: 4000, income: 240 },
  { name: 'Ter', views: 3000, income: 139 },
  { name: 'Qua', views: 2000, income: 980 },
  { name: 'Qui', views: 2780, income: 390 },
  { name: 'Sex', views: 1890, income: 480 },
  { name: 'Sab', views: 2390, income: 380 },
  { name: 'Dom', views: 3490, income: 430 },
];

const StatCard = ({ title, value, icon: Icon, color, locked, onClick }: any) => (
  <div onClick={locked ? onClick : undefined} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden transition-all ${locked ? 'cursor-pointer hover:shadow-md' : ''}`}>
    {locked && (<div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[2px] flex items-center justify-center z-10"><div className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">PREMIUM</div></div>)}
    <div className="flex items-center justify-between mb-4"><div className={`p-3 rounded-lg ${color}`}><Icon size={24} className="text-white" /></div><span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span></div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3><p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ isPremium, onUpgradeClick }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end"><div><h1 className="text-3xl font-bold text-slate-900">Dashboard Oficial</h1><p className="text-slate-500 mt-1">Bem-vindo de volta, criador.</p></div><div className="text-sm text-slate-400">Última atualização: Hoje, 14:30</div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Visualizações Totais" value="124.5k" icon={Users} color="bg-blue-500" />
        <StatCard title="Tendência Viral" value="Alta" icon={TrendingUp} color="bg-purple-500" />
        <StatCard title="Receita Estimada" value="R$ 1.240,50" icon={DollarSign} color="bg-green-500" locked={!isPremium} onClick={onUpgradeClick} />
        <StatCard title="Score de Autoridade" value="85/100" icon={Activity} color="bg-orange-500" locked={!isPremium} onClick={onUpgradeClick} />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6"><h2 className="text-lg font-bold text-slate-900">Performance da Semana</h2>{!isPremium && (<button onClick={onUpgradeClick} className="text-sm text-indigo-600 font-semibold hover:underline">Ver relatórios detalhados &rarr;</button>)}</div>
        <div className="h-[300px] w-full relative">
           {!isPremium && (<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm"><button onClick={onUpgradeClick} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold shadow-xl hover:bg-black transition-colors">Desbloquear Gráfico Completo</button></div>)}
           <ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><defs><linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} /><YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} /><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /><Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" /></AreaChart></ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;