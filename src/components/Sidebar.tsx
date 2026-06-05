import React from 'react';
import { cn } from '@/lib/utils';
import { BarChart3, Users, FileText, LayoutDashboard, LineChart, Target, Trophy, TrendingUp, BookOpen } from 'lucide-react';
import { GraduationCap } from 'lucide-react';

export type ViewType = 
  | 'year-overview' | 'year-trend' | 'year-comparison' 
  | 'class-overview' | 'class-students' | 'class-progress'
  | 'subject-overview' | 'subject-questions' | 'subject-knowledge';

export type DomainType = 'year' | 'class' | 'subject';

interface SidebarProps {
  domain: DomainType;
  analysisType: 'single' | 'multiple';
  activeView: string;
  onViewChange: (view: string) => void;
  goHome?: () => void;
}

export function Sidebar({ domain, analysisType, activeView, onViewChange, goHome }: SidebarProps) {
  const getMenuItems = () => {
    if (domain === 'year') {
      if (analysisType === 'single') {
        return [
          { id: 'overview', title: '单次：成绩概览', icon: LayoutDashboard },
          { id: 'ranking', title: '单次：成绩排行', icon: Trophy },
          { id: 'subject-details', title: '单次：各科详情', icon: BookOpen },
          { id: 'class-details', title: '单次：各班详情', icon: Users },
          { id: 'analysis-report', title: '单次：分析报告', icon: FileText },
        ];
      } else {
        return [
          { id: 'avg-trend', title: '历次：平均分趋势', icon: TrendingUp },
          { id: 'rates-trend', title: '历次：四率变化', icon: LineChart },
          { id: 'score-segments', title: '历次：分段对比', icon: BarChart3 },
          { id: 'summary', title: '历次：归纳总结', icon: FileText },
        ];
      }
    } else if (domain === 'class') {
      if (analysisType === 'single') {
        return [
          { id: 'overview', title: '单次：班级概况', icon: LayoutDashboard },
          { id: 'distribution', title: '单次：成绩分布', icon: BarChart3 },
          { id: 'levels', title: '单次：分层统计', icon: Target },
          { id: 'student-overview-single', title: '单次：成绩概览', icon: Users },
          { id: 'summary', title: '单次：归纳总结', icon: FileText },
        ];
      } else {
        return [
          { id: 'trend', title: '历次：班级排位趋势', icon: TrendingUp },
          { id: 'progress', title: '历次：进退步追踪', icon: Target },
          { id: 'distribution-trend', title: '历次：成绩分布对比', icon: BarChart3 },
          { id: 'levels-trend', title: '历次：分层统计对比', icon: Target },
          { id: 'student-overview', title: '历次：学生成绩概况', icon: Users },
        ];
      }
    } else if (domain === 'subject') {
      if (analysisType === 'single') {
        return [
          { id: 'distribution', title: '单次：成绩分布对比', icon: BarChart3 },
          { id: 'levels', title: '单次：分层统计对比', icon: Target },
          { id: 'student-overview-single', title: '单次：学生成绩概况', icon: Users },
        ];
      } else {
        return [
          { id: 'progress', title: '历次：进退步追踪', icon: Target },
          { id: 'distribution-trend', title: '历次：成绩分布对比', icon: BarChart3 },
          { id: 'levels-trend', title: '历次：分层统计对比', icon: Target },
          { id: 'student-overview', title: '历次：学生成绩概况', icon: Users },
        ];
      }
    }
    return [];
  };

  const items = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-slate-100 flex flex-col h-full font-sans shadow-[2px_0_15px_-3px_rgba(0,0,0,0.05)] z-10 relative">
      <div 
        className="h-20 bg-[#2563eb] rounded-br-[2rem] flex items-center px-6 mb-6 cursor-pointer hover:bg-blue-700 transition-colors"
        onClick={goHome}
      >
        <GraduationCap className="h-8 w-8 text-white mr-3 shrink-0" />
        <span className="text-lg font-bold text-white tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">成绩分析平台</span>
      </div>

      <div className="px-4 mb-4">
        <div className="text-xs font-bold text-slate-400 mb-2 px-2">报表导航区</div>
        <div className="space-y-1">
          {items.map(item => {
            const isActive = activeView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center group",
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                )}
              >
                <Icon className={cn(
                    "w-5 h-5 mr-3 transition-colors",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500"
                )} />
                {item.title}
              </button>
            )
          })}
        </div>
      </div>
      
      <div className="mt-auto p-6">
        <div className="w-24 h-24 mx-auto opacity-5 bg-[url('https://api.iconify.design/lucide/bar-chart-2.svg')] bg-no-repeat bg-contain" />
      </div>
    </div>
  );
}
