import React, { useState } from 'react';
import { Send, Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { generateBlogIdea } from '../services/geminiService';
import { BlogPost } from '../types';
import ReactMarkdown from 'react-markdown'; 

interface AIWriterProps {
  isPremium: boolean;
  onUpgradeClick: () => void;
}

const AIWriter: React.FC<AIWriterProps> = ({ isPremium, onUpgradeClick }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    if (!isPremium) { onUpgradeClick(); return; }
    setLoading(true); setPost(null);
    try { const result = await generateBlogIdea(topic); setPost(result); } 
    catch (e) { alert("Erro ao gerar conteúdo. Verifique sua conexão."); } 
    finally { setLoading(false); }
  };

  const copyToClipboard = () => {
    if (!post) return;
    const fullText = `# ${post.title}\n\n${post.content}\n\nTags: ${post.tags.join(', ')}`;
    navigator.clipboard.writeText(fullText); setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-indigo-100 rounded-lg text-indigo-600"><Sparkles size={24} /></div><div><h2 className="text-2xl font-bold text-slate-900">Editor IA "O Blogueiro"</h2><p className="text-slate-500">Gere artigos virais completos em segundos.</p></div></div>
        <div className="relative">
          <textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Sobre o que você quer escrever hoje?" className="w-full p-4 pr-32 h-32 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-lg" />
          <button onClick={handleGenerate} disabled={loading || !topic.trim()} className="absolute bottom-4 right-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}{isPremium ? 'Gerar Artigo' : 'Desbloquear IA'}
          </button>
        </div>
      </div>
      {post && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in-up">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center"><div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-red-400"></span><span className="w-3 h-3 rounded-full bg-yellow-400"></span><span className="w-3 h-3 rounded-full bg-green-400"></span></div><button onClick={copyToClipboard} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copiado!' : 'Copiar Markdown'}</button></div>
          <div className="p-8 prose prose-indigo max-w-none"><h1 className="text-3xl font-bold text-slate-900 mb-6">{post.title}</h1><div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-serif text-lg">{post.content}</div><div className="mt-8 pt-6 border-t border-slate-100"><p className="text-sm text-slate-500 font-semibold mb-2">Tags Recomendadas:</p><div className="flex flex-wrap gap-2">{post.tags.map((tag, i) => (<span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">#{tag.replace('#', '')}</span>))}</div></div></div>
        </div>
      )}
      {!isPremium && !post && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Recurso Exclusivo para Membros</h3>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">A IA do "O Blogueiro Oficial" utiliza modelos avançados para criar conteúdo que ranqueia no Google. Pague apenas uma vez para desbloquear.</p>
          <button onClick={onUpgradeClick} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-green-500/20 transition-all transform hover:scale-105">Desbloquear Agora (R$ 9,90)</button>
        </div>
      )}
    </div>
  );
};
export default AIWriter;