import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  FileText, 
  LineChart, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseAndAnalyzeCSV } from '../lib/data-parser';

interface UploadViewProps {
  onAnalyze: (domain: 'year' | 'class' | 'subject', type: 'single' | 'multiple') => void;
}

export function UploadView({ onAnalyze }: UploadViewProps) {
  const [domain, setDomain] = useState<'year' | 'class' | 'subject' | null>('year');
  const [analysisType, setAnalysisType] = useState<'single' | 'multiple' | null>('single');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStartAnalysis = () => {
    if (!domain || !analysisType) return;
    setIsProcessing(true);
    let pg = 0;
    const interval = setInterval(() => {
      pg += 4;
      if (pg > 100) pg = 100;
      setProgress(pg);
      if (pg >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onAnalyze(domain, analysisType);
        }, 600);
      }
    }, 40);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#f8fbff] overflow-hidden font-sans text-slate-800">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[120%] h-[120%] pointer-events-none -translate-x-[10%] -translate-y-[10%]">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full opacity-40">
          <path d="M0,0 L1000,0 L1000,1000 L0,1000 Z" fill="url(#bg-grad)" />
          <path d="M0,400 Q200,300 400,500 T800,400 L1000,300 L1000,0 L0,0 Z" fill="#e8f0fe" opacity="0.6" />
          <path d="M0,700 Q300,500 600,700 T1000,600 L1000,1000 L0,1000 Z" fill="#e8f0fe" opacity="0.4" />
          <defs>
            <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#edf3fd" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header Utilities */}
      <div className="absolute top-6 right-8 z-20">
        <button 
          onClick={() => {
            const csvContent = "data:text/csv;charset=utf-8,\uFEFF学生姓名,年级,班级,考试名称,语文,数学,英语,物理,化学,生物,历史,地理,政治,总分\n张同学,高一,1班,期中考试,115,135,120,85,90,75,,,,620\n李同学,高一,1班,期中考试,105,125,110,75,85,65,,,,565\n王同学,高一,2班,期中考试,120,110,105,,,,85,80,90,590\n";
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "成绩导入与分析模板.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="flex items-center px-4 py-2 bg-white/80 backdrop-blur border border-slate-200 shadow-sm rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors text-sm font-medium"
        >
          <FileText className="w-4 h-4 mr-2" />
          下载 Excel 导入模版
        </button>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-[1440px] mx-auto w-full px-8 xl:px-12 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Text Box */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900"
            >
              智能成绩洞悉
            </motion.h1>
          </div>

          {/* Right Interactive Box */}
          <motion.div 
            id="analysis-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isProcessing ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {/* Category 1 */}
                  <div className="mb-8">
                    <div className="flex items-center mb-5">
                      <div className="w-1.5 h-5 bg-blue-600 rounded-full mr-3" />
                      <h3 className="text-lg font-bold text-slate-800">选择分析对象</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <SelectionCard 
                        active={domain === 'year'} 
                        onClick={() => setDomain('year')}
                        icon={GraduationCap}
                        title="年级成绩分析"
                        bgIcon="line-chart-faint"
                      />
                      <SelectionCard 
                        active={domain === 'class'} 
                        onClick={() => setDomain('class')}
                        icon={Users}
                        title="班级成绩分析"
                        bgIcon="pie-chart-faint"
                      />
                      <SelectionCard 
                        active={domain === 'subject'} 
                        onClick={() => setDomain('subject')}
                        icon={BookOpen}
                        title="单独科目分析"
                        bgIcon="activity-faint"
                      />
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="mb-8">
                    <div className="flex items-center mb-5">
                      <div className="w-1.5 h-5 bg-blue-600 rounded-full mr-3" />
                      <h3 className="text-lg font-bold text-slate-800">选择分析类别</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <AnalysisTypeCard 
                        active={analysisType === 'single'}
                        onClick={() => setAnalysisType('single')}
                        icon={FileText}
                        title="单次成绩分析"
                        bgIcon="bar-faint"
                      />
                      <AnalysisTypeCard 
                        active={analysisType === 'multiple'}
                        onClick={() => setAnalysisType('multiple')}
                        icon={LineChart}
                        title="历次成绩对比分析"
                        bgIcon="trend-faint"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setIsProcessing(true);
                          parseAndAnalyzeCSV(e.target.files[0], () => {
                             handleStartAnalysis();
                          });
                        }
                      }}
                      disabled={!domain || !analysisType || isProcessing}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    />
                    <button 
                      type="button"
                      disabled={!domain || !analysisType || isProcessing}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-colors shadow-lg shadow-blue-500/20 relative pointer-events-none"
                    >
                      {isProcessing ? '平台解析中...' : '上传成绩报告并开始分析'}
                      {!isProcessing && (
                        <span className="w-6 h-6 ml-2 bg-white rounded-full flex items-center justify-center">
                          <ChevronRight className="w-4 h-4 text-blue-600" />
                        </span>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="relative w-32 h-32 mb-8">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        className="text-slate-100 stroke-current"
                        strokeWidth="8"
                        cx="50" cy="50" r="40" fill="transparent"
                      />
                      <motion.circle
                        className="text-blue-600 stroke-current drop-shadow-md"
                        strokeWidth="8"
                        strokeLinecap="round"
                        cx="50" cy="50" r="40" fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * progress) / 100}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-slate-800">{progress}%</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">正在生成分析报告...</h3>
                  <p className="text-slate-500 text-sm">正在处理并构建可视化图表模型</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

function SelectionCard({ active, onClick, icon: Icon, title, bgIcon }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center p-6 bg-white border-2 rounded-xl transition-all duration-200 overflow-hidden group",
        active 
          ? "border-blue-500 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.15)]" 
          : "border-slate-100 hover:border-blue-200 hover:bg-slate-50/50"
      )}
    >
      <div className={cn(
        "w-12 h-12 flex items-center justify-center rounded-lg mb-4 transition-colors z-10",
        active ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500 group-hover:bg-blue-100"
      )}>
        <Icon className={cn("w-6 h-6", active && "fill-current opacity-90")} />
      </div>
      <h4 className={cn("text-sm font-bold z-10", active ? "text-blue-700" : "text-slate-700")}>{title}</h4>
      
      {/* Decorative background fain icons */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-end justify-center pb-2">
         {bgIcon === 'line-chart-faint' && (
           <svg viewBox="0 0 100 40" className="w-full h-8 px-2"><path d="M0,40 L10,20 L30,30 L50,10 L70,25 L90,5 L100,10 V40 Z" fill="currentColor"/></svg>
         )}
         {bgIcon === 'pie-chart-faint' && (
           <svg viewBox="0 0 100 40" className="w-12 h-12 translate-y-2"><circle cx="30" cy="20" r="16" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="60 40" /><line x1="60" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="4" /><line x1="60" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="4" /><line x1="60" y1="30" x2="85" y2="30" stroke="currentColor" strokeWidth="4" /></svg>
         )}
         {bgIcon === 'activity-faint' && (
           <svg viewBox="0 0 100 40" className="w-full h-8 px-2 fill-transparent stroke-current stroke-[3]"><polyline points="0,20 20,20 30,5 50,35 60,20 100,20" /><circle cx="30" cy="5" r="4"/><circle cx="50" cy="35" r="4"/><circle cx="60" cy="20" r="4"/></svg>
         )}
      </div>
    </button>
  );
}

function AnalysisTypeCard({ active, onClick, icon: Icon, title, bgIcon }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center p-6 bg-white border-2 rounded-xl transition-all duration-200 overflow-hidden group",
        active 
          ? "border-blue-500 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.15)]" 
          : "border-slate-100 hover:border-blue-200 hover:bg-slate-50/50"
      )}
    >
      <div className={cn(
        "w-10 h-10 flex items-center justify-center rounded-lg mr-4 transition-colors z-10 shrink-0",
        active ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500 group-hover:bg-blue-100"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <h4 className={cn("text-base font-bold z-10 whitespace-nowrap", active ? "text-blue-700" : "text-slate-700")}>{title}</h4>

      {/* Decorative background fain icons */}
      <div className="absolute right-0 top-0 bottom-0 pointer-events-none opacity-[0.03] flex items-center justify-end pr-4">
         {bgIcon === 'bar-faint' && (
           <svg viewBox="0 0 60 40" className="w-16 h-10"><rect x="0" y="20" width="40" height="6" fill="currentColor" rx="3"/><rect x="0" y="10" width="30" height="6" fill="currentColor" rx="3"/><rect x="0" y="30" width="50" height="6" fill="currentColor" rx="3"/></svg>
         )}
         {bgIcon === 'trend-faint' && (
           <svg viewBox="0 0 60 40" className="w-16 h-10"><rect x="10" y="20" width="8" height="20" fill="currentColor" rx="2" /><rect x="25" y="10" width="8" height="30" fill="currentColor" rx="2" /><rect x="40" y="25" width="8" height="15" fill="currentColor" rx="2" /><polyline points="5,25 20,5 35,20 50,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
         )}
      </div>
    </button>
  );
}

