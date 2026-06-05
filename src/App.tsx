import React, { useState } from 'react';
import { Sidebar, DomainType } from './components/Sidebar';
import { Header } from './components/Header';
import { UploadView } from './components/UploadView';
import { YearDashboard } from './components/views/YearDashboard';
import { ClassDashboard } from './components/views/ClassDashboard';
import { SubjectDashboard } from './components/views/SubjectDashboard';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [appState, setAppState] = useState<'upload' | 'dashboard'>('upload');
  const [domain, setDomain] = useState<DomainType>('year');
  const [analysisType, setAnalysisType] = useState<'single' | 'multiple'>('single');
  const [activeView, setActiveView] = useState<string>('overview');

  const handleAnalyze = (d: DomainType, type: 'single' | 'multiple') => {
    setDomain(d);
    setAnalysisType(type);
    
    if (type === 'single') {
        if (d === 'subject') {
           setActiveView('distribution');
        } else {
           setActiveView('overview');
        }
    } else {
        if (d === 'year') {
           setActiveView('avg-trend');
        } else if (d === 'subject') {
           setActiveView('progress');
        } else {
           setActiveView('trend');
        }
    }
    
    setAppState('dashboard');
  };

  const renderView = () => {
    switch (domain) {
      case 'year': return <YearDashboard analysisType={analysisType} activeSubView={activeView} />;
      case 'class': return <ClassDashboard analysisType={analysisType} activeSubView={activeView} />;
      case 'subject': return <SubjectDashboard analysisType={analysisType} activeSubView={activeView} />;
      default: return null;
    }
  };

  const getViewTitle = () => {
    const isSingle = analysisType === 'single';
    if (domain === 'year') {
        return { 
            title: isSingle ? '年级成绩单次分析' : '年级成绩历次追踪', 
            sub: isSingle ? '全科总分、及格率与单次排名与分布情况' : '通过数据折线把握年级整体水温与走向' 
        };
    }
    if (domain === 'class') {
        return { 
            title: isSingle ? '高三一班单次学情报告' : '高三一班历次进退步纵览', 
            sub: isSingle ? '重点分析班级极差情况与学生个体表现' : '动态反馈班级进步或退步学生分布群像' 
        };
    }
    if (domain === 'subject') {
        return { 
            title: isSingle ? '语文学科专项把控' : '语文学科历次表现追踪', 
            sub: isSingle ? '查看该科目的整体得分情况与分数段分布' : '长周期检视各项分层成绩数据的演变趋势' 
        };
    }
    return { title: '分析看板', sub: '查看详细的数据分析报告' };
  };

  const headerInfo = getViewTitle();

  return (
    <div className="h-screen w-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {appState === 'upload' ? (
          <motion.div 
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <UploadView onAnalyze={handleAnalyze as any} />
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-full w-full flex"
          >
            <Sidebar domain={domain} analysisType={analysisType} activeView={activeView} onViewChange={setActiveView} goHome={() => setAppState('upload')} />
            <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]/50">
              <Header title={headerInfo.title} subtitle={headerInfo.sub} />
              <main className="flex-1 overflow-y-auto p-8 customize-scrollbar relative z-10 shadow-inner">
                {/* Background decoration matching screenshots slightly */}
                <div className="absolute top-0 right-0 w-full h-48 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none -translate-y-10" />
                <div className="absolute top-4 right-10 opacity-[0.03] pointer-events-none mix-blend-multiply w-[400px] h-[400px] bg-[url('https://api.iconify.design/lucide/school.svg')] bg-no-repeat bg-right-top" />
                
                <div className="relative z-10 max-w-7xl mx-auto h-full">
                    {renderView()}
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
