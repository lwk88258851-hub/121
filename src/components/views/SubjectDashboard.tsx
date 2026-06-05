import React, { useState } from 'react';
import { StatCard } from '../StatCard';
import { LineChart, BarChart, Bar, Line, ScatterChart, Scatter, ZAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, ComposedChart, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LabelList } from 'recharts';
import { Target, TrendingUp, TrendingDown, BookOpen, AlertCircle, AlertTriangle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  kpiData, 
  classComparisonData, 
  subjectScoreDistData, 
  yearTrendDataNew as yearTrendData, 
  subjectKnowledgeData, 
  subjectKnowledgeTrendData,
  classSingleScoreDistBySubject,
  classSingleLevelDistBySubject,
  classSingleSubjectAverages,
  classSingleStudentData,
  classProgressStackDataBySubject,
  classProgressRegressListsBySubject,
  classMultipleScoreDistBySubject,
  classMultipleLevelDistBySubject,
  classMultipleStudentsData
} from '@/mock-data';
import { cn } from '@/lib/utils';

export function SubjectDashboard({ analysisType, activeSubView }: { analysisType: 'single' | 'multiple', activeSubView: string }) {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [singleStudentPage, setSingleStudentPage] = useState(0);
  const [multipleStudentPage, setMultipleStudentPage] = useState(0);
  const [isProgressExpanded, setIsProgressExpanded] = useState(false);
  const [filterExam, setFilterExam] = useState('期中考试');

  const subject = '语文';

  if (analysisType === 'single') {
    if (activeSubView === 'distribution') {
      const distData = classSingleScoreDistBySubject[subject] || classSingleScoreDistBySubject['总分'];
      return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">【{subject}】成绩分布</h3>
                <p className="text-sm text-slate-500">按分数段统计人数</p>
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
      const levelsData = classSingleLevelDistBySubject[subject] || classSingleLevelDistBySubject['总分'];
      return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-2 sm:mb-0">【{subject}】分层统计</h3>
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
      const ITEMS_PER_PAGE = 10;
      const maxSinglePage = Math.ceil(classSingleStudentData.length / ITEMS_PER_PAGE) - 1;
      const currentSingleStudents = classSingleStudentData.slice(singleStudentPage * ITEMS_PER_PAGE, (singleStudentPage + 1) * ITEMS_PER_PAGE);

      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3" />
                【{subject}】成绩明细
              </h3>
              <p className="text-sm text-slate-500 pl-4">全部学生本次考试该科成绩明细。</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500 font-medium px-2">{singleStudentPage + 1} / {maxSinglePage + 1}</span>
              <button 
                onClick={() => setSingleStudentPage(p => Math.max(0, p - 1))}
                disabled={singleStudentPage === 0}
                className="p-1.5 rounded bg-white border border-slate-200 text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                title="上一页"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setSingleStudentPage(p => Math.min(maxSinglePage, p + 1))}
                disabled={singleStudentPage >= maxSinglePage}
                className="p-1.5 rounded bg-white border border-slate-200 text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                title="下一页"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto pb-4">
             <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-3 font-semibold text-left border-b border-slate-200 rounded-tl-lg">姓名</th>
                  <th className="px-6 py-3 font-semibold border-b border-slate-200">【{subject}】得分</th>
                  <th className="px-6 py-3 font-semibold border-b border-slate-200 rounded-tr-lg">班级排名</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {currentSingleStudents.map((student: any) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 text-left">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-3 border border-blue-200 font-bold text-blue-700">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-700 text-base">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 font-bold text-slate-700 text-base">{student[subject]}</td>
                      <td className="px-6 py-3 text-slate-600 text-base">
                        <span className="inline-block px-2 py-1 bg-slate-100 rounded text-slate-600 font-medium">{student.rank}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  // Multiple Analysis View
  if (analysisType === 'multiple') {
    if (activeSubView === 'progress') {
      const progressData = classProgressStackDataBySubject[subject] || classProgressStackDataBySubject['总分'];
      const detailsData = classProgressRegressListsBySubject[subject] || classProgressRegressListsBySubject['总分'];
      
      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                <div className="w-1.5 h-5 bg-purple-500 rounded-full mr-3" />
                【{subject}】历次进退步情况追踪
              </h3>
              <p className="text-sm text-slate-500 pl-4">每次考试后，班级内部学生该科分数相比上一次的变化分布及具体名单。</p>
            </div>
          </div>
          <div className="h-[400px] mb-8">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100">
              <h4 className="text-emerald-800 font-bold mb-4 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                最近一次进步较快学生
              </h4>
              <div className="space-y-3">
                {detailsData?.progress?.map((student, i) => (
                  <div key={i} className="flex items-center justify-between bg-white px-4 py-2.5 rounded-lg border border-emerald-50 shadow-sm">
                     <span className="font-semibold text-slate-700">{student.name}</span>
                     <div className="flex items-center space-x-4">
                       <span className="text-slate-500 text-sm">{student.score}分</span>
                       <span className="text-emerald-600 font-bold text-sm bg-emerald-100 px-2.5 py-0.5 rounded flex items-center">
                         +{student.change}
                       </span>
                     </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-100">
              <h4 className="text-rose-800 font-bold mb-4 flex items-center">
                <TrendingDown className="w-4 h-4 mr-2" />
                最近一次需关注退步学生
              </h4>
              <div className="space-y-3">
                {detailsData?.regress?.map((student, i) => (
                  <div key={i} className="flex items-center justify-between bg-white px-4 py-2.5 rounded-lg border border-rose-50 shadow-sm">
                     <span className="font-semibold text-slate-700">{student.name}</span>
                     <div className="flex items-center space-x-4">
                       <span className="text-slate-500 text-sm">{student.score}分</span>
                       <span className="text-rose-600 font-bold text-sm bg-rose-100 px-2.5 py-0.5 rounded flex items-center">
                         {student.change}
                       </span>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (activeSubView === 'distribution-trend') {
      const distData = classMultipleScoreDistBySubject[subject] || classMultipleScoreDistBySubject['总分'];
      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
             <div>
               <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                 <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3" />
                 【{subject}】历次成绩分布趋势
               </h3>
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
      const levelsData = classMultipleLevelDistBySubject[subject] || classMultipleLevelDistBySubject['总分'];
      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3" />
                【{subject}】历次分层统计变化
              </h3>
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
       const ITEMS_PER_PAGE = 5;
       const maxMultiplePage = Math.ceil(classMultipleStudentsData.length / ITEMS_PER_PAGE) - 1;
       const currentMultipleStudents = classMultipleStudentsData.slice(multipleStudentPage * ITEMS_PER_PAGE, (multipleStudentPage + 1) * ITEMS_PER_PAGE);

       return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center mb-2">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3" />
                【{subject}】历次成绩概况
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold text-left rounded-tl-lg sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] min-w-[140px] border-r border-slate-200">
                    <div className="flex items-center justify-between">
                      <span>考次 \ 姓名</span>
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
                    <th key={student.id} className={`px-4 py-3 font-semibold min-w-[120px] ${index === currentMultipleStudents.length - 1 ? 'rounded-tr-lg' : ''}`}>
                       <div className="flex items-center justify-center w-full">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs mr-2 border border-blue-200 font-bold whitespace-nowrap">
                            {student.name.charAt(0)}
                          </div>
                          <span className="whitespace-nowrap text-slate-700">{student.name}</span>
                       </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {['上学期期中', '上学期期末', '期中考试'].map((examName, idx) => {
                   return (
                     <tr key={examName} className="bg-blue-50/40 hover:brightness-95 transition-all">
                       <td className="px-4 py-3 font-bold text-slate-700 text-left sticky left-0 bg-blue-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                         {examName}
                       </td>
                       {currentMultipleStudents.map((student: any) => {
                         const scoreItem = student.scores.find((s:any) => s.exam === examName);
                         return (
                           <td key={student.id} className="px-4 py-3 font-bold text-slate-700 text-base">
                             {scoreItem?.[subject] || '-'}
                           </td>
                         )
                       })}
                     </tr>
                   )
                 })}
              </tbody>
            </table>
          </div>
        </div>
       )
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 text-center text-slate-500 py-20">
      请选择报表导航查看分析
    </div>
  );
}
