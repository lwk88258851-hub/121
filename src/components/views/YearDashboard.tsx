import React, { useState } from 'react';
import { StatCard } from '../StatCard';
import { LineChart, BarChart, PieChart, Pie, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, LabelList, ComposedChart, ReferenceLine, Label } from 'recharts';
import { 
  Users, Target, Trophy, TrendingUp, AlertTriangle, ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  kpiData, scoreDistributionData, subjectAvgData, 
  yearTrendDataNew as yearTrendData, yearRankData, boxPlotData, subjectRatesList,
  classOverallAvgData, classOverallRatesData, classSubjectAvgData, classSubjectRatesData, multipleExamData
} from '@/mock-data';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const data = subjectAvgData.find(d => d.subject === payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-5} y={-2} dy={0} textAnchor="end" fill="#64748b" fontSize={13} fontWeight={500}>
        {payload.value}
      </text>
      <text x={-5} y={14} dy={0} textAnchor="end" fill="#94a3b8" fontSize={11}>
        {data ? `第${data.rank}名` : ''}
      </text>
    </g>
  );
};

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const data = subjectAvgData.find(d => d.subject === payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={15} textAnchor="middle" fill="#64748b" fontSize={13} fontWeight={500}>
        {payload.value}
      </text>
      <text x={0} y={32} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {data ? `第${data.rank}名` : ''}
      </text>
    </g>
  );
};

export function YearDashboard({ analysisType, activeSubView }: { analysisType: 'single' | 'multiple', activeSubView: string }) {
  console.log("YearDashboard rendered. analysisType:", analysisType, "activeSubView:", activeSubView);
  const [chartMode, setChartMode] = useState<'pie' | 'bar'>('bar');
  const [classDetailMode, setClassDetailMode] = useState<'overall' | 'subject'>('overall');
  const [classRatesMode, setClassRatesMode] = useState<'pie' | 'bar'>('pie');
  const [selectedClass, setSelectedClass] = useState<string>('高一(1)班');
  
  // States for Multiple Analysis Filters
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  
  if (analysisType === 'single') {
    if (activeSubView === 'analysis-report') {
      const activeAvgData = classOverallAvgData;
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">年级成绩综合分析报告</h2>
            <button 
              onClick={() => window.print()} 
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm print:hidden"
            >
              一键导出 PDF
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 space-y-10 print:shadow-none print:border-none print:p-0">
            {/* Diagnosis */}
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 relative overflow-hidden print:break-inside-avoid">
              <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-10 -mt-10 blur-xl" />
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center relative z-10">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                学情分析诊断
              </h3>
              <div className="text-blue-800 leading-relaxed text-sm relative z-10 space-y-2">
                <p>
                  <strong>1. 整体概况：</strong>本次考试年级整体均分为 <strong className="text-blue-900">568.5分</strong>，最高分 682分，最低分 321分。成绩整体分布呈较好的正态分布形态，说明试卷难度适中，具备良好的区分度。
                </p>
                <p>
                  <strong>2. 班级表现：</strong>其中 <strong className="text-emerald-700">高一(1)班</strong> 和 <strong className="text-emerald-700">高一(2)班</strong> 整体表现最为优异，不仅平均分领先，部分拔尖学生群体较明显，其“优秀率”均超过了 20%。高一(6)班均分相对靠后，需关注尾部学生的辅导。
                </p>
                <p>
                  <strong>3. 学科诊断：</strong>从全科数据来看，理科类（数学、物理）在头部的区分度较好，但尾部不及格率略高，尤其是物理学科不及格率达12%，建议后续加强基础知识梳理。英语学科及格率突出，说明整体达标情况良好，可适当增加培优拔高训练以提升高分段人数。建议各班任课教师针对本班薄弱学科开展专项强化。
                </p>
              </div>
            </div>

            {/* Overview Section */}
            <div className="space-y-8">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">一、 年级成绩总览</h3>
              
              <div className="h-64 print:break-inside-avoid">
                <h4 className="text-md font-bold text-slate-700 mb-4">1. 年级成绩分布</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={scoreDistributionData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="printBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                    <Bar yAxisId="left" dataKey="count" fill="url(#printBarGrad)" radius={[4, 4, 0, 0]} barSize={24}>
                      <LabelList dataKey="count" position="top" fill="#475569" fontSize={11} />
                    </Bar>
                    <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="h-64 mt-12 print:break-inside-avoid">
                <h4 className="text-md font-bold text-slate-700 mb-4">2. 各科平均分对比</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectAvgData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={<CustomXAxisTick />} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Bar dataKey="score" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40}>
                      <LabelList dataKey="score" position="top" fill="#64748b" fontSize={13} formatter={(val: number) => `${val}分`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Class Comparison Section */}
            <div className="space-y-8">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 print:break-before-page mt-8">二、 各班级均分与四率对比</h3>
              
              <div className="h-64 mt-4 print:break-inside-avoid">
                <h4 className="text-md font-bold text-slate-700 mb-4">1. 各班平均分对比</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeAvgData} margin={{ top: 20, right: 40, left: 10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="printClassGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.4} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="className" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis domain={[0, 1000]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <ReferenceLine y={568.5} stroke="#3b82f6" strokeDasharray="3 3">
                      <Label value="均分 568.5" position="right" fill="#3b82f6" fontSize={11} offset={5} />
                    </ReferenceLine>
                    <Bar dataKey="score" fill="url(#printClassGrad)" radius={[4, 4, 0, 0]} barSize={32}>
                      <LabelList dataKey="score" position="top" fill="#475569" fontSize={11} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8">
                <h4 className="text-md font-bold text-slate-700 mb-4">2. 各班四率分布(扇形图)</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {classOverallRatesData.map((data: any) => (
                    <div key={data.className} className="flex flex-col items-center bg-slate-50/50 p-4 rounded-xl print:break-inside-avoid">
                      <div className="w-full h-40 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={data.rates}
                              cx="50%"
                              cy="50%"
                              innerRadius={35}
                              outerRadius={65}
                              paddingAngle={2}
                              dataKey="value"
                              label={renderCustomizedLabel}
                              labelLine={false}
                            >
                              {data.rates.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-0">
                          <span className="text-sm font-bold text-slate-800">{data.className}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 print:break-inside-avoid">
                <h4 className="text-md font-bold text-slate-700 mb-4">3. 各班四率对比(直方图)</h4>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { title: '优秀率对比', rateName: '优秀', color: '#3b82f6' },
                    { title: '良好率对比', rateName: '良好', color: '#10b981' },
                    { title: '及格率对比', rateName: '及格', color: '#f59e0b' },
                    { title: '不及格率对比', rateName: '不及格', color: '#ef4444' },
                  ].map((chartConfig, idx) => {
                    const barData = classOverallRatesData.map((item: any) => ({
                      name: item.className,
                      value: item.rates.find((r: any) => r.name === chartConfig.rateName)?.value || 0
                    }));
                    return (
                      <div key={idx} className="h-56">
                        <h5 className="text-sm text-center font-bold text-slate-600 mb-2">{chartConfig.title}</h5>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={barData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                            <Bar dataKey="value" fill={chartConfig.color} radius={[4, 4, 0, 0]} barSize={24}>
                              <LabelList dataKey="value" position="top" fill="#475569" fontSize={10} formatter={(val: number) => `${val}%`} />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Subject Section */}
            <div className="space-y-8">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 print:break-before-page mt-8">三、 各科四率概况</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {subjectRatesList.map((subjectData) => (
                  <div key={subjectData.subject} className="flex flex-col items-center bg-slate-50/50 p-4 rounded-xl print:break-inside-avoid">
                    <div className="w-full h-40 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={subjectData.rates}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={65}
                            paddingAngle={2}
                            dataKey="value"
                            label={renderCustomizedLabel}
                            labelLine={false}
                          >
                            {subjectData.rates.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `${value}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-0">
                        <span className="text-sm font-bold text-slate-800">{subjectData.subject}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center flex-wrap gap-4 mt-4 pb-8 print:break-inside-avoid">
                <div className="flex items-center text-xs font-medium"><div className="w-3 h-3 rounded-full bg-blue-500 mr-2"/>优秀</div>
                <div className="flex items-center text-xs font-medium"><div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"/>良好</div>
                <div className="flex items-center text-xs font-medium"><div className="w-3 h-3 rounded-full bg-amber-500 mr-2"/>及格</div>
                <div className="flex items-center text-xs font-medium"><div className="w-3 h-3 rounded-full bg-rose-500 mr-2"/>不及格</div>
              </div>
            </div>
            
          </div>
        </div>
      );
    }

    if (activeSubView === 'overview') {
      return (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon={Target} title="年级总平均分" value={kpiData.yearSingle.avg} suffix="分" />
            <StatCard icon={TrendingUp} title="整体及格率" value={kpiData.yearSingle.pass} suffix="%" />
            <StatCard icon={Trophy} title="年级优秀率" value={kpiData.yearSingle.excellent} suffix="%" />
            <StatCard icon={AlertTriangle} title="低分危险率" value={kpiData.yearSingle.low} suffix="%" color="rose" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score Distribution */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-1.5 h-5 bg-blue-600 rounded-full mr-3" />
                  成绩分布
                </div>
                <div className="flex items-center text-sm space-x-4">
                  <div className="flex items-center"><div className="w-3 h-3 bg-blue-400 rounded-sm mr-2"/>人数</div>
                  <div className="flex items-center"><div className="w-4 h-0.5 bg-blue-600 mr-2"/>占比</div>
                </div>
              </h3>
              <div className="w-full h-80 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={scoreDistributionData} margin={{ top: 30, right: 30, left: 10, bottom: 20 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10}>
                      <Label value="分数段（分）" offset={-15} position="insideBottom" fill="#64748b" fontSize={12} />
                    </XAxis>
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }}>
                      <Label value="人数（人）" position="top" offset={10} fill="#64748b" fontSize={12} />
                    </YAxis>
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val}%`}>
                      <Label value="占比（%）" position="top" offset={10} fill="#64748b" fontSize={12} />
                    </YAxis>
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                    <Bar yAxisId="left" dataKey="count" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={32}>
                      <LabelList dataKey="count" position="top" fill="#475569" fontSize={12} />
                    </Bar>
                    <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#3b82f6' }} activeDot={{ r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject Average */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-1.5 h-5 bg-emerald-500 rounded-full mr-3" />
                各科平均分对比
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectAvgData} layout="vertical" margin={{ top: 10, right: 40, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={24}>
                      <LabelList dataKey="score" position="right" fill="#64748b" fontSize={12} formatter={(val: number) => `${val}分`} />
                      {subjectAvgData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'][index % 6]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (activeSubView === 'ranking') {
      return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <div className="w-1.5 h-5 bg-amber-500 rounded-full mr-3" />
              年级全科总分排行榜 (Top 10重点标注)
            </h3>
            <div className="flex space-x-2">
              <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm">总分</button>
              <button className="px-4 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">数学</button>
              <button className="px-4 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">英语</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold rounded-l-xl">年级排名</th>
                  <th className="px-6 py-4 font-semibold">姓名</th>
                  <th className="px-6 py-4 font-semibold">班级</th>
                  <th className="px-6 py-4 font-semibold">总分</th>
                  <th className="px-6 py-4 font-semibold">数学</th>
                  <th className="px-6 py-4 font-semibold rounded-r-xl">英语</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60">
                {yearRankData.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      {row.rank <= 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-md ${row.rank === 1 ? 'bg-amber-400' : row.rank === 2 ? 'bg-slate-300' : 'bg-orange-300'}`}>
                          {row.rank}
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center font-bold text-slate-400">
                          {row.rank}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">{row.name}</td>
                    <td className="px-6 py-4 text-slate-600">{row.class}</td>
                    <td className="px-6 py-4 font-bold text-blue-600 text-base">{row.score}</td>
                    <td className="px-6 py-4 text-slate-600">{row.math}</td>
                    <td className="px-6 py-4 text-slate-600">{row.eng}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    if (activeSubView === 'subject-details') {
      const excellentRateData = subjectRatesList.map(item => ({
        subject: item.subject,
        value: item.rates.find(r => r.name === '优秀')?.value || 0
      }));

      const goodRateData = subjectRatesList.map(item => ({
        subject: item.subject,
        value: item.rates.find(r => r.name === '良好')?.value || 0
      }));

      const passRateData = subjectRatesList.map(item => ({
        subject: item.subject,
        value: item.rates.find(r => r.name === '及格')?.value || 0
      }));

      const failRateData = subjectRatesList.map(item => ({
        subject: item.subject,
        value: item.rates.find(r => r.name === '不及格')?.value || 0
      }));

      const chartsParams = [
        { title: '优秀率对比', data: excellentRateData, color: '#3b82f6', dotColor: 'bg-blue-500' },
        { title: '良好率对比', data: goodRateData, color: '#10b981', dotColor: 'bg-emerald-500' },
        { title: '及格率对比', data: passRateData, color: '#f59e0b', dotColor: 'bg-amber-500' },
        { title: '低分率对比', data: failRateData, color: '#ef4444', dotColor: 'bg-rose-500' },
      ];

      return (
        <div className="space-y-6">
          <div className="flex justify-end">
            <div className="bg-slate-100 p-1 rounded-lg inline-flex">
              <button 
                onClick={() => setChartMode('pie')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${chartMode === 'pie' ? 'bg-white text-blue-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                各科分布(扇形)
              </button>
              <button 
                onClick={() => setChartMode('bar')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${chartMode === 'bar' ? 'bg-white text-blue-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                四率对比(直方图)
              </button>
            </div>
          </div>

          {chartMode === 'bar' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chartsParams.map((chart, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                    <div className={`w-1.5 h-5 ${chart.dotColor} rounded-full mr-3`} />
                    各科{chart.title}
                  </h3>
                  <div className="w-full h-72 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chart.data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} formatter={(value: number) => [`${value}%`, chart.title]} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                          {chart.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'][index % 6]} />
                          ))}
                          <LabelList dataKey="value" position="top" fill="#64748b" fontSize={13} formatter={(val: number) => `${val}%`} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {subjectRatesList.map((subjectData) => (
                <div key={subjectData.subject} className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-slate-800 self-start mb-2">{subjectData.subject} 一分四率分布</h3>
                  <div className="w-full h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectData.rates}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={renderCustomizedLabel}
                          labelLine={false}
                        >
                          {subjectData.rates.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                      <span className="text-2xl font-bold text-slate-800">{subjectData.subject}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (activeSubView === 'class-details') {
      const activeSubjectRates = classDetailMode === 'overall' ? classOverallRatesData : classSubjectRatesData[selectedClass] || [];
      const activeAvgData = classDetailMode === 'overall' ? classOverallAvgData : classSubjectAvgData[selectedClass] || [];

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
             <div className="bg-slate-100 p-1 rounded-lg inline-flex">
              <button 
                onClick={() => setClassDetailMode('overall')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${classDetailMode === 'overall' ? 'bg-white text-blue-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                各班级整体情况
              </button>
              <button 
                onClick={() => setClassDetailMode('subject')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${classDetailMode === 'subject' ? 'bg-white text-blue-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                班级内部各科情况
              </button>
            </div>
            
            {classDetailMode === 'subject' && (
               <select 
                 value={selectedClass} 
                 onChange={(e) => setSelectedClass(e.target.value)}
                 className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 transition-colors"
               >
                 {Object.keys(classSubjectAvgData).map(cls => (
                   <option key={cls} value={cls}>{cls}</option>
                 ))}
               </select>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-1.5 h-5 bg-blue-600 rounded-full mr-3" />
              {classDetailMode === 'overall' ? '各班平均分对比' : `${selectedClass} 各科平均分对比`}
            </h3>
            <div className="w-full h-80 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeAvgData as any} margin={{ top: 30, right: 40, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="classBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id="classBarGradientHighlight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0.9} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey={classDetailMode === 'overall' ? 'className' : 'subject'} axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} dy={10} />
                  <YAxis domain={classDetailMode === 'overall' ? [0, 1000] : [0, 150]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }}>
                    <Label value="平均分（分）" position="top" offset={10} fill="#64748b" fontSize={12} />
                  </YAxis>
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                  {classDetailMode === 'overall' && (
                    <ReferenceLine y={568.5} stroke="#3b82f6" strokeDasharray="3 3">
                      <Label value="年级均分 568.5" position="right" fill="#3b82f6" fontSize={12} fontWeight={500} offset={10} />
                    </ReferenceLine>
                  )}
                  <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
                    {activeAvgData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={classDetailMode === 'overall' && (entry as any).className === '高一(3)班' ? 'url(#classBarGradientHighlight)' : 'url(#classBarGradient)'} />
                    ))}
                    <LabelList dataKey="score" position="top" fill="#475569" fontSize={13} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex justify-end mt-4 mb-2">
            <div className="bg-slate-100 p-1 rounded-lg inline-flex">
              <button 
                onClick={() => setClassRatesMode('pie')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${classRatesMode === 'pie' ? 'bg-white text-blue-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                四率分布(扇形)
              </button>
              <button 
                onClick={() => setClassRatesMode('bar')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${classRatesMode === 'bar' ? 'bg-white text-blue-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                四率对比(直方图)
              </button>
            </div>
          </div>

          {classRatesMode === 'pie' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeSubjectRates.map((data: any) => (
                <div key={data.className || data.subject} className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-slate-800 self-start mb-2">{data.className || data.subject} 一分四率分布</h3>
                  <div className="w-full h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.rates}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={renderCustomizedLabel}
                          labelLine={false}
                        >
                          {data.rates.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: '优秀率对比', rateName: '优秀', color: '#3b82f6', dotColor: 'bg-blue-500' },
                { title: '良好率对比', rateName: '良好', color: '#10b981', dotColor: 'bg-emerald-500' },
                { title: '及格率对比', rateName: '及格', color: '#f59e0b', dotColor: 'bg-amber-500' },
                { title: '不及格率对比', rateName: '不及格', color: '#ef4444', dotColor: 'bg-rose-500' },
              ].map((chartConfig, idx) => {
                const barData = activeSubjectRates.map((item: any) => ({
                  name: item.className || item.subject,
                  value: item.rates.find((r: any) => r.name === chartConfig.rateName)?.value || 0
                }));
                return (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                      <div className={`w-1.5 h-5 ${chartConfig.dotColor} rounded-full mr-3`} />
                      {classDetailMode === 'overall' ? '各班' : `${selectedClass} 各科`}{chartConfig.title}
                    </h3>
                    <div className="w-full h-72 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                          <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} formatter={(value: number) => [`${value}%`, chartConfig.title]} />
                          <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                            {barData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'][index % 6]} />
                            ))}
                            <LabelList dataKey="value" position="top" fill="#64748b" fontSize={13} formatter={(val: number) => `${val}%`} />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      );
    }
  }

  // Multiple Analysis View
  if (analysisType === 'multiple') {
    const filteredData = multipleExamData.map(d => {
      let multiplier = 1;
      if (filterClass !== 'all') {
        const classIndex = ['高一(1)班', '高一(2)班', '高一(3)班', '高一(4)班', '高一(5)班', '高一(6)班'].indexOf(filterClass);
        multiplier *= (1 - (classIndex * 0.05)); // Slight variation
      }
      if (filterSubject !== 'all') {
        multiplier *= 0.15; // single subjects are approx 150 points 
      }
      
      return {
        ...d,
        avgScore: +(d.avgScore * multiplier).toFixed(1),
        excellentRate: filterClass !== 'all' ? +(d.excellentRate * 1.1).toFixed(1) : d.excellentRate,
        goodRate: filterClass !== 'all' ? +(d.goodRate * 0.9).toFixed(1) : d.goodRate,
        passRate: filterClass !== 'all' ? +(d.passRate * 1.05).toFixed(1) : d.passRate,
        lowRate: filterClass !== 'all' ? +(d.lowRate * 0.8).toFixed(1) : d.lowRate,
        highSeg: Math.round(d.highSeg * multiplier * (filterClass !== 'all' ? 0.2 : 1)),
        midSeg: Math.round(d.midSeg * multiplier * (filterClass !== 'all' ? 0.2 : 1)),
        lowSeg: Math.round(d.lowSeg * multiplier * (filterClass !== 'all' ? 0.2 : 1)),
      };
    });

    const latest = filteredData[filteredData.length - 1] || { excellentRate: 0, goodRate: 0, passRate: 0, lowRate: 0 };
    const prev = filteredData.length > 1 ? filteredData[filteredData.length - 2] : { excellentRate: latest.excellentRate, goodRate: latest.goodRate, passRate: latest.passRate, lowRate: latest.lowRate };
    
    const excTrend = +(latest.excellentRate - prev.excellentRate).toFixed(1);
    const goodTrend = +(latest.goodRate - prev.goodRate).toFixed(1);
    const passTrend = +(latest.passRate - prev.passRate).toFixed(1);
    const lowTrend = +(latest.lowRate - prev.lowRate).toFixed(1);

    const renderTopCards = () => (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="优秀率" value={<span>{latest.excellentRate} <span className="text-sm font-normal text-slate-500">%</span></span>} trend={excTrend} trendUpIsGood={true} icon={Target} color="blue" />
        <StatCard title="良好率" value={<span>{latest.goodRate} <span className="text-sm font-normal text-slate-500">%</span></span>} trend={goodTrend} trendUpIsGood={true} icon={Target} color="emerald" />
        <StatCard title="及格率" value={<span>{latest.passRate} <span className="text-sm font-normal text-slate-500">%</span></span>} trend={passTrend} trendUpIsGood={true} icon={Target} color="amber" />
        <StatCard title="低分率" value={<span>{latest.lowRate} <span className="text-sm font-normal text-slate-500">%</span></span>} trend={lowTrend} trendUpIsGood={false} icon={AlertTriangle} color="rose" />
      </div>
    );

    const renderFilters = () => (
      <div className="flex space-x-4 mb-6">
        <select 
          value={filterClass} 
          onChange={(e) => setFilterClass(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">所有班级</option>
          {['高一(1)班', '高一(2)班', '高一(3)班', '高一(4)班', '高一(5)班', '高一(6)班'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select 
          value={filterSubject} 
          onChange={(e) => setFilterSubject(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">所有学科 (总分)</option>
          {['语文', '数学', '英语', '物理', '化学', '生物'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    );

    if (activeSubView === 'avg-trend') {
      const latestAvg = filteredData[filteredData.length - 1]?.avgScore || 0;
      const prevAvg = filteredData.length > 1 ? filteredData[filteredData.length - 2].avgScore : latestAvg;
      const avgTrend = +(latestAvg - prevAvg).toFixed(1);

      return (
        <div className="space-y-6">
          {renderFilters()}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="最新均分" value={<span>{latestAvg} <span className="text-sm font-normal text-slate-500">分</span></span>} trend={avgTrend} trendSuffix="分" trendUpIsGood={true} icon={TrendingUp} color="blue" />
            <StatCard title="较上次提升" value={<span>{avgTrend > 0 ? '+' : ''}{avgTrend} <span className="text-sm font-normal text-slate-500">分</span></span>} color={avgTrend >= 0 ? "emerald" : "rose"} icon={TrendingUp} />
            <StatCard title="稳定度" value="89.3%" icon={Target} color="amber" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">{filterSubject === 'all' ? '年级' : filterSubject}{filterClass === 'all' ? '' : ` (${filterClass}) `}平均分趋势</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={filteredData} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis domain={['dataMin - 15', 'dataMax + 15']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    if (activeSubView === 'rates-trend') {
      return (
        <div className="space-y-6">
          {renderFilters()}
          {renderTopCards()}
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">{filterSubject === 'all' ? '年级' : filterSubject}{filterClass === 'all' ? '' : ` (${filterClass}) `}四率变化</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis yAxisId="left" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} formatter={(v: number) => `${v}%`} />
                  <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px' }} iconType="circle" />
                  <Line yAxisId="left" name="优秀率" type="monotone" dataKey="excellentRate" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="left" name="良好率" type="monotone" dataKey="goodRate" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="left" name="及格率" type="monotone" dataKey="passRate" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="left" name="低分率" type="monotone" dataKey="lowRate" stroke="#e11d48" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    if (activeSubView === 'score-segments') {
      const latest = filteredData[filteredData.length - 1] || { highSeg: 0, midSeg: 0, lowSeg: 0 };
      const prev = filteredData.length > 1 ? filteredData[filteredData.length - 2] : latest;

      const highTrend = latest.highSeg - prev.highSeg;
      const midTrend = latest.midSeg - prev.midSeg;
      const lowTrend = latest.lowSeg - prev.lowSeg;

      return (
        <div className="space-y-6">
          {renderFilters()}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="高分段人数 (≥600分)" value={<span>{latest.highSeg} <span className="text-sm font-normal text-slate-500">人</span></span>} trend={highTrend} trendSuffix="人" trendUpIsGood={true} icon={TrendingUp} color="blue" />
            <StatCard title="中分段人数 (450-599分)" value={<span>{latest.midSeg} <span className="text-sm font-normal text-slate-500">人</span></span>} trend={midTrend} trendSuffix="人" trendUpIsGood={true} icon={TrendingUp} color="emerald" />
            <StatCard title="低分段人数 (<450分)" value={<span>{latest.lowSeg} <span className="text-sm font-normal text-slate-500">人</span></span>} trend={lowTrend} trendSuffix="人" trendUpIsGood={false} icon={AlertTriangle} color="rose" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">{filterSubject === 'all' ? '年级' : filterSubject}{filterClass === 'all' ? '' : ` (${filterClass}) `}成绩分段趋势</h3>
              <div className="bg-slate-100 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setChartMode('bar')}
                  className={cn("px-4 py-1.5 text-sm font-semibold rounded-md transition-all", chartMode === 'bar' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                >
                  柱状图
                </button>
                <button
                  onClick={() => setChartMode('pie')}
                  className={cn("px-4 py-1.5 text-sm font-semibold rounded-md transition-all", chartMode === 'pie' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                >
                  折线图
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartMode === 'bar' ? (
                  <BarChart data={filteredData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: '20px' }} iconType="square" />
                    <Bar name="高分段" dataKey="highSeg" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20}>
                      <LabelList dataKey="highSeg" position="top" fill="#64748b" fontSize={10} />
                    </Bar>
                    <Bar name="中分段" dataKey="midSeg" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={20}>
                      <LabelList dataKey="midSeg" position="top" fill="#64748b" fontSize={10} />
                    </Bar>
                    <Bar name="低分段" dataKey="lowSeg" fill="#34d399" radius={[4, 4, 0, 0]} barSize={20}>
                      <LabelList dataKey="lowSeg" position="top" fill="#64748b" fontSize={10} />
                    </Bar>
                  </BarChart>
                ) : (
                  <LineChart data={filteredData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: '20px' }} iconType="circle" />
                    <Line type="monotone" name="高分段" dataKey="highSeg" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" name="中分段" dataKey="midSeg" stroke="#93c5fd" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" name="低分段" dataKey="lowSeg" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }
    
    if (activeSubView === 'summary') {
      const latestAvg = filteredData[filteredData.length - 1]?.avgScore || 0;
      const prevAvg = filteredData.length > 1 ? filteredData[filteredData.length - 2].avgScore : latestAvg;
      const avgTrend = +(latestAvg - prevAvg).toFixed(1);

      return (
        <div className="space-y-6">
          {renderFilters()}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="最新均分" value={<span>{latestAvg} <span className="text-sm font-normal text-slate-500">分</span></span>} trend={avgTrend} trendSuffix="分" trendUpIsGood={true} icon={TrendingUp} color="blue" />
            <StatCard title="较上次提升" value={<span>{avgTrend > 0 ? '+' : ''}{avgTrend} <span className="text-sm font-normal text-slate-500">分</span></span>} color={avgTrend >= 0 ? "emerald" : "rose"} icon={TrendingUp} />
            <StatCard title="稳定度" value="89.3%" icon={Target} color="amber" />
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-indigo-500" />
              归纳总结
            </h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-4">1</div>
                <div className="pt-1">
                  <p className="text-slate-700 leading-relaxed">最新平均分为 582.4 分，较上次（569.8分）提升 12.6 分，保持稳定上升趋势。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-4">2</div>
                <div className="pt-1">
                  <p className="text-slate-700 leading-relaxed">优秀率提升至 27.1%，及格率提升至 84.7%，整体表现稳中向好。</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-4">3</div>
                <div className="pt-1">
                  <p className="text-slate-700 leading-relaxed">高分段人数持续增长，低分段人数不断下降，年级整体学业水平稳步提升。建议下一步重点关注中分段向高分段的突破，以及对边缘学生的针对性辅导。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return <div>Select a view.</div>;
}
