import React, { useState } from 'react';
import { StatCard } from '../StatCard';
import { LineChart, BarChart, PieChart, Pie, Bar, Line, AreaChart, Area, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, LabelList, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Rectangle } from 'recharts';
import { Users, Target, TrendingUp, Trophy, AlertTriangle, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { kpiData, classScoreDistData, classStudentData, classTrendDataNew as classTrendData, classProgressStackData, classSingleScoreDist, classSingleScoreDistBySubject, classSingleLevelDist, classSingleLevelDistBySubject, classSingleSubjectAverages, classSingleSubjectRates, classMultipleScoreDistBySubject, classMultipleLevelDistBySubject, classProgressStackDataBySubject, classMultipleStudentsData, classProgressRegressListsBySubject, classSingleStudentData } from '@/mock-data';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

const CustomScoreBar = (props: any) => {
  const { x, y, width, height, value, payload } = props;
  if (!width || !height) return null;
  const score = value;
  const { average } = payload;
  
  const bottomY = y + height;
  const pixelsPerUnit = height / score;
  const avgY = bottomY - pixelsPerUnit * average;

  const isBelow = score < average;
  
  const baseHeight = Math.min(height, pixelsPerUnit * average);
  const baseFill = isBelow ? '#ef4444' : '#3b82f6';
  const extraHeight = score > average ? pixelsPerUnit * (score - average) : 0;
  
  return (
    <g>
      <Rectangle x={x} y={bottomY - baseHeight} width={width} height={baseHeight} fill={baseFill} radius={isBelow ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
      {score > average && (
        <Rectangle x={x} y={y} width={width} height={extraHeight} fill="#10b981" radius={[4, 4, 0, 0]} />
      )}
      <line x1={x} y1={avgY} x2={x + width} y2={avgY} stroke="#ef4444" strokeWidth={4} />
    </g>
  );
};

export function ClassDashboard({ analysisType, activeSubView }: { analysisType: 'single' | 'multiple', activeSubView: string }) {
  
  const [filterExam, setFilterExam] = useState('2024-2025学年期中考试');
  const [filterTerm, setFilterTerm] = useState('2024-2025学年第二学期');
  const [filterClass, setFilterClass] = useState('高一 (3) 班');
  const [overviewSubject, setOverviewSubject] = useState('全科');
  const [distSubject, setDistSubject] = useState('总分');
  const [levelsSubject, setLevelsSubject] = useState('总分');
  const [multiDistSubject, setMultiDistSubject] = useState('总分');
  const [multiLevelsSubject, setMultiLevelsSubject] = useState('总分');
  const [progressSubject, setProgressSubject] = useState('总分');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isProgressExpanded, setIsProgressExpanded] = useState(false);
  const [studentReportSubject, setStudentReportSubject] = useState('总分');
  const [singleStudentPage, setSingleStudentPage] = useState(0);
  const [multipleStudentPage, setMultipleStudentPage] = useState(0);

  if (analysisType === 'single') {

    const renderFilters = () => null;

    const renderTopCards = () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard icon={TrendingUp} title="班级均分" value={<span>542.7 <span className="text-sm font-normal text-slate-500">分</span></span>} color="blue" />
        <StatCard icon={Users} title="参考人数/实际人数" value={<span>80<span className="text-sm font-normal text-slate-500">/81</span></span>} color="emerald" />
        <StatCard icon={Target} title="及格率" value={<span>78.9<span className="text-sm font-normal text-slate-500">%</span></span>} color="amber" />
      </div>
    );

    if (activeSubView === 'overview') {
      const rates = classSingleSubjectRates[overviewSubject] || classSingleSubjectRates['全科'];
      const pieData = [
        { name: '优秀率', value: rates.excellent, color: '#3b82f6' },
        { name: '良好率', value: rates.good, color: '#10b981' },
        { name: '及格率', value: rates.pass, color: '#f59e0b' },
        { name: '低分率', value: rates.low, color: '#f43f5e' },
      ];

      return (
        <div className="space-y-6">
          {renderFilters()}
          {renderTopCards()}
          
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">各学科四率表现</h3>
              <div className="flex bg-slate-50 p-1 rounded-xl">
                {Object.keys(classSingleSubjectRates).map(subj => (
                  <button 
                    key={subj}
                    onClick={() => setOverviewSubject(subj)}
                    className={cn(
                      "px-3 py-1.5 text-sm font-semibold rounded-lg transition-all", 
                      overviewSubject === subj ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8">
              <div className="w-full md:w-2/5 lg:w-1/3 h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius="55%"
                      outerRadius="85%"
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return value > 5 ? (
                          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
                            {value}%
                          </text>
                        ) : null;
                      }}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} formatter={(value: number) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-3/5 lg:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-semibold text-slate-500 mb-2 flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />优秀率</span>
                    <span className="text-2xl font-bold text-slate-800">{rates.excellent}<span className="text-sm font-normal text-slate-500 ml-1">%</span></span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${rates.excellent}%` }} />
                  </div>
                </div>
                <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-semibold text-slate-500 mb-2 flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />良好率</span>
                    <span className="text-2xl font-bold text-slate-800">{rates.good}<span className="text-sm font-normal text-slate-500 ml-1">%</span></span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${rates.good}%` }} />
                  </div>
                </div>
                <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-semibold text-slate-500 mb-2 flex items-center"><div className="w-2 h-2 rounded-full bg-amber-500 mr-2" />及格率</span>
                    <span className="text-2xl font-bold text-slate-800">{rates.pass}<span className="text-sm font-normal text-slate-500 ml-1">%</span></span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${rates.pass}%` }} />
                  </div>
                </div>
                <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-semibold text-slate-500 mb-2 flex items-center"><div className="w-2 h-2 rounded-full bg-rose-500 mr-2" />低分率</span>
                    <span className="text-2xl font-bold text-slate-800">{rates.low}<span className="text-sm font-normal text-slate-500 ml-1">%</span></span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${rates.low}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">各学科平均分</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classSingleSubjectAverages} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={24}>
                    {classSingleSubjectAverages.map((entry, index) => {
                      const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#f43f5e', '#84cc16'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                    <LabelList dataKey="score" position="top" fill="#ef4444" offset={8} fontSize={11} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }
    
    if (activeSubView === 'distribution') {
      const distData = classSingleScoreDistBySubject[distSubject] || classSingleScoreDistBySubject['总分'];
      return (
        <div className="space-y-6">
          {renderFilters()}
          {renderTopCards()}
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">学生成绩分布</h3>
                <p className="text-sm text-slate-500">按分数段统计人数</p>
              </div>
              <div className="flex bg-slate-50 p-1 rounded-xl mt-4 sm:mt-0 flex-wrap">
                {Object.keys(classSingleScoreDistBySubject).map(subj => (
                  <button 
                    key={subj}
                    onClick={() => setDistSubject(subj)}
                    className={cn(
                      "px-3 py-1.5 text-sm font-semibold rounded-lg transition-all", 
                      distSubject === subj ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={distData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} name="分数段" />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} name="人数 (人)" />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={32}>
                    <LabelList dataKey="count" position="insideTop" fill="#ffffff" offset={8} fontSize={11} />
                  </Bar>
                  <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-xs text-slate-400 mt-2">分数段 (分)</div>
          </div>
        </div>
      );
    }

    if (activeSubView === 'levels') {
      const levelsData = classSingleLevelDistBySubject[levelsSubject] || classSingleLevelDistBySubject['总分'];
      return (
        <div className="space-y-6">
          {renderFilters()}
          {renderTopCards()}
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-2 sm:mb-0">学生分层统计</h3>
              <div className="flex bg-slate-50 p-1 rounded-xl flex-wrap">
                {Object.keys(classSingleLevelDistBySubject).map(subj => (
                  <button 
                    key={subj}
                    onClick={() => setLevelsSubject(subj)}
                    className={cn(
                      "px-3 py-1.5 text-sm font-semibold rounded-lg transition-all", 
                      levelsSubject === subj ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center h-auto md:h-80 gap-6">
              <div className="w-full md:w-1/2 h-64 md:h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={levelsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {levelsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-sm text-slate-500">共 80 人</div>
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-center gap-4">
                {levelsData.map((item, i) => {
                  const percentage = ((item.value / 80) * 100).toFixed(1);
                  return (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-3 shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-slate-600 font-medium">{item.name}</span>
                        </div>
                        <span className="font-semibold text-slate-800">{item.value} 人</span>
                      </div>
                      <div className="w-full bg-slate-100 h-5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full flex items-center justify-end px-2" 
                          style={{ width: `${percentage}%`, backgroundColor: item.color, minWidth: '2rem' }}
                        >
                          <span className="text-white text-[10px] font-bold leading-none">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }


    if (activeSubView === 'student-overview-single') {
      if (selectedStudent) {
        const studentBarData = [
          { subject: '语文', score: selectedStudent['语文'], average: classSingleSubjectAverages.find(a => a.subject === '语文')?.score || 0 },
          { subject: '数学', score: selectedStudent['数学'], average: classSingleSubjectAverages.find(a => a.subject === '数学')?.score || 0 },
          { subject: '英语', score: selectedStudent['英语'], average: classSingleSubjectAverages.find(a => a.subject === '英语')?.score || 0 },
          { subject: '物理', score: selectedStudent['物理'], average: classSingleSubjectAverages.find(a => a.subject === '物理')?.score || 0 },
          { subject: '化学', score: selectedStudent['化学'], average: classSingleSubjectAverages.find(a => a.subject === '化学')?.score || 0 },
          { subject: '生物', score: selectedStudent['生物'], average: classSingleSubjectAverages.find(a => a.subject === '生物')?.score || 0 },
        ];

        return (
          <div className="space-y-6">
            <button 
              onClick={() => setSelectedStudent(null)}
              className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回成绩概览列表
            </button>
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                {selectedStudent.name} 的各科成绩明细 ({filterExam})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 border border-slate-100 rounded-xl p-5 flex flex-col justify-center items-center">
                  <div className="text-slate-500 mb-2 font-medium">总分</div>
                  <div className="text-6xl font-bold text-slate-800">{selectedStudent.total}</div>
                  <div className="mt-6 flex flex-col items-center space-y-4 text-sm">
                    <span className="text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">班级排名 <strong className="text-blue-600 text-xl ml-2">{selectedStudent.rank}</strong></span>
                    <span className="flex items-center text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">
                      发展趋势
                      {selectedStudent.trend === 'up' ? <><TrendingUp className="w-5 h-5 text-emerald-500 ml-2" /><span className="text-emerald-500 ml-1 font-medium">进步</span></> : 
                       selectedStudent.trend === 'down' ? <><TrendingUp className="w-5 h-5 text-rose-500 ml-2 transform rotate-180" /><span className="text-rose-500 ml-1 font-medium">退步</span></> : 
                       <span className="text-slate-400 ml-2 font-medium">持平</span>}
                    </span>
                  </div>
                </div>
                <div className="col-span-1 border border-slate-100 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-slate-700 mb-4">各学科得分</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={studentBarData} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="score" shape={<CustomScoreBar />}>
                          <LabelList dataKey="score" position="top" fill="#64748b" fontSize={11} />
                        </Bar>
                        <Line type="monotone" dataKey="average" stroke="none" dot={false} activeDot={false} isAnimationActive={false} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="col-span-1 border border-slate-100 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-slate-700 mb-4">学科能力雷达图</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                        { subject: '语文', score: selectedStudent['语文'], full: 150 },
                        { subject: '数学', score: selectedStudent['数学'], full: 150 },
                        { subject: '英语', score: selectedStudent['英语'], full: 150 },
                        { subject: '物理', score: selectedStudent['物理'], full: 100 },
                        { subject: '化学', score: selectedStudent['化学'], full: 100 },
                        { subject: '生物', score: selectedStudent['生物'], full: 100 },
                      ]}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar name={selectedStudent.name} dataKey="score" stroke="#8b5cf6" fill="#a78bfa" fillOpacity={0.5} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      const ITEMS_PER_PAGE = 7;
      const maxSinglePage = Math.ceil(classSingleStudentData.length / ITEMS_PER_PAGE) - 1;
      const currentSingleStudents = classSingleStudentData.slice(singleStudentPage * ITEMS_PER_PAGE, (singleStudentPage + 1) * ITEMS_PER_PAGE);

      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3" />
                单次考试成绩概览
              </h3>
              <p className="text-sm text-slate-500 pl-4">全部学生本次考试各科成绩明细，点击学生姓名查看各科学情条形图。</p>
            </div>
          </div>
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold text-left rounded-tl-lg sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] min-w-[140px] border-r border-slate-200">
                    <div className="flex items-center justify-between">
                      <span>科目 \ 姓名</span>
                      <div className="flex items-center space-x-1 ml-2">
                        <button 
                          onClick={() => setSingleStudentPage(p => Math.max(0, p - 1))}
                          disabled={singleStudentPage === 0}
                          className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setSingleStudentPage(p => Math.min(maxSinglePage, p + 1))}
                          disabled={singleStudentPage >= maxSinglePage}
                          className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </th>
                  {currentSingleStudents.map((student, index) => (
                    <th key={student.id} className={`px-4 py-3 font-semibold min-w-[120px] ${index === classSingleStudentData.length - 1 ? 'rounded-tr-lg' : ''}`}>
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center w-full transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs mr-2 border border-blue-200 font-bold whitespace-nowrap">
                          {student.name.charAt(0)}
                        </div>
                        <span className="whitespace-nowrap">{student.name}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {['总分', '语文', '数学', '英语', '物理', '化学', '生物'].map((subject, idx) => {
                  const bgColors = [
                    'bg-slate-50', // 总分
                    'bg-red-50/40', // 语文 - extremely light
                    'bg-blue-50/40', // 数学 - extremely light
                    'bg-emerald-50/40', // 英语 - extremely light
                    'bg-purple-50/40', // 物理 - extremely light
                    'bg-amber-50/40', // 化学 - extremely light
                    'bg-teal-50/40', // 生物 - extremely light
                  ];
                  const stickyBgColors = [
                    'bg-slate-100', // 总分
                    'bg-red-50', // 语文 
                    'bg-blue-50', // 数学
                    'bg-emerald-50', // 英语
                    'bg-purple-50', // 物理
                    'bg-amber-50', // 化学
                    'bg-teal-50', // 生物
                  ];
                  return (
                  <tr key={subject} className={`${bgColors[idx]} hover:brightness-95 transition-all`}>
                    <td className={`px-4 py-3 font-bold text-slate-700 text-left sticky left-0 ${stickyBgColors[idx]} z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]`}>
                      {subject}
                    </td>
                    {currentSingleStudents.map((student: any) => {
                      const val = subject === '总分' ? student.total : student[subject];
                      return (
                        <td key={student.id} className="px-4 py-3 font-bold text-slate-700 text-base">
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      );
    }


    if (activeSubView === 'summary') {
      return (
        <div className="space-y-6">
          {renderFilters()}
          {renderTopCards()}
          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-500" />
              归纳总结
            </h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-4">1</div>
                <div className="pt-1">
                  <p className="text-slate-700 leading-relaxed">本次考试班级均分为 542.7 分，位列年级第 5 名（共 20 个班级）。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-4">2</div>
                <div className="pt-1">
                  <p className="text-slate-700 leading-relaxed">及格率为 78.9%，优秀率 17.5%，中等及以上占比 82.5%。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-4">3</div>
                <div className="pt-1">
                  <p className="text-slate-700 leading-relaxed">语文、数学成绩表现较好；物理、生物、政治等学科平均分相对较低，建议加强基础巩固与针对性训练，提升整体水平。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // Multiple Analysis View
  if (analysisType === 'multiple') {
    if (activeSubView === 'trend') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-1.5 h-5 bg-blue-600 rounded-full mr-3" />
                班级平均分数演变轨迹
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={classTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#3b82f6' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-1.5 h-5 bg-amber-500 rounded-full mr-3" />
                班级全校排名反转图
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={classTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis reversed domain={[1, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                    <Line type="step" dataKey="rank" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#f59e0b' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeSubView === 'progress') {
      const progressData = classProgressStackDataBySubject[progressSubject] || classProgressStackDataBySubject['总分'];
      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                <div className="w-1.5 h-5 bg-purple-500 rounded-full mr-3" />
                班级历次进退步人数堆叠统计
              </h3>
              <p className="text-sm text-slate-500 pl-4">每次考试后，班级内部学生排名或分数梯队相比上一次的变化分布情况。</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl mt-4 sm:mt-0 flex-wrap">
              {Object.keys(classProgressStackDataBySubject).map(subj => (
                <button 
                  key={subj}
                  onClick={() => setProgressSubject(subj)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-semibold rounded-lg transition-all", 
                    progressSubject === subj ? "bg-white text-purple-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData} margin={{ top: 20, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar name="进步者" dataKey="progress" stackId="a" fill="#34d399" barSize={48} radius={[0, 0, 0, 0]} />
                <Bar name="持平者" dataKey="stable" stackId="a" fill="#cbd5e1" barSize={48} />
                <Bar name="退步者" dataKey="regress" stackId="a" fill="#fb7185" barSize={48} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-base font-bold text-slate-800">【{progressSubject}】进退步名单</h4>
              <button 
                onClick={() => setIsProgressExpanded(!isProgressExpanded)}
                className="text-sm text-blue-600 font-medium hover:underline flex items-center"
              >
                {isProgressExpanded ? '收起完整名单' : '放大查看全部'}
              </button>
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isProgressExpanded ? '' : 'h-[360px] overflow-hidden relative'}`}>
              {!isProgressExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
              )}
              
              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100/50">
                <h5 className="font-bold text-emerald-700 flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  进步飞跃榜
                </h5>
                <div className="space-y-3">
                  {(classProgressRegressListsBySubject[progressSubject] || classProgressRegressListsBySubject['总分']).progress.slice(0, isProgressExpanded ? undefined : 10).map((student, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-50 shadow-sm">
                      <div className="flex items-center">
                        <div className="w-6 text-center text-sm font-bold text-slate-400 mr-2">{idx + 1}</div>
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold mr-3">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700 text-sm">{student.name}</p>
                          <p className="text-xs text-slate-400">目前分数: {student.score}</p>
                        </div>
                      </div>
                      <div className="bg-emerald-100 px-2 py-1 rounded-md">
                        <span className="text-emerald-700 font-bold text-sm">+{student.change} {progressSubject !== '总分' ? '' : '分'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100/50">
                <h5 className="font-bold text-rose-700 flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center mr-3">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  </div>
                  重点关注榜
                </h5>
                <div className="space-y-3">
                  {(classProgressRegressListsBySubject[progressSubject] || classProgressRegressListsBySubject['总分']).regress.slice(0, isProgressExpanded ? undefined : 10).map((student, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-rose-50 shadow-sm">
                      <div className="flex items-center">
                        <div className="w-6 text-center text-sm font-bold text-slate-400 mr-2">{idx + 1}</div>
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-xs font-bold mr-3">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700 text-sm">{student.name}</p>
                          <p className="text-xs text-slate-400">目前分数: {student.score}</p>
                        </div>
                      </div>
                      <div className="bg-rose-100 px-2 py-1 rounded-md">
                        <span className="text-rose-700 font-bold text-sm">{student.change} {progressSubject !== '总分' ? '' : '分'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (activeSubView === 'distribution-trend') {
      const distData = classMultipleScoreDistBySubject[multiDistSubject] || classMultipleScoreDistBySubject['总分'];
      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3" />
                历次成绩分布趋势
              </h3>
              <p className="text-sm text-slate-500 pl-4">各分数段人数在历次考试中的对比变化</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl mt-4 sm:mt-0 flex-wrap">
              {Object.keys(classMultipleScoreDistBySubject).map(subj => (
                <button 
                  key={subj}
                  onClick={() => setMultiDistSubject(subj)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-semibold rounded-lg transition-all", 
                    multiDistSubject === subj ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} name="分数段" />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} name="人数 (人)" />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar name="上学期期中" dataKey="上学期期中" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar name="上学期期末" dataKey="上学期期末" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                <Bar name="期中考试" dataKey="期中考试" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }

    if (activeSubView === 'levels-trend') {
      const levelsData = classMultipleLevelDistBySubject[multiLevelsSubject] || classMultipleLevelDistBySubject['总分'];
      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3" />
                历次分层统计变化
              </h3>
              <p className="text-sm text-slate-500 pl-4">优秀、良好、合格及待提升人数的历史变化趋势</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl mt-4 sm:mt-0 flex-wrap">
              {Object.keys(classMultipleLevelDistBySubject).map(subj => (
                <button 
                  key={subj}
                  onClick={() => setMultiLevelsSubject(subj)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-semibold rounded-lg transition-all", 
                    multiLevelsSubject === subj ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={levelsData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} name="人数 (人)" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" name="优秀" dataKey="excellent" stroke="#3b82f6" strokeWidth={1} dot={{ r: 3, strokeWidth: 1 }} activeDot={{ r: 5 }} />
                <Line type="monotone" name="良好" dataKey="good" stroke="#10b981" strokeWidth={1} dot={{ r: 3, strokeWidth: 1 }} activeDot={{ r: 5 }} />
                <Line type="monotone" name="中等" dataKey="pass" stroke="#f59e0b" strokeWidth={1} dot={{ r: 3, strokeWidth: 1 }} activeDot={{ r: 5 }} />
                <Line type="monotone" name="待提升" dataKey="low" stroke="#ef4444" strokeWidth={1} dot={{ r: 3, strokeWidth: 1 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    if (activeSubView === 'student-overview') {
      if (selectedStudent) {
        // Prepare chart data format for selected student
        const chartData = selectedStudent.scores.map((s: any) => ({
          exam: s.exam,
          总分: s.total,
          语文: s.语文,
          数学: s.数学,
          英语: s.英语,
          物理: s.物理,
          化学: s.化学,
          生物: s.生物,
        }));
        
        return (
          <div className="space-y-6">
            <button 
              onClick={() => setSelectedStudent(null)}
              className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回学生列表
            </button>
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                {selectedStudent.name} 的成绩专属报告
              </h3>
              
              <div className="flex bg-slate-50 p-1 rounded-xl mb-6 flex-wrap w-fit">
                {['总分', '语文', '数学', '英语', '物理', '化学', '生物'].map(subj => (
                  <button 
                    key={subj}
                    onClick={() => setStudentReportSubject(subj)}
                    className={cn(
                      "px-4 py-1.5 text-sm font-semibold rounded-lg transition-all", 
                      studentReportSubject === subj ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {subj}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-100 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-slate-700 mb-4">历次成绩变化 ({studentReportSubject})</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={['dataMin - 10', 'dataMax + 10']} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey={studentReportSubject} stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="border border-slate-100 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-slate-700 mb-4">当前学科能力雷达图</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                        { subject: '语文', score: chartData[chartData.length-1].语文, full: 150 },
                        { subject: '数学', score: chartData[chartData.length-1].数学, full: 150 },
                        { subject: '英语', score: chartData[chartData.length-1].英语, full: 150 },
                        { subject: '物理', score: chartData[chartData.length-1].物理, full: 100 },
                        { subject: '化学', score: chartData[chartData.length-1].化学, full: 100 },
                        { subject: '生物', score: chartData[chartData.length-1].生物, full: 100 },
                      ]}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar name={selectedStudent.name} dataKey="score" stroke="#3b82f6" fill="#60a5fa" fillOpacity={0.6} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center">
                  ✨ AI 智能诊断分析
                </h4>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-800">整体表现：</strong>该生在最近的 {chartData.length} 次考试中，总分呈现<span className="text-blue-600 font-semibold">{chartData[chartData.length-1].总分 >= chartData[0].总分 ? '稳步上升' : '轻微波动'}</span>的趋势，最近一次考试（{chartData[chartData.length-1].exam}）总分为 {chartData[chartData.length-1].总分}分。
                  </p>
                  <p>
                    <strong className="text-slate-800">学科分析：</strong>数学成绩有比较明显的优势，但语文相对薄弱，出现了一定瓶颈。在理综部分物理和成绩良好，有继续提升的空间。
                  </p>
                  <p>
                    <strong className="text-slate-800">学习建议：</strong>建议在保持优势学科（特别是数学、英语）的基础上，适当增加语文学科的课外阅读和专项训练时间。可以利用周末时间整理错题本，针对薄弱知识点进行定点突破。
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      const ITEMS_PER_PAGE = 7;
      const maxMultiplePage = Math.ceil(classMultipleStudentsData.length / ITEMS_PER_PAGE) - 1 > 0 ? Math.ceil(classMultipleStudentsData.length / ITEMS_PER_PAGE) - 1 : 0;
      const currentMultipleStudents = classMultipleStudentsData.slice(multipleStudentPage * ITEMS_PER_PAGE, (multipleStudentPage + 1) * ITEMS_PER_PAGE);

      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3" />
                学生成绩概况明细
              </h3>
              <p className="text-sm text-slate-500 pl-4">多次考试中该班级每位学生成绩与历次分数的详细数据记录列表，点击学生姓名查看个人的表现趋势及AI诊断。</p>
            </div>
          </div>
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold text-left rounded-tl-lg sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] min-w-[140px] border-r border-slate-200">
                    <div className="flex items-center justify-between">
                      <span>科目 \ 姓名</span>
                      <div className="flex items-center space-x-1 ml-2">
                        <button 
                          onClick={() => setMultipleStudentPage(p => Math.max(0, p - 1))}
                          disabled={multipleStudentPage === 0}
                          className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setMultipleStudentPage(p => Math.min(maxMultiplePage, p + 1))}
                          disabled={multipleStudentPage >= maxMultiplePage}
                          className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </th>
                  {currentMultipleStudents.map((student, index) => (
                    <th key={student.id} className={`px-4 py-3 font-semibold min-w-[120px] ${index === classMultipleStudentsData.length - 1 ? 'rounded-tr-lg' : ''}`}>
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center w-full transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs mr-2 border border-blue-200 font-bold whitespace-nowrap">
                          {student.name.charAt(0)}
                        </div>
                        <span className="whitespace-nowrap">{student.name}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {['总分', '语文', '数学', '英语', '物理', '化学', '生物'].map((subject, idx) => {
                  const bgColors = [
                    'bg-slate-50', // 总分
                    'bg-red-50/40', // 语文 - extremely light
                    'bg-blue-50/40', // 数学 - extremely light
                    'bg-emerald-50/40', // 英语 - extremely light
                    'bg-purple-50/40', // 物理 - extremely light
                    'bg-amber-50/40', // 化学 - extremely light
                    'bg-teal-50/40', // 生物 - extremely light
                  ];
                  const stickyBgColors = [
                    'bg-slate-100', // 总分
                    'bg-red-50', // 语文 
                    'bg-blue-50', // 数学
                    'bg-emerald-50', // 英语
                    'bg-purple-50', // 物理
                    'bg-amber-50', // 化学
                    'bg-teal-50', // 生物
                  ];
                  return (
                  <tr key={subject} className={`${bgColors[idx]} hover:brightness-95 transition-all`}>
                    <td className={`px-4 py-3 font-bold text-slate-700 text-left sticky left-0 ${stickyBgColors[idx]} z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]`}>
                      {subject}
                    </td>
                    {currentMultipleStudents.map((student) => {
                      const latestScore = student.scores[student.scores.length - 1] as any;
                      const prevScore = student.scores[student.scores.length - 2] as any;
                      const currentVal = subject === '总分' ? latestScore.total : latestScore[subject] || 0;
                      const prevVal = subject === '总分' ? prevScore.total : prevScore[subject] || 0;
                      const diff = currentVal - prevVal;
                      
                      return (
                        <td key={student.id} className="px-4 py-3">
                          <div className="flex flex-col items-center">
                            <span className={cn("font-bold text-base", subject === '总分' ? "text-slate-800" : "text-slate-700")}>
                              {currentVal}
                            </span>
                            {diff !== 0 && (
                              <span className={cn(
                                "text-xs font-semibold mt-0.5", 
                                diff > 0 ? "text-emerald-500" : "text-rose-500"
                              )}>
                                {diff > 0 ? '↑' : '↓'} {Math.abs(diff)}
                              </span>
                            )}
                            {diff === 0 && (
                              <span className="text-xs font-semibold text-slate-300 mt-0.5">-</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  return null;
}
