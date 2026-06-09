import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  FileText, 
  LineChart, 
  ChevronRight,
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  ScanLine,
  LayoutGrid,
  BarChart2,
  FileUp,
  Cpu,
  CheckCircle2,
  FileBarChart,
  SlidersHorizontal,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseAndAnalyzeCSV } from '../lib/data-parser';

interface UploadViewProps {
  onAnalyze: (domain: 'year' | 'class' | 'subject', type: 'single' | 'multiple') => void;
}

export function UploadView({ onAnalyze }: UploadViewProps) {
  const [domain, setDomain] = useState<'year' | 'class' | 'subject' | null>(null);
  const [analysisType, setAnalysisType] = useState<'single' | 'multiple' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importMode, setImportMode] = useState<'home' | 'manual'>('home');

  const handleStartAnalysis = (overrideDomain?: 'class', overrideType?: 'single') => {
    setIsProcessing(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 90) currentProgress = 90;
      setProgress(currentProgress);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        onAnalyze(overrideDomain || domain!, overrideType || analysisType!);
      }, 600);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#f5f8ff] overflow-hidden font-sans text-slate-800">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-br from-blue-100/40 via-[#f5f8ff] to-transparent"></div>
      </div>

      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-[1440px] mx-auto w-full px-8 xl:px-12 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 relative">
          
          {/* Decorative 3D-like Bars shifted into content area for precise placement */}
          <div className="absolute left-[-5%] xl:left-[5%] top-[-30%] w-[500px] h-[500px] xl:w-[650px] xl:h-[650px] pointer-events-none opacity-50 hidden lg:block z-0">
            <svg viewBox="0 0 400 450" className="w-full h-full text-blue-500 transform scale-75 origin-top-left drop-shadow-2xl">
              <defs>
                <linearGradient id="front1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.4"/>
                </linearGradient>
                <linearGradient id="side1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.4"/>
                </linearGradient>
                
                <linearGradient id="front2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.4"/>
                </linearGradient>
                <linearGradient id="side2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.4"/>
                </linearGradient>

                <linearGradient id="front3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#eef2ff" stopOpacity="0.4"/>
                </linearGradient>
                <linearGradient id="side3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.4"/>
                </linearGradient>
              </defs>

              <motion.g initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <polygon points="50,250 80,235 110,250 80,265" fill="#bfdbfe" />
                <polygon points="50,250 80,265 80,365 50,350" fill="url(#front1)" />
                <polygon points="80,265 110,250 110,350 80,365" fill="url(#side1)" />
              </motion.g>

              <motion.g initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                <polygon points="120,210 150,195 180,210 150,225" fill="#93c5fd" />
                <polygon points="120,210 150,225 150,385 120,370" fill="url(#front2)" />
                <polygon points="150,225 180,210 180,370 150,385" fill="url(#side2)" />
              </motion.g>

              <motion.g initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <polygon points="190,150 220,135 250,150 220,165" fill="#a5b4fc" />
                <polygon points="190,150 220,165 220,405 190,390" fill="url(#front3)" />
                <polygon points="220,165 250,150 250,390 220,405" fill="url(#side3)" />
              </motion.g>
              
              <motion.g initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <polygon points="260,80 290,65 320,80 290,95" fill="#818cf8" />
                <polygon points="260,80 290,95 290,425 260,410" fill="url(#front3)" />
                <polygon points="290,95 320,80 320,410 290,425" fill="url(#side3)" />
              </motion.g>
            </svg>
          </div>

          {/* Left Hero Section */}
          <div className="flex-1 max-w-xl py-10 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[3.5rem] lg:text-[4rem] font-bold tracking-tight text-slate-900 mb-6 leading-tight"
            >
              学生成绩分析
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-12 leading-relaxed max-w-md"
            >
              上传 Excel / CSV 成绩单，系统自动识别班级、科目、考试批次，并生成可视化分析报告。
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-x-8 gap-y-6 mb-16"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm shrink-0">
                  <ScanLine className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-0.5">智能识别</h4>
                  <p className="text-xs text-slate-500 font-medium">精准提取关键数据</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm shrink-0">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-0.5">多维分析</h4>
                  <p className="text-xs text-slate-500 font-medium">多视角数据洞察</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm shrink-0">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-0.5">可视化报告</h4>
                  <p className="text-xs text-slate-500 font-medium">图表呈现更直观</p>
                </div>
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative flex justify-between w-full max-w-lg mb-8"
            >
              {/* Continuous Progress Track */}
              <div className="absolute top-[15px] left-4 right-4 h-[2px] bg-slate-200 border-t border-dashed border-slate-300 z-0 overflow-hidden">
                 <motion.div 
                   className="absolute top-0 left-0 h-full bg-emerald-500"
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 />
              </div>

              <div className="flex flex-col items-center z-10 w-16">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  <FileUp className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-blue-700 whitespace-nowrap">上传文件</span>
              </div>
              
              <div className="flex flex-col items-center z-10 w-16">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mb-2">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">智能识别</span>
              </div>
              
              <div className="flex flex-col items-center z-10 w-16">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">数据校验</span>
              </div>
              
              <div className="flex flex-col items-center z-10 w-16">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mb-2">
                  <FileBarChart className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">生成报告</span>
              </div>
            </motion.div>
          </div>

          {/* Right Interactive Box */}
          <div className="flex-1 w-full max-w-xl">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div 
                  key="processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-10 xl:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center h-[500px]"
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
              ) : importMode === 'home' ? (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-2xl shadow-blue-900/5 border border-slate-100/50 relative overflow-hidden"
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">选择导入方式</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">自动识别会优先使用后端规则匹配模板，结果不准时可切换手动选择进行更精准的深度匹配。</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Auto Recognize Card */}
                    <button className="flex-1 text-left relative p-6 bg-white border-2 border-blue-500 rounded-2xl hover:shadow-xl hover:shadow-blue-500/10 transition-all group overflow-hidden">
                      <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 font-bold text-xs px-3 py-1 rounded-bl-lg rounded-tr-xl">推荐</div>
                      
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5 relative z-10 transition-transform group-hover:scale-110">
                        <ScanLine className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">智能一键解析</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium relative z-10 drop-shadow-sm">只上传 Excel / CSV，系统自动识别表头、班级、科目和批次。</p>
                      
                      <div className="flex justify-end relative z-10">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>

                      {/* File Input overlay */}
                      <input 
                        type="file" 
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            parseAndAnalyzeCSV(e.target.files[0], () => {
                               handleStartAnalysis('class', 'single');
                            });
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                    </button>
                    
                    {/* Manual Select Card */}
                    <button 
                      onClick={() => setImportMode('manual')}
                      className="flex-1 text-left p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-slate-300 hover:shadow-lg transition-all group relative overflow-hidden"
                    >
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 mb-5 transition-transform group-hover:scale-110">
                        <SlidersHorizontal className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">手动配置维度</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">先选择分析对象和类别组合，再针对性上传成绩表模型。</p>
                      
                      <div className="flex justify-end mt-auto">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center group-hover:border-slate-300 group-hover:text-slate-600 transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-2xl shadow-blue-900/5 border border-slate-100/50"
                >
                  <button 
                    onClick={() => setImportMode('home')}
                    className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" /> 返回
                  </button>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">第一步：选择分析对象</h2>
                    <div className="grid grid-cols-3 gap-3">
                      <SelectionCard 
                        active={domain === 'year'} 
                        onClick={() => setDomain('year')} 
                        icon={BookOpen} 
                        title="年级成绩"
                      />
                      <SelectionCard 
                        active={domain === 'class'} 
                        onClick={() => setDomain('class')} 
                        icon={Users} 
                        title="班级成绩"
                      />
                      <SelectionCard 
                        active={domain === 'subject'} 
                        onClick={() => setDomain('subject')} 
                        icon={FileText} 
                        title="单科分析"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">第二步：选择分析类别</h2>
                    <div className="grid grid-cols-2 gap-3">
                      <AnalysisTypeCard 
                        active={analysisType === 'single'} 
                        onClick={() => setAnalysisType('single')} 
                        icon={PieChart} 
                        title="单次成绩分析"
                      />
                      <AnalysisTypeCard 
                        active={analysisType === 'multiple'} 
                        onClick={() => setAnalysisType('multiple')} 
                        icon={LineChart} 
                        title="历次对比分析"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
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
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-base flex items-center justify-center transition-colors shadow-lg shadow-blue-500/20 relative pointer-events-none"
                    >
                      上传报告并开始分析
                      {!isProcessing && (
                        <span className="w-5 h-5 ml-2 bg-white rounded-full flex items-center justify-center">
                          <ChevronRight className="w-3 h-3 text-blue-600" />
                        </span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
}

function SelectionCard({ active, onClick, icon: Icon, title }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center py-5 px-2 bg-white border-2 rounded-xl transition-all duration-200 group text-center",
        active 
          ? "border-blue-500 shadow-[0_4px_15px_-4px_rgba(59,130,246,0.15)] bg-blue-50/20" 
          : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
      )}
    >
      <div className={cn(
        "w-10 h-10 flex items-center justify-center rounded-lg mb-2 transition-colors",
        active ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500 group-hover:bg-blue-100"
      )}>
        <Icon className={cn("w-5 h-5", active && "fill-current opacity-90")} />
      </div>
      <h4 className={cn("text-xs font-bold whitespace-nowrap", active ? "text-blue-700" : "text-slate-700")}>{title}</h4>
    </button>
  );
}

function AnalysisTypeCard({ active, onClick, icon: Icon, title }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center py-4 px-4 bg-white border-2 rounded-xl transition-all duration-200 group",
        active 
          ? "border-blue-500 shadow-[0_4px_15px_-4px_rgba(59,130,246,0.15)] bg-blue-50/20" 
          : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
      )}
    >
      <div className={cn(
        "w-8 h-8 flex items-center justify-center rounded-lg mr-3 shrink-0 transition-colors",
        active ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500 group-hover:bg-blue-100"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <h4 className={cn("text-sm font-bold text-left", active ? "text-blue-700" : "text-slate-700")}>{title}</h4>
    </button>
  );
}
