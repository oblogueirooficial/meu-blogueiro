import React, { useState } from 'react';
import { X, Lock, ArrowRight, CreditCard } from 'lucide-react';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PixModal: React.FC<PixModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // --- CONFIGURAÇÃO CORRETA DO LINK ---
  // Use apenas o link curto, sem prefixos extras
  const MERCADO_PAGO_LINK = "https://mpago.la/1ioMAkj"; 
  const SECRET_CODE = "VIP2024"; 
  // ---------------------------

  const handleOpenPayment = () => {
    // Abre o link direto do Mercado Pago
    window.open(MERCADO_PAGO_LINK, '_blank');
  };

  const handleValidate = () => {
    if (accessCode.trim().toUpperCase() === SECRET_CODE) {
      onSuccess();
    } else {
      setError("Código inválido. Verifique se digitou corretamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10">
            <X size={24} />
        </button>

        {/* Header Premium */}
        <div className="bg-slate-900 p-8 text-white text-center">
          <div className="mx-auto bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/50">
            <Lock size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Destravar Sistema</h2>
          <p className="text-slate-400 mt-2 text-sm">Liberação imediata após o pagamento</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          
          {/* Opção Principal: Automático */}
          <div className="space-y-4 text-center">
            <button 
              onClick={handleOpenPayment}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <CreditCard size={24} />
              Pagar R$ 9,90 e Entrar
            </button>
            <p className="text-xs text-slate-500 leading-relaxed px-4">
              Ao finalizar o pagamento no Mercado Pago, <strong>aguarde o redirecionamento automático</strong> para entrar sem senha.
            </p>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold uppercase">Ou use um código de acesso</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Opção Secundária: Senha Manual */}
          <div className="space-y-3">
            <div className="relative">
              <input 
                type="text"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setError('');
                }}
                placeholder="Tenho um código VIP..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-center font-bold text-slate-800 placeholder:font-normal placeholder:text-slate-400 transition-all uppercase"
              />
              <button
                onClick={handleValidate}
                className="absolute right-2 top-2 bottom-2 bg-slate-200 text-slate-600 hover:bg-slate-300 px-4 rounded-lg font-bold transition-colors flex items-center gap-2"
                disabled={accessCode.length < 3}
              >
                <ArrowRight size={18} />
              </button>
            </div>
            {error && <p className="text-red-500 text-xs text-center font-semibold">{error}</p>}
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 text-center text-[10px] text-slate-400 uppercase font-bold tracking-widest border-t border-slate-100">
          Ambiente Seguro • Acesso Vitalício
        </div>
      </div>
    </div>
  );
};

export default PixModal;